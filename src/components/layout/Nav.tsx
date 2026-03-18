"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, PHONE, PHONE_HREF, SOCIAL } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.6;

/* ── Chamfered corners for the mobile drawer card ── */
const CARD_CLIP = "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)";

/* ── Social icons ── */
function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1200) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Nav ── */}
      <motion.nav
        className="hidden min-[1200px]:block fixed top-0 left-0 right-0 z-[100]"
        initial={false}
        animate={{ height: scrolled ? 70 : 120 }}
        transition={{ duration: DURATION, ease: EASE }}
        style={{ height: 120 }}
      >
        <motion.div
          className="flex items-center h-full max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]"
          initial={false}
          animate={{ justifyContent: scrolled ? "center" : "space-between" }}
          transition={{ duration: DURATION, ease: EASE }}
        >
          {/* Big logo — shimmer-bordered frosted pill, collapses on scroll */}
          <motion.div
            className="shrink-0"
            initial={false}
            animate={{
              width: scrolled ? 0 : "auto",
              opacity: scrolled ? 0 : 1,
            }}
            transition={{ duration: DURATION, ease: EASE }}
            style={{ overflow: "hidden" }}
            aria-hidden={scrolled}
          >
            {/* Same spinning conic border as the nav pill */}
            <div
              className="nav-pill-border"
              style={{
                borderRadius: 9999,
                padding: "4px",
                boxShadow: "0 8px 36px rgba(0,0,0,0.4), 0 0 20px rgba(74,154,240,0.25)",
              }}
            >
              <a
                href="/"
                tabIndex={scrolled ? -1 : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  padding: "10px 22px",
                }}
              >
                <Image
                  src="/assets/logo-transparent.png"
                  alt="Stand Out Exterior Cleaning"
                  width={130}
                  height={52}
                  priority
                />
              </a>
            </div>
          </motion.div>

          {/* Pill — animated conic-gradient shimmer border */}
          <div
            className="nav-pill-border"
            style={{
              borderRadius: 9999,
              padding: "3px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              position: "relative",
            }}
          >
            <motion.div
              className="flex items-center"
              style={{ background: "#FFFFFF", borderRadius: 9999 }}
              initial={false}
              animate={{
                paddingLeft: 24,
                paddingRight: 10,
                paddingTop: 6,
                paddingBottom: 6,
                gap: scrolled ? 2 : 4,
              }}
              transition={{ duration: DURATION, ease: EASE }}
            >
              {/* Small logo inside pill — appears on scroll */}
              <motion.a
                href="/"
                className="shrink-0 flex items-center justify-center overflow-hidden"
                initial={false}
                animate={{
                  width: scrolled ? 72 : 0,
                  opacity: scrolled ? 1 : 0,
                  marginRight: scrolled ? 6 : 0,
                }}
                transition={{ duration: DURATION, ease: EASE }}
                aria-hidden={!scrolled}
                tabIndex={!scrolled ? -1 : undefined}
              >
                <Image
                  src="/assets/logo-transparent.png"
                  alt="Stand Out Exterior Cleaning"
                  width={72}
                  height={34}
                  className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                  style={{ width: 72, height: "auto" }}
                />
              </motion.a>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.7rem] font-bold tracking-[0.06em] uppercase text-blue-900 hover:text-blue-600 px-4 py-2 transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}

              {/* Social icon */}
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-blue-900/50 hover:text-blue-900 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <Link
                href="/contact"
                className="text-[0.68rem] font-extrabold tracking-[0.08em] uppercase text-white bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full transition-colors duration-200 ml-1 whitespace-nowrap"
              >
                Free Estimate
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Nav ── */}
      <nav className="min-[1200px]:hidden fixed top-0 left-0 right-0 z-[100] px-4 pt-3 flex items-start justify-between">
        {/* Big logo — shimmer-bordered frosted pill, collapses on scroll */}
        <motion.div
          className="shrink-0"
          initial={false}
          animate={{
            width: scrolled ? 0 : "auto",
            opacity: scrolled ? 0 : 1,
          }}
          transition={{ duration: DURATION, ease: EASE }}
          style={{ overflow: "hidden" }}
          aria-hidden={scrolled}
        >
          <div
            className="nav-pill-border"
            style={{
              borderRadius: 9999,
              padding: "4px",
              boxShadow: "0 6px 28px rgba(0,0,0,0.4), 0 0 16px rgba(74,154,240,0.25)",
            }}
          >
            <a
              href="/"
              tabIndex={scrolled ? -1 : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "8px 16px",
              }}
            >
              <Image
                src="/assets/logo-transparent.png"
                alt="Stand Out Exterior Cleaning"
                width={90}
                height={36}
                priority
              />
            </a>
          </div>
        </motion.div>

        {/* Pill — animated conic-gradient shimmer border */}
        <div
          className="nav-pill-border"
          style={{
            borderRadius: 9999,
            padding: "3px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
            position: "relative",
          }}
        >
          <motion.div
            className="flex items-center justify-between h-[56px] pr-4"
            style={{ background: "#FFFFFF", borderRadius: 9999 }}
            initial={false}
            animate={{
              paddingLeft: scrolled ? 6 : 16,
            }}
            transition={{ duration: DURATION, ease: EASE }}
          >
            {/* Small logo inside pill — appears on scroll */}
            <motion.a
              href="/"
              className="shrink-0 flex items-center justify-center overflow-hidden"
              initial={false}
              animate={{
                width: scrolled ? 64 : 0,
                opacity: scrolled ? 1 : 0,
                marginRight: scrolled ? 4 : 0,
              }}
              transition={{ duration: DURATION, ease: EASE }}
              aria-hidden={!scrolled}
              tabIndex={!scrolled ? -1 : undefined}
            >
              <Image
                src="/assets/logo-transparent.png"
                alt="Stand Out Exterior Cleaning"
                width={64}
                height={30}
                className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                style={{ width: 64, height: "auto" }}
              />
            </motion.a>

            <div className="flex items-center gap-3">
              {/* Social icon in mobile pill */}
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-blue-900/50 hover:text-blue-900 transition-colors"
              >
                <FacebookIcon className="w-[18px] h-[18px]" />
              </a>

              <button
                className="flex flex-col justify-center items-center w-10 h-10"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span className="block w-[20px] h-[2px] bg-blue-900 rounded-full" />
                <span className="block w-[20px] h-[2px] bg-blue-900 rounded-full mt-[5px]" />
                <span className="block w-[20px] h-[2px] bg-blue-900 rounded-full mt-[5px]" />
              </button>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* ── Mobile Drawer — chamfered card ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="min-[1200px]:hidden fixed inset-0 z-[200] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobile}
            />

            {/* Chamfered card drawer */}
            <motion.div
              className="min-[1200px]:hidden fixed top-1/2 right-3 -translate-y-1/2 z-[201] w-[270px]"
              style={{
                background: "#0A2E5C",
                clipPath: CARD_CLIP,
                padding: "3px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              }}
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "110%", opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div
                className="flex flex-col overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-3 pb-2">
                  <a href="/" onClick={closeMobile}>
                    <Image
                      src="/assets/logo-transparent.png"
                      alt="Stand Out Exterior Cleaning"
                      width={80}
                      height={32}
                      className="drop-shadow-sm"
                    />
                  </a>
                  <button
                    className="flex items-center justify-center w-7 h-7 rounded-full border border-blue-900/20 hover:border-blue-900/40 hover:bg-blue-900/5 transition-all"
                    onClick={closeMobile}
                    aria-label="Close menu"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#0A2E5C" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="1" y1="1" x2="11" y2="11" />
                      <line x1="11" y1="1" x2="1" y2="11" />
                    </svg>
                  </button>
                </div>

                <div className="mx-5 h-px bg-blue-900/10" />

                {/* Nav links */}
                <div className="flex flex-col px-5 pt-2">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: 0.08 + i * 0.04, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobile}
                        className="text-[0.9rem] font-bold tracking-[0.05em] uppercase text-blue-900 hover:text-blue-600 py-[12px] transition-colors flex items-center justify-between"
                      >
                        {link.label}
                        <svg width="7" height="7" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-30">
                          <path d="M2 1l4 3-4 3" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom section */}
                <div className="px-5 pb-4 pt-2">
                  <div className="h-px bg-blue-900/10 mb-3" />

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ease: EASE }}
                  >
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="block w-full text-[0.7rem] font-extrabold tracking-[0.08em] uppercase text-white bg-orange-500 hover:bg-orange-600 py-2.5 rounded-full transition-colors text-center"
                    >
                      Get A Free Estimate
                    </Link>
                  </motion.div>

                  {/* Phone */}
                  <motion.a
                    href={PHONE_HREF}
                    className="block text-[0.9rem] font-extrabold tracking-[0.04em] text-blue-900 text-center mt-2 hover:text-blue-600 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {PHONE}
                  </motion.a>

                  {/* Social row */}
                  <motion.div
                    className="flex items-center justify-center gap-3 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    <a
                      href={SOCIAL.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-blue-900/25 text-blue-900/60 hover:text-blue-900 hover:border-blue-900/50 transition-all"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
