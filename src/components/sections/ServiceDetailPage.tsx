"use client";

import { useEffect, useRef, useState } from "react";
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
/*  Festive SVG icons — used only on /services/christmas-lights.       */
/*  Everything inline so there's zero extra network cost and icons     */
/*  inherit currentColor from their parent for easy theming.           */
/* ─────────────────────────────────────────────────────────────────── */
const FestiveIcons = {
  // Classic Edison-bulb Christmas light — the hero brand-mark for this page
  bulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l-1 4a4 4 0 0 1-4 0z" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 7c-2.5 0-4.5 2-4.5 4.5 0 2 1.5 3.5 2.5 4.5v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2c1-1 2.5-2.5 2.5-4.5C16.5 9 14.5 7 12 7z" />
      <line x1="10" y1="20" x2="14" y2="20" />
    </svg>
  ),
  snowflake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <polyline points="9 5 12 2 15 5" />
      <polyline points="9 19 12 22 15 19" />
      <polyline points="5 9 2 12 5 15" />
      <polyline points="19 9 22 12 19 15" />
    </svg>
  ),
  wreath: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
      <circle cx="12" cy="5" r="1.3" fill="currentColor" />
      <circle cx="19" cy="12" r="1.3" fill="currentColor" />
      <circle cx="12" cy="19" r="1.3" fill="currentColor" />
      <circle cx="5" cy="12" r="1.3" fill="currentColor" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13" />
      <path d="M3 13h18" />
      <path d="M12 8c-1.5-2.5-5-3-5-1s2.5 1 5 1z" />
      <path d="M12 8c1.5-2.5 5-3 5-1s-2.5 1-5 1z" />
    </svg>
  ),
  tree: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 3 6 11 9 11 5 17 10 17 7 22 17 22 14 17 19 17 15 11 18 11" />
      <line x1="11" y1="22" x2="13" y2="22" strokeWidth="3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 14.6 9 22 9 16 13.5 18.2 21 12 16.5 5.8 21 8 13.5 2 9 9.4 9" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5z" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),
};

/**
 * Ordered icon set for the Christmas-lights benefits grid. These map
 * 1:1 to SERVICE_DETAILS["christmas-lights"].benefits — reorder both
 * arrays together if you change the copy.
 *
 *   0 Custom Design       → sparkles
 *   1 Commercial-Grade    → bulb
 *   2 Full-Service        → gift
 *   3 Returning Customer  → star
 *   4 Roof & Gutter Safe  → shield
 *   5 Fully Insured       → shield (distinct from #4 styling handled by slot)
 */
const CHRISTMAS_BENEFIT_ICONS = [
  FestiveIcons.sparkles,
  FestiveIcons.bulb,
  FestiveIcons.gift,
  FestiveIcons.star,
  FestiveIcons.shield,
  FestiveIcons.wreath,
];

/**
 * "String of lights" decorative divider rendered above the Process
 * section on Christmas. Pure SVG — eight bulbs hanging from a gentle
 * curved wire. Responsive via viewBox so it scales cleanly to any
 * container width. preserveAspectRatio="none" would stretch the bulbs,
 * so we let the SVG letterbox and use CSS width:100% / height:auto.
 */
const STRING_OF_LIGHTS = (
  <svg
    viewBox="0 0 600 48"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-[520px] mx-auto block"
    aria-hidden="true"
  >
    {/* The wire — a soft sagging curve */}
    <path
      d="M 10 8 Q 150 32 300 24 T 590 12"
      fill="none"
      stroke="rgba(10,46,92,0.25)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Eight bulbs evenly spaced along the wire, alternating warm gold / evergreen / festive red */}
    {[
      { cx: 40,  cy: 16, c: "#E8B84C" },
      { cx: 115, cy: 22, c: "#2EB67D" },
      { cx: 190, cy: 26, c: "#C2352C" },
      { cx: 265, cy: 26, c: "#E8B84C" },
      { cx: 340, cy: 24, c: "#2EB67D" },
      { cx: 415, cy: 20, c: "#C2352C" },
      { cx: 490, cy: 16, c: "#E8B84C" },
      { cx: 560, cy: 13, c: "#2EB67D" },
    ].map((b, i) => (
      <g key={i}>
        {/* Tiny connector from the wire to the bulb cap */}
        <line x1={b.cx} y1={b.cy - 4} x2={b.cx} y2={b.cy - 1} stroke="rgba(10,46,92,0.35)" strokeWidth="0.8" />
        {/* Cap */}
        <rect x={b.cx - 2.5} y={b.cy - 1} width="5" height="2" fill="rgba(10,46,92,0.4)" />
        {/* Bulb — with a soft glow via drop shadow filter-free approach */}
        <circle cx={b.cx} cy={b.cy + 6} r="5" fill={b.c} opacity="0.9" />
        <circle cx={b.cx} cy={b.cy + 6} r="8" fill={b.c} opacity="0.18" />
      </g>
    ))}
  </svg>
);

