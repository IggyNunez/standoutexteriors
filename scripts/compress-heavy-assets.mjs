/**
 * compress-heavy-assets.mjs
 *
 * One-shot re-compressor for the specific oversized assets that were dragging
 * down the weekly Lighthouse Performance scores (/about 58, /commercial 64,
 * /reviews 67, /christmas-lights 68).
 *
 * Each asset is re-encoded to a temp file and ONLY swapped in if the result is
 * actually smaller. Filenames are preserved, so no code changes are required —
 * the pages keep pointing at the same paths.
 *
 * Images   → sharp (re-encode + cap dimensions, keep original format)
 * Video    → ffmpeg (H.264, downscale to 1280px wide, CRF 28) via ffmpeg-static
 *
 * Usage:
 *   node scripts/compress-heavy-assets.mjs
 *   node scripts/compress-heavy-assets.mjs --force   (re-run even if already small)
 *
 * Originals are backed up to .asset-originals/ at the repo root (gitignored,
 * deliberately outside public/ so Vercel never deploys them) before the swap,
 * so nothing is lost if you want to revert.
 */

import sharp from "sharp";
import { execFile } from "child_process";
import { promisify } from "util";
import ffmpegPath from "ffmpeg-static";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "public", "assets");
// Keep backups OUTSIDE public/ so Next.js never serves them and Vercel never
// deploys the multi-MB originals.
const BACKUP = path.join(ROOT, ".asset-originals");
const FORCE = process.argv.slice(2).includes("--force");

/**
 * Each entry describes one heavy asset and how to re-encode it.
 * `maxWidth` caps the longest edge; images that render small on the page
 * gain nothing from more pixels than that.
 */
const IMAGE_TARGETS = [
  // Review-card photos render ~600px wide at most — 1200px covers 2x retina.
  { file: "layne-before-after.webp",   maxWidth: 1200, quality: 76 },
  { file: "layne-before-after-2.webp", maxWidth: 1200, quality: 76 },
  { file: "rachel-before-after.webp",  maxWidth: 1200, quality: 76 },
  { file: "heidi-erickson.webp",       maxWidth: 1200, quality: 76 },
  { file: "commercial-washing.jpg",    maxWidth: 1600, quality: 72 },
  { file: "christmas-showcase.jpg",    maxWidth: 1600, quality: 72 },
  { file: "christmas-lights.jpg",      maxWidth: 1600, quality: 72 },
  { file: "hero-bg.jpg",               maxWidth: 1920, quality: 72 },
];

const VIDEO_TARGETS = [
  // Decorative, shown at 20-25% opacity behind text, so heavy compression is
  // invisible. The source is portrait 1280x2276; cap the long edge at 1280 and
  // push CRF to 32 to cut the file hard.
  { file: "about-video.mp4", maxWidth: 1280, crf: 32 },
];

function kb(bytes) {
  return bytes >= 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + " MB"
    : Math.round(bytes / 1024) + " KB";
}

function backup(file) {
  if (!fs.existsSync(BACKUP)) fs.mkdirSync(BACKUP, { recursive: true });
  const dest = path.join(BACKUP, file);
  if (!fs.existsSync(dest)) fs.copyFileSync(path.join(ASSETS, file), dest);
}

/** Swap tmp → original only if smaller (unless --force). Returns [before, after]. */
function commit(file, tmpPath) {
  const orig = path.join(ASSETS, file);
  const before = fs.statSync(orig).size;
  const after = fs.statSync(tmpPath).size;
  if (after >= before && !FORCE) {
    fs.unlinkSync(tmpPath);
    console.log(`  ⏭️  ${file}  already optimal (${kb(before)}), left as-is`);
    return null;
  }
  backup(file);
  // On Windows, rename onto an existing file can hit EPERM (AV/indexer holding
  // a transient handle). Overwrite the bytes in place instead — the original
  // inode's handle stays valid, and we've already backed it up above.
  fs.writeFileSync(orig, fs.readFileSync(tmpPath));
  fs.unlinkSync(tmpPath);
  const saving = (((before - after) / before) * 100).toFixed(1);
  console.log(`  ✅  ${file}  ${kb(before)} → ${kb(after)}  (${saving}% smaller)`);
  return { file, before, after };
}

