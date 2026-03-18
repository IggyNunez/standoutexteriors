/**
 * fetch-reviews.mjs
 * ─────────────────
 * Fetches all Google reviews for Stand Out Exterior Cleaning via SerpAPI
 * and saves them to src/data/google-reviews.json for static use on the site.
 *
 * SETUP:
 *   1. Sign up free at https://serpapi.com (100 free searches/month)
 *   2. Copy your API key from https://serpapi.com/manage-api-key
 *   3. Create a .env.local file in the project root:
 *        SERPAPI_KEY=your_key_here
 *   4. Run:  node scripts/fetch-reviews.mjs
 *
 * RE-RUN any time you want fresh reviews (once a month is plenty).
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Load .env.local manually (no dotenv dependency needed) ──
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
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

const env = loadEnv();
const API_KEY = env.SERPAPI_KEY || process.env.SERPAPI_KEY;

if (!API_KEY) {
  console.error("❌  Missing SERPAPI_KEY — add it to .env.local");
  console.error("    SERPAPI_KEY=your_key_here");
  process.exit(1);
}

// ── Step 1: Find the data_id for the business ──
async function getDataId() {
  const params = new URLSearchParams({
    engine: "google_maps",
    q: "Stand Out Exterior Cleaning Denver NC",
    api_key: API_KEY,
  });

  console.log("🔍  Looking up business data_id...");
  const res = await fetch(`https://serpapi.com/search.json?${params}`);
  const data = await res.json();

  if (data.error) throw new Error(`SerpAPI error: ${data.error}`);

  const results = data.local_results || [];
  if (!results.length) throw new Error("No results found — try adjusting the business name/location query");

  // Pick the first result (most relevant)
  const biz = results[0];
  console.log(`✅  Found: "${biz.title}" — data_id: ${biz.data_id}`);
  return biz.data_id;
}

// ── Step 2: Paginate through all reviews ──
async function fetchAllReviews(dataId) {
  const reviews = [];
  let nextPageToken = null;
  let page = 1;

  do {
    const params = new URLSearchParams({
      engine: "google_maps_reviews",
      data_id: dataId,
      sort_by: "ratingHigh", // highest rated first
      api_key: API_KEY,
    });
    if (nextPageToken) params.set("next_page_token", nextPageToken);

    console.log(`📄  Fetching page ${page}...`);
    const res = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await res.json();

    if (data.error) throw new Error(`SerpAPI error: ${data.error}`);

    const batch = data.reviews || [];
    reviews.push(...batch);
    console.log(`   Got ${batch.length} reviews (total so far: ${reviews.length})`);

    nextPageToken = data.serpapi_pagination?.next_page_token || null;
    page++;

    // Small delay to be polite
    if (nextPageToken) await new Promise(r => setTimeout(r, 400));
  } while (nextPageToken);

  return reviews;
}

// ── Step 3: Normalize to our shape ──
function normalizeReviews(raw) {
  return raw.map((r) => ({
    name: r.user?.name || "Anonymous",
    avatar: r.user?.thumbnail || null,
    isLocalGuide: r.user?.local_guide || false,
    reviewCount: r.user?.reviews || null,
    rating: r.rating || 5,
    text: r.snippet || "",
    ago: r.date || "",
    isoDate: r.iso_date || null,
    photos: (r.images || []).map((url) => ({
      // Request larger size: replace size suffix
      src: url.replace(/=w\d+-h\d+.*$/, "=w800-h600-k-no"),
      caption: "Customer photo",
    })),
    source: "google",
  }));
}

// ── Main ──
async function main() {
  try {
    const dataId = await getDataId();
    const raw = await fetchAllReviews(dataId);
    const normalized = normalizeReviews(raw);

    // Sort: 5-star first, then by date
    normalized.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (a.isoDate && b.isoDate) return new Date(b.isoDate) - new Date(a.isoDate);
      return 0;
    });

    const outDir = join(ROOT, "src", "data");
    mkdirSync(outDir, { recursive: true });
    const outPath = join(outDir, "google-reviews.json");

    writeFileSync(outPath, JSON.stringify({
      fetchedAt: new Date().toISOString(),
      total: normalized.length,
      reviews: normalized,
    }, null, 2), "utf-8");

    console.log(`\n✅  Saved ${normalized.length} reviews → src/data/google-reviews.json`);
    console.log(`    ${normalized.filter(r => r.photos.length > 0).length} reviews have photos`);
    console.log("\n💡  To use these on the site, import from '@/data/google-reviews.json'");
    console.log("    Add to .gitignore if you don't want to commit raw review data,");
    console.log("    or commit it so Vercel builds have it without needing the API key.\n");

  } catch (err) {
    console.error("❌  Failed:", err.message);
    process.exit(1);
  }
}

main();
