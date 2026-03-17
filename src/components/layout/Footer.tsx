import Link from "next/link";
import Image from "next/image";
import { COMPANY_NAME, PHONE, PHONE_HREF, EMAIL, ADDRESS, NAV_LINKS, SERVICES, SERVICE_AREAS, SOCIAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)] pt-16 pb-8">
        {/* Top — Logo + tagline */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image
            src="/assets/logo-transparent.png"
            alt={COMPANY_NAME}
            width={200}
            height={80}
            className="brightness-110 drop-shadow-lg mb-4"
          />
          <p className="text-white/50 text-xs tracking-wide uppercase">
            Denver&apos;s Trusted Pressure Washing Experts
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-blue-300 mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="text-white/60 text-[0.82rem] hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-blue-300 text-[0.82rem] hover:text-white transition-colors">
                  View All &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-blue-300 mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {SERVICE_AREAS.slice(0, 6).map((area) => (
                <li key={area} className="text-white/60 text-[0.82rem]">
                  {area}, NC
                </li>
              ))}
              <li className="text-white/40 text-[0.78rem] italic">& surrounding areas</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-blue-300 mb-4">Company</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 text-[0.82rem] hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wider text-blue-300 mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2 text-white/80 text-[0.85rem] font-semibold hover:text-orange-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-white/60 text-[0.82rem] hover:text-white transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-[0.82rem]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {ADDRESS}
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-2 mt-4">
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.72rem] text-white/35">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
