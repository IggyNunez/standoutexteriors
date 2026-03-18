"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COMPANY_NAME } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TIMELINE = [
  {
    year: "2020",
    age: "Age 16",
    title: "The Spark",
    body: "Working at a marina and Harris Teeter, frustrated with low pay and rigid hourly schedules, Ridge decided to bet on himself. He bought his first pressure washer and took on his first jobs that summer. Slow and steady, but all his.",
    icon: "💡",
    color: "#FF6B35",
  },
  {
    year: "2021",
    age: "High School",
    title: "Building Through School",
    body: "Balancing classes and growing the business wasn't easy, but Ridge enrolled in online college courses during high school, giving him the flexibility to take more jobs and refine his craft. Every weekend was a chance to learn.",
    icon: "📚",
    color: "#2B7DE9",
  },
  {
    year: "2022",
    age: "Growing Up",
    title: "Word Spreads",
    body: "Referrals started rolling in. Neighbors telling neighbors. A 5-star Google review here, a repeat customer there. The business was no longer just a summer job. It was real. Ridge invested in better equipment and expanded services.",
    icon: "⭐",
    color: "#7ecfff",
  },
  {
    year: "2023",
    age: "App State",
    title: "College & Company",
    body: "Ridge enrolled at Appalachian State University studying Business Administration, fully online, so he could keep building. Most college students are looking for a job. Ridge was running one.",
    icon: "🎓",
    color: "#FF6B35",
  },
  {
    year: "Today",
    age: "Now",
    title: "Stand Out Exterior Cleaning",
    body: `500+ properties cleaned. A 5-star reputation across the Lake Norman area. ${COMPANY_NAME} is a locally owned, fully insured operation built on honest work and real results. And we're just getting started.`,
    icon: "🏆",
    color: "#2B7DE9",
  },
];

export default function FounderStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section ref={ref} className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#0A2E5C 1px, transparent 1px), linear-gradient(90deg, #0A2E5C 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Blue accent blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(43,125,233,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
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
              How It Started
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em] mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
          >
            Founded in 2020.<br />
            <span className="text-orange-500">Built to Last.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-[0.9rem] text-gray-400 max-w-[500px] mx-auto leading-relaxed"
          >
            Ridge Curwood didn&apos;t wait for opportunity. He created it. Here&apos;s the story behind Stand Out.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-[900px] mx-auto">

          {/* Vertical line */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(10,46,92,0.08), rgba(10,46,92,0.15), rgba(10,46,92,0.08))" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
          />

          <div className="space-y-12 md:space-y-0">
            {TIMELINE.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: EASE }}
                  className={`relative flex items-start gap-6 md:gap-0 md:grid md:grid-cols-2 md:mb-12`}
                >
                  {/* Left side content (even items on desktop) */}
                  <div className={`hidden md:flex md:flex-col md:items-end md:pr-12 md:pb-12 ${isRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {isRight && <TimelineCard item={item} align="right" />}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: 4 }}>
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg border-4 border-white"
                      style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`, boxShadow: `0 0 0 4px white, 0 4px 16px ${item.color}33` }}
                    >
                      {item.icon}
                    </div>
                    <div
                      className="mt-2 text-[0.6rem] font-black tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                      style={{ background: item.color, color: "white" }}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Right side content (odd items on desktop) */}
                  <div className={`hidden md:flex md:flex-col md:items-start md:pl-12 md:pb-12 ${!isRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {!isRight && <TimelineCard item={item} align="left" />}
                  </div>

                  {/* Mobile: always show card to the right of the dot */}
                  <div className="md:hidden pl-16 flex-1 pb-4">
                    <TimelineCard item={item} align="left" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="text-center mt-20 max-w-[640px] mx-auto"
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(48px, 8vw, 80px)",
              lineHeight: 1,
              color: "rgba(10,46,92,0.06)",
              marginBottom: -8,
            }}
          >
            &ldquo;
          </div>
          <p className="italic text-blue-900/70 text-[1.05rem] leading-[1.8] mb-4">
            Thank you for supporting a locally owned and operated business.
            I look forward to serving you.
          </p>
          <p className="text-[0.72rem] font-black tracking-[0.14em] uppercase text-orange-500">
            Ridge Curwood, Founder &amp; Owner
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineCard({ item, align }: { item: typeof TIMELINE[0]; align: "left" | "right" }) {
  return (
    <div className={`max-w-[340px] ${align === "right" ? "text-right" : "text-left"}`}>
      <p
        className="text-[0.6rem] font-black tracking-[0.14em] uppercase mb-1"
        style={{ color: item.color }}
      >
        {item.age}
      </p>
      <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] uppercase text-blue-900 mb-2 leading-tight">
        {item.title}
      </h3>
      <p className="text-[0.82rem] text-gray-500 leading-[1.7]">
        {item.body}
      </p>
    </div>
  );
}
