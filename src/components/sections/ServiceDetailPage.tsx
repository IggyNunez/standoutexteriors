"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m as motion, useInView, AnimatePresence } from 'framer-motion';
import type { ServiceCard, ServiceDetail } from "@/types";
import { PHONE, PHONE_HREF, SERVICES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Props {
  service: ServiceCard;
  detail: ServiceDetail;
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Hero section                                     */
/* ─────────────────────────────────────────────────────────────────── */
function Hero({ service, detail }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#061e38] text-white pt-[120px] min-[1200px]:pt-[160px] pb-24">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(6,30,56,0.88) 0%, rgba(10,46,92,0.76) 45%, rgba(10,46,92,0.3) 100%)",
          }}
        />
      </div>

      {/* Soft water blobs */}
      <div
        className="absolute top-[20%] left-[10%] w-[480px] h-[260px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(43,125,233,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-5"
          >
            <nav className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="opacity-40">/</span>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span className="opacity-40">/</span>
              <span style={{ color: "#7ecfff" }}>{service.title}</span>
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
              style={{
                background: "rgba(0,166,81,0.16)",
                border: "1px solid rgba(0,166,81,0.4)",
                color: "#7ef0a8",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#00A651" }}
              />
              {detail.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.95] tracking-[0.02em] mb-6"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.4rem)" }}
          >
            {detail.heroHeadline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <span style={{ color: "#00A651" }}>{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-16 h-[2px] mb-6"
            style={{ background: "#00A651", transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[1.05rem] md:text-[1.1rem] text-white/80 leading-[1.7] max-w-[560px] mb-10"
          >
            {detail.heroSubline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
            >
              Get a Free Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-white/30 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              {PHONE}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Body — Paragraphs + Benefits grid              */
/* ─────────────────────────────────────────────────────────────────── */
function BodyCopy({ detail, service }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} className="bg-white py-24 md:py-28 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Intro paragraphs */}
        <div className="max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6"
          >
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-500">
              Why It Matters
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[1] tracking-[0.02em] mb-8"
            style={{ fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)" }}
          >
            {service.title}
            <br />
            <span style={{ color: "#00A651" }}>Done Right.</span>
          </motion.h2>

          <div className="space-y-5">
            {detail.bodyParagraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: EASE }}
                className="text-[0.95rem] md:text-[1rem] leading-[1.8] text-gray-600"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Surfaces pill list */}
        {detail.surfaces && detail.surfaces.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10"
          >
            <p className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-500 mb-3">
              Surfaces We Handle
            </p>
            <div className="flex flex-wrap gap-2">
              {detail.surfaces.map((s) => (
                <span
                  key={s}
                  className="text-[0.72rem] font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(10,46,92,0.05)",
                    border: "1px solid rgba(10,46,92,0.12)",
                    color: "#0A2E5C",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benefits grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {detail.benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: EASE }}
              className="p-6 rounded-2xl"
              style={{
                background: "rgba(10,46,92,0.03)",
                border: "1px solid rgba(10,46,92,0.08)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: "linear-gradient(135deg, #2B7DE9, #7ecfff)",
                  boxShadow: "0 4px 12px rgba(43,125,233,0.25)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-[0.88rem] font-extrabold tracking-[0.04em] uppercase text-blue-900 mb-2">
                {b.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.7] text-gray-600">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Process section                                 */
/* ─────────────────────────────────────────────────────────────────── */
function Process({ detail }: { detail: ServiceDetail }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}
    >
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-500">
              Our Process
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            How We Do It
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-12 h-[2px] mx-auto mt-4"
            style={{ background: "#00A651", transformOrigin: "left" }}
          />
        </div>

        <div className="relative max-w-[860px] mx-auto">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden md:block absolute left-[22px] top-6 bottom-6 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,46,92,0.08), rgba(10,46,92,0.15), rgba(10,46,92,0.08))",
            }}
          />

          <div className="space-y-6">
            {detail.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: EASE }}
                className="relative flex items-start gap-5 md:gap-7"
              >
                {/* Step number circle */}
                <div
                  className="shrink-0 w-11 h-11 md:w-[46px] md:h-[46px] rounded-full flex items-center justify-center font-black text-white text-[0.9rem]"
                  style={{
                    background:
                      "linear-gradient(135deg, #0A2E5C 0%, #2B7DE9 100%)",
                    boxShadow:
                      "0 0 0 4px white, 0 6px 16px rgba(10,46,92,0.15)",
                    zIndex: 1,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {i + 1}
                </div>

                {/* Step content */}
                <div className="flex-1 pt-1 pb-2">
                  <h3 className="text-[1rem] md:text-[1.08rem] font-extrabold tracking-[0.02em] text-blue-900 uppercase mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[0.88rem] leading-[1.7] text-gray-600">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      FAQ accordion                                   */
/* ─────────────────────────────────────────────────────────────────── */
function FaqSection({ detail }: { detail: ServiceDetail }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [open, setOpen] = useState<number | null>(0);

  if (!detail.faqs?.length) return null;

  return (
    <section ref={ref} className="bg-white py-24 md:py-28">
      <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-500">
              Questions
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            Frequently Asked
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-12 h-[2px] mx-auto mt-4"
            style={{ background: "#00A651", transformOrigin: "left" }}
          />
        </div>

        <div className="space-y-3">
          {detail.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.question}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: EASE }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: isOpen ? "#f8fafc" : "white",
                  border: "1px solid rgba(10,46,92,0.1)",
                  boxShadow: isOpen
                    ? "0 8px 28px rgba(10,46,92,0.08)"
                    : "0 1px 3px rgba(10,46,92,0.04)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-start gap-4 px-6 py-5"
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors"
                    style={{
                      background: isOpen ? "#00A651" : "rgba(10,46,92,0.08)",
                      color: isOpen ? "white" : "#0A2E5C",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      <line x1="6" y1="1" x2="6" y2="11" />
                      <line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                  </span>
                  <span className="flex-1 text-[0.95rem] md:text-[1rem] font-bold text-blue-900 leading-snug">
                    {f.question}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-5 pl-[66px] pr-6">
                        <p className="text-[0.9rem] leading-[1.75] text-gray-600">
                          {f.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Related services                                */
/* ─────────────────────────────────────────────────────────────────── */
function RelatedServices({ detail }: { detail: ServiceDetail }) {
  const related = detail.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is ServiceCard => Boolean(s));

  if (related.length === 0) return null;

  return (
    <section className="bg-[#f5f7fa] py-20 md:py-24">
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="text-center mb-10">
          <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-500">
            Related Services
          </span>
          <h2
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em] mt-3"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}
          >
            You Might Also Need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              aria-label={`Learn more about ${s.title}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                aspectRatio: "5/4",
                boxShadow: "0 1px 3px rgba(10,46,92,0.06), 0 6px 24px rgba(10,46,92,0.08)",
              }}
            >
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,46,92,0.92) 0%, rgba(10,46,92,0.35) 50%, transparent 75%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span
                  className="text-[0.55rem] font-bold tracking-[0.18em] uppercase block mb-1"
                  style={{ color: "#7ef0a8" }}
                >
                  {s.label}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] md:text-[1.35rem] uppercase text-white leading-tight">
                  {s.title}
                </h3>
                <div className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#7ef0a8]">
                  Learn More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Final CTA                                       */
/* ─────────────────────────────────────────────────────────────────── */
function FinalCTA({ service }: { service: ServiceCard }) {
  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #061e38 0%, #0A2E5C 60%, #0d3870 100%)",
      }}
    >
      <div
        className="absolute top-[10%] right-[10%] w-[440px] h-[220px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(43,125,233,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[860px] mx-auto px-[clamp(20px,4vw,80px)] text-center text-white">
        <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#7ecfff]">
          Ready to Get Started?
        </span>
        <h2
          className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.95] tracking-[0.02em] mt-4 mb-6"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
        >
          Book Your {service.title}
          <br />
          <span style={{ color: "#00A651" }}>Free Estimate Today.</span>
        </h2>
        <p className="text-[0.95rem] md:text-[1rem] text-white/70 leading-[1.7] max-w-[600px] mx-auto mb-10">
          Quick response. Honest pricing. Satisfaction guaranteed. We&apos;ll walk
          your property, answer every question, and give you an exact number — no
          pressure, no contracts.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
          >
            Request Free Estimate
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-white/30 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Root export                                     */
/* ─────────────────────────────────────────────────────────────────── */
export default function ServiceDetailPage({ service, detail }: Props) {
  return (
    <main className="w-full min-w-full">
      <Hero service={service} detail={detail} />
      <BodyCopy service={service} detail={detail} />
      <Process detail={detail} />
      <FaqSection detail={detail} />
      <RelatedServices detail={detail} />
      <FinalCTA service={service} />
    </main>
  );
}
