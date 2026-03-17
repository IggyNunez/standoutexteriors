"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY_NAME, TAGLINE, PHONE, PHONE_HREF, HERO_STATS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: imgScale }}>
        <Image
          src="/assets/hero-bg.jpg"
          alt="Professional pressure washing in Denver NC"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
      </motion.div>

      {/* Water droplet decorations */}
      <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-blue-300/10 rounded-full blur-3xl pointer-events-none hidden md:block" />
      <div className="absolute bottom-1/4 left-[10%] w-48 h-48 bg-blue-500/8 rounded-full blur-3xl pointer-events-none hidden md:block" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] pt-[140px] md:pt-[clamp(120px,18svh,200px)] pb-12"
        style={{ y: textY }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-blue-300" />
          <span className="text-[0.68rem] font-bold tracking-[0.2em] uppercase text-blue-300">
            {TAGLINE}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="font-[family-name:var(--font-display)] text-[clamp(48px,9vw,96px)] leading-[0.95] uppercase text-white mb-6 max-w-[800px]"
        >
          Make Your Property{" "}
          <span className="text-orange-500">Stand Out</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="text-[clamp(0.9rem,1.8vw,1.1rem)] text-white/70 leading-relaxed max-w-[520px] mb-10"
        >
          Professional pressure washing & soft washing for homes and businesses
          across the Lake Norman area. Free estimates — call today.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-white/20 hover:bg-orange-600 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,107,53,0.4)] transition-all duration-300"
          >
            Get A Free Estimate
          </Link>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 px-6 py-4 text-white/90 text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-white/30 rounded-full hover:border-white/60 hover:-translate-y-1 transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            {PHONE}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          className="flex flex-wrap gap-8 md:gap-12"
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: EASE }}
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,40px)] text-white leading-none">
                {stat.value}
              </div>
              <div className="text-[0.68rem] text-white/50 tracking-wide uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] text-white/40 tracking-[0.15em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
