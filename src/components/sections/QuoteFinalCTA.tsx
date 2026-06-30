"use client";

import { useRef } from "react";
import Image from "next/image";
import { m as motion, useInView } from "framer-motion";
import { PHONE, PHONE_HREF, COMPANY_NAME } from "@/lib/constants";
import { WaveTop } from "@/components/ui/WaveDivider";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Branded final call-to-action for the ad landing page. */
export default function QuoteFinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section ref={ref} className="relative bg-blue-900 text-white pt-28 pb-20 overflow-hidden">
      <WaveTop fill="#ffffff" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[760px] mx-auto px-[clamp(20px,4vw,60px)] text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }}>
          <Image src="/assets/logo-transparent.png" alt={COMPANY_NAME} width={130} height={52}
            className="h-[clamp(44px,6vw,60px)] w-auto mx-auto mb-7 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]" />
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.2rem)] font-[900] uppercase leading-[1.05] mb-4">
            Ready for a<br /><span style={{ color: "#00A651" }}>Free Estimate?</span>
          </h2>
          <p className="text-white/70 mb-9 text-[1.05rem] leading-relaxed">
            Scroll back up to the form, or call Ridge directly. Fair pricing, no pressure,
            and the same 5-star results your neighbors rave about.
          </p>
          <a href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2.5 py-4 px-10 bg-orange-500 text-white text-[0.8rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_30px_rgba(255,107,53,0.3)]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
            Call {PHONE}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
