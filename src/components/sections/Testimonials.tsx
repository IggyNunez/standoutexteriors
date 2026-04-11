"use client";

import { useRef } from "react";
import { m as motion, useInView } from 'framer-motion';
import { WaveTop, WaveBottom } from "@/components/ui/WaveDivider";
import FeaturedReview from "@/components/sections/FeaturedReview";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

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
            style={{ background: "linear-gradient(90deg, transparent, #00A651, transparent)" }}
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

        {/* Featured review carousel */}
        <FeaturedReview />

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
                  color: i % 2 === 0 ? "#00A651" : "#7ecfff",
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
