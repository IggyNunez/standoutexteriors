/**
 * Optimize the LCP-critical assets:
 *  1. hero-bg.jpg → hero-bg.webp at lower quality (LCP image, hidden by overlay)
 *  2. logo-transparent.png → resize down + smaller PNG
 *
 * The hero image is darkened by gradient overlays so it tolerates aggressive
 * compression. The logo is shown at most 90×43 px on mobile and ~130×62 in
 * the nav, so a 256-wide source is ample.
 *
 * Usage: node scripts/optimize-critical.mjs
 */
import { stat } from "node:fs/promises";
import sharp from "sharp";

const human = (b) => (b / 1024).toFixed(1) + " KB";

async function optimize(input, output, fn) {
  const before = (await stat(input)).size;
  await fn();
  const after = (await stat(output)).size;
  console.log(
    `${input} → ${output}: ${human(before)} → ${human(after)} ` +
      `(-${Math.round((1 - after / before) * 100)}%)`
  );
}

async function main() {
  // 1. Hero background — convert to WebP, resize to 1920w max
  await optimize(
    "public/assets/hero-bg.jpg",
    "public/assets/hero-bg.webp",
    () =>
      sharp("public/assets/hero-bg.jpg")
        .rotate()
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 72, effort: 6 })
        .toFile("public/assets/hero-bg.webp")
  );

  // 2. Logo — keep PNG for transparency, but resize to 320w (covers retina nav)
  //    Display widths: 90, 130 (CSS px) → 260 px @ 2x DPR is plenty.
  await optimize(
    "public/assets/logo-transparent.png",
    "public/assets/logo-transparent.png",
    () =>
      sharp("public/assets/logo-transparent.png")
        .rotate()
        .resize({ width: 320, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toFile("public/assets/logo-transparent.tmp.png")
        .then(() =>
          import("node:fs/promises").then((fs) =>
            fs.rename(
              "public/assets/logo-transparent.tmp.png",
              "public/assets/logo-transparent.png"
            )
          )
        )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
