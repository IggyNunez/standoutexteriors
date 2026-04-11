/**
 * compress-before-after.mjs
 *
 * Compresses all images in public/assets/before-after/ to WebP.
 * - Skips files that already have a matching .webp output
 * - Target: 1600px wide max, 80% quality — great balance for web
 *
 * Usage:
 *   node scripts/compress-before-after.mjs
 *
 * Optional flags:
 *   --quality 75       (default: 80)
 *   --width 1400       (default: 1600)
 *   --force            (re-compress even if output already exists)
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INPUT_DIR = path.join(ROOT, "public", "assets", "before-after");

// ── Parse flags ──
const args = process.argv.slice(2);
const getFlag = (name, def) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : def;
};
const QUALITY = parseInt(getFlag("--quality", "80"), 10);
const MAX_WIDTH = parseInt(getFlag("--width", "1600"), 10);
const FORCE = args.includes("--force");

const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff", ".bmp"];

async function run() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌  Folder not found: ${INPUT_DIR}`);
    console.error(`    Create it and drop your images in: public/assets/before-after/`);
    process.exit(1);
  }

  const files = fs.readdirSync(INPUT_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED.includes(ext);
  });

  if (files.length === 0) {
    console.log("⚠️  No supported images found in public/assets/before-after/");
    console.log("    Supported formats: " + SUPPORTED.join(", "));
    return;
  }

  console.log(`\n🖼️  Found ${files.length} image(s) — quality: ${QUALITY}%, max width: ${MAX_WIDTH}px\n`);

  let skipped = 0, compressed = 0, errors = 0;
  const results = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(INPUT_DIR, base + ".webp");

    // Skip if already a .webp we'd overwrite with itself (same name)
    const alreadyWebp = ext === ".webp" && !FORCE;

    // Skip if output already exists and not forcing
    if (!FORCE && fs.existsSync(outputPath) && outputPath !== inputPath) {
      console.log(`  ⏭️  Skip  ${file}  (${base}.webp already exists)`);
      skipped++;
      continue;
    }

    if (alreadyWebp && !FORCE) {
      // Re-compress the webp anyway to ensure it hits our quality target
      const tempPath = path.join(INPUT_DIR, base + "__tmp.webp");
      try {
        const inStat = fs.statSync(inputPath);
        await sharp(inputPath)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(tempPath);
        const outStat = fs.statSync(tempPath);
        const saving = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);
        fs.renameSync(tempPath, outputPath);
        console.log(`  ✅  ${file}  ${kb(inStat.size)} → ${kb(outStat.size)}  (${saving}% smaller)`);
        results.push({ file, before: inStat.size, after: outStat.size });
        compressed++;
      } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        console.error(`  ❌  ${file}  ${err.message}`);
        errors++;
      }
      continue;
    }

    try {
      const inStat = fs.statSync(inputPath);
      await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);
      const outStat = fs.statSync(outputPath);
      const saving = (((inStat.size - outStat.size) / inStat.size) * 100).toFixed(1);
      console.log(`  ✅  ${file}  →  ${base}.webp  |  ${kb(inStat.size)} → ${kb(outStat.size)}  (${saving}% smaller)`);
      results.push({ file, before: inStat.size, after: outStat.size });
      compressed++;
    } catch (err) {
      console.error(`  ❌  ${file}  —  ${err.message}`);
      errors++;
    }
  }

  // ── Summary ──
  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter = results.reduce((s, r) => s + r.after, 0);
  const totalSaving = totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) : 0;

  console.log(`\n${"─".repeat(60)}`);
  console.log(`  ✅  Compressed : ${compressed}`);
  if (skipped) console.log(`  ⏭️  Skipped    : ${skipped}`);
  if (errors)  console.log(`  ❌  Errors     : ${errors}`);
  if (compressed > 0) {
    console.log(`  📦  Total size : ${kb(totalBefore)} → ${kb(totalAfter)}  (saved ${totalSaving}%)`);
  }
  console.log(`${"─".repeat(60)}\n`);

  // ── Print the image list for copy-pasting into the page ──
  if (compressed > 0) {
    console.log("📋  Copy this into your before-after page BA_ITEMS array:\n");
    const webpFiles = fs.readdirSync(INPUT_DIR)
      .filter((f) => f.endsWith(".webp"))
      .sort();
    webpFiles.forEach((f, i) => {
      console.log(`  { id: "img-${i + 1}", service: "Cleaning", location: "Denver, NC", description: "", image: "/assets/before-after/${f}", isSplit: true, tag: "All" },`);
    });
    console.log();
  }
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
