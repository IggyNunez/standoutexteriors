"use client";

import { useId, useState } from "react";
import { PHONE, SERVICES } from "@/lib/constants";
import { getAttribution, describeAttribution } from "@/lib/attribution";
import { stagePendingConversion } from "@/lib/conversion";
import type { LeadFormData } from "@/types";

/**
 * QuoteForm: the short free-estimate form.
 *
 * Built for the unlinked /get-quote ad landing page, now also rendered in the
 * hero of every service page and /commercial. The prop defaults reproduce the
 * /get-quote behavior exactly, so that page is unchanged; other pages pass
 * their own props.
 *
 * Every instance posts to /api/lead with the visitor's measured ad
 * attribution, then hands off to /thank-you, which fires the Google Ads
 * conversion. The conversion only ever fires on a confirmed res.ok (a real
 * lead that reached /api/lead), never on a page view.
 */
interface QuoteFormProps {
  /**
   * Fallback for the lead email's "Found Us Via" line when the visitor did
   * not arrive from an ad. Measured campaign and keyword data is prepended
   * when it exists. Pass the page name so Ridge can see which page converted.
   */
  source?: string;
  /** Sent with the conversion as form_source, so GA can tell forms apart. */
  formSource?: string;
  /** Preselects the service dropdown. Must match a SERVICES title exactly. */
  defaultService?: string;
  /** Drops the optional message box, keeping the form short inside a hero. */
  compact?: boolean;
}

const INPUT =
  "w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
const LABEL = "block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2";

export default function QuoteForm({
  source = "Google Ads, /get-quote landing",
  formSource = "get-quote-landing",
  defaultService = "",
  compact = false,
}: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  // Unique per instance. This form now renders on many pages, and fixed ids
  // would collide the moment two ever share a page, silently breaking the
  // label-to-input link for screen readers and click-to-focus.
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    // Honeypot: humans won't see or fill this; bots usually will.
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
      source: describeAttribution(attribution, source),
      // The message box is absent in compact mode, so read it null-safely.
      message: (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.value ?? "",
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
        form.reset();
        // Stage the conversion, then hand off to /thank-you which fires it
        // on page load. See src/lib/conversion.ts for why.
        stagePendingConversion({ formSource, email, phone });

        // Full page load rather than router.push(), so the URL definitely
        // changes and gtag.js initializes fresh on /thank-you. Status stays
        // "sending" so the button never flashes a success message that would
        // look like the redirect failed.
        window.location.assign("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // NOTE: on success we navigate to /thank-you, so there is deliberately no
  // inline success card here. The thank-you page is what fires the Google Ads
  // conversion.

  return (
    // text-gray-900 is set here, not left to the parent. Heroes set
    // text-white on their section, and the inputs inherit color, so without
    // this the visitor's typed text renders white on a white card.
    <form onSubmit={handleSubmit} className="card-frost p-6 md:p-8 space-y-5 text-gray-900">
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={fid("company")}>Company (leave blank)</label>
        <input type="text" id={fid("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor={fid("firstName")} className={LABEL}>First Name *</label>
          <input type="text" id={fid("firstName")} name="firstName" required autoComplete="given-name"
            className={INPUT} placeholder="John" />
        </div>
        <div>
          <label htmlFor={fid("lastName")} className={LABEL}>Last Name *</label>
          <input type="text" id={fid("lastName")} name="lastName" required autoComplete="family-name"
            className={INPUT} placeholder="Smith" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor={fid("phone")} className={LABEL}>Phone *</label>
          <input type="tel" id={fid("phone")} name="phone" required autoComplete="tel"
            className={INPUT} placeholder="(704) 555-1234" />
        </div>
        <div>
          <label htmlFor={fid("email")} className={LABEL}>Email *</label>
          <input type="email" id={fid("email")} name="email" required autoComplete="email"
            className={INPUT} placeholder="john@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor={fid("address")} className={LABEL}>Property Address</label>
        <input type="text" id={fid("address")} name="address" autoComplete="street-address"
          className={INPUT} placeholder="123 Main St, Denver, NC" />
      </div>

      <div>
        <label htmlFor={fid("service")} className={LABEL}>What do you need cleaned?</label>
        <select id={fid("service")} name="service" defaultValue={defaultService} className={INPUT}>
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Multiple / Not sure">Multiple / Not sure</option>
        </select>
      </div>

      {!compact && (
        <div>
          <label htmlFor={fid("message")} className={LABEL}>Anything else? (optional)</label>
          <textarea id={fid("message")} name="message" rows={3}
            className={`${INPUT} resize-none`} placeholder="Tell us about your property..." />
        </div>
      )}

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
