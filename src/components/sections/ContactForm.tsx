"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PHONE, PHONE_HREF, EMAIL, ADDRESS, SERVICES } from "@/lib/constants";
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
    const data: LeadFormData = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
    <section ref={ref} className="relative pt-[140px] md:pt-[160px] pb-24 md:pb-32 bg-canvas">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="section-eyebrow text-blue-500">Contact Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="section-title mb-4"
          >
            Get Your Free Estimate
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-[2px] bg-blue-700 mx-auto mb-6"
            style={{ transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="body-text max-w-[520px] mx-auto"
          >
            Fill out the form below and we&apos;ll get back to you with a free, no-obligation estimate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="card-frost p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
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
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
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
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="123 Main St, Denver, NC"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-[0.72rem] font-semibold text-blue-900 uppercase tracking-wide mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
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
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 text-[0.85rem] border border-gray-200 rounded-xl bg-white/60 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-orange-500 text-white text-[0.75rem] font-extrabold tracking-[0.08em] uppercase rounded-full border-2 border-blue-900/20 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
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

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="space-y-6"
          >
            <div className="card-frost p-6">
              <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] uppercase text-blue-900 mb-4">
                Contact Info
              </h3>
              <ul className="space-y-4">
                <li>
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
                </li>
                <li>
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
                </li>
                <li className="flex items-center gap-3">
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
                </li>
              </ul>
            </div>

            <div className="card-frost p-6">
              <h3 className="font-[family-name:var(--font-display)] text-[1.2rem] uppercase text-blue-900 mb-3">
                Business Hours
              </h3>
              <ul className="space-y-2 text-[0.82rem] text-gray-600">
                <li className="flex justify-between">
                  <span>Monday — Friday</span>
                  <span className="font-semibold text-blue-900">7am — 7pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-blue-900">8am — 5pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-blue-900">Closed</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
