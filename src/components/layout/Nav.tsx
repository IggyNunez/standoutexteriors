"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Desktop / Mobile Top Bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        {/* Logo — left on mobile, above pill on desktop when scrolled */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute left-4 top-4 md:left-6 z-50 md:relative md:hidden"
        >
          <Link href="/">
            <Image
              src="/assets/logo-transparent.png"
              alt="Stand Out Exterior Cleaning"
              width={120}
              height={48}
              className="drop-shadow-lg"
              priority
            />
          </Link>
        </motion.div>

        {/* ── Pill Nav ── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className={`
            flex items-center gap-2 px-2 py-2 rounded-full
            bg-white/95 backdrop-blur-xl
            border-2 border-blue-700/20
            shadow-[0_4px_24px_rgba(10,46,92,0.10)]
            transition-all duration-500
            ${scrolled ? "scale-[0.97]" : ""}
          `}
        >
          {/* Desktop logo inside pill */}
          <Link href="/" className="hidden md:block pl-2">
            <Image
              src="/assets/logo-transparent.png"
              alt="Stand Out Exterior Cleaning"
              width={100}
              height={40}
              className="drop-shadow-sm"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 px-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[0.7rem] font-bold tracking-[0.06em] uppercase text-blue-900 hover:text-blue-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="text-[0.68rem] font-bold tracking-wide text-blue-900 hover:text-blue-700 transition-colors px-3"
            >
              {PHONE}
            </a>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-orange-500 text-white text-[0.68rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-blue-900 hover:bg-orange-600 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)]"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden ml-auto p-3 flex flex-col gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={drawerOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-blue-900 rounded-full origin-center"
            />
            <motion.span
              animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[2px] bg-blue-900 rounded-full"
            />
            <motion.span
              animate={drawerOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-blue-900 rounded-full origin-center"
            />
          </button>
        </motion.nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-blue-900/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white/97 backdrop-blur-xl border-l-3 border-blue-700 shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 px-8 pb-8">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, ease: EASE }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setDrawerOpen(false)}
                        className="block py-3 text-[0.85rem] font-bold tracking-[0.06em] uppercase text-blue-900/75 hover:text-blue-900 transition-colors border-b border-gray-200"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-2 text-blue-900 font-bold text-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                    {PHONE}
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setDrawerOpen(false)}
                    className="text-center px-6 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-blue-900 hover:bg-orange-600 transition-all"
                  >
                    Get A Free Estimate
                  </Link>
                </div>

                <div className="mt-auto flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full border-2 border-blue-900/20 flex items-center justify-center text-blue-900/50 hover:text-blue-900 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border-2 border-blue-900/20 flex items-center justify-center text-blue-900/50 hover:text-blue-900 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
