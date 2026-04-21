"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { m as motion, useInView, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ShotCategory = "House Wash" | "Roof & Gutters" | "Windows" | "Driveway";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  category: ShotCategory;
  /** Orientation hint for masonry - "tall" spans 2 rows on desktop */
  orientation: "tall" | "wide" | "square";
};

/* Curated order, leads with strongest/most action-y shots */
const SHOTS: Shot[] = [
  {
    src: "/assets/team/ridge-house-washing-brick-side.webp",
    alt: "Ridge Curwood soft washing a brick home in Denver NC",
    caption: "Soft washing a brick home in Denver, NC",
    category: "House Wash",
    orientation: "tall",
  },
  {
    src: "/assets/team/ridge-driveway-surface-cleaner-flex.webp",
    alt: "Ridge flexing next to a surface cleaner after a driveway wash",
    caption: "Driveway surface cleaning, dramatic before/after",
    category: "Driveway",
    orientation: "wide",
  },
  {
    src: "/assets/team/ridge-gutter-cleaning-bucket.webp",
    alt: "Ridge hand-cleaning gutters from a ladder",
    caption: "Hand-scooping gutters the right way",
    category: "Roof & Gutters",
    orientation: "tall",
  },
  {
    src: "/assets/team/ridge-window-cleaning-squeegee-inside.webp",
    alt: "Ridge using a squeegee on a large window, seen from inside",
    caption: "Squeegee-clean windows, inside & out",
    category: "Windows",
    orientation: "wide",
  },
  {
    src: "/assets/team/ridge-driveway-surface-cleaner-neighborhood.webp",
    alt: "Ridge operating a surface cleaner in a suburban driveway",
    caption: "Rotating surface cleaner on concrete",
    category: "Driveway",
    orientation: "square",
  },
  {
    src: "/assets/team/ridge-gutter-cleaning-ladder-roof.webp",
    alt: "Ridge on a ladder cleaning gutters wearing branded gear",
    caption: "Fully branded, fully insured",
    category: "Roof & Gutters",
    orientation: "square",
  },
  {
    src: "/assets/team/ridge-window-cleaning-detail.webp",
    alt: "Close detail of Ridge squeegeeing a lakeside window",
    caption: "Detail work on every pass",
    category: "Windows",
    orientation: "tall",
  },
  {
    src: "/assets/team/ridge-driveway-spray-rinse.webp",
    alt: "Ridge rinsing a driveway clean with a pressure wand",
    caption: "Final rinse, concrete back to original",
    category: "Driveway",
    orientation: "wide",
  },
  {
    src: "/assets/team/ridge-window-cleaning-lakeside.webp",
    alt: "Ridge cleaning windows of a lakeside home",
    caption: "Lake Norman lakefront homes",
    category: "Windows",
    orientation: "square",
  },
  {
    src: "/assets/team/ridge-ladder-gutter-upward.webp",
    alt: "Ridge at the top of a tall ladder, seen from below",
    caption: "No ladder too tall",
    category: "Roof & Gutters",
    orientation: "square",
  },
  {
    src: "/assets/team/ridge-concrete-spot-cleaning.webp",
    alt: "Ridge spot-cleaning concrete with a pressure wand",
    caption: "Spot-treating stubborn stains",
    category: "Driveway",
    orientation: "tall",
  },
  {
    src: "/assets/team/ridge-window-cleaning-portrait.webp",
    alt: "Portrait of Ridge mid window cleaning",
    caption: "Ridge on the job",
    category: "Windows",
    orientation: "square",
  },
];

const CATEGORIES: ("All" | ShotCategory)[] = [
  "All",
  "House Wash",
  "Roof & Gutters",
  "Windows",
  "Driveway",
];

export default function InActionGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    filter === "All" ? SHOTS : SHOTS.filter((s) => s.category === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? 0 : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? 0 : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // Prevent body scroll while lightbox open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, closeLightbox, next, prev]);

  return (
    <section
      ref={ref}
      className="relative bg-[#f5f7fa] py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0A2E5C 1px, transparent 1px), linear-gradient(90deg, #0A2E5C 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
              style={{
                background: "rgba(0,166,81,0.08)",
                border: "1px solid rgba(0,166,81,0.2)",
                color: "#00A651",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
              Ridge On The Job
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em] mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            In&nbsp;Action,
            <br />
            <span style={{ color: "#00A651" }}>Not In Stock Photos.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-[0.95rem] text-gray-500 max-w-[560px] mx-auto leading-relaxed"
          >
            Every photo here is Ridge on a real job across the Lake Norman area.
            No stock photography. Just the real work we&apos;re proud to put our
            name on.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const active = cat === filter;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="text-[0.7rem] font-bold tracking-[0.1em] uppercase px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  background: active ? "#0A2E5C" : "white",
                  color: active ? "white" : "#0A2E5C",
                  border: active
                    ? "1px solid #0A2E5C"
                    : "1px solid rgba(10,46,92,0.15)",
                  boxShadow: active
                    ? "0 6px 14px rgba(10,46,92,0.2)"
                    : "0 1px 2px rgba(10,46,92,0.04)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Masonry grid. CSS columns */}
        <div
          className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5"
          style={{ columnFill: "balance" }}
        >
          {filtered.map((shot, i) => (
            <motion.button
              key={shot.src}
              type="button"
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.4 + i * 0.04,
                duration: 0.6,
                ease: EASE,
              }}
              className="group relative mb-4 md:mb-5 block w-full break-inside-avoid rounded-xl overflow-hidden cursor-pointer"
              style={{
                boxShadow:
                  "0 1px 3px rgba(10,46,92,0.06), 0 4px 20px rgba(10,46,92,0.08)",
                background: "white",
              }}
              aria-label={`View larger: ${shot.caption}`}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio:
                    shot.orientation === "tall"
                      ? "3/4"
                      : shot.orientation === "wide"
                        ? "4/3"
                        : "1/1",
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Bottom gradient + caption reveal */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,46,92,0.85) 0%, rgba(10,46,92,0.2) 45%, transparent 70%)",
                    opacity: 0.7,
                  }}
                />

                <div className="absolute top-3 left-3">
                  <span className="text-[0.55rem] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-white/95 text-blue-900 backdrop-blur-sm">
                    {shot.category}
                  </span>
                </div>

                <div
                  className="absolute inset-x-0 bottom-0 p-4 text-left translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                >
                  <p className="text-[0.78rem] font-semibold text-white leading-tight">
                    {shot.caption}
                  </p>
                </div>

                {/* Zoom indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      color: "#0A2E5C",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-[0.75rem] text-gray-400 italic">
            See more work on our{" "}
            <a
              href="/before-after"
              className="font-bold not-italic underline decoration-2 underline-offset-4"
              style={{ color: "#00A651" }}
            >
              Before &amp; After page
            </a>
          </p>
        </motion.div>
      </div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(6, 30, 56, 0.95)" }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Close"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Previous"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors z-10"
              aria-label="Next"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative max-w-[92vw] max-h-[85vh] w-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].alt}
                  width={1600}
                  height={1200}
                  className="rounded-lg object-contain max-h-[80vh] w-auto h-auto"
                  priority
                />
              </div>
              <div className="text-center mt-4 px-4">
                <p className="text-white/90 text-[0.85rem] md:text-[0.95rem] font-semibold">
                  {filtered[lightbox].caption}
                </p>
                <p className="text-white/50 text-[0.7rem] mt-1">
                  {lightbox + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