/* ─────────────────────────────────────────────────────────────────── */
/*                      Hero section                                     */
/* ─────────────────────────────────────────────────────────────────── */
/**
 * Per-service hero theming. Christmas-lights gets a warm-white-on-navy
 * "lit-at-night" treatment: gold eyebrow pill, warm-white accent line,
 * festive evergreen on the H1 second line, and decorative "fairy light"
 * orbs twinkling in the background. Everything else stays on-brand
 * navy/blue so the rest of the page matches the rest of the site.
 */
const HERO_THEMES = {
  default: {
    accent: "#00A651",      // brand emerald
    accentSoft: "#7ef0a8",  // soft green for eyebrow text
    accentBg: "rgba(0,166,81,0.16)",
    accentBorder: "rgba(0,166,81,0.4)",
    headlineAccent: "#00A651",
    rule: "#00A651",
    twinkle: false,
  },
  christmas: {
    accent: "#E8B84C",      // warm gold (LED-filament gold)
    accentSoft: "#FFE8B0",  // warm-white glow
    accentBg: "rgba(232,184,76,0.15)",
    accentBorder: "rgba(232,184,76,0.5)",
    headlineAccent: "#2EB67D",  // festive evergreen (distinct from brand emerald)
    rule: "#E8B84C",
    twinkle: true,
  },
} as const;

/**
 * Twelve decorative warm-white "fairy light" orbs scattered across the
 * hero background. Each one pulses on a different offset so the hero
 * feels subtly alive (like a lit-up string of lights at dusk) without
 * being distracting. All absolute-positioned and pointer-events: none,
 * so they have zero impact on layout or interaction.
 *
 * Positions are hand-picked — not randomized — so the twinkle pattern
 * is consistent across SSR and hydration (no flash on load, no CLS).
 */
const FAIRY_LIGHTS = [
  { top: "15%", left: "8%",  size: 6,  delay: 0.0 },
  { top: "22%", left: "18%", size: 4,  delay: 0.6 },
  { top: "12%", left: "34%", size: 5,  delay: 1.2 },
  { top: "26%", left: "46%", size: 3,  delay: 0.3 },
  { top: "10%", left: "58%", size: 5,  delay: 0.9 },
  { top: "20%", left: "72%", size: 4,  delay: 1.5 },
  { top: "30%", left: "86%", size: 6,  delay: 0.4 },
  { top: "52%", left: "88%", size: 3,  delay: 1.1 },
  { top: "68%", left: "76%", size: 5,  delay: 0.2 },
  { top: "74%", left: "14%", size: 4,  delay: 1.3 },
  { top: "60%", left: "6%",  size: 5,  delay: 0.7 },
  { top: "44%", left: "24%", size: 3,  delay: 1.8 },
];

