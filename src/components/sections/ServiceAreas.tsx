"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICE_AREAS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ServiceAreas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-canvas overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="section-eyebrow text-blue-500">Service Areas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="section-title mb-4"
          >
            Where We Serve
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-[2px] bg-blue-700 mx-auto mb-6"
            style={{ transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="body-text max-w-[480px] mx-auto"
          >
            Proudly serving Denver, NC and the greater Lake Norman area.
          </motion.p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICE_AREAS.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: EASE }}
              className="card-frost p-5 text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-[0.82rem] font-semibold text-blue-900">{area}</span>
              </div>
              <span className="text-[0.68rem] text-gray-500">NC</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[0.78rem] text-gray-500 italic mt-8"
        >
          Don&apos;t see your area? Give us a call — we likely serve your neighborhood too.
        </motion.p>
      </div>
    </section>
  );
}
