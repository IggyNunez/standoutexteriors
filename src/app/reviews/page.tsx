"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { PHONE, PHONE_HREF } from "@/lib/constants";
import rawData from "@/data/google-reviews.json";

/* ── Types ── */
type Review = {
  name: string;
  avatar: string | null;
  isLocalGuide: boolean;
  rating: number;
  text: string;
  ago: string;
  isoDate?: string | null;
  photos: { src: string; caption: string }[];
  source?: string;
};

/* ── Local overrides ── */
const LOCAL_PHOTO_OVERRIDES: Record<string, { avatar?: string; photos?: { src: string; caption: string }[] }> = {
  "Layne Veneri": {
    avatar: "/assets/layne-veneri.png",
    photos: [
      { src: "/assets/layne-before-after.webp", caption: "Paver cleaning before & after" },
      { src: "/assets/layne-before-after-2.webp", caption: "Paver circle before & after" },
    ],
  },
  "Rachel Cartner": {
    avatar: "/assets/rachel-cartner.png",
    photos: [{ src: "/assets/rachel-before-after.webp", caption: "Driveway cleaning — after" }],
  },
  "Heidi Erickson": {
    avatar: "/assets/heidi-erickson-avatar.png",
    photos: [{ src: "/assets/heidi-erickson.webp", caption: "Driveway & sidewalk cleaning — after" }],
  },
};

const ALL_REVIEWS: Review[] = (rawData.reviews as Review[]).map((r) => {
  const ov = LOCAL_PHOTO_OVERRIDES[r.name];
  return { ...r, avatar: ov?.avatar || r.avatar || null, photos: ov?.photos || r.photos };
});

/* Photos-first, then by date */
const SORTED_REVIEWS = [
  ...ALL_REVIEWS.filter(r => r.photos.length > 0),
  ...ALL_REVIEWS.filter(r => r.photos.length === 0),
];

