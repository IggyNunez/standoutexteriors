"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SERVICES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Homepage services grid — 2 featured cards + 8 small cards (10 total).
 * Small grid is 4 columns × 2 rows on desktop so every service is still
 * visible on the homepage without any card feeling like an afterthought.
 */
const FEATURED = SERVICES.slice(0, 2);
const SMALL = SERVICES.slice(2);

/* ── Arrow icon ── */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Featured Card — Desktop: hover slide-up
   ═══════════════════════════════════════════════ */
function FeaturedCardDesktop({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES)[number];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="hidden md:block relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(10,46,92,0.85) 0%, rgba(10,46,92,0.4) 40%, transparent 70%)",
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(10,46,92,0.95) 0%, rgba(10,46,92,0.75) 50%, rgba(10,46,92,0.5) 100%)",
        }}
      />

      {/* Label badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white bg-blue-900 px-3 py-1.5 rounded-full">
          {service.label}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.5vw,2rem)] uppercase text-white leading-tight mb-2 tracking-wide">
          {service.title}
        </h3>

        {/* Slide-up content */}
        <div className="max-h-0 group-hover:max-h-[400px] overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="pt-2">
            <div className="h-[2px] w-10 mb-4" style={{ background: "#00A651" }} />
            <p className="text-[0.9rem] leading-relaxed text-white/80 mb-4">
              {service.description}
            </p>
            {service.bullets && (
              <ul className="space-y-2 mb-5">
                {service.bullets.map((b: string) => (
                  <li key={b} className="flex items-center gap-2 text-[0.82rem] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#00A651" }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.1em] uppercase hover:text-white transition-colors"
              style={{ color: "#00A651" }}
            >
              Learn More
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Featured Card — Mobile: 3D flip
   ═══════════════════════════════════════════════ */
function FeaturedCardMobile({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES)[number];
  delay: number;
  isInView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="md:hidden"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "3/4" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(10,46,92,0.85) 0%, rgba(10,46,92,0.3) 50%, transparent 70%)",
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white bg-blue-900 px-3 py-1.5 rounded-full">
                {service.label}
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="font-[family-name:var(--font-display)] text-[1.6rem] uppercase text-white leading-tight mb-2">
                {service.title}
              </h3>
              <p className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">
                Tap to learn more &rarr;
              </p>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center px-6 py-8"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#0A2E5C",
            }}
          >
            <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "#00A651" }}>
              {service.label}
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-[1.5rem] uppercase text-white leading-tight mb-3">
              {service.title}
            </h3>
            <div className="h-[2px] w-10 mb-4" style={{ background: "#00A651" }} />
            <p className="text-[0.88rem] leading-relaxed text-white/80 mb-4">
              {service.description}
            </p>
            {service.bullets && (
              <ul className="space-y-2 mb-5">
                {service.bullets.map((b: string) => (
                  <li key={b} className="flex items-center gap-2 text-[0.8rem] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#00A651" }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/services/${service.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.1em] uppercase"
              style={{ color: "#00A651" }}
            >
              Learn More <Arrow />
            </Link>
            <p className="text-[0.6rem] tracking-[0.15em] uppercase text-white/30 mt-4">
              Tap to flip back
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Small Card — Desktop: hover slide-up
   ═══════════════════════════════════════════════ */
function SmallCardDesktop({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES)[number];
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="hidden md:block relative rounded-xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "3/4" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,46,92,0.85) 0%, rgba(10,46,92,0.3) 45%, transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase block mb-1" style={{ color: "#00A651" }}>
          {service.label}
        </span>
        <h4 className="font-[family-name:var(--font-display)] text-[1.2rem] uppercase text-white leading-tight">
          {service.title}
        </h4>

        <div className="max-h-0 group-hover:max-h-[60px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.1em] uppercase hover:text-white transition-colors mt-3"
            style={{ color: "#00A651" }}
          >
            Learn More <Arrow />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Small Card — Mobile: tap to flip
   ═══════════════════════════════════════════════ */
function SmallCardMobile({
  service,
  delay,
  isInView,
}: {
  service: (typeof SERVICES)[number];
  delay: number;
  isInView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="md:hidden"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: EASE }}
    >
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "3/4" }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(10,46,92,0.85) 0%, rgba(10,46,92,0.3) 50%, transparent 70%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase block mb-1" style={{ color: "#00A651" }}>
                {service.label}
              </span>
              <h4 className="font-[family-name:var(--font-display)] text-[1.1rem] uppercase text-white leading-tight">
                {service.title}
              </h4>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden flex flex-col justify-center items-center px-5 py-6 text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#0A2E5C",
            }}
          >
            <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "#00A651" }}>
              {service.label}
            </span>
            <h4 className="font-[family-name:var(--font-display)] text-[1.15rem] uppercase text-white leading-tight mb-3">
              {service.title}
            </h4>
            <div className="h-[2px] w-8 mb-3" style={{ background: "#00A651" }} />
            <Link
              href={`/services/${service.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.1em] uppercase"
              style={{ color: "#00A651" }}
            >
              Learn More <Arrow />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main Services Section
   ═══════════════════════════════════════════════ */
export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section id="services" className="water-shimmer-light relative py-24 md:py-32 bg-white overflow-hidden" ref={ref}>
      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-eyebrow text-blue-500">What We Do</span>
          </motion.div>
          <motion.h2
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Our Services
          </motion.h2>
          <motion.div
            className="w-16 h-[2px] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ transformOrigin: "left", background: "#00A651" }}
          />
          <motion.p
            className="text-[1rem] text-gray-500 max-w-[480px] mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            From gentle soft washes to heavy-duty pressure cleaning, we have the
            right solution for every surface.
          </motion.p>
        </div>

        {/* Featured Cards — 2 large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {FEATURED.map((service, i) => (
            <div key={service.title}>
              <FeaturedCardDesktop service={service} delay={0.1 + i * 0.1} isInView={isInView} />
              <FeaturedCardMobile service={service} delay={0.1 + i * 0.1} isInView={isInView} />
            </div>
          ))}
        </div>

        {/* Small Cards — 4 across on desktop, 2 across on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {SMALL.map((service, i) => (
            <div key={service.title}>
              <SmallCardDesktop service={service} delay={0.2 + i * 0.08} isInView={isInView} />
              <SmallCardMobile service={service} delay={0.2 + i * 0.08} isInView={isInView} />
            </div>
          ))}
        </div>

        {/* See-all link — routes to full services index including window, brick, commercial, churches */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-blue-900 hover:text-green-600 transition-colors"
          >
            See All Services
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