function Hero({ service, detail }: Props) {
  const theme =
    service.slug === "christmas-lights" ? HERO_THEMES.christmas : HERO_THEMES.default;
  const isChristmas = service.slug === "christmas-lights";

  // Fade the hero video in only AFTER it's loaded enough to play. The
  // poster <Image> is the LCP anchor — it renders first, paints fast,
  // and stays in the DOM so search engines get a real static image
  // (videos don't count as LCP and aren't indexed the same way).
  // Once the video is ready, we fade it in OVER the image. If the
  // video never loads (slow network, data-saver, prefers-reduced-motion,
  // older browser), the image stays and the page still looks great.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (!isChristmas || typeof window === "undefined") return;
    // Respect reduced-motion — users who asked their OS to turn off
    // animations shouldn't get an autoplaying video loop.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setVideoReady(true);
    v.addEventListener("loadeddata", onReady);
    // Some browsers fire canplay but not loadeddata for autoplayed loops
    v.addEventListener("canplay", onReady);
    return () => {
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("canplay", onReady);
    };
  }, [isChristmas]);

  return (
    <section className="relative overflow-hidden bg-[#061e38] text-white pt-[120px] min-[1200px]:pt-[160px] pb-24">
      {/* Background image — the LCP anchor. Renders first, always stays
          in the DOM for SEO. On Christmas it's also the fallback if
          the video never loads (slow network, prefers-reduced-motion,
          older browser). */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Christmas only: looping hero video stacked on top of the
            poster. Fades in once ready — no layout shift, no LCP
            regression. `preload="none"` so mobile and data-saver
            users don't pay the bandwidth unless the video actually
            plays. `playsInline` + `muted` is required for iOS
            autoplay to work without user interaction. */}
        {isChristmas && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: videoReady ? 1 : 0 }}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={service.image}
            aria-hidden
          >
            <source src="/assets/video/christmas-hero.webm" type="video/webm" />
            <source src="/assets/video/christmas-hero.mp4" type="video/mp4" />
          </video>
        )}

        <div
          className="absolute inset-0"
          style={{
            background: theme.twinkle
              ? // Christmas: deeper, slightly warmer overlay that lets the
                // lights in the photo/video glow through at dusk.
                "linear-gradient(120deg, rgba(6,20,40,0.82) 0%, rgba(8,28,54,0.7) 50%, rgba(10,30,60,0.4) 100%)"
              : "linear-gradient(120deg, rgba(6,30,56,0.88) 0%, rgba(10,46,92,0.76) 45%, rgba(10,46,92,0.3) 100%)",
          }}
        />
      </div>

      {/* Soft ambient blob — color matches the theme accent */}
      <div
        className="absolute top-[20%] left-[10%] w-[480px] h-[260px] rounded-full pointer-events-none"
        style={{
          background: theme.twinkle
            ? "radial-gradient(ellipse, rgba(232,184,76,0.14) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(43,125,233,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Christmas only: decorative fairy-light orbs twinkling across
          the hero background. Rendered via motion so the pulse is
          GPU-accelerated; only the opacity animates so there's no
          layout-affecting work on any frame. */}
      {theme.twinkle &&
        FAIRY_LIGHTS.map((light, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
              top: light.top,
              left: light.left,
              width: `${light.size}px`,
              height: `${light.size}px`,
              background: "#FFE8B0",
              boxShadow:
                "0 0 8px 2px rgba(255,232,176,0.7), 0 0 16px 4px rgba(232,184,76,0.35)",
            }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{
              duration: 2.4,
              delay: light.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

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

          {/* Christmas only: seasonal announcement pill above the
              eyebrow. Flags "we're booking now" at the top of the page
              so visitors know the service is actively available. */}
          {isChristmas && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
              className="mb-3"
            >
              <span
                className="text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                style={{
                  background: "rgba(194,53,44,0.18)",
                  border: "1px solid rgba(194,53,44,0.45)",
                  color: "#FFB5AE",
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#FF4D40", boxShadow: "0 0 8px 2px rgba(255,77,64,0.7)" }}
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                Now Booking 2026 Installations
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
              style={{
                background: theme.accentBg,
                border: `1px solid ${theme.accentBorder}`,
                color: theme.accentSoft,
              }}
            >
              {isChristmas ? (
                <span className="w-3.5 h-3.5" style={{ color: theme.accent }}>
                  {FestiveIcons.bulb}
                </span>
              ) : (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: theme.accent }}
                />
              )}
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
                  <span style={{ color: theme.headlineAccent }}>{line}</span>
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
            style={{ background: theme.rule, transformOrigin: "left" }}
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

  // Christmas-only festive treatment for the "Why It Matters" section:
  // a very faded hero image watermark in the right side of the section
  // plus gold eyebrow and festive-red headline accent. Everything else
  // stays on-brand so the rest of the services keep the same look.
  const isChristmas = service.slug === "christmas-lights";

  return (
    <section ref={ref} className="relative bg-white py-24 md:py-28 overflow-hidden">
      {/* Christmas only: faded hero image as decorative watermark on the
          right half of the section, plus soft warm-gold ambient glow.
          Opacity kept very low so text contrast stays WCAG AA. */}
      {isChristmas && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
              opacity: 0.08,
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute top-[10%] right-[-10%] w-[600px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(232,184,76,0.10) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Intro paragraphs */}
        <div className="max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex items-center gap-2"
          >
            {isChristmas && (
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#E8B84C",
                  boxShadow: "0 0 6px 1px rgba(232,184,76,0.8)",
                }}
              />
            )}
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase"
              style={{ color: isChristmas ? "#B88830" : "#2B7DE9" }}
            >
              {isChristmas ? "The Holiday Difference" : "Why It Matters"}
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
            <span style={{ color: isChristmas ? "#C2352C" : "#00A651" }}>
              Done Right.
            </span>
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

        {/* Benefits grid — on Christmas, each card gets a hand-picked
            festive icon (bulb, sparkles, gift, etc.) and a warm gold
            gradient on the icon tile. On every other service page the
            default blue-gradient checkmark is used exactly as before. */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {detail.benefits.map((b, i) => {
            const festiveIcon = isChristmas ? CHRISTMAS_BENEFIT_ICONS[i] : null;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: EASE }}
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isChristmas
                    ? "linear-gradient(180deg, rgba(232,184,76,0.04) 0%, rgba(255,255,255,1) 100%)"
                    : "rgba(10,46,92,0.03)",
                  border: isChristmas
                    ? "1px solid rgba(232,184,76,0.25)"
                    : "1px solid rgba(10,46,92,0.08)",
                  boxShadow: isChristmas
                    ? "0 4px 20px rgba(232,184,76,0.08)"
                    : "none",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: isChristmas
                      ? "linear-gradient(135deg, #E8B84C 0%, #FFD79A 100%)"
                      : "linear-gradient(135deg, #2B7DE9, #7ecfff)",
                    boxShadow: isChristmas
                      ? "0 4px 14px rgba(232,184,76,0.35)"
                      : "0 4px 12px rgba(43,125,233,0.25)",
                    color: isChristmas ? "#5C3A0C" : "white",
                  }}
                >
                  {festiveIcon ? (
                    <span className="w-6 h-6 block">{festiveIcon}</span>
                  ) : (
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
                  )}
                </div>
                <h3 className="text-[0.88rem] font-extrabold tracking-[0.04em] uppercase text-blue-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.7] text-gray-600">
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*                      Process section                                 */
/* ─────────────────────────────────────────────────────────────────── */
function Process({ detail, service }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const isChristmas = service.slug === "christmas-lights";

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-28 overflow-hidden"
      style={{
        background: isChristmas
          ? "linear-gradient(180deg, #fffaf0 0%, #ffffff 55%, #f7f4ec 100%)"
          : "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Christmas only: string-of-lights divider above the heading */}
        {isChristmas && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-6"
          >
            {STRING_OF_LIGHTS}
          </motion.div>
        )}

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            {isChristmas && (
              <span className="w-3.5 h-3.5" style={{ color: "#E8B84C" }}>
                {FestiveIcons.star}
              </span>
            )}
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase"
              style={{ color: isChristmas ? "#B88830" : "#2B7DE9" }}
            >
              {isChristmas ? "Our Holiday Process" : "Our Process"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            {isChristmas ? "How We Light It Up" : "How We Do It"}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-12 h-[2px] mx-auto mt-4"
            style={{
              background: isChristmas ? "#E8B84C" : "#00A651",
              transformOrigin: "left",
            }}
          />
        </div>

        <div className="relative max-w-[860px] mx-auto">
          {/* Vertical connector line (desktop). On Christmas the line
              gets a gold tint so it threads the gold step circles. */}
          <div
            className="hidden md:block absolute left-[22px] top-6 bottom-6 w-px"
            style={{
              background: isChristmas
                ? "linear-gradient(to bottom, rgba(232,184,76,0.2), rgba(232,184,76,0.45), rgba(232,184,76,0.2))"
                : "linear-gradient(to bottom, rgba(10,46,92,0.08), rgba(10,46,92,0.15), rgba(10,46,92,0.08))",
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
                {/* Step number circle. On Christmas this is styled as
                    an ornament: gold gradient with a glowing ring. */}
                <div
                  className="shrink-0 w-11 h-11 md:w-[46px] md:h-[46px] rounded-full flex items-center justify-center font-black text-[0.9rem]"
                  style={{
                    background: isChristmas
                      ? "linear-gradient(135deg, #E8B84C 0%, #FFD79A 100%)"
                      : "linear-gradient(135deg, #0A2E5C 0%, #2B7DE9 100%)",
                    boxShadow: isChristmas
                      ? "0 0 0 4px white, 0 0 0 5px rgba(232,184,76,0.35), 0 6px 18px rgba(232,184,76,0.45)"
                      : "0 0 0 4px white, 0 6px 16px rgba(10,46,92,0.15)",
                    color: isChristmas ? "#5C3A0C" : "white",
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
function FaqSection({ detail, service }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [open, setOpen] = useState<number | null>(0);
  const isChristmas = service.slug === "christmas-lights";

  if (!detail.faqs?.length) return null;

  return (
    <section ref={ref} className="bg-white py-24 md:py-28">
      <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            {isChristmas && (
              <span className="w-3.5 h-3.5" style={{ color: "#E8B84C" }}>
                {FestiveIcons.wreath}
              </span>
            )}
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase"
              style={{ color: isChristmas ? "#B88830" : "#2B7DE9" }}
            >
              {isChristmas ? "Holiday FAQ" : "Questions"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
          >
            {isChristmas ? "Everything You're Wondering" : "Frequently Asked"}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-12 h-[2px] mx-auto mt-4"
            style={{
              background: isChristmas ? "#E8B84C" : "#00A651",
              transformOrigin: "left",
            }}
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
                  background: isOpen ? (isChristmas ? "#fffaf0" : "#f8fafc") : "white",
                  border: `1px solid ${isChristmas ? "rgba(232,184,76,0.3)" : "rgba(10,46,92,0.1)"}`,
                  boxShadow: isOpen
                    ? isChristmas
                      ? "0 8px 28px rgba(232,184,76,0.18)"
                      : "0 8px 28px rgba(10,46,92,0.08)"
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
                      background: isOpen
                        ? isChristmas
                          ? "#E8B84C"
                          : "#00A651"
                        : isChristmas
                          ? "rgba(232,184,76,0.15)"
                          : "rgba(10,46,92,0.08)",
                      color: isOpen ? (isChristmas ? "#5C3A0C" : "white") : "#0A2E5C",
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
function RelatedServices({ detail, service }: Props) {
  const related = detail.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is ServiceCard => Boolean(s));
  const isChristmas = service.slug === "christmas-lights";

  if (related.length === 0) return null;

  return (
    <section
      className="py-20 md:py-24"
      style={{ background: isChristmas ? "#fffaf0" : "#f5f7fa" }}
    >
      <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            {isChristmas && (
              <span className="w-3.5 h-3.5" style={{ color: "#E8B84C" }}>
                {FestiveIcons.gift}
              </span>
            )}
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase"
              style={{ color: isChristmas ? "#B88830" : "#2B7DE9" }}
            >
              {isChristmas ? "Pair It With" : "Related Services"}
            </span>
          </div>
          <h2
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em]"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)" }}
          >
            {isChristmas
              ? "Wash It Clean, Light It Up"
              : "You Might Also Need"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
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
      <Process service={service} detail={detail} />
      <FaqSection service={service} detail={detail} />
      <RelatedServices service={service} detail={detail} />
      <FinalCTA service={service} />
    </main>
  );
}
