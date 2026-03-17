"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PHONE, PHONE_HREF, COMPANY_NAME } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutContent() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Desktop: Split layout */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[80vh]">
        {/* Left — Video / Image */}
        <div className="relative overflow-hidden">
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </div>

        {/* Right — Text */}
        <div className="flex flex-col justify-center px-[clamp(40px,5vw,80px)] py-24">
          <motion.h2
            className="section-title mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          >
            <span className="section-eyebrow text-blue-500 block mb-3">Our Story</span>
            Quality You Can See,
            <br />
            Service You Can Trust.
          </motion.h2>

          <motion.div
            className="w-16 h-[2px] bg-orange-500 mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="text-[1.05rem] leading-[1.8] text-gray-500 mb-8 max-w-[520px] space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p>
              Founded by Ridge Curwood, {COMPANY_NAME} was built on a simple principle:
              deliver results that truly stand out.{" "}
              <span className="text-blue-900 font-bold">There&apos;s a difference.</span>{" "}
              What started as a passion for transforming properties has grown into one of
              the most trusted exterior cleaning companies in Denver, NC.
            </p>
            <p>
              We specialize in both pressure washing and soft washing, using the right
              technique for every surface. Our commitment to customer satisfaction is
              what sets us apart.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <div className="w-16 h-[2px] bg-orange-500 mb-5" />
            <p className="italic text-[1.3rem] text-blue-900 mb-1">
              Ridge Curwood
            </p>
            <p className="text-[0.65rem] font-bold tracking-[0.2em] text-gray-400 uppercase">
              Owner, {COMPANY_NAME}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
              >
                Get A Free Estimate
              </Link>
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 px-6 py-3.5 text-blue-900 text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-blue-900/20 rounded-full hover:border-blue-900/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: Stacked */}
      <div className="md:hidden">
        <div className="relative h-[50vh] overflow-hidden">
          <motion.div className="absolute inset-0 h-[120%]" style={{ y: imgY }}>
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="px-6 pb-16 -mt-8">
          <h2 className="section-title mb-4 pt-2" style={{ fontSize: "clamp(28px, 7vw, 36px)", lineHeight: 1.15 }}>
            <span className="section-eyebrow text-blue-500 block mb-3">Our Story</span>
            Quality You Can See, Service You Can Trust.
          </h2>
          <div className="w-12 h-[2px] bg-orange-500 mb-6" />
          <p className="text-[0.9rem] leading-[1.8] text-gray-500 mb-8">
            Founded by Ridge Curwood, {COMPANY_NAME} was built on a simple principle:
            deliver results that truly stand out.{" "}
            <span className="text-blue-900 font-bold">There&apos;s a difference.</span>{" "}
            What started as a passion for transforming properties has grown into one
            of the most trusted exterior cleaning companies in Denver, NC.
          </p>
          <div className="w-12 h-[2px] bg-orange-500 mb-4" />
          <p className="italic text-[1.1rem] text-blue-900 mb-1">
            Ridge Curwood
          </p>
          <p className="text-[0.55rem] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Owner, {COMPANY_NAME}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/contact"
              className="px-6 py-3 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-600 transition-all duration-300"
            >
              Get A Free Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 px-5 py-3 text-blue-900 text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-blue-900/20 rounded-full transition-all duration-300"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
