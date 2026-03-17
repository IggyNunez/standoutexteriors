"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { WaveTop, WaveBottom } from "@/components/ui/WaveDivider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF6B35" className="shrink-0">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ReviewCard({ t, index }: { t: (typeof TESTIMONIALS)[number]; index: number }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px) saturate(1.6)",
        WebkitBackdropFilter: "blur(20px) saturate(1.6)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large watermark quote */}
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 20,
          fontFamily: "Georgia, serif",
          fontSize: 120,
          lineHeight: 1,
          color: "rgba(74,154,240,0.12)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>

      {/* Subtle top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, rgba(126,207,255,${0.4 + index * 0.1}), rgba(255,107,53,0.4), transparent)`,
          borderRadius: "20px 20px 0 0",
        }}
      />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, si) => <StarIcon key={si} />)}
      </div>

      {/* Quote text */}
      <p className="italic text-[0.95rem] leading-[1.85] text-white/85 mb-7 flex-1 relative z-[1]">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div
        className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Avatar — water gradient bubble */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2B7DE9, #7ecfff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(43,125,233,0.4)",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "1rem",
              fontWeight: 900,
              color: "#fff",
            }}
          >
            {t.name.charAt(0)}
          </span>
        </div>

        <div>
          <strong className="text-[0.88rem] font-bold text-white block">
            {t.name}
          </strong>
          <span className="text-[0.72rem] text-white/45 tracking-wide">
            {t.location}
          </span>
        </div>

        {/* Google G mark */}
        <div className="ml-auto">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="rgba(255,255,255,0.25)"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="rgba(255,255,255,0.20)"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="rgba(255,255,255,0.18)"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="rgba(255,255,255,0.22)"/>
          </svg>
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
    <section
      id="reviews"
      ref={ref}
      className="water-shimmer-dark relative py-28 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(175deg, #061e38 0%, #0A2E5C 50%, #0d3870 100%)" }}
    >
      <WaveTop fill="#f7fafc" />
      <WaveBottom fill="#f7fafc" />

      {/* Extra caustic shimmer blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 600, height: 300, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(43,125,233,0.12) 0%, transparent 70%)",
          animation: "waterDrift 14s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "8%",
          width: 500, height: 250, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(126,207,255,0.09) 0%, transparent 70%)",
          animation: "waterDrift2 18s ease-in-out infinite",
        }} />
      </div>

      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ease: EASE }}
          >
            <span
              className="text-[0.65rem] font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full inline-flex items-center gap-2"
              style={{
                background: "rgba(126,207,255,0.12)",
                border: "1px solid rgba(126,207,255,0.25)",
                color: "rgba(160,225,255,0.9)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              Happy Customers
            </span>
          </motion.div>

          <motion.h2
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] uppercase font-[900] text-white leading-[1] mb-5 tracking-[0.03em]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: EASE }}
          >
            What the Neighborhood&apos;s Saying
          </motion.h2>

          <motion.div
            className="w-16 h-[2px] mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, transparent, #FF6B35, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />

          <motion.p
            className="text-[0.9rem] text-white/50"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Real reviews from real Lake Norman families.
          </motion.p>
        </div>

        {/* Desktop: 3-column glassmorphic grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {reviews.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: EASE }}
            >
              <ReviewCard t={t} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: swipe carousel */}
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
                  if (info.offset.x < -50 && current < reviews.length - 1) setCurrent(current + 1);
                  else if (info.offset.x > 50 && current > 0) setCurrent(current - 1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <ReviewCard t={reviews[current]} index={current} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-orange-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust stats — glassmorphic pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, ease: EASE }}
        >
          {[
            { val: "500+", label: "Properties Cleaned" },
            { val: "5.0★", label: "Average Rating" },
            { val: "100%", label: "Satisfaction" },
            { val: "5+",   label: "Years Experience" },
          ].map((b, i) => (
            <div
              key={b.label}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
                borderRadius: 9999,
                padding: "12px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: i % 2 === 0 ? "#FF6B35" : "#7ecfff",
                  lineHeight: 1,
                }}
              >
                {b.val}
              </span>
              <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/45">
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
