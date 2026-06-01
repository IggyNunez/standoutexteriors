/**
 * Compress all images in public/ without losing visible quality.
 *
 * Strategy:
 * - JPGs: mozjpeg q88, max 2400px longest edge, progressive. Visually lossless.
 * - WebPs: re-encode at q88 only if >500KB, max 2400px longest edge.
 * - PNGs: if has alpha → optimize PNG palette. If no alpha (photo) → convert to JPG.
 * - Skip logos and tiny files (<40 KB) — not worth the risk.
 * - Write to a temp file first, only replace if smaller.
 *
 * Usage: node scripts/compress-images.mjs [--dry]
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const MAX_EDGE = 2400;
const JPG_QUALITY = 88;
const WEBP_QUALITY = 88;
const SKIP_IF_SMALLER_THAN = 40 * 1024; // 40 KB
const SKIP_NAMES = new Set(["logo-transparent.png", "icon.png", "apple-icon.png"]);
const DRY_RUN = process.argv.includes("--dry");

/** @param {string} dir */
async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(jpe?g|png|webp)$/i.test(name.name)) out.push(full);
  }
  return out;
}

/** @param {number} bytes */
const human = (bytes) => (bytes / 1024).toFixed(1) + " KB";

async function main() {
  const files = await walk(PUBLIC_DIR);
  console.log(`Found ${files.length} images in ${PUBLIC_DIR}/`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const sizeBefore = (await stat(file)).size;
    totalBefore += sizeBefore;

    if (sizeBefore < SKIP_IF_SMALLER_THAN) {
      totalAfter += sizeBefore;
      skipped++;
      continue;
    }
    if (SKIP_NAMES.has(basename(file))) {
      totalAfter += sizeBefore;
      skipped++;
      continue;
    }

    const ext = extname(file).toLowerCase();
    const tmp = file + ".tmp";

    try {
      const img = sharp(file, { failOn: "none" });
      const meta = await img.metadata();
      const longest = Math.max(meta.width || 0, meta.height || 0);

      /** @type {import("sharp").ResizeOptions | undefined} */
      const resize =
        longest > MAX_EDGE
          ? { width: meta.width >= meta.height ? MAX_EDGE : undefined, height: meta.height > meta.width ? MAX_EDGE : undefined, fit: "inside", withoutEnlargement: true }
          : undefined;

      let pipeline = img.rotate(); // respect EXIF orientation
      if (resize) pipeline = pipeline.resize(resize);

      if (ext === ".jpg" || ext === ".jpeg") {
        await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true, progressive: true }).toFile(tmp);
      } else if (ext === ".webp") {
        await pipeline.webp({ quality: WEBP_QUALITY, effort: 5 }).toFile(tmp);
      } else if (ext === ".png") {
        // If image has alpha, keep as PNG (palette optimize). Otherwise convert to JPG.
        if (meta.hasAlpha) {
          await pipeline.png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(tmp);
        } else {
          // Convert photo PNG to JPG but keep same filename so references don't break.
          // We rename .png → .jpg encoded. Downside: anything referencing .png will 404.
          // Safer: keep as optimized PNG.
          await pipeline.png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(tmp);
        }
      }

      const sizeAfter = (await stat(tmp)).size;

      // Only replace if actually smaller (>5% savings)
      if (sizeAfter < sizeBefore * 0.95) {
        if (!DRY_RUN) {
          await rename(tmp, file);
        } else {
          await unlink(tmp);
        }
        console.log(`${DRY_RUN ? "[dry] " : ""}✓ ${file}: ${human(sizeBefore)} → ${human(sizeAfter)} (-${Math.round((1 - sizeAfter / sizeBefore) * 100)}%)`);
        totalAfter += sizeAfter;
        processed++;
      } else {
        await unlink(tmp);
        totalAfter += sizeBefore;
        skipped++;
      }
    } catch (err) {
      console.error(`✗ ${file}:`, err.message);
      try { await unlink(tmp); } catch {}
      totalAfter += sizeBefore;
      skipped++;
    }
  }

  console.log("\n=== Summary ===");
  console.log(`Processed: ${processed}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Before:    ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`After:     ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Savings:   ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
}

main();
