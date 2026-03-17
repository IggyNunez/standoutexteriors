"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PHONE, PHONE_HREF, CTA_STATS } from "@/lib/constants";

export default function CTAContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section id="contact" className="water-shimmer-dark relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,46,92,0.94) 0%, rgba(10,30,60,0.92) 100%)",
        }}
      />

      <div className="relative z-[2] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-[800px] mx-auto"
        >
          <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-orange-400 block mb-3">
            Get Started
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[1.1] tracking-wide text-white mb-6">
            Ready to Transform Your Property?
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-white/80 mb-10 max-w-[520px] mx-auto">
            Professional pressure washing &amp; soft washing for your home or
            business. Free estimates, no contracts. Just cleaner properties.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
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
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {CTA_STATS.map((stat) => (
              <div key={stat.label}>
                <strong className="font-[family-name:var(--font-display)] text-2xl font-bold text-orange-500 block">
                  {stat.value}
                </strong>
                <span className="text-[0.82rem] text-white/80">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
