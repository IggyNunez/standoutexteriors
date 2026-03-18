"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00A651" className="shrink-0">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/** Renders one half of a top/bottom composite image as a labelled panel */
function PhotoPanel({
  src,
  alt,
  half,
  label,
  labelVariant,
}: {
  src: string;
  alt: string;
  /** "top" = before half, "bottom" = after half */
  half: "top" | "bottom";
  label: string;
  labelVariant: "before" | "after";
}) {
  const isBefore = labelVariant === "before";
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        flex: 1,
        minHeight: 160,
      }}
    >
      {/* We show a 200%-tall image, shifted up/down to expose only one half */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "200%",
            top: half === "top" ? 0 : "-100%",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover", objectPosition: "center center" }}
            sizes="(max-width: 768px) 50vw, 250px"
          />
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          ...(isBefore ? { left: 8 } : { right: 8 }),
          background: isBefore ? "rgba(0,0,0,0.7)" : "rgba(0,166,81,0.85)",
          backdropFilter: "blur(6px)",
          color: isBefore ? "rgba(255,255,255,0.85)" : "white",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "3px 8px",
          borderRadius: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function FeaturedReview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
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
          position: "absolute", top: 16, right: 20,
          background: "rgba(0,166,81,0.15)",
          border: "1px solid rgba(0,166,81,0.35)",
          borderRadius: 9999,
          padding: "4px 12px",
          display: "flex", alignItems: "center", gap: 6,
          zIndex: 1,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00A651", display: "block" }} />
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00A651" }}>
            Featured Review
          </span>
        </div>

        <div className="flex flex-col lg:flex-row">

          {/* ── Left — review content ── */}
          <div className="flex flex-col justify-between p-8 lg:p-10 lg:w-[42%] lg:shrink-0">
            <div>
              {/* Stars + Google */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 9999,
                  padding: "4px 10px",
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

              <p className="italic text-white/85 leading-[1.85]" style={{ fontSize: "clamp(0.88rem, 1.4vw, 1rem)" }}>
                I had a fantastic experience with Stand Out Exteriors! Ridge and his team did an excellent job cleaning my house and replacing the sand before sealing my pavers. They were on time, professional, and their work was top-notch. On top of that, their pricing was very fair. I was so impressed that I&apos;ve already booked them for next year&apos;s pressure washing! Highly recommend Stand Out Exteriors if you want quality service and reliable results.
              </p>
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

          {/* ── Right — 2×2 before/after photo grid ── */}
          <div className="flex flex-col gap-3 p-4 lg:p-6 lg:flex-1">

            {/* Section label */}
            <div className="flex items-center gap-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                Paver Cleaning · Sanding · Sealing — Real Results
              </span>
            </div>

            {/* Row 1 — image 1 split (left/right composite) */}
            <div className="flex gap-2" style={{ flex: 1, minHeight: 180 }}>
              {/* layne-before-after.webp is left=before / right=after */}
              {/* Show full image but crop left half for before, right half for after */}
              <div style={{ position: "relative", flex: 1, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "200%" }}>
                    <Image
                      src="/assets/layne-before-after.webp"
                      alt="Paver before — Layne Veneri"
                      fill
                      style={{ objectFit: "cover", objectPosition: "left center" }}
                      sizes="200px"
                    />
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.85)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 4 }}>Before</div>
              </div>

              <div style={{ position: "relative", flex: 1, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "200%" }}>
                    <Image
                      src="/assets/layne-before-after.webp"
                      alt="Paver after — Layne Veneri"
                      fill
                      style={{ objectFit: "cover", objectPosition: "right center" }}
                      sizes="200px"
                    />
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,166,81,0.85)", backdropFilter: "blur(6px)", color: "white", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 4 }}>After</div>
              </div>
            </div>

            {/* Row 2 — image 2 split (top/bottom composite) */}
            <div className="flex gap-2" style={{ flex: 1, minHeight: 180 }}>
              <PhotoPanel
                src="/assets/layne-before-after-2.webp"
                alt="Paver circle before — Layne Veneri"
                half="top"
                label="Before"
                labelVariant="before"
              />
              <PhotoPanel
                src="/assets/layne-before-after-2.webp"
                alt="Paver circle after — Layne Veneri"
                half="bottom"
                label="After"
                labelVariant="after"
              />
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
