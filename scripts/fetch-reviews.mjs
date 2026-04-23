/**
 * fetch-reviews.mjs
 * ─────────────────
 * Fetches all Google reviews for Stand Out Exterior Cleaning via SerpAPI
 * and saves them to src/data/google-reviews.json.
 *
 * KEY CHANGE (2026-04-23): Every photo and avatar URL from Google's CDN
 * is now DOWNLOADED LOCALLY to public/assets/reviews/ so it never expires.
 * Google revokes `lh3.googleusercontent.com/geougc-cs/...` review-photo
 * tokens after a few days, which causes broken images in production.
 * Local files are stable; the JSON stores relative paths like
 * `/assets/reviews/photos/<hash>.jpg` instead of the Google URL.
 *
 * SETUP:
 *   1. Sign up free at https://serpapi.com (100 free searches/month)
 *   2. Copy your API key from https://serpapi.com/manage-api-key
 *   3. Add to .env.local:   SERPAPI_KEY=your_key_here
 *   4. Run:  node scripts/fetch-reviews.mjs
 *
 * Re-run any time you want fresh reviews (monthly is plenty).
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const PHOTOS_DIR = join(ROOT, "public", "assets", "reviews", "photos");
const AVATARS_DIR = join(ROOT, "public", "assets", "reviews", "avatars");

// ── Load .env.local manually (no dotenv dependency needed) ────────────
function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return {};
  const lines = readFileSync(envPath, "utf-8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = loadEnv();
const API_KEY = env.SERPAPI_KEY || process.env.SERPAPI_KEY;

if (!API_KEY) {
  console.error("Missing SERPAPI_KEY — add it to .env.local");
  process.exit(1);
}

// ── Helper: hash a URL to a stable filename ───────────────────────────
function urlToFilename(url, fallbackExt = "jpg") {
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 16);
  const extMatch = url.match(/\.(jpe?g|png|webp|gif)(?:$|[?#])/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : fallbackExt;
  return `${hash}.${ext}`;
}

// ── Helper: download a URL to a local file, skip if already cached ────
async function downloadToLocal(url, targetDir) {
  const filename = urlToFilename(url);
  const localPath = join(targetDir, filename);
  mkdirSync(targetDir, { recursive: true });

  if (existsSync(localPath)) {
    return { filename, skipped: true };
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/*",
      },
    });

    if (!res.ok) {
      return { filename: null, error: `HTTP ${res.status}` };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(localPath, buf);
    return { filename, skipped: false, bytes: buf.length };
  } catch (err) {
    return { filename: null, error: err.message };
  }
}

// ── Step 1: Find the data_id for the business ────────────────────────
// SerpAPI returns different shapes depending on match confidence:
//   - `local_results[]` when the query has multiple matches
//   - `place_results{}` when it's a single definitive match
// We read both so the script works either way.
async function getDataId() {
  const params = new URLSearchParams({
    engine: "google_maps",
    q: "Stand Out Exterior Cleaning Denver NC",
    api_key: API_KEY,
  });
  console.log("[reviews] looking up business data_id…");
  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  const data = await res.json();
  if (data.error) throw new Error(`SerpAPI error: ${data.error}`);

  // Prefer place_results (definitive single match), fall back to local_results
  const biz =
    data.place_results ||
    (data.local_results && data.local_results[0]) ||
    null;

  if (!biz || !biz.data_id) {
    throw new Error("SerpAPI returned no place_results or local_results");
  }
  console.log(`[reviews] found: "${biz.title}" data_id=${biz.data_id}`);
  return biz.data_id;
}

// ── Step 2: Paginate through all reviews ─────────────────────────────
async function fetchAllReviews(dataId) {
  const reviews = [];
  let nextPageToken = null;
  let page = 1;
  do {
    const params = new URLSearchParams({
      engine: "google_maps_reviews",
      data_id: dataId,
      sort_by: "ratingHigh",
      api_key: API_KEY,
    });
    if (nextPageToken) params.set("next_page_token", nextPageToken);
    console.log(`[reviews] page ${page}…`);
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await res.json();
    if (data.error) throw new Error(`SerpAPI error: ${data.error}`);
    const batch = data.reviews || [];
    reviews.push(...batch);
    console.log(`[reviews]   +${batch.length} (total ${reviews.length})`);
    nextPageToken = data.serpapi_pagination?.next_page_token || null;
    page++;
    if (nextPageToken) await new Promise((r) => setTimeout(r, 400));
  } while (nextPageToken);
  return reviews;
}

// ── Step 3: Normalize + download photos/avatars locally ───────────────
async function normalizeAndLocalize(raw) {
  const normalized = [];
  let avatarsDownloaded = 0,
    avatarsSkipped = 0,
    avatarsFailed = 0;
  let photosDownloaded = 0,
    photosSkipped = 0,
    photosFailed = 0;

  for (const r of raw) {
    // ── Avatar ─────────────────────────────────────────────────────
    let avatarPath = null;
    if (r.user?.thumbnail) {
      const result = await downloadToLocal(r.user.thumbnail, AVATARS_DIR);
      if (result.filename) {
        avatarPath = `/assets/reviews/avatars/${result.filename}`;
        if (result.skipped) avatarsSkipped++;
        else avatarsDownloaded++;
      } else {
        avatarsFailed++;
      }
    }

    // ── Photos ─────────────────────────────────────────────────────
    const photos = [];
    for (const url of r.images || []) {
      // Request large variant (w800-h600-k-no is a Google size suffix
      // that returns the full-resolution image with no cropping).
      const bigUrl = url.replace(/=w\d+-h\d+.*$/, "=w800-h600-k-no");
      const result = await downloadToLocal(bigUrl, PHOTOS_DIR);
      if (result.filename) {
        photos.push({
          src: `/assets/reviews/photos/${result.filename}`,
          caption: "Customer photo",
        });
        if (result.skipped) photosSkipped++;
        else photosDownloaded++;
      } else {
        photosFailed++;
      }
    }

    normalized.push({
      name: r.user?.name || "Anonymous",
      avatar: avatarPath,
      isLocalGuide: r.user?.local_guide || false,
      reviewCount: r.user?.reviews || null,
      rating: r.rating || 5,
      text: r.snippet || "",
      ago: r.date || "",
      isoDate: r.iso_date || null,
      photos,
      source: "google",
    });
  }

  console.log(
    `[reviews] avatars: ${avatarsDownloaded} new, ${avatarsSkipped} cached, ${avatarsFailed} failed`,
  );
  console.log(
    `[reviews] photos:  ${photosDownloaded} new, ${photosSkipped} cached, ${photosFailed} failed`,
  );
  return normalized;
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  try {
    const dataId = await getDataId();
    const raw = await fetchAllReviews(dataId);
    const normalized = await normalizeAndLocalize(raw);

    // Sort: 5-star first, then by date
    normalized.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (a.isoDate && b.isoDate) return new Date(b.isoDate) - new Date(a.isoDate);
      return 0;
    });

    const outDir = join(ROOT, "src", "data");
    mkdirSync(outDir, { recursive: true });
    const outPath = join(outDir, "google-reviews.json");

    writeFileSync(
      outPath,
      JSON.stringify(
        {
          fetchedAt: new Date().toISOString(),
          total: normalized.length,
          reviews: normalized,
        },
        null,
        2,
      ) + "\n",
      "utf-8",
    );

    const withPhotos = normalized.filter((r) => r.photos.length > 0).length;
    console.log(
      `\n[reviews] saved ${normalized.length} reviews → src/data/google-reviews.json`,
    );
    console.log(`[reviews] ${withPhotos} reviews have photos`);
  } catch (err) {
    console.error("[reviews] failed:", err.message);
    process.exit(1);
  }
}

main();
