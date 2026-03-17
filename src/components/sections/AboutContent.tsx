"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { COMPANY_NAME, PHONE, PHONE_HREF } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-[140px] md:pt-[160px] pb-20 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-300">About Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] uppercase text-white leading-none mb-4"
          >
            Our Story
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-[2px] bg-orange-500 mb-6"
            style={{ transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[1rem] text-white/60 leading-relaxed max-w-[560px]"
          >
            Locally owned and operated, {COMPANY_NAME} has been keeping properties
            across the Lake Norman area looking their best.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={ref} className="relative py-24 md:py-32 bg-canvas">
        <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/assets/about-team.jpg"
                  alt="Stand Out Exterior Cleaning team"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 md:right-8 card-frost p-4 shadow-lg">
                <div className="font-[family-name:var(--font-display)] text-[2rem] text-blue-900 leading-none">5+</div>
                <div className="text-[0.68rem] text-gray-600 uppercase tracking-wide">Years Experience</div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            >
              <span className="section-eyebrow text-blue-500 mb-4 block">Who We Are</span>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.5rem)] uppercase text-blue-900 leading-none mb-6">
                Quality You Can See, Service You Can Trust
              </h2>
              <div className="space-y-4 text-[0.88rem] text-gray-600 leading-relaxed">
                <p>
                  Founded by Ridge Curwood, {COMPANY_NAME} was built on a simple principle:
                  deliver results that truly stand out. What started as a passion for
                  transforming properties has grown into one of the most trusted exterior
                  cleaning companies in the Denver, NC area.
                </p>
                <p>
                  We specialize in both pressure washing and soft washing, using the right
                  technique for every surface. Whether it&apos;s your home&apos;s siding, a
                  commercial storefront, or a grimy driveway, we bring commercial-grade
                  equipment and eco-friendly solutions to every job.
                </p>
                <p>
                  Our commitment to customer satisfaction is what sets us apart. We don&apos;t
                  leave until you&apos;re 100% happy with the results — that&apos;s our promise.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-blue-900/20 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
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
      </section>
    </>
  );
}
