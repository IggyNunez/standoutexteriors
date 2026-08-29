"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PHONE, SERVICES } from "@/lib/constants";
import { getAttribution, describeAttribution } from "@/lib/attribution";
import { stagePendingConversion } from "@/lib/conversion";
import type { LeadFormData } from "@/types";

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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    // Honeypot — humans won't see/fill this; bots usually will.
    const company = (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    // Real measured attribution (gclid, campaign, keyword) captured when the
    // visitor landed. See src/lib/attribution.ts.
    const attribution = getAttribution();

    const data: LeadFormData & { company?: string } = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email,
      phone,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      // Hard-stamped: this page is only reachable from the ad. The measured
      // campaign/keyword data gets prepended when it is available.
      source: describeAttribution(attribution, "Google Ads, /get-quote landing"),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      attribution,
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
        // Stage the conversion, then hand off to /thank-you which fires it
        // on page load. See src/lib/conversion.ts for why.
        stagePendingConversion({ formSource: "get-quote-landing", email, phone });
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // NOTE: on success we navigate to /thank-you, so there is deliberately no
  // inline success card here any more. The thank-you page is what fires the
  // Google Ads conversion.

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
