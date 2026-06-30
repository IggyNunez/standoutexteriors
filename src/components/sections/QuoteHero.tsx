"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { m as motion } from "framer-motion";
import { PHONE, PHONE_HREF, COMPANY_NAME, CTA_STATS } from "@/lib/constants";
import QuoteForm from "@/components/sections/QuoteForm";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/**
 * QuoteHero — the same premium video-background hero treatment as the homepage
 * Hero, but with the lead form embedded on the right. Reuses the brand's logo,
 * water shimmer, animated waves, and giant display type so the landing page
 * matches the real site instead of approximating it.
 */
export default function QuoteHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useIsDesktop();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const start = () => setShouldLoadVideo(true);
    if (document.readyState === "complete") {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
      ric ? ric(start, { timeout: 2000 }) : setTimeout(start, 1200);
    } else {
      window.addEventListener("load", start, { once: true });
      return () => window.removeEventListener("load", start);
    }
  }, [isDesktop]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => { if (video.currentTime >= 5) video.currentTime = 0; };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [shouldLoadVideo]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#061e38]">
      {/* ── Video / image background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="hero-bg-image absolute inset-0 w-full h-full"
          style={{ backgroundSize: "cover", backgroundPosition: "center" }}
          role="img"
          aria-label="Stand Out Exterior Cleaning pressure washing a home in Denver NC"
        >
          {isDesktop && shouldLoadVideo && (
            <video ref={videoRef} autoPlay muted playsInline preload="auto"
              poster="/assets/hero-bg.webp" className="w-full h-full object-cover">
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-[#0a2a4a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0a3a6a]/20 to-[#061e38]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(ellipse 80px 40px at 20% 30%, rgba(120,200,255,1) 0%, transparent 70%),radial-gradient(ellipse 100px 50px at 80% 20%, rgba(160,220,255,1) 0%, transparent 70%)`,
          animation: "waterShimmer 6s ease-in-out infinite alternate",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-[clamp(20px,4vw,70px)] pt-[110px] md:pt-[130px] pb-[90px] min-h-[100svh] flex flex-col justify-center">
        {/* Logo */}
        <motion.a href="/" className="inline-block mb-6 w-fit"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <Image src="/assets/logo-transparent.png" alt={COMPANY_NAME} width={150} height={60}
            className="h-[clamp(48px,7vw,70px)] w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]" priority />
        </motion.a>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* Left — pitch */}
          <div>
            <motion.div className="inline-flex items-center gap-2 mb-5"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
                style={{ background: "rgba(120,200,255,0.15)", border: "1px solid rgba(120,200,255,0.3)", color: "rgba(160,225,255,0.9)", backdropFilter: "blur(8px)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                ★★★★★ 5.0 · Lake Norman&apos;s #1 Exterior Cleaning
              </span>
            </motion.div>

            <h1 className="font-[family-name:var(--font-display)] text-[clamp(40px,7vw,84px)] font-[900] uppercase leading-[0.92] text-white mb-3 tracking-[0.02em]">
              Make Your Property<br />
              <span style={{ color: "#00A651" }} className="block text-[clamp(52px,11vw,120px)] leading-[0.88]">Stand Out.</span>
            </h1>

            <motion.p className="text-[clamp(0.95rem,1.6vw,1.15rem)] leading-[1.6] text-white/90 max-w-[520px] mb-7"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
              Professional pressure &amp; soft washing across Denver and the Lake Norman area.
              Driveways, siding, roofs, patios — spotless. <strong className="text-white">Get your free estimate →</strong>
            </motion.p>

            <div className="flex flex-wrap gap-x-9 gap-y-4 mb-7">
              {CTA_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-[family-name:var(--font-display)] text-[2rem] font-[900] leading-none" style={{ color: "#00A651" }}>{stat.value}</div>
                  <div className="text-[0.78rem] text-white/65 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href={PHONE_HREF} className="inline-flex items-center gap-2.5 text-white font-bold text-[1.05rem]">
              <span className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_4px_16px_rgba(255,107,53,0.4)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
              </span>
              Or call {PHONE}
            </a>
          </div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="text-gray-900">
            <div className="mb-3 text-center">
              <span className="text-white text-[0.8rem] font-bold uppercase tracking-[0.1em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">↓ Free 60-second estimate ↓</span>
            </div>
            <QuoteForm />
          </motion.div>
        </div>
      </div>

      {/* ── Animated wave at the bottom (white, transitions into WhyUs) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
          <motion.path fill="white"
            initial={{ d: "M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z" }}
            animate={{ d: [
              "M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z",
              "M0,20 C360,5 720,50 1080,22 C1260,10 1380,45 1440,35 L1440,60 L0,60 Z",
              "M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z",
            ] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        </svg>
      </div>

      <style>{`
        .hero-bg-image { background-image: url('/assets/hero-bg-mobile.webp'); }
        @media (min-width: 768px) { .hero-bg-image { background-image: url('/assets/hero-bg.webp'); } }
        @keyframes waterShimmer { 0%{transform:translate(0,0) scale(1);} 50%{transform:translate(25px,-12px) scale(1.08);} 100%{transform:translate(15px,-5px) scale(1.05);} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(0.75);} }
      `}</style>
    </section>
  );
}
