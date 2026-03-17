"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TICKER_ITEMS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <section ref={ref} className="relative bg-blue-900 py-5 overflow-hidden">
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex animate-marquee"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6 whitespace-nowrap shrink-0">
            <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/80">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
