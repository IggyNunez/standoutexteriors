"use client";

import { useEffect, useRef } from "react";

/**
 * Animated canvas wave background, brand colours only.
 * Navy base (#040f1e) with green (#00A651) and teal (#7ecfff) accents.
 * Runs at half resolution (SCALE=2) for perf; smoothly interpolated.
 */
export default function FooterWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SCALE = 3; // render at 1/3 res, upscale, very low CPU
    let width = 0, height = 0;
    let imageData: ImageData;
    let data: Uint8ClampedArray;
    let rafId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      width = Math.floor(canvas.width / SCALE);
      height = Math.floor(canvas.height / SCALE);
      imageData = ctx.createImageData(width, height);
      data = imageData.data;
    };

    // Pre-bake trig tables for speed
    const TABLE_SIZE = 1024;
    const SIN = new Float32Array(TABLE_SIZE);
    const COS = new Float32Array(TABLE_SIZE);
    for (let i = 0; i < TABLE_SIZE; i++) {
      const a = (i / TABLE_SIZE) * Math.PI * 2;
      SIN[i] = Math.sin(a);
      COS[i] = Math.cos(a);
    }
    const fsin = (x: number) => SIN[((Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * TABLE_SIZE)) & (TABLE_SIZE - 1))];
    const fcos = (x: number) => COS[((Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * TABLE_SIZE)) & (TABLE_SIZE - 1))];

    const startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) * 0.001;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const ux = (2 * x - width) / height;
          const uy = (2 * y - height) / height;

          let a = 0, d = 0;
          for (let i = 0; i < 3; i++) {
            a += fcos(i - d + time * 0.35 - a * ux);
            d += fsin(i * uy + a);
          }
          const wave = (fsin(a) + fcos(d)) * 0.5; // -1..1

          // Base: very dark navy, slight variation
          const base = 0.04 + 0.03 * fcos(ux + uy + time * 0.2);

          // Green accent (#00A651 → 0, 0.65, 0.32)
          const green = Math.max(0, 0.12 * fsin(a * 1.2 + time * 0.25) + 0.06 * wave);

          // Teal/cyan accent (#7ecfff → 0.49, 0.81, 1.0)
          const teal  = Math.max(0, 0.10 * fcos(d * 1.5 + time * 0.15) + 0.04 * wave);

          const intensity = 0.55 + 0.45 * wave;

          // Blend channels: navy base + green + teal
          const r = Math.max(0, Math.min(1, base + teal * 0.49)) * intensity;
          const g = Math.max(0, Math.min(1, base + green * 0.65 + teal * 0.81)) * intensity;
          const b = Math.max(0, Math.min(1, base + green * 0.32 + teal * 1.0 + 0.05)) * intensity;

          const idx = (y * width + x) * 4;
          data[idx]     = r * 255;
          data[idx + 1] = g * 255;
          data[idx + 2] = b * 255;
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      // Upscale to full canvas with smoothing off for crisp pixel art style
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "low";
      ctx.drawImage(canvas, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

      rafId = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
      aria-hidden
    />
  );
}
