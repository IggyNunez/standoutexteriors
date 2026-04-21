"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * LazyMotion provider for the whole app.
 *
 * This is the single biggest framer-motion performance win: instead of every
 * `motion.X` dragging in the full ~70 KB gzipped runtime (which handles
 * SVG path morphing, drag, gestures, variants, exit animations, etc.), we
 * opt into the "domAnimation" feature bundle only (~20 KB gzipped) which
 * covers:
 *   - CSS transforms and opacity tweens
 *   - Variants and keyframes
 *   - Scroll-linked values (useScroll, useTransform)
 *   - AnimatePresence exit animations
 *
 * Every component in the tree must use `m.X` instead of `motion.X`, if a
 * component imports `motion` directly it will crash with a helpful
 * "strict mode" error in dev. This is intentional, it stops the full
 * runtime from sneaking back in.
 *
 * The extra `<div>` wrapper is necessary because LazyMotion only provides
 * context to its descendants. It has no DOM output of its own so there is
 * zero layout impact, but it does break server-only children from being
 * rendered as server components, that's fine for us since every animated
 * section is already a "use client" island.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