const TOTAL = SORTED_REVIEWS.length;
const WITH_PHOTOS = SORTED_REVIEWS.filter(r => r.photos.length > 0).length;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Icons ── */
function Star({ size = 13, filled = true }: { size?: number; filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#00A651" : "none"} stroke={filled ? "none" : "#00A651"} strokeWidth="1.5" style={{ flexShrink: 0 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ── Lightbox ── */
function Lightbox({ photo, onClose, onPrev, onNext, hasPrev, hasNext }: {
  photo: { src: string; caption: string };
  onClose: () => void; onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{ maxWidth: "min(860px,94vw)", width: "100%", position: "relative" }}
        initial={{ scale: 0.88, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)" }}>
          <Image src={photo.src} alt={photo.caption} width={860} height={640}
            style={{ width: "100%", height: "auto", display: "block" }} priority />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)", padding: "32px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{photo.caption}</span>
            <span style={{ fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(0,166,81,0.9)", color: "white", padding: "3px 10px", borderRadius: 4 }}>Customer Photo</span>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close"
          style={{ position: "absolute", top: -16, right: -16, width: 36, height: 36, borderRadius: "50%", background: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0A2E5C" strokeWidth="2.5" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
        </button>
        {hasPrev && (
          <button onClick={e => { e.stopPropagation(); onPrev(); }} aria-label="Previous"
            style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M9 2L4 7l5 5"/></svg>
          </button>
        )}
        {hasNext && (
          <button onClick={e => { e.stopPropagation(); onNext(); }} aria-label="Next"
            style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 2l5 5-5 5"/></svg>
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Review Card ── */
function ReviewCard({ review, globalIdx, onOpenLightbox, animDelay = 0 }: {
  review: Review;
  globalIdx: number;
  onOpenLightbox: (ri: number, pi: number) => void;
  animDelay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: animDelay, ease: EASE }}
      style={{
        background: "rgba(255,255,255,0.055)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 18,
        padding: "24px 24px 20px",
        display: "flex", flexDirection: "column", gap: 0,
        position: "relative", overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Top shimmer */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(0,166,81,0.5), rgba(126,207,255,0.35), transparent)" }} />

      {/* Stars + Google badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 2 }}>
          {[...Array(5)].map((_, i) => <Star key={i} size={12} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: "2px 8px" }}>
          <GoogleLogo size={12} />
          <span style={{ fontSize: "0.55rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Google</span>
        </div>
        {review.photos.length > 0 && (
          <span style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(0,166,81,0.2)", border: "1px solid rgba(0,166,81,0.4)", color: "#4ade80", padding: "1px 7px", borderRadius: 9999, marginLeft: "auto" }}>
            📷 Photos
          </span>
        )}
      </div>

      {/* Quote */}
      <div style={{ fontFamily: "Georgia,serif", fontSize: 40, lineHeight: 0.7, color: "rgba(0,166,81,0.15)", marginBottom: 4, userSelect: "none" }}>&ldquo;</div>
      <p style={{ fontSize: "0.84rem", fontStyle: "italic", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", flex: 1, marginBottom: 14 }}>
        {review.text}
      </p>

      {/* Photo thumbnails */}
      {review.photos.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {review.photos.map((photo, pi) => (
            <motion.button
              key={pi}
              onClick={() => onOpenLightbox(globalIdx, pi)}
              aria-label={`View: ${photo.caption}`}
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.93 }}
              className="group"
              style={{ position: "relative", width: 54, height: 54, flexShrink: 0, borderRadius: 8, overflow: "hidden", border: "1.5px solid rgba(0,166,81,0.3)", cursor: "pointer", background: "none", padding: 0 }}
            >
              <Image src={photo.src} alt={photo.caption} fill style={{ objectFit: "cover" }} sizes="54px" />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,166,81,0)", transition: "background 0.2s" }}
                className="group-hover:!bg-[rgba(0,166,81,0.45)]" />
            </motion.button>
          ))}
        </div>
      )}

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {review.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.avatar} alt={review.name}
            style={{ width: 38, height: 38, borderRadius: "50%", border: "2px solid rgba(0,166,81,0.4)", objectFit: "cover", flexShrink: 0 }} />
        ) : (
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#2B7DE9,#7ecfff)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(0,166,81,0.3)", flexShrink: 0 }}>
            <span style={{ fontWeight: 900, color: "white", fontSize: "0.9rem" }}>{review.name.charAt(0)}</span>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 1 }}>
            <strong style={{ fontSize: "0.82rem", fontWeight: 700, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{review.name}</strong>
            {review.isLocalGuide && (
              <span style={{ fontSize: "0.48rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(43,125,233,0.2)", border: "1px solid rgba(43,125,233,0.35)", color: "#7ecfff", padding: "1px 5px", borderRadius: 9999, flexShrink: 0 }}>Guide</span>
            )}
          </div>
          <span style={{ fontSize: "0.56rem", color: "rgba(255,255,255,0.3)" }}>{review.ago}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Sticky CTA bar ── */
function StickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] md:hidden"
      style={{
        background: "rgba(10,46,92,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 16px",
        display: "flex", gap: 10,
      }}
    >
      <Link href="/contact" style={{ flex: 1, background: "#f97316", color: "white", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: 9999, padding: "12px 0", textAlign: "center", textDecoration: "none", display: "block" }}>
        Free Estimate
      </Link>
      <a href={PHONE_HREF} style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "white", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 9999, padding: "12px 0", textAlign: "center", textDecoration: "none", display: "block" }}>
        📞 Call Now
      </a>
    </div>
  );
}

/* ── Hero stats ── */
const STATS = [
  { val: `${TOTAL}`, label: "Real Reviews", color: "#00A651" },
  { val: "5.0★", label: "Average Rating", color: "#7ecfff" },
  { val: `${WITH_PHOTOS}`, label: "With Photos", color: "#00A651" },
  { val: "100%", label: "Google Verified", color: "#7ecfff" },
];

/* ── Main page ── */
export default function ReviewsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const [lightboxReviewIdx, setLightboxReviewIdx] = useState<number | null>(null);
  const [lightboxPhotoIdx, setLightboxPhotoIdx] = useState(0);
  const lbPhotos = lightboxReviewIdx !== null ? SORTED_REVIEWS[lightboxReviewIdx].photos : [];
  const lbPhoto = lbPhotos[lightboxPhotoIdx] ?? null;

  const [filter, setFilter] = useState<"all" | "photos">("all");
  const displayReviews = filter === "photos" ? SORTED_REVIEWS.filter(r => r.photos.length > 0) : SORTED_REVIEWS;

  return (
    <>
      <Nav />
      <main style={{ background: "linear-gradient(175deg,#061e38 0%,#0A2E5C 40%,#0d3870 100%)", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{ paddingTop: "clamp(100px,14vw,160px)", paddingBottom: "clamp(48px,6vw,80px)", position: "relative", overflow: "hidden" }}
          className="px-[clamp(20px,4vw,80px)]"
        >
          {/* Decorative blobs */}
          <div style={{ position: "absolute", top: "0%", left: "10%", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(43,125,233,0.14) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,166,81,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

          <div className="max-w-[1920px] mx-auto text-center relative z-[1]">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ ease: EASE }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,166,81,0.12)", border: "1px solid rgba(0,166,81,0.3)", borderRadius: 9999, padding: "6px 18px", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#4ade80", marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00A651", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
                All {TOTAL} Google Reviews
              </span>
            </motion.div>

            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.5rem)] uppercase font-[900] text-white leading-[1] tracking-[0.03em] mb-4"
              initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, ease: EASE }}
            >
              What Our Customers<br />
              <span style={{ color: "#00A651" }}>Are Saying</span>
            </motion.h1>

            <motion.div
              style={{ width: 64, height: 2, margin: "0 auto 20px", background: "linear-gradient(90deg,transparent,#00A651,transparent)" }}
              initial={{ scaleX: 0 }} animate={heroInView ? { scaleX: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }}
            />

            <motion.p
              style={{ fontSize: "clamp(0.88rem,1.5vw,1.05rem)", color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.65 }}
              initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            >
              Every single review is real, verified on Google. No cherry-picking — just {TOTAL} honest opinions from Lake Norman homeowners.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 36 }}
              initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}
            >
              {STATS.map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: 9999, padding: "10px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span style={{ fontFamily: "var(--font-display),sans-serif", fontSize: "1.4rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}
              initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 }}
            >
              <Link href="/contact"
                style={{ background: "#f97316", color: "white", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9999, padding: "14px 34px", textDecoration: "none", border: "2px solid rgba(255,255,255,0.15)", transition: "all 0.25s" }}
                className="hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(249,115,22,0.45)] inline-block transition-all"
              >
                Get Your Free Estimate →
              </Link>
              <a href={PHONE_HREF}
                style={{ color: "white", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 9999, padding: "14px 28px", border: "2px solid rgba(255,255,255,0.25)", textDecoration: "none", transition: "all 0.25s" }}
                className="hover:-translate-y-1 hover:border-white/50 inline-block transition-all"
              >
                📞 Call Now
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,30,56,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "12px clamp(20px,4vw,80px)" }}>
          <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div style={{ display: "flex", gap: 8 }}>
              {(["all", "photos"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: "7px 18px", borderRadius: 9999, border: "1px solid", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.22s", background: filter === f ? "#00A651" : "rgba(255,255,255,0.06)", borderColor: filter === f ? "#00A651" : "rgba(255,255,255,0.15)", color: "white" }}>
                  {f === "all" ? `All (${TOTAL})` : `With Photos (${WITH_PHOTOS})`}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", fontWeight: 600, letterSpacing: "0.08em" }}>
              <GoogleLogo size={13} />
              Verified on Google
            </div>
          </div>
        </div>

        {/* ── REVIEWS GRID ── */}
        <section className="px-[clamp(20px,4vw,80px)] py-12 pb-[120px] md:pb-16">
          <div className="max-w-[1920px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {displayReviews.map((review, i) => (
                  <ReviewCard
                    key={review.name + i}
                    review={review}
                    globalIdx={SORTED_REVIEWS.indexOf(review)}
                    onOpenLightbox={(ri, pi) => { setLightboxReviewIdx(ri); setLightboxPhotoIdx(pi); }}
                    animDelay={(i % 12) * 0.04}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── CONVERSION SECTION ── */}
        <section
          style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg,rgba(10,46,92,0.98),rgba(6,20,44,0.98))" }}
          className="px-[clamp(20px,4vw,80px)] py-20 md:py-28"
        >
          {/* bg photo overlay */}
          <div className="absolute inset-0 bg-cover bg-center opacity-[0.07]" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(0,166,81,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

          <ConversionSection />
        </section>

      </main>

      <Footer />
      <StickyCTA />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxReviewIdx !== null && lbPhoto && (
          <Lightbox
            photo={lbPhoto}
            onClose={() => setLightboxReviewIdx(null)}
            onPrev={() => setLightboxPhotoIdx(i => Math.max(0, i - 1))}
            onNext={() => setLightboxPhotoIdx(i => Math.min(lbPhotos.length - 1, i + 1))}
            hasPrev={lightboxPhotoIdx > 0}
            hasNext={lightboxPhotoIdx < lbPhotos.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Conversion section (separate for useInView) ── */
function ConversionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const reasons = [
    { icon: "⭐", title: "5.0 Stars — Every Time", desc: "Not a single unhappy customer. Ridge and his team show up, do the work right, and leave your property spotless." },
    { icon: "📸", title: "See the Results First", desc: `${WITH_PHOTOS} of our reviews include real before & after photos. The results speak for themselves.` },
    { icon: "🏡", title: "Your Neighbor Chose Us", desc: "Layne, Rachel, Heidi — these are real Lake Norman homeowners who trust us every year." },
    { icon: "🔒", title: "No Risk, Free Estimate", desc: "No contracts. No pressure. Just an honest quote and professional service, guaranteed." },
  ];

  return (
    <div ref={ref} className="max-w-[1920px] mx-auto relative z-[1]">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ ease: EASE }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 9999, padding: "5px 16px", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fb923c", marginBottom: 18 }}>
            🔥 Join 500+ Happy Customers
          </span>
        </motion.div>
        <motion.h2
          className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] uppercase font-[900] text-white leading-[1] tracking-[0.03em] mb-4"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, ease: EASE }}
        >
          Ready to Stand Out<br />
          <span style={{ color: "#f97316" }}>on Your Street?</span>
        </motion.h2>
        <motion.p
          style={{ fontSize: "clamp(0.88rem,1.5vw,1rem)", color: "rgba(255,255,255,0.58)", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.65 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
        >
          You just read what your neighbors think. Now it&apos;s your turn to get that transformation.
        </motion.p>
      </div>

      {/* Reason cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25, ease: EASE }}
      >
        {reasons.map((r, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{r.icon}</div>
            <strong style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "white", marginBottom: 8 }}>{r.title}</strong>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Big CTA */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, ease: EASE }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 20 }}>
          <Link href="/contact"
            style={{ background: "#f97316", color: "white", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9999, padding: "16px 44px", textDecoration: "none", boxShadow: "0 8px 32px rgba(249,115,22,0.4)", border: "2px solid rgba(255,255,255,0.15)", display: "inline-block", transition: "all 0.25s" }}
            className="hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(249,115,22,0.55)]"
          >
            Get My Free Estimate →
          </Link>
          <a href={PHONE_HREF}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "white", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 9999, padding: "16px 32px", border: "2px solid rgba(255,255,255,0.25)", textDecoration: "none", transition: "all 0.25s" }}
            className="hover:-translate-y-1 hover:border-white/50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Call 704-917-9649
          </a>
        </div>
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}>
          Free estimates · No contracts · 100% satisfaction guaranteed
        </p>
      </motion.div>
    </div>
  );
}
