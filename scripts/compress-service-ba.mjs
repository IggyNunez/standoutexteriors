/**
 * compress-service-ba.mjs
 *
 * Takes the 4 before/after composites used as service card heroes, extracts
 * the "after" (clean) half, compresses to WebP, and writes them to
 * public/assets/team/ with SEO-friendly names.
 *
 * Also writes the full composite as *-full.webp so we can reuse it on the
 * /before-after gallery page later.
 *
 * Each entry specifies:
 *   - orientation:  "vertical" (top/bottom split) or "horizontal" (left/right split)
 *   - afterSide:    which half is the "after" — "top", "bottom", "left", "right"
 *   - name:         base output filename
 *
 * Usage: node scripts/compress-service-ba.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INPUT_DIR = path.join(ROOT, "Content", "before-afters", "before-afters");
const OUTPUT_DIR = path.join(ROOT, "public", "assets", "team");

const QUALITY = 82;
const MAX_WIDTH = 1600;

const JOBS = [
  {
    file: "2F554C91-A02A-45AB-932C-625A9C4DB4B8.png",
    name: "ridge-roof-cleaning-aerial",
    orientation: "vertical",
    afterSide: "bottom",
    alt: "Aerial view of a clean roof after Stand Out soft washing",
  },
  {
    file: "IMG_3943.JPG",
    name: "ridge-fence-washing-white",
    orientation: "horizontal",
    afterSide: "right",
    alt: "Brightened white fence after Stand Out fence washing",
  },
  {
    file: "IMG_4065.JPG",
    name: "ridge-paver-cleaning-stone-walkway",
    orientation: "horizontal",
    afterSide: "right",
    alt: "Restored stone paver walkway after deep cleaning",
  },
  {
    file: "IMG_3579.JPG",
    name: "ridge-commercial-uhaul-storefront",
    orientation: "vertical",
    afterSide: "bottom",
    alt: "Clean U-Haul storefront after commercial pressure washing",
  },
];

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const job of JOBS) {
    const inputPath = path.join(INPUT_DIR, job.file);
    if (!fs.existsSync(inputPath)) {
      console.error(`missing: ${inputPath}`);
      continue;
    }

    // Read full metadata with auto-rotation applied
    const rotated = sharp(inputPath).rotate();
    const meta = await rotated.metadata();
    const W = meta.width;
    const H = meta.height;

    // Compute crop region for the "after" half
    let region;
    if (job.orientation === "vertical") {
      const halfH = Math.floor(H / 2);
      region = {
        left: 0,
        top: job.afterSide === "top" ? 0 : halfH,
        width: W,
        height: H - halfH,
      };
    } else {
      const halfW = Math.floor(W / 2);
      region = {
        left: job.afterSide === "left" ? 0 : halfW,
        top: 0,
        width: W - halfW,
        height: H,
      };
    }

    // Full composite (for a gallery page later)
    const fullOut = path.join(OUTPUT_DIR, `${job.name}-full.webp`);
    // "After" only (for service cards)
    const afterOut = path.join(OUTPUT_DIR, `${job.name}.webp`);

    const inSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(fullOut);

    // Need fresh pipeline for the extraction (sharp pipelines are single-use)
    await sharp(inputPath)
      .rotate()
      .extract(region)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(afterOut);

    const fullSize = fs.statSync(fullOut).size;
    const afterSize = fs.statSync(afterOut).size;

    console.log(
      `  ok  ${job.file.padEnd(40)} -> ${job.name}.webp  (${kb(inSize)} -> after ${kb(afterSize)} / full ${kb(fullSize)})`
    );
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
