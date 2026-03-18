"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { WaveTop, WaveBottom } from "@/components/ui/WaveDivider";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} id="process" className="water-shimmer-light relative py-24 md:py-32 bg-sky-50 overflow-hidden">
      <WaveTop fill="#ffffff" />
      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-eyebrow text-blue-500">How It Works</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Simple As It Should Be
          </motion.h2>
          <motion.div
            className="w-16 h-[2px] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ transformOrigin: "left", background: "#00A651" }}
          />
          <motion.p
            className="text-[1rem] text-gray-500 max-w-[560px] mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Get your property cleaned in minutes. We handle the rest. No contracts, no pressure.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-[2px] z-0" style={{ background: "rgba(0,166,81,0.3)" }} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="bg-white rounded-2xl border-t-[3px] border-blue-900 p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              >
                {/* Step number circle */}
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                  <span className="font-[family-name:var(--font-display)] text-[1rem] font-bold text-white">
                    {step.num}
                  </span>
                </div>

                <h4 className="font-[family-name:var(--font-display)] text-[1.2rem] font-[900] uppercase text-blue-900 mb-3 tracking-wide">
                  {step.title}
                </h4>

                <div className="w-10 h-[2px] mx-auto mb-3" style={{ background: "#00A651" }} />

                <p className="text-[0.85rem] leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(255,107,53,0.3)] hover:-translate-y-0.5"
          >
            Get A Free Estimate
          </Link>
        </motion.div>
      </div>
      <WaveBottom fill="#ffffff" />
    </section>
  );
}
