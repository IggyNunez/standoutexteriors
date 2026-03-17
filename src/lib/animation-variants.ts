import type { Variants, Transition } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Scroll Reveal ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ── Card Hover ──
export const cardHover: Variants = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.4, ease: EASE_OUT } },
};

export const cardHoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -8, scale: 1.02, transition: { duration: 0.4, ease: EASE_OUT } },
};

// ── Water Droplet Drifts ──
export const driftVariants = {
  1: {
    x: [0, 60, 20, -40, 0],
    y: [0, -30, -60, -20, 0],
    rotate: [0, 8, -5, 10, 0],
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" } as Transition,
  },
  2: {
    x: [0, -50, -80, -20, 0],
    y: [0, 40, 10, -30, 0],
    rotate: [0, -10, 6, -8, 0],
    transition: { duration: 22, repeat: Infinity, ease: "easeInOut" } as Transition,
  },
  3: {
    x: [0, 40, -30, 20, 0],
    y: [0, 50, 70, 20, 0],
    rotate: [0, 12, -6, 4, 0],
    transition: { duration: 25, repeat: Infinity, ease: "easeInOut" } as Transition,
  },
};

// ── Bouncing Arrow ──
export const bouncingArrow = {
  y: [0, 8, 0],
  transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const },
};
