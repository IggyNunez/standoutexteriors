/**
 * generate-favicon.mjs
 *
 * Takes the Stand Out brand logo PNG and generates the favicon + app icon
 * assets that Next.js 16 picks up automatically:
 *
 *  - src/app/icon.png           → 512x512 main favicon (Next resizes per UA)
 *  - src/app/apple-icon.png     → 180x180 iOS home-screen icon
 *
 * Source: assets/standout-favicon.png (702x439, wide aspect)
 * Strategy: contain-fit on a square transparent canvas with tight padding.
 *
 * Usage: node scripts/generate-favicon.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "assets", "standout-favicon.png");
const APP_DIR = path.join(ROOT, "src", "app");

const OUTPUTS = [
  {
    path: path.join(APP_DIR, "icon.png"),
    size: 512,
    label: "icon.png (main favicon)",
  },
  {
    path: path.join(APP_DIR, "apple-icon.png"),
    size: 180,
    label: "apple-icon.png (iOS home screen)",
  },
];

async function run() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Source not found: ${SOURCE}`);
    process.exit(1);
  }

  for (const { path: outPath, size, label } of OUTPUTS) {
    await sharp(SOURCE)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(outPath);

    const bytes = fs.statSync(outPath).size;
    console.log(`  ok  ${label.padEnd(40)} ${size}x${size}  ${kb(bytes)}`);
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
