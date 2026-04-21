"use client";

import { useRef } from "react";
import { m as motion, useInView } from 'framer-motion';
import { ADDRESS, PHONE, PHONE_HREF, COMPANY_NAME, SERVICE_AREAS } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Full-width map band at the bottom of /contact.
 * Uses Google Maps' keyless iframe embed (no API key, no billing, no JS).
 *
 * The ?q= parameter accepts a place query, we use the full business
 * address for an exact pin drop.
 */
const MAP_QUERY = encodeURIComponent("7238 Windy Pine Cir, Denver, NC 28037");
const MAP_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed&z=11`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export default function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#f5f7fa" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0A2E5C 1px, transparent 1px), linear-gradient(90deg, #0A2E5C 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Header strip */}
      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] pt-20 pb-10 md:pt-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Left, title block */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4"
            >
              <span
                className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                style={{
                  background: "rgba(0,166,81,0.08)",
                  border: "1px solid rgba(0,166,81,0.2)",
                  color: "#00A651",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                Find Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em] mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Based in Denver, NC.
              <br />
              <span style={{ color: "#00A651" }}>Serving Lake Norman.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-[0.95rem] text-gray-500 leading-[1.7] max-w-[540px]"
            >
              {COMPANY_NAME} is locally owned and operated in Denver, NC -
              proudly serving the entire Lake Norman and greater Charlotte area.
            </motion.p>
          </div>

          {/* Right, address + CTAs */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
              className="rounded-2xl p-6"
              style={{
                background: "white",
                border: "1px solid rgba(10,46,92,0.08)",
                boxShadow: "0 1px 3px rgba(10,46,92,0.04), 0 6px 20px rgba(10,46,92,0.06)",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #2B7DE9, #7ecfff)",
                    boxShadow: "0 4px 12px rgba(43,125,233,0.25)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-blue-500 mb-1">
                    Headquarters
                  </div>
                  <div className="text-[0.95rem] font-extrabold text-blue-900 leading-tight">
                    7238 Windy Pine Cir
                  </div>
                  <div className="text-[0.88rem] font-semibold text-blue-900/80">
                    {ADDRESS}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2.5 text-white text-[0.68rem] font-extrabold tracking-[0.08em] uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "#00A651",
                    boxShadow: "0 4px 14px rgba(0,166,81,0.28)",
                  }}
                >
                  Get Directions
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex-1 text-center px-4 py-2.5 text-blue-900 text-[0.68rem] font-bold tracking-[0.06em] uppercase border-2 border-blue-900/15 rounded-full hover:border-blue-900/30 transition-all duration-300"
                >
                  Call {PHONE}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Service-area pill cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10"
        >
          <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-blue-500 mb-3">
            Service Area
          </p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area}
                className="text-[0.68rem] font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: "white",
                  border: "1px solid rgba(10,46,92,0.1)",
                  color: "#0A2E5C",
                  boxShadow: "0 1px 2px rgba(10,46,92,0.04)",
                }}
              >
                {area}, NC
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Map iframe, full-width edge-to-edge band */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
        className="relative w-full"
        style={{
          height: "clamp(340px, 48vw, 520px)",
          borderTop: "1px solid rgba(10,46,92,0.1)",
          borderBottom: "1px solid rgba(10,46,92,0.1)",
          background: "#e5e7eb",
        }}
      >
        <iframe
          src={MAP_SRC}
          title="Stand Out Exterior Cleaning. Denver, NC"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </motion.div>
    </section>
  );
}
