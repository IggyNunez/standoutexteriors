"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SERVICES, PHONE_HREF, PHONE } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ServiceDetail({ service, index, reverse }: { service: typeof SERVICES[number]; index: number; reverse: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <div
      ref={ref}
      id={service.slug}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-32 ${index > 0 ? "mt-24 md:mt-32" : ""}`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className={`relative ${reverse ? "lg:order-2" : ""}`}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
        className={reverse ? "lg:order-1" : ""}
      >
        <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
          {service.label}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.5vw,2.4rem)] uppercase text-blue-900 leading-none mt-4 mb-4">
          {service.title}
        </h2>
        <p className="text-[0.88rem] text-gray-600 leading-relaxed mb-6">
          {service.description}
        </p>
        <ul className="space-y-3 mb-8">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[0.82rem] text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-blue-900/20 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
        >
          Get A Free Estimate
        </Link>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-[140px] md:pt-[160px] pb-20 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-300">Our Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] uppercase text-white leading-none mb-4"
          >
            Professional Cleaning Services
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
            From gentle soft washes to heavy-duty pressure cleaning, we have the right
            solution for every surface on your property.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="relative py-24 md:py-32 bg-canvas">
        <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
          {SERVICES.map((service, i) => (
            <ServiceDetail
              key={service.slug}
              service={service}
              index={i}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-blue-900 text-white text-center">
        <div className="max-w-[600px] mx-auto px-[clamp(20px,4vw,48px)]">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.5rem)] uppercase text-white leading-none mb-4">
            Ready To Transform Your Property?
          </h2>
          <p className="text-[0.88rem] text-white/60 mb-8">
            Get a free, no-obligation estimate today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-white/20 hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get A Free Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-white/80 text-[0.82rem] font-bold hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
