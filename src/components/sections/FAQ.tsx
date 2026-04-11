"use client";

import { useState, useRef } from "react";
import { m as motion, useInView, AnimatePresence } from 'framer-motion';
import { FAQS, PHONE, PHONE_HREF } from "@/lib/constants";

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="water-shimmer-light relative py-24 md:py-32 bg-white overflow-hidden" ref={ref}>
      <div className="relative z-[1] max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-eyebrow text-blue-500">Got Questions?</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Questions We Actually Get
          </motion.h2>
          <motion.div
            className="w-16 h-[2px] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ transformOrigin: "left", background: "#00A651" }}
          />
        </div>

        {/* Accordion */}
        <div className="divide-y divide-blue-900/10 border-t border-b border-blue-900/10">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
              >
                <button
                  className="w-full flex items-center justify-between py-5 px-2 text-left cursor-pointer transition-colors hover:bg-sky-50 rounded-lg"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="text-[0.9rem] font-bold text-blue-900 pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <motion.span
                    className="shrink-0 text-[1.2rem] font-light"
                  style={{ color: "#00A651" }}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-[0.85rem] leading-relaxed text-gray-500 px-2 pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[0.9rem] text-gray-400 mb-2">
            Still have questions?
          </p>
          <a
            href={PHONE_HREF}
            className="text-[0.95rem] font-bold text-blue-900 hover:text-blue-700 transition-colors"
          >
            Call the Team &mdash; {PHONE}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
