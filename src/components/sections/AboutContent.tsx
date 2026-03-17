"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PHONE, PHONE_HREF, COMPANY_NAME } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TRUST_PILLS = [
  { icon: "💧", label: "Soft & Pressure Wash" },
  { icon: "🛡️", label: "Fully Insured"        },
  { icon: "⭐", label: "5-Star Rated"          },
  { icon: "🏠", label: "500+ Homes Cleaned"    },
];

const VALUES = [
  {
    title: "Honest Work",
    desc: "We show up on time, do the job right, and leave your property looking better than we found it.",
  },
  {
    title: "Right Technique",
    desc: "Soft wash for roofs & siding, pressure wash for concrete & stone — we know the difference.",
  },
  {
    title: "Guaranteed Results",
    desc: "We don't leave until you're satisfied. Period.",
  },
];

export default function AboutContent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY   = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const blobY  = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">

      {/* ══════════════════════════════════════════
          DESKTOP — Split layout
      ══════════════════════════════════════════ */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[90vh]">

        {/* ── Left panel — dark ocean + video ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(160deg, #061e38 0%, #0A2E5C 60%, #0d3870 100%)" }}
        >
          {/* Parallax video, dimmed */}
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-25">
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Water shimmer blobs */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
            <div style={{
              position: "absolute", top: "15%", left: "10%",
              width: 400, height: 200, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(43,125,233,0.18) 0%, transparent 70%)",
              animation: "waterDrift 12s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", bottom: "20%", right: "5%",
              width: 350, height: 180, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(126,207,255,0.12) 0%, transparent 70%)",
              animation: "waterDrift2 16s ease-in-out infinite",
            }} />
          </motion.div>

          {/* Right-side wave mask */}
          <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
            style={{
              background: "linear-gradient(to right, transparent, white)",
              zIndex: 10,
            }}
          />

          {/* Content on the dark panel */}
          <div className="relative z-[5] flex flex-col justify-between h-full px-[clamp(40px,5vw,72px)] py-20">

            {/* Big decorative quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1, ease: EASE }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(80px, 12vw, 140px)",
                  lineHeight: 1,
                  color: "rgba(126,207,255,0.15)",
                  userSelect: "none",
                  marginBottom: -16,
                }}
              >
                &ldquo;
              </div>
              <p
                className="italic text-white/80 leading-[1.7]"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", maxWidth: 420 }}
              >
                There&apos;s a difference between a job done and a job done right.
                We built this company to be the latter — every single time.
              </p>
              <div className="mt-6">
                <p className="italic text-[1.1rem] text-cyan-300 font-semibold">Ridge Curwood</p>
                <p className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-white/35 mt-0.5">
                  Founder & Owner, {COMPANY_NAME}
                </p>
              </div>
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              className="grid grid-cols-2 gap-3 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            >
              {[
                { val: "500+", label: "Properties Cleaned" },
                { val: "5.0★", label: "Google Rating"       },
                { val: "5+",   label: "Years Experience"    },
                { val: "100%", label: "Satisfaction Rate"   },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 16,
                    padding: "18px 20px",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                      fontWeight: 900,
                      color: i % 2 === 0 ? "#FF6B35" : "#7ecfff",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-white/40 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Right panel — white content ── */}
        <div className="flex flex-col justify-center px-[clamp(40px,5vw,80px)] py-24 bg-white">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, ease: EASE }}
            className="mb-5"
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
              Our Story
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] mb-6 tracking-[0.02em]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          >
            Quality You Can See,<br />
            <span className="text-orange-500">Service You Can Trust.</span>
          </motion.h2>

          <motion.div
            className="w-16 h-[2px] bg-orange-500 mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Body copy */}
          <motion.p
            className="text-[0.95rem] leading-[1.8] text-gray-500 mb-8 max-w-[480px]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Founded by Ridge Curwood, {COMPANY_NAME} was built on a simple principle:
            deliver results that truly stand out.{" "}
            <span className="text-blue-900 font-semibold">There&apos;s a difference.</span>{" "}
            What started as a passion for transforming properties has grown into one of
            the most trusted exterior cleaning companies in the Lake Norman area.
          </motion.p>

          {/* Values list */}
          <motion.div
            className="space-y-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.8 }}
          >
            {VALUES.map((v, i) => (
              <div key={v.title} className="flex gap-4 items-start">
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: "linear-gradient(135deg, #2B7DE9, #7ecfff)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(43,125,233,0.25)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.82rem] font-extrabold tracking-[0.04em] text-blue-900 uppercase mb-0.5">{v.title}</p>
                  <p className="text-[0.82rem] leading-[1.6] text-gray-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trust pills */}
          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            {TRUST_PILLS.map((p) => (
              <span
                key={p.label}
                className="text-[0.68rem] font-bold tracking-[0.06em] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{
                  background: "rgba(10,46,92,0.05)",
                  border: "1px solid rgba(10,46,92,0.12)",
                  color: "#0A2E5C",
                }}
              >
                <span>{p.icon}</span> {p.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
          >
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
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
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE — Stacked layout
      ══════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* Dark video panel */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: "55vw", background: "linear-gradient(160deg, #061e38 0%, #0A2E5C 100%)" }}
        >
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20">
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Bottom wave into white */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
            <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
              <path d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-[5] px-6 pt-12 pb-16">
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 72,
                lineHeight: 1,
                color: "rgba(126,207,255,0.18)",
                marginBottom: -8,
              }}
            >
              &ldquo;
            </div>
            <p className="italic text-white/75 text-[1rem] leading-[1.7] max-w-[340px]">
              There&apos;s a difference between a job done and a job done right.
            </p>
            <p className="italic text-cyan-300 text-[0.9rem] mt-3 font-semibold">— Ridge Curwood</p>

            {/* Mini stats row */}
            <div className="flex gap-3 mt-6">
              {[{ val: "500+", label: "Homes" }, { val: "5.0★", label: "Rating" }, { val: "100%", label: "Satisfaction" }].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 900,
                    color: i % 2 === 0 ? "#FF6B35" : "#7ecfff",
                    lineHeight: 1,
                  }}>
                    {s.val}
                  </div>
                  <div className="text-[0.55rem] font-bold tracking-[0.1em] uppercase text-white/35 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* White content panel */}
        <div className="px-6 pb-16 -mt-2 bg-white">
          <span
            className="text-[0.6rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4"
            style={{
              background: "rgba(74,154,240,0.08)",
              border: "1px solid rgba(74,154,240,0.2)",
              color: "#2B7DE9",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Our Story
          </span>

          <h2
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] mb-4 tracking-[0.02em]"
            style={{ fontSize: "clamp(1.9rem, 8vw, 2.6rem)" }}
          >
            Quality You Can See,<br />
            <span className="text-orange-500">Service You Can Trust.</span>
          </h2>

          <div className="w-12 h-[2px] bg-orange-500 mb-5" />

          <p className="text-[0.88rem] leading-[1.8] text-gray-500 mb-6">
            Founded by Ridge Curwood, {COMPANY_NAME} was built on a simple principle:
            deliver results that truly stand out.{" "}
            <span className="text-blue-900 font-semibold">There&apos;s a difference.</span>{" "}
            What started as a passion has grown into one of the most trusted exterior
            cleaning companies in the Lake Norman area.
          </p>

          {/* Values */}
          <div className="space-y-3 mb-7">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-3 items-start">
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, #2B7DE9, #7ecfff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.75rem] font-extrabold tracking-[0.04em] text-blue-900 uppercase">{v.title}</p>
                  <p className="text-[0.78rem] leading-[1.6] text-gray-500">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 mb-7">
            {TRUST_PILLS.map((p) => (
              <span
                key={p.label}
                className="text-[0.62rem] font-bold tracking-[0.06em] px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{
                  background: "rgba(10,46,92,0.05)",
                  border: "1px solid rgba(10,46,92,0.12)",
                  color: "#0A2E5C",
                }}
              >
                <span>{p.icon}</span> {p.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="px-6 py-3 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-600 transition-all duration-300">
              Get A Free Estimate
            </Link>
            <a href={PHONE_HREF} className="flex items-center gap-2 px-5 py-3 text-blue-900 text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-blue-900/20 rounded-full transition-all duration-300">
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
