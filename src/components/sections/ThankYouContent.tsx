"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { WaveTop, WaveBottom } from "@/components/ui/WaveDivider";
import { PHONE, PHONE_HREF, EMAIL } from "@/lib/constants";
import { fireLeadConversion } from "@/lib/conversion";
import { POST_SUBMIT_FAQS } from "@/lib/thank-you-faqs";
import rawReviews from "@/data/google-reviews.json";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────────
   Reviews. Pull the strongest 5-star reviews with real text from
   the same Google export the rest of the site uses, so this page
   can never drift from what's shown elsewhere.
──────────────────────────────────────────────────────────────── */
type RawReview = {
  name: string;
  avatar: string | null;
  rating: number;
  text: string;
  ago: string;
};

const REVIEWS = (rawReviews.reviews as RawReview[])
  .filter((r) => r.rating === 5 && r.text && r.text.length > 90 && r.text.length < 420)
  .slice(0, 6);

const REVIEW_TOTAL = rawReviews.total ?? rawReviews.reviews.length;

/* ─────────────────────────────────────────────────────────────
   The three-step reassurance strip.
──────────────────────────────────────────────────────────────── */
const NEXT_STEPS = [
  {
    num: "01",
    title: "We review your request",
    desc: "Ridge reads it personally, not a call center. He looks at your property and the services you asked about before quoting anything.",
  },
  {
    num: "02",
    title: "You get a real number",
    desc: "A written, itemized estimate by email or text, usually within a few hours. No vague ranges and no upsell scripts.",
  },
  {
    num: "03",
    title: "You pick the day",
    desc: "Say the word and we lock in a date that works for you. Most jobs are done in a single visit, and you don't have to be home.",
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FF6B35" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function ThankYouContent() {
  const [conversionFired, setConversionFired] = useState<boolean | null>(null);
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "0px 0px -80px 0px" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /**
   * Fire the Google Ads conversion on mount.
   *
   * gtag.js loads with strategy="afterInteractive", so on a fast client-side
   * navigation straight from the form it can still be in flight. Rather than
   * firing into a void we poll briefly for window.gtag and give up after
   * about 5 seconds. fireLeadConversion only consumes the staged record once
   * gtag actually exists, so retrying can never double-count.
   *
   * A "no-pending" result means this visitor did not just submit (a refresh,
   * a bookmark, a shared link). That is expected and we stop silently.
   */
  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    let attempts = 0;

    const attempt = () => {
      if (cancelled) return;

      const result = fireLeadConversion();
      if (result === "fired") {
        setConversionFired(true);
        return;
      }
      if (result === "no-pending") return;

      // Only "gtag-unavailable" is worth retrying.
      attempts += 1;
      if (attempts < 25) {
        timer = window.setTimeout(attempt, 200);
      } else {
        setConversionFired(false);
      }
    };

    attempt();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* ── Hero: confirmation ─────────────────────────────── */}
      <section className="relative pt-[130px] min-[1200px]:pt-[170px] pb-28 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-br from-[#061e38] via-blue-900 to-[#0d3870]" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-orange-500/[0.06] rounded-full blur-3xl pointer-events-none" />
        <WaveBottom fill="#ffffff" />

        <div className="relative z-[1] max-w-[860px] mx-auto px-[clamp(20px,4vw,80px)] text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="w-20 h-20 rounded-full bg-[#00A651] mx-auto mb-8 flex items-center justify-center shadow-[0_10px_40px_rgba(0,166,81,0.35)]"
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-4"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-orange-400">
              Request Received
            </span>
          </motion.div>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.2rem)] uppercase text-white leading-[0.95] mb-6">
            Thank you. We&apos;ve got it.
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-[1.05rem] text-white/70 leading-relaxed max-w-[620px] mx-auto mb-10"
          >
            Your free estimate request is in. Ridge reviews every one personally
            and gets back to most people within a few hours. Nothing else is
            needed from you right now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href={PHONE_HREF}
              className="w-full sm:w-auto px-9 py-4 bg-orange-500 text-white text-[0.75rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,53,0.35)] transition-all duration-300"
            >
              Need it sooner? Call {PHONE}
            </a>
            <Link
              href="/before-after"
              className="w-full sm:w-auto px-9 py-4 border border-white/25 text-white text-[0.75rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              See our recent work
            </Link>
          </motion.div>

          {/* Quiet fallback line. Only appears if the conversion could not be
              reported (ad blocker, consent denied, tag blocked). It reassures
              the customer without ever implying something went wrong. */}
          {conversionFired === false && (
            <p className="mt-8 text-[0.7rem] text-white/25">
              Your request was received successfully.
            </p>
          )}
        </div>
      </section>

      {/* ── What happens next ──────────────────────────────── */}
      <section ref={stepsRef} className="relative py-24 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center mb-14">
            <span className="section-eyebrow text-blue-500">What Happens Next</span>
            <h2 className="section-title mt-3 mb-4">Here&apos;s exactly what to expect</h2>
            <div className="w-16 h-[2px] mx-auto" style={{ background: "#00A651" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEXT_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: EASE }}
                className="relative p-8 rounded-2xl border border-blue-900/10 bg-gradient-to-b from-sky-50/60 to-white"
              >
                <span className="font-[family-name:var(--font-display)] text-[2.6rem] leading-none text-orange-500/25 block mb-3">
                  {step.num}
                </span>
                <h3 className="text-[1.05rem] font-bold text-blue-900 mb-3">{step.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-gray-700">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Direct contact strip */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
            <a href={PHONE_HREF} className="flex items-center gap-3 text-blue-900 hover:text-orange-500 transition-colors">
              <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-[0.66rem] text-gray-500 uppercase tracking-wide">Call or text</span>
                <span className="block text-[0.9rem] font-bold">{PHONE}</span>
              </span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-blue-900 hover:text-orange-500 transition-colors">
              <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0054A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-[0.66rem] text-gray-500 uppercase tracking-wide">Email</span>
                <span className="block text-[0.9rem] font-bold">{EMAIL}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────── */}
      <section
        className="water-shimmer-dark relative py-28 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(175deg, #061e38 0%, #0A2E5C 50%, #0d3870 100%)" }}
      >
        <WaveTop fill="#ffffff" />
        <WaveBottom fill="#f7fafc" />

        <div className="relative z-[1] max-w-[1300px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center mb-14">
            <span className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-orange-400">
              While You Wait
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] uppercase text-white leading-[1.05] mt-3 mb-5">
              You&apos;re in good company
            </h2>
            <div className="flex items-center justify-center gap-3 text-white/70 text-[0.9rem]">
              <Stars />
              <span>
                <strong className="text-white font-bold">5.0</strong> from {REVIEW_TOTAL}+ Google reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.figure
                key={`${review.name}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: EASE }}
                className="rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm p-7 flex flex-col"
              >
                <Stars count={review.rating} />
                <blockquote className="text-[0.9rem] leading-relaxed text-white/80 mt-4 mb-6 flex-1">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt=""
                      width={38}
                      height={38}
                      className="rounded-full object-cover w-[38px] h-[38px]"
                    />
                  ) : (
                    <span className="w-[38px] h-[38px] rounded-full bg-orange-500/80 flex items-center justify-center text-white text-[0.8rem] font-bold">
                      {review.name.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="block text-[0.85rem] font-bold text-white">{review.name}</span>
                    <span className="block text-[0.72rem] text-white/45">Google review · {review.ago}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reviews"
              className="inline-block px-8 py-3.5 border border-white/25 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Read all {REVIEW_TOTAL}+ reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQs ───────────────────────────────────────────── */}
      <section className="water-shimmer-light relative py-24 md:py-32 bg-canvas overflow-hidden">
        <div className="relative z-[1] max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="text-center mb-12">
            <span className="section-eyebrow text-blue-500">Common Questions</span>
            <h2 className="section-title mt-3 mb-4">Answers before we even call</h2>
            <div className="w-16 h-[2px] mx-auto" style={{ background: "#00A651" }} />
          </div>

          <div className="divide-y divide-blue-900/10 border-t border-b border-blue-900/10">
            {POST_SUBMIT_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.question}>
                  <button
                    className="w-full flex items-center justify-between py-5 px-2 text-left cursor-pointer transition-colors hover:bg-sky-50 rounded-lg"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[0.9rem] font-bold text-blue-900 pr-4 leading-snug">
                      {faq.question}
                    </span>
                    <motion.span
                      className="shrink-0 text-[1.2rem] font-light text-orange-500"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-2 pb-6 text-[0.88rem] leading-relaxed text-gray-700">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[0.85rem] text-gray-600 mt-10">
            Still have a question?{" "}
            <a href={PHONE_HREF} className="text-orange-500 font-bold hover:underline">
              Call or text {PHONE}
            </a>{" "}
            and Ridge will pick up.
          </p>
        </div>
      </section>
    </>
  );
}
