"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PHONE, PHONE_HREF } from "@/lib/constants";
import StatsBar from "@/components/sections/StatsBar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Floating water-drop particle ── */
function WaterParticle({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{
        left: x,
        width: size,
        height: size,
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(120,200,255,0.15))",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 8px rgba(80,160,255,0.2)",
      }}
      initial={{ y: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y: [0, -320, -640],
        opacity: [0, 0.7, 0],
        scale: [0.6, 1, 0.8],
        x: [0, 18, -12],
      }}
      transition={{
        duration: 7 + delay * 1.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const PARTICLES = [
  { delay: 0,   x: "8%",  size: 8  },
  { delay: 1.2, x: "22%", size: 5  },
  { delay: 2.5, x: "38%", size: 10 },
  { delay: 0.8, x: "55%", size: 6  },
  { delay: 3.1, x: "68%", size: 9  },
  { delay: 1.7, x: "80%", size: 5  },
  { delay: 4.0, x: "91%", size: 7  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const waveY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= 5) video.currentTime = 0;
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70svh] md:h-[100svh] overflow-hidden bg-white"
    >
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-[120%]"
          style={{ y: videoY }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Stand Out Exterior Cleaning professionals pressure washing a home in Denver NC"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Base colour tint — cool aqua-blue for "water" feel */}
        <div className="absolute inset-0 bg-[#0a2a4a]/50" />
        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0a3a6a]/10 to-[#061e38]/80" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />

        {/* ── Water shimmer / caustic light layer ── */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80px 40px at 20% 30%, rgba(120,200,255,1) 0%, transparent 70%),
              radial-gradient(ellipse 60px 30px at 60% 55%, rgba(80,180,255,1) 0%, transparent 70%),
              radial-gradient(ellipse 100px 50px at 80% 20%, rgba(160,220,255,1) 0%, transparent 70%)
            `,
            animation: "waterShimmer 6s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 120px 60px at 40% 70%, rgba(100,210,255,1) 0%, transparent 70%),
              radial-gradient(ellipse 70px 35px at 75% 40%, rgba(60,170,255,1) 0%, transparent 70%)
            `,
            animation: "waterShimmer 9s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* ── Floating water particles ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <WaterParticle key={i} {...p} />
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] pt-[110px] pb-[80px] md:pt-[clamp(100px,18svh,180px)] md:pb-[clamp(60px,10svh,120px)]"
        style={{ y: textY }}
      >
        <div className="max-w-[1000px]">
          {/* Eyebrow badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <span
              className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(120,200,255,0.15)",
                border: "1px solid rgba(120,200,255,0.3)",
                color: "rgba(160,225,255,0.9)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              Lake Norman&apos;s #1 Exterior Cleaning
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(42px,8vw,110px)] md:text-[clamp(48px,10svh,110px)] font-[900] uppercase leading-[0.95] text-white mb-4 md:mb-[clamp(12px,1.5svh,24px)] tracking-[0.03em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Make Your Property<br />
            <span style={{ color: "#00A651" }} className="block text-[clamp(60px,16vw,222px)] md:text-[clamp(68px,20svh,222px)] leading-[0.9]">Stand Out.</span>
          </motion.h1>

          {/* Italic subline */}
          <motion.p
            className="italic text-[clamp(1.3rem,3.5vw,2.6rem)] md:text-[clamp(1.3rem,3.5svh,2.6rem)] mb-4 md:mb-[clamp(12px,2svh,32px)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            style={{ color: "#00A651" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            Denver&apos;s Trusted Pressure Washing Experts.
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-[0.9rem] md:text-[clamp(0.85rem,1.5svh,1.15rem)] leading-[1.6] text-white/90 max-w-[560px] mb-6 md:mb-[clamp(16px,3svh,48px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Professional pressure washing &amp; soft washing for homes and businesses
            across the Lake Norman area. Free estimates. Call today.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-white bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(255,107,53,0.3)] hover:-translate-y-0.5"
            >
              Get A Free Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 text-[0.78rem] font-bold tracking-[0.08em] uppercase text-white border border-white/20 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.15] hover:border-white/40 px-8 py-4 rounded-full transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              {PHONE}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Animated SVG wave at the bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        style={{ y: waveY }}
      >
        {/* Back wave — lighter, slower */}
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ display: "block", marginBottom: "-1px" }}
        >
          <motion.path
            d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z"
            fill="rgba(255,255,255,0.07)"
            animate={{
              d: [
                "M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z",
                "M0,50 C240,20 480,70 720,45 C960,20 1200,65 1440,35 L1440,80 L0,80 Z",
                "M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        {/* Front wave — solid white, faster */}
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full -mt-8"
          preserveAspectRatio="none"
          style={{ display: "block", marginBottom: "-1px" }}
        >
          <motion.path
            d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z"
            fill="white"
            animate={{
              d: [
                "M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z",
                "M0,20 C360,5 720,50 1080,22 C1260,10 1380,45 1440,35 L1440,60 L0,60 Z",
                "M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* ── CSS keyframe definitions ── */}
      <style>{`
        @keyframes waterShimmer {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(30px, -15px) scale(1.1); }
          66%  { transform: translate(-20px, 10px) scale(0.95); }
          100% { transform: translate(15px, -5px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>

      {/* Frosted stats bar overlaying bottom of hero */}
      <StatsBar />
    </section>
  );
}
