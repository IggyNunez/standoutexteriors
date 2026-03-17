"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PHONE, PHONE_HREF, CTA_STATS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CTAContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-blue-900 text-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-300/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4"
        >
          <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-orange-400">
            Ready To Get Started?
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] uppercase text-white leading-none mb-4"
        >
          Get Your Free Estimate Today
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-16 h-[2px] bg-orange-500 mx-auto mb-6"
          style={{ transformOrigin: "left" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[0.95rem] text-white/60 leading-relaxed max-w-[520px] mx-auto mb-10"
        >
          Transform your property with Denver&apos;s most trusted pressure washing team.
          Contact us for a free, no-obligation estimate.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/contact"
            className="px-10 py-4 bg-orange-500 text-white text-[0.75rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-white/20 hover:bg-orange-600 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,107,53,0.4)] transition-all duration-300"
          >
            Request Free Estimate
          </Link>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 px-8 py-4 text-white/90 text-[0.75rem] font-bold tracking-[0.06em] uppercase border-2 border-white/30 rounded-full hover:border-white/60 hover:-translate-y-1 transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call {PHONE}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {CTA_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: EASE }}
              className="text-center"
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.2rem)] text-white leading-none">
                {stat.value}
              </div>
              <div className="text-[0.68rem] text-white/40 tracking-wide uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
