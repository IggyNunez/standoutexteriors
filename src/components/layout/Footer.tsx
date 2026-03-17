"use client";

import Link from "next/link";
import Image from "next/image";
import { COMPANY_NAME, PHONE, PHONE_HREF, EMAIL, ADDRESS, NAV_LINKS, SERVICES, SERVICE_AREAS, SOCIAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative text-white pt-16 pb-8 overflow-hidden bg-blue-900">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geoPattern" x="0" y="0" width="600" height="650" patternUnits="userSpaceOnUse">
              {/* Large diamond — top left */}
              <g transform="translate(120, 80) rotate(45, 0, 0)">
                <rect width="120" height="120" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
                <rect x="20" y="20" width="80" height="80" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <rect x="40" y="40" width="40" height="40" fill="white" opacity="0.15" />
              </g>

              {/* Medium diamond — right side */}
              <g transform="translate(440, 300) rotate(45, 0, 0)">
                <rect width="90" height="90" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
                <rect x="20" y="20" width="50" height="50" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              </g>

              {/* Small diamond — bottom left */}
              <g transform="translate(80, 450) rotate(45, 0, 0)">
                <rect width="60" height="60" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                <rect x="15" y="15" width="30" height="30" fill="white" opacity="0.1" />
              </g>

              {/* Tiny diamond — top right */}
              <g transform="translate(500, 80) rotate(45, 0, 0)">
                <rect width="40" height="40" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              </g>

              {/* Dots cluster — center */}
              <circle cx="300" cy="200" r="3" fill="white" opacity="0.2" />
              <circle cx="310" cy="210" r="2" fill="white" opacity="0.15" />
              <circle cx="295" cy="215" r="2.5" fill="white" opacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geoPattern)" />
        </svg>
      </div>

      {/* Top orange divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-[1]"
        style={{ background: "linear-gradient(90deg, transparent, #FF6B35, transparent)" }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Centered logo + tagline */}
        <div className="flex flex-col items-center text-center mb-14">
          <Image
            src="/assets/logo-transparent.png"
            alt={COMPANY_NAME}
            width={200}
            height={80}
            className="brightness-110 drop-shadow-lg h-auto w-auto mb-5"
          />
          <p className="text-[0.88rem] leading-relaxed text-white max-w-sm">
            Denver&apos;s trusted pressure washing experts.
            Professional exterior cleaning for homes &amp; businesses.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:scale-110"
              style={{ border: "1px solid rgba(255,255,255,0.5)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Orange divider */}
        <div
          className="h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)" }}
        />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-orange-400">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-[0.85rem] text-white hover:text-white/80 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-[0.85rem] text-blue-300 hover:text-white transition-colors">
                  View All &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-orange-400">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {SERVICE_AREAS.slice(0, 6).map((area) => (
                <li key={area} className="text-[0.85rem] text-white">
                  {area}, NC
                </li>
              ))}
              <li className="text-white/40 text-[0.78rem] italic">&amp; surrounding areas</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-orange-400">
              Company
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.85rem] text-white hover:text-white/80 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.18em] mb-5 text-orange-400">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a href={PHONE_HREF} className="flex items-center gap-2 text-[0.85rem] text-white hover:text-white/80 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[0.85rem] text-white hover:text-white/80 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {EMAIL}
              </a>
              <span className="flex items-center gap-2 text-[0.85rem] text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {ADDRESS}
              </span>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-[0.78rem] font-extrabold tracking-[0.08em] uppercase text-blue-900 bg-white hover:bg-white/90 px-5 py-2.5 rounded-full transition-all hover:scale-105"
                >
                  Get Estimate
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-[0.78rem] text-white">
            &copy; {COMPANY_NAME} {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[0.78rem] text-white hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[0.78rem] text-white hover:text-white/80 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        {/* Designer credit */}
        <div className="text-center pt-4">
          <p className="text-[0.68rem] text-white/50">
            Site designed by{" "}
            <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/80 transition-colors">
              Ignacio Nunez
            </a>
            {" | "}
            <a href="mailto:dev@ignacionunez.dev" className="text-white/60 hover:text-white/80 transition-colors">
              dev@ignacionunez.dev
            </a>
            {" | "}
            <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/80 transition-colors">
              plaintalk.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
