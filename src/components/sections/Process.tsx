"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STEP_ICONS: Record<string, React.ReactNode> = {
  phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></>,
  clipboard: <><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></>,
  sparkle: <><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></>,
  star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
};

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} id="process" className="relative py-24 md:py-32 bg-sky-50">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="section-eyebrow text-blue-500">How It Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="section-title mb-4"
          >
            Our Simple Process
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
            Getting your property cleaned is easy. Here&apos;s how we make it happen.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: EASE }}
              className="relative text-center"
            >
              {/* Connecting line (desktop) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-blue-200" />
              )}

              {/* Step circle */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-2 border-blue-100 shadow-sm mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {STEP_ICONS[step.icon]}
                </svg>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center">
                  <span className="text-[0.55rem] font-bold text-white">{step.num}</span>
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-[1.3rem] uppercase text-blue-900 mb-2">
                {step.title}
              </h3>
              <p className="text-[0.82rem] text-gray-600 leading-relaxed max-w-[260px] mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
