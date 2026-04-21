"use client";

import { useRef } from "react";
import Link from "next/link";
import { m as motion, useInView } from 'framer-motion';
import { PHONE, PHONE_HREF, COMPANY_NAME } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Soft Washing",
    desc: "Gentle, effective cleaning for exterior building surfaces. Safe for painted masonry, EIFS, and metal panels.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Concrete Cleaning",
    desc: "Remove oil stains, tire marks, and embedded grime from parking lots, sidewalks, and building entryways.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    title: "Gum Removal",
    desc: "Eliminate unsightly gum from high-traffic sidewalks, entryways, and outdoor dining areas.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    ),
    title: "Dumpster Pad Cleaning",
    desc: "Keep compactor and dumpster areas clean and sanitary. Eliminates odors, grease, and bacterial buildup.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Brick Cleaning",
    desc: "Revive and restore brick exteriors, removing efflorescence, carbon staining, and biological growth.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Window Cleaning",
    desc: "Streak-free window cleaning for a polished, professional appearance that makes the right first impression.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7" />
        <path d="M3 9v3c0 5 9 9 9 9s9-4 9-9V9" />
      </svg>
    ),
    title: "Gutter Cleaning",
    desc: "Ensure proper water drainage with thoroughly cleaned gutters and downspouts. Protects your building envelope.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
    title: "Storefront Cleaning",
    desc: "First impressions count. We clean facades, awnings, and entryways so your business always looks sharp.",
  },
];

const WHY_US = [
  {
    title: "Thorough & Reliable",
    desc: "Professional pressure washing that effectively cleans and restores commercial properties. Every job is completed with attention to detail.",
    color: "#00A651",
  },
  {
    title: "Safe & Effective",
    desc: "Cleaning solutions tough on grime but safe for your building materials, landscaping, and the environment.",
    color: "#2B7DE9",
  },
  {
    title: "Local Expertise",
    desc: "Denver-based and built in NC. We understand the specific needs of commercial properties in our region.",
    color: "#7ecfff",
  },
  {
    title: "Transparent Pricing",
    desc: "Free estimates with no hidden fees. You know exactly what to expect before we start. No surprises.",
    color: "#00A651",
  },
];

export default function CommercialContent() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const whyRef = useRef(null);
  const trustRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "0px 0px -80px 0px" });
  const whyInView = useInView(whyRef, { once: true, margin: "0px 0px -80px 0px" });
  const trustInView = useInView(trustRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO, dark navy with water shimmer
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-[120px] pb-24 min-[1200px]:pt-[160px] min-[1200px]:pb-32"
        style={{ background: "linear-gradient(160deg, #061e38 0%, #0A2E5C 55%, #0d3870 100%)" }}
      >
        {/* Water shimmer blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: "absolute", top: "10%", left: "5%",
            width: 600, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(43,125,233,0.15) 0%, transparent 70%)",
            animation: "waterDrift 14s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", right: "5%",
            width: 500, height: 250, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(126,207,255,0.1) 0%, transparent 70%)",
            animation: "waterDrift2 18s ease-in-out infinite",
          }} />
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0,35 C240,65 480,5 720,35 C960,65 1200,10 1440,30 L1440,70 L0,70 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-[5] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="max-w-[760px]">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6"
            >
              <span
                className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#7ecfff",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Commercial Services
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
              className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.92] tracking-[0.02em] mb-6"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
            >
              Keep Your Business<br />
              <span style={{ color: "#00A651" }}>Looking Its Best.</span>
            </motion.h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-[0.95rem] leading-[1.8] text-white/65 mb-4 max-w-[560px]"
            >
              {COMPANY_NAME} provides professional cleaning solutions for commercial property owners across the Lake Norman area. Fully insured and offering workman&apos;s comp. Certificates of Insurance (COIs) available upon request.
            </motion.p>

            {/* Trust pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {["Fully Insured", "Workman's Comp", "COI Available", "Free Estimates"].map((t) => (
                <span
                  key={t}
                  className="text-[0.62rem] font-bold tracking-[0.06em] px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,53,0.4)] transition-all duration-300"
              >
                Get A Free Estimate
              </Link>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 px-6 py-3.5 text-white/80 text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-white/20 rounded-full hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {PHONE}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════ */}
      <section ref={servicesRef} className="relative bg-white py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(43,125,233,0.04) 0%, transparent 70%)" }}
        />

        <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4"
            >
              <span
                className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                style={{
                  background: "rgba(74,154,240,0.08)",
                  border: "1px solid rgba(74,154,240,0.2)",
                  color: "#2B7DE9",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                What We Clean
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em] mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Our Commercial<br />
              <span style={{ color: "#00A651" }}>Services.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-[0.9rem] text-gray-400 max-w-[480px] mx-auto leading-relaxed"
            >
              From storefronts to dumpster pads, we handle every surface your business needs clean.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                className="group p-6 rounded-2xl border border-blue-900/8 bg-white hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(43,125,233,0.1)] hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: "0 2px 12px rgba(10,46,92,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:text-white transition-colors duration-300"
                  style={{
                    background: "rgba(43,125,233,0.08)",
                  }}
                >
                  {s.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[1rem] uppercase text-blue-900 mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[0.78rem] text-gray-500 leading-[1.7]">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US, dark panel
      ══════════════════════════════════════════ */}
      <section
        ref={whyRef}
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #061e38 0%, #0A2E5C 100%)" }}
      >
        {/* Top wave */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none rotate-180">
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginTop: "-1px" }}>
            <path d="M0,35 C240,65 480,5 720,35 C960,65 1200,10 1440,30 L1440,70 L0,70 Z" fill="white" />
          </svg>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
            <path d="M0,35 C360,60 720,10 1080,40 C1260,55 1380,20 1440,35 L1440,70 L0,70 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-[5] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.95] tracking-[0.02em] mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Why Choose Stand Out<br />
              <span style={{ color: "#00A651" }}>for Commercial Cleaning.</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={whyInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-16 h-[2px] mx-auto"
              style={{ background: "#00A651", transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-2 h-8 rounded-full mb-4"
                  style={{ background: w.color }}
                />
                <h3 className="font-[family-name:var(--font-display)] text-[1.05rem] uppercase text-white mb-2">
                  {w.title}
                </h3>
                <p className="text-[0.8rem] text-white/50 leading-[1.7]">
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BAND
      ══════════════════════════════════════════ */}
      <section ref={trustRef} className="relative bg-white py-16 overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(10,46,92,0.03), rgba(43,125,233,0.06))",
              border: "1px solid rgba(10,46,92,0.08)",
            }}
          >
            <div className="text-center md:text-left">
              <h3
                className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-tight mb-2"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                Ready to make the right<br />
                <span style={{ color: "#00A651" }}>first impression?</span>
              </h3>
              <p className="text-[0.85rem] text-gray-500">
                Contact us to schedule your commercial cleaning or request a free estimate.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,53,0.35)] transition-all duration-300"
              >
                Get A Free Estimate
              </Link>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 px-6 py-3.5 text-blue-900 text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-blue-900/20 rounded-full hover:border-blue-900/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
