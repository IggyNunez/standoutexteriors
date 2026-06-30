"use client";

import { useState } from "react";
import { PHONE, PHONE_HREF, SERVICES } from "@/lib/constants";
import type { LeadFormData } from "@/types";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * QuoteForm — the conversion form for the dedicated, UNLINKED ad landing page.
 *
 * Why this is separate from ContactForm:
 *  - This page (/get-quote) is not in the site menu. The ONLY way a visitor
 *    reaches it is by clicking a Google Ad. So every submission here is an
 *    ad-driven lead — clean attribution, no organic guesswork.
 *  - We stamp source = "Google Ads — /get-quote landing" on every lead so the
 *    email/CRM record proves where it came from, independent of Google's own
 *    attribution.
 *  - The conversion still fires ONLY on a confirmed res.ok (a real lead that
 *    reached /api/lead) — never on a page view.
 */
export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    // Honeypot — humans won't see/fill this; bots usually will.
    const company = (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";

    const data: LeadFormData & { company?: string } = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      // Hard-stamped: this page is only reachable from the ad.
      source: "Google Ads — /get-quote landing",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        // Fire the Google Ads conversion — ONLY on confirmed success.
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: "AW-10894480187/8sSpCLHUkoAcELum8soo",
          });
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card-frost p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500 mx-auto mb-5 flex items-center justify-center">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase text-blue-900 mb-2">
          Request received!
        </h3>
        <p className="text-[0.95rem] text-gray-700 mb-4">
          Thanks — Ridge will personally get back to you with your free estimate, usually within a few hours.
        </p>
        <a href={PHONE_HREF} className="text-orange-500 font-bold text-[0.95rem]">
          Need it sooner? Call {PHONE}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-frost p-6 md:p-8 space-y-5">
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company">Company (leave blank)</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">First Name *</label>
          <input type="text" id="firstName" name="firstName" required
            className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">Last Name *</label>
          <input type="text" id="lastName" name="lastName" required
            className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Smith" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">Phone *</label>
          <input type="tel" id="phone" name="phone" required
            className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="(704) 555-1234" />
        </div>
        <div>
          <label htmlFor="email" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">Email *</label>
          <input type="email" id="email" name="email" required
            className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="john@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">Property Address</label>
        <input type="text" id="address" name="address"
          className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          placeholder="123 Main St, Denver, NC" />
      </div>

      <div>
        <label htmlFor="service" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">What do you need cleaned?</label>
        <select id="service" name="service"
          className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Multiple / Not sure">Multiple / Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">Anything else? (optional)</label>
        <textarea id="message" name="message" rows={3}
          className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          placeholder="Tell us about your property..." />
      </div>

      <button type="submit" disabled={status === "sending"}
        className="w-full py-4 bg-orange-500 text-white text-[0.8rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
        {status === "sending" ? "Sending..." : "Get My Free Estimate →"}
      </button>

      <p className="text-center text-[0.72rem] text-gray-500">
        No obligation. No spam. Ridge replies personally, usually within a few hours.
      </p>

      {status === "error" && (
        <p className="text-center text-red-500 text-[0.82rem] font-semibold">
          Something went wrong. Please call us at {PHONE}.
        </p>
      )}
    </form>
  );
}
