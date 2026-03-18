"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import rawData from "@/data/google-reviews.json";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────────
   Local photo overrides — these reviewers have custom assets
   we captured; use those instead of the Google-hosted URLs.
──────────────────────────────────────────────────────────────── */
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

/* Build the reviews list from JSON, apply overrides, photos-first */
const ALL_REVIEWS = (rawData.reviews as {
  name: string; avatar: string | null; isLocalGuide: boolean;
  rating: number; text: string; ago: string;
  photos: { src: string; caption: string }[];
}[]).map((r) => {
  const override = LOCAL_PHOTO_OVERRIDES[r.name];
  return {
    name: r.name,
    avatar: override?.avatar || r.avatar || null,
    isLocalGuide: r.isLocalGuide,
    rating: r.rating,
    text: r.text,
    ago: r.ago,
    photos: override?.photos || r.photos,
  };
});

/* Sort: reviews with photos first, then rest — all 5-star */
const FEATURED_REVIEWS = [
  ...ALL_REVIEWS.filter(r => r.photos.length > 0),
  ...ALL_REVIEWS.filter(r => r.photos.length === 0),
];

/* ─── Helpers ─── */

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#00A651" style={{ flexShrink: 0 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ─── Lightbox ─── */
function Lightbox({
  photo, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
  photo: { src: string; caption: string };
  onClose: () => void; onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        style={{ maxWidth: "min(820px, 92vw)", width: "100%" }}
        initial={{ scale: 0.9, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)", position: "relative" }}>
          <Image src={photo.src} alt={photo.caption} width={820} height={640}
            style={{ width: "100%", height: "auto", display: "block" }} priority />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72), transparent)", padding: "28px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{photo.caption}</span>
            <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(0,166,81,0.85)", color: "white", padding: "3px 9px", borderRadius: 4 }}>Before &amp; After</span>
          </div>
        </div>
        <motion.button onClick={onClose} aria-label="Close" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          style={{ position: "absolute", top: -14, right: -14, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#0A2E5C" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
        </motion.button>
        {hasPrev && (
          <motion.button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
            style={{ position: "absolute", left: -18, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M9 2L4 7l5 5"/></svg>
          </motion.button>
        )}
        {hasNext && (
          <motion.button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
            style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 2l5 5-5 5"/></svg>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Single review card ─── */
function ReviewCard({
  review, reviewIdx, onOpenLightbox,
}: {
  review: typeof FEATURED_REVIEWS[0];
  reviewIdx: number;
  onOpenLightbox: (reviewIdx: number, photoIdx: number) => void;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.055)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 20,
      padding: "28px 28px 24px",
      display: "flex", flexDirection: "column", gap: 0,
      position: "relative", overflow: "hidden",
      height: "100%",
    }}>
      {/* Top shimmer line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(0,166,81,0.6), rgba(126,207,255,0.4), transparent)" }} />

      {/* Stars + Google */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9999, padding: "3px 9px" }}>
          <GoogleLogo />
          <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em" }}>Google</span>
        </div>
      </div>

      {/* Quote mark */}
      <div style={{ fontFamily: "Georgia, serif", fontSize: 52, lineHeight: 0.75, color: "rgba(0,166,81,0.18)", marginBottom: 2, userSelect: "none" }}>&ldquo;</div>

      {/* Text */}
      <p style={{ fontSize: "0.88rem", fontStyle: "italic", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", flex: 1, marginBottom: 16 }}>
        {review.text}
      </p>

      {/* Photo thumbnails */}
      {review.photos.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <span style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>Photos</span>
          <div style={{ display: "flex", gap: 6 }}>
            {review.photos.map((photo, pi) => (
              <motion.button
                key={pi}
                onClick={() => onOpenLightbox(reviewIdx, pi)}
                aria-label={`View: ${photo.caption}`}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="group"
                style={{ position: "relative", width: 60, height: 60, flexShrink: 0, borderRadius: 9, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.14)", cursor: "pointer", background: "none", padding: 0 }}
              >
                <Image src={photo.src} alt={photo.caption} fill style={{ objectFit: "cover" }} sizes="60px" />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,166,81,0)", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                  className="group-hover:!bg-[rgba(0,166,81,0.5)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ opacity: 0, transition: "opacity 0.2s" }} className="group-hover:!opacity-100">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
                <div style={{ position: "absolute", inset: 0, borderRadius: 9, boxShadow: "inset 0 0 0 2px #00A651", opacity: 0, transition: "opacity 0.2s", pointerEvents: "none" }} className="group-hover:!opacity-100" />
              </motion.button>
            ))}
          </div>
          <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>tap</span>
        </div>
      )}

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.09)" }}>
        {review.avatar ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={review.avatar} alt={review.name}
            style={{ width: 42, height: 42, borderRadius: "50%", border: "2px solid rgba(0,166,81,0.45)", boxShadow: "0 3px 12px rgba(0,0,0,0.3)", objectFit: "cover", flexShrink: 0 }} />
        ) : (
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #2B7DE9, #7ecfff)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(0,166,81,0.45)", flexShrink: 0 }}>
            <span style={{ fontWeight: 900, color: "white", fontSize: "1rem" }}>{review.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <strong style={{ fontSize: "0.88rem", fontWeight: 700, color: "white" }}>{review.name}</strong>
            {review.isLocalGuide && (
              <span style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(43,125,233,0.25)", border: "1px solid rgba(43,125,233,0.4)", color: "#7ecfff", padding: "1px 6px", borderRadius: 9999 }}>Local Guide</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[...Array(review.rating)].map((_, i) => <StarIcon key={i} size={9} />)}
            <span style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.28)", marginLeft: 4 }}>{review.ago}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function FeaturedReview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  // 2-up carousel: page = index of first visible card
  const total = FEATURED_REVIEWS.length;
  const perPage = 2;
  const pageCount = Math.ceil(total / perPage);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back

  const goTo = (next: number) => {
    setDir(next > page ? 1 : -1);
    setPage(next);
  };

  const visibleReviews = FEATURED_REVIEWS.slice(page * perPage, page * perPage + perPage);

  // Lightbox state
  const [lightboxReviewIdx, setLightboxReviewIdx] = useState<number | null>(null);
  const [lightboxPhotoIdx, setLightboxPhotoIdx] = useState(0);
  const lbPhotos = lightboxReviewIdx !== null ? FEATURED_REVIEWS[lightboxReviewIdx].photos : [];
  const lbPhoto = lbPhotos[lightboxPhotoIdx] ?? null;

  return (
    <>
      <div ref={ref} className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A651" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                Featured Reviews
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 9999, padding: "3px 10px" }}>
                <GoogleLogo />
                <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>Verified Google Reviews</span>
              </div>
            </div>

            {/* Page controls */}
            {pageCount > 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <motion.button
                  onClick={() => goTo(Math.max(0, page - 1))}
                  disabled={page === 0}
                  whileHover={page > 0 ? { scale: 1.08 } : {}}
                  whileTap={page > 0 ? { scale: 0.93 } : {}}
                  aria-label="Previous"
                  style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: page === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.09)", cursor: page === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: page === 0 ? 0.3 : 1, transition: "opacity 0.2s" }}
                >
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M9 2L4 7l5 5"/></svg>
                </motion.button>

                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: pageCount }).map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={`Page ${i + 1}`}
                      style={{ width: i === page ? 18 : 6, height: 6, borderRadius: 9999, background: i === page ? "#00A651" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s, background 0.3s" }} />
                  ))}
                </div>

                <motion.button
                  onClick={() => goTo(Math.min(pageCount - 1, page + 1))}
                  disabled={page === pageCount - 1}
                  whileHover={page < pageCount - 1 ? { scale: 1.08 } : {}}
                  whileTap={page < pageCount - 1 ? { scale: 0.93 } : {}}
                  aria-label="Next"
                  style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: page === pageCount - 1 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.09)", cursor: page === pageCount - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: page === pageCount - 1 ? 0.3 : 1, transition: "opacity 0.2s" }}
                >
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M5 2l5 5-5 5"/></svg>
                </motion.button>
              </div>
            )}
          </div>

          {/* 2-up card grid with slide animation */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {visibleReviews.map((review, i) => {
                const globalIdx = page * perPage + i;
                return (
                  <ReviewCard
                    key={review.name}
                    review={review}
                    reviewIdx={globalIdx}
                    onOpenLightbox={(ri, pi) => {
                      setLightboxReviewIdx(ri);
                      setLightboxPhotoIdx(pi);
                    }}
                  />
                );
              })}
              {/* Phantom card if odd total on last page */}
              {visibleReviews.length < perPage && (
                <div style={{ borderRadius: 20, border: "1px dashed rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>More reviews coming soon</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxReviewIdx !== null && lbPhoto && (
          <Lightbox
            photo={lbPhoto}
            onClose={() => setLightboxReviewIdx(null)}
            onPrev={() => setLightboxPhotoIdx((i) => Math.max(0, i - 1))}
            onNext={() => setLightboxPhotoIdx((i) => Math.min(lbPhotos.length - 1, i + 1))}
            hasPrev={lightboxPhotoIdx > 0}
            hasNext={lightboxPhotoIdx < lbPhotos.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
