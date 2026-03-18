"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PHOTOS = [
  {
    src: "/assets/layne-before-after.webp",
    thumb: "/assets/layne-before-after.webp",
    label: "Before & After",
    caption: "Paver cleaning — left: before / right: after",
  },
  {
    src: "/assets/layne-before-after-2.webp",
    thumb: "/assets/layne-before-after-2.webp",
    label: "Before & After",
    caption: "Paver circle — top: before / bottom: after",
  },
];

function StarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#00A651" className="shrink-0">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function Lightbox({ photo, onClose }: { photo: typeof PHOTOS[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          key="card"
          className="relative max-w-[90vw] max-h-[85vh] w-full"
          style={{ maxWidth: 780 }}
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 10 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={780}
              height={600}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />

            {/* Before/After label overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              padding: "24px 20px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                {photo.caption}
              </span>
              <span style={{
                fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                background: "rgba(0,166,81,0.85)", color: "white", padding: "3px 10px", borderRadius: 4,
              }}>
                Before &amp; After
              </span>
            </div>
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            aria-label="Close"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "absolute", top: -14, right: -14,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.95)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0A2E5C" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11" />
              <line x1="11" y1="1" x2="1" y2="11" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FeaturedReview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [lightbox, setLightbox] = useState<typeof PHOTOS[0] | null>(null);

  return (
    <>
      <div ref={ref} className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px) saturate(1.6)",
            WebkitBackdropFilter: "blur(24px) saturate(1.6)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 24,
            boxShadow: "0 12px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, #00A651, #7ecfff, #00A651, transparent)",
          }} />

          {/* Featured badge */}
          <div style={{
            position: "absolute", top: 16, right: 20, zIndex: 1,
            background: "rgba(0,166,81,0.15)",
            border: "1px solid rgba(0,166,81,0.35)",
            borderRadius: 9999,
            padding: "4px 12px",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A651", display: "block" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A651" }}>
              Featured Review
            </span>
          </div>

          <div className="flex flex-col lg:flex-row">

            {/* ── Left — review content ── */}
            <div className="flex flex-col justify-between p-8 lg:p-10 lg:w-[54%] lg:shrink-0">
              <div>
                {/* Stars + Google badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 9999, padding: "4px 10px",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <GoogleLogo />
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em" }}>
                      Google Review
                    </span>
                  </div>
                </div>

                {/* Big quote mark */}
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: 72, lineHeight: 0.8,
                  color: "rgba(0,166,81,0.2)", marginBottom: 4, userSelect: "none",
                }}>
                  &ldquo;
                </div>

                <p className="italic text-white/85 leading-[1.85]" style={{ fontSize: "clamp(0.88rem, 1.3vw, 1rem)" }}>
                  I had a fantastic experience with Stand Out Exteriors! Ridge and his team did an excellent job cleaning my house and replacing the sand before sealing my pavers. They were on time, professional, and their work was top-notch. On top of that, their pricing was very fair. I was so impressed that I&apos;ve already booked them for next year&apos;s pressure washing! Highly recommend Stand Out Exteriors if you want quality service and reliable results.
                </p>

                {/* Photo thumbnails */}
                <div className="flex items-center gap-3 mt-6">
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                    Photos
                  </span>
                  <div className="flex gap-2">
                    {PHOTOS.map((photo, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setLightbox(photo)}
                        aria-label={`View ${photo.label} photo ${i + 1}`}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "relative",
                          width: 64, height: 64,
                          borderRadius: 10,
                          overflow: "hidden",
                          border: "1.5px solid rgba(255,255,255,0.15)",
                          cursor: "pointer",
                          flexShrink: 0,
                          background: "none", padding: 0,
                        }}
                        className="group"
                      >
                        <Image
                          src={photo.thumb}
                          alt={photo.caption}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="64px"
                        />
                        {/* Hover overlay */}
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "rgba(0,166,81,0.0)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "background 0.2s",
                        }}
                          className="group-hover:!bg-[rgba(0,166,81,0.45)] transition-all duration-200"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ opacity: 0, transition: "opacity 0.2s" }}
                            className="group-hover:!opacity-100"
                          >
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                            <line x1="11" y1="8" x2="11" y2="14"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                          </svg>
                        </div>
                        {/* Green border glow on hover */}
                        <motion.div
                          style={{
                            position: "absolute", inset: 0, borderRadius: 10,
                            boxShadow: "0 0 0 2px #00A651",
                            opacity: 0,
                          }}
                          className="group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </motion.button>
                    ))}
                  </div>
                  <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", fontStyle: "italic" }}>
                    tap to expand
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Image
                  src="/assets/layne-veneri.png"
                  alt="Layne Veneri"
                  width={52}
                  height={52}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid rgba(0,166,81,0.5)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <strong className="text-white font-bold block" style={{ fontSize: "0.95rem" }}>
                    Layne Veneri
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em" }}>
                    Local Guide · Denver, NC
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#00A651">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", marginLeft: 4 }}>9 months ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right — decorative large thumbnail (desktop only) ── */}
            <div className="hidden lg:flex flex-col gap-3 p-6 flex-1 justify-center">
              <div style={{
                fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                Paver Cleaning · Sanding · Sealing
              </div>

              {PHOTOS.map((photo, i) => (
                <motion.button
                  key={i}
                  onClick={() => setLightbox(photo)}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  aria-label={`View ${photo.caption}`}
                  style={{
                    position: "relative", borderRadius: 14,
                    overflow: "hidden", cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "none", padding: 0,
                    height: 140,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    display: "block", width: "100%",
                  }}
                  className="group"
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="360px"
                  />

                  {/* Hover overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0)",
                    transition: "background 0.25s",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                    className="group-hover:!bg-[rgba(0,0,0,0.35)]"
                  >
                    <div style={{
                      background: "rgba(0,166,81,0.9)",
                      borderRadius: "50%", width: 44, height: 44,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(0,166,81,0.5)",
                      opacity: 0, transform: "scale(0.8)",
                      transition: "opacity 0.25s, transform 0.25s",
                    }}
                      className="group-hover:!opacity-100 group-hover:!scale-100"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  </div>

                  {/* Label bar */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
                    padding: "20px 12px 10px",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                  }}>
                    <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: "0.08em" }}>
                      {photo.caption}
                    </span>
                    <span style={{
                      fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.12em",
                      textTransform: "uppercase", background: "rgba(0,166,81,0.8)",
                      color: "white", padding: "2px 7px", borderRadius: 3,
                    }}>
                      B&amp;A
                    </span>
                  </div>

                  {/* Green border glow on hover */}
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 14,
                    boxShadow: "inset 0 0 0 2px #00A651",
                    opacity: 0, transition: "opacity 0.25s",
                    pointerEvents: "none",
                  }}
                    className="group-hover:!opacity-100"
                  />
                </motion.button>
              ))}
            </div>

          </div>
        </motion.div>
      </div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
