"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PHONE, PHONE_HREF, EMAIL, ADDRESS, SERVICES, CTA_STATS } from "@/lib/constants";
import type { LeadFormData } from "@/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    // Honeypot — humans won't see or fill this; bots usually will.
    const company = (form.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    const data: LeadFormData & { company?: string } = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Hero banner */}
      <div className="relative pt-[120px] min-[1200px]:pt-[160px] pb-20 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-orange-400">Get Started</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] uppercase text-white leading-none mb-4"
          >
            Get Your Free Estimate
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-[2px] bg-orange-500 mb-6"
            style={{ transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[1rem] text-white/60 leading-relaxed max-w-[560px]"
          >
            Fill out the form below and we&apos;ll get back to you with a free, no-obligation estimate.
          </motion.p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative py-24 md:py-32 bg-canvas">
        <div className="relative max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — text + stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-orange-500 block mb-3">Contact Us</span>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[1.1] tracking-wide text-blue-900 mb-6">
                Ready to Transform Your Property?
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-gray-500 mb-10">
                Professional pressure washing &amp; soft washing for your home or
                business. No contracts, no pressure. Just cleaner properties.
              </p>

              <div className="flex gap-8 mb-10">
                {CTA_STATS.map((stat) => (
                  <div key={stat.label}>
                    <strong className="font-[family-name:var(--font-display)] text-2xl font-bold text-orange-500 block">
                      {stat.value}
                    </strong>
                    <span className="text-[0.82rem] text-gray-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact info cards */}
              <div className="space-y-4">
                <a href={PHONE_HREF} className="flex items-center gap-3 text-blue-900 hover:text-orange-500 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[0.68rem] text-gray-500 uppercase tracking-wide">Phone</div>
                    <div className="text-[0.88rem] font-semibold">{PHONE}</div>
                  </div>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-blue-900 hover:text-orange-500 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[0.68rem] text-gray-500 uppercase tracking-wide">Email</div>
                    <div className="text-[0.88rem] font-semibold">{EMAIL}</div>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[0.68rem] text-gray-500 uppercase tracking-wide">Location</div>
                    <div className="text-[0.88rem] font-semibold text-blue-900">{ADDRESS}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="card-frost p-8 space-y-6">
                {/* Honeypot — hidden from users, catches bots */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-10000px",
                    top: "auto",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="company">Company (leave blank)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                      First Name *
                    </label>
                    <input
                      type="text" id="firstName" name="firstName" required
                      className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text" id="lastName" name="lastName" required
                      className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                      Email *
                    </label>
                    <input
                      type="email" id="email" name="email" required
                      className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                      Phone
                    </label>
                    <input
                      type="tel" id="phone" name="phone"
                      className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="(704) 555-1234"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    Property Address
                  </label>
                  <input
                    type="text" id="address" name="address"
                    className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="123 Main St, Denver, NC"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service" name="service"
                    className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    Message
                  </label>
                  <textarea
                    id="message" name="message" rows={4}
                    className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-orange-500 text-white text-[0.75rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Request"}
                </button>

                {status === "success" && (
                  <p className="text-center text-green-600 text-[0.82rem] font-semibold">
                    Thank you! We&apos;ll get back to you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-red-500 text-[0.82rem] font-semibold">
                    Something went wrong. Please call us at {PHONE}.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
