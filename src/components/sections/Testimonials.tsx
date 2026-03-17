"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B35" className="shrink-0">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ReviewCard({ t, className = "" }: { t: (typeof TESTIMONIALS)[number]; className?: string }) {
  return (
    <div
      className={`relative bg-white rounded-[4px] p-8 border-l-[3px] border-orange-500 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col ${className}`}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, si) => (
          <StarIcon key={si} />
        ))}
      </div>

      <p className="italic text-[0.95rem] leading-[1.8] text-gray-800 mb-6 flex-1">
        &ldquo;{t.text}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-5 border-t border-blue-900/10">
        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center shrink-0">
          <span className="font-[family-name:var(--font-display)] text-[0.9rem] font-bold text-white">
            {t.name.charAt(0)}
          </span>
        </div>
        <div>
          <strong className="text-[0.85rem] font-bold text-blue-900 block">
            {t.name}
          </strong>
          <span className="text-[0.75rem] text-gray-400">
            {t.location}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reviews = TESTIMONIALS.slice(0, 3);
  const [current, setCurrent] = useState(0);

  return (
    <section id="reviews" className="water-shimmer-light relative py-24 md:py-32 bg-canvas overflow-hidden" ref={ref}>
      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-eyebrow text-blue-500">Happy Customers</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            What the Neighborhood&apos;s Saying
          </motion.h2>
          <motion.div
            className="w-16 h-[2px] bg-orange-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p
            className="text-[0.95rem] text-gray-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Real reviews from real Lake Norman families.
          </motion.p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reviews.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <ReviewCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Swipe carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 && current < reviews.length - 1) {
                    setCurrent(current + 1);
                  } else if (info.offset.x > 50 && current > 0) {
                    setCurrent(current - 1);
                  }
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <ReviewCard t={reviews[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-orange-500 w-6"
                    : "bg-blue-900/20 hover:bg-blue-900/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {[
            { val: "500+", label: "Properties Cleaned" },
            { val: "5.0\u2605", label: "Average Rating" },
            { val: "100%", label: "Satisfaction" },
            { val: "5+", label: "Years Experience" },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-1">
              <span className="font-[family-name:var(--font-display)] text-[1.6rem] font-bold text-orange-500">
                {b.val}
              </span>
              <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-gray-400">
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