async function compressImage(t) {
  const src = path.join(ASSETS, t.file);
  if (!fs.existsSync(src)) {
    console.log(`  ⚠️  ${t.file}  not found, skipping`);
    return null;
  }
  const ext = path.extname(t.file).toLowerCase();
  const tmp = path.join(ASSETS, path.basename(t.file, ext) + "__tmp" + ext);
  // Encode to an in-memory buffer (not .toFile on the same dir) so sharp never
  // holds a file handle on the source — on Windows an open read handle blocks
  // the later rename with EPERM.
  let pipeline = sharp(src).resize({ width: t.maxWidth, withoutEnlargement: true });
  if (ext === ".webp") pipeline = pipeline.webp({ quality: t.quality });
  else if (ext === ".png") pipeline = pipeline.png({ quality: t.quality, compressionLevel: 9 });
  else pipeline = pipeline.jpeg({ quality: t.quality, mozjpeg: true });
  const buf = await pipeline.toBuffer();
  fs.writeFileSync(tmp, buf);
  return commit(t.file, tmp);
}

async function compressVideo(t) {
  const src = path.join(ASSETS, t.file);
  if (!fs.existsSync(src)) {
    console.log(`  ⚠️  ${t.file}  not found, skipping`);
    return null;
  }
  if (!ffmpegPath) {
    console.log(`  ❌  ${t.file}  ffmpeg-static path unavailable, skipping video`);
    return null;
  }
  const tmp = path.join(ASSETS, path.basename(t.file, ".mp4") + "__tmp.mp4");
  // Cap the LONGER edge at maxWidth (works for portrait or landscape), keeping
  // aspect ratio and even dimensions (-2) as H.264 requires.
  const scale =
    `scale='if(gt(iw,ih),min(${t.maxWidth},iw),-2)':'if(gt(iw,ih),-2,min(${t.maxWidth},ih))'`;
  await execFileAsync(ffmpegPath, [
    "-y",
    "-i", src,
    "-vf", scale,
    "-c:v", "libx264",
    "-crf", String(t.crf),
    "-preset", "slow",
    "-movflags", "+faststart", // lets playback start before full download
    "-an",                     // decorative + muted — drop the audio track
    tmp,
  ]);
  return commit(t.file, tmp);
}

async function run() {
  console.log(`\n🗜️   Compressing heavy assets in public/assets/${FORCE ? "  (--force)" : ""}\n`);
  const results = [];

  console.log("── Images ──");
  for (const t of IMAGE_TARGETS) {
    try { const r = await compressImage(t); if (r) results.push(r); }
    catch (e) { console.error(`  ❌  ${t.file}  ${e.message}`); }
  }

  console.log("\n── Video ──");
  for (const t of VIDEO_TARGETS) {
    try { const r = await compressVideo(t); if (r) results.push(r); }
    catch (e) { console.error(`  ❌  ${t.file}  ${e.message}`); }
  }

  const before = results.reduce((s, r) => s + r.before, 0);
  const after = results.reduce((s, r) => s + r.after, 0);
  console.log(`\n${"─".repeat(60)}`);
  if (results.length) {
    const saving = (((before - after) / before) * 100).toFixed(1);
    console.log(`  📦  Total: ${kb(before)} → ${kb(after)}  (saved ${saving}%)`);
    console.log(`  🗂️   Originals backed up in .asset-originals/ (gitignored, not deployed)`);
  } else {
    console.log(`  Nothing to do — everything already optimal.`);
  }
  console.log(`${"─".repeat(60)}\n`);
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
