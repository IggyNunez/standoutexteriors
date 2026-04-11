/**
 * compress-team-photos.mjs
 *
 * Takes the raw iPhone JPGs from Content/Team Photos/ and outputs optimized
 * WebPs to public/assets/team/ with meaningful, SEO-friendly filenames.
 *
 *  - Auto-rotates based on EXIF so sideways photos come out upright
 *  - Resizes to 1600px max width
 *  - WebP @ 80% quality
 *  - Renames via the RENAME map below so the files are meaningful
 *
 * Usage: node scripts/compress-team-photos.mjs
 * Flags:  --force (re-compress even if output exists)
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INPUT_DIR = path.join(ROOT, "Content", "Team Photos");
const OUTPUT_DIR = path.join(ROOT, "public", "assets", "team");

const QUALITY = 82;
const MAX_WIDTH = 1600;
const FORCE = process.argv.includes("--force");

// Source filename → SEO-friendly output filename (without extension)
const RENAME = {
  "IMG_3119.JPG": "ridge-gutter-cleaning-bucket",
  "IMG_3122.JPG": "ridge-gutter-cleaning-ladder-roof",
  "IMG_3123.JPG": "ridge-gutter-cleaning-ladder-back",
  "IMG_3134.JPG": "ridge-ladder-gutter-upward",
  "IMG_3147.JPG": "ridge-window-cleaning-squeegee-inside",
  "IMG_3148.JPG": "ridge-window-cleaning-squeegee-vertical",
  "IMG_3151.JPG": "ridge-window-cleaning-portrait",
  "IMG_3152.JPG": "ridge-window-cleaning-focused",
  "IMG_3153.JPG": "ridge-window-cleaning-detail",
  "IMG_3154.JPG": "ridge-window-cleaning-reach",
  "IMG_3155.JPG": "ridge-window-cleaning-sunroom",
  "IMG_3156.JPG": "ridge-window-cleaning-lakeside",
  "IMG_4123.JPG": "ridge-driveway-surface-cleaner-action",
  "IMG_5037.JPG": "ridge-house-washing-brick-side",
  "IMG_5200.JPG": "ridge-landscape-watering-lawn",
  "IMG_5203.JPG": "ridge-driveway-surface-cleaner-neighborhood",
  "IMG_5204.JPG": "ridge-driveway-surface-cleaner-concrete",
  "IMG_5205.JPG": "ridge-driveway-surface-cleaner-flex",
  "IMG_5208.JPG": "ridge-concrete-spot-cleaning",
  "IMG_5213.JPG": "ridge-driveway-spray-wand",
  "IMG_5214.JPG": "ridge-driveway-spray-rinse",
};

async function run() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Folder not found: ${INPUT_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created ${OUTPUT_DIR}`);
  }

  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((f) => /\.(jpe?g|png)$/i.test(f));

  console.log(`\nFound ${files.length} source image(s) — quality ${QUALITY}%, max width ${MAX_WIDTH}px\n`);

  let compressed = 0, skipped = 0, errors = 0;
  const results = [];

  for (const file of files) {
    const outName = RENAME[file] || path.basename(file, path.extname(file)).toLowerCase();
    const outputPath = path.join(OUTPUT_DIR, outName + ".webp");
    const inputPath = path.join(INPUT_DIR, file);

    if (!FORCE && fs.existsSync(outputPath)) {
      console.log(`  skip  ${file}  (${outName}.webp exists)`);
      skipped++;
      continue;
    }

    try {
      const inStat = fs.statSync(inputPath);
      await sharp(inputPath)
        .rotate() // auto-orient via EXIF — critical for iPhone photos
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);
      const outStat = fs.statSync(outputPath);
      const saving = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);
      console.log(`  ok    ${file.padEnd(16)} -> ${outName}.webp  ${kb(inStat.size).padStart(8)} -> ${kb(outStat.size).padStart(8)}  (-${saving}%)`);
      results.push({ file, out: outName, before: inStat.size, after: outStat.size });
      compressed++;
    } catch (err) {
      console.error(`  err   ${file}: ${err.message}`);
      errors++;
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  const saving = totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) : 0;

  console.log(`\n${"-".repeat(60)}`);
  console.log(`  compressed : ${compressed}`);
  if (skipped) console.log(`  skipped    : ${skipped}`);
  if (errors)  console.log(`  errors     : ${errors}`);
  if (compressed > 0) {
    console.log(`  total size : ${kb(totalBefore)} -> ${kb(totalAfter)}  (saved ${saving}%)`);
  }
  console.log(`${"-".repeat(60)}\n`);
}

function kb(bytes) {
  return bytes >= 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + " MB"
    : Math.round(bytes / 1024) + " KB";
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
