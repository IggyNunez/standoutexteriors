"use client";

import { motion } from "framer-motion";

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2BBF6A" />
          <stop offset="100%" stopColor="#00A651" />
        </linearGradient>
      </defs>
      <path d="M40 8 L64 20 V44 C64 60 40 72 40 72 C40 72 16 60 16 44 V20 Z" fill="url(#shieldGrad)" />
      <path d="M32 40 L38 46 L50 34" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2BBF6A" />
          <stop offset="100%" stopColor="#00A651" />
        </linearGradient>
      </defs>
      <path d="M40 8 L46 30 H68 L50 44 L56 66 L40 52 L24 66 L30 44 L12 30 H34 Z" fill="url(#sparkGrad)" />
      <path d="M40 14 L44 30 H60 L48 40 L52 56 L40 46 V14Z" fill="white" fillOpacity="0.2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="homeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2BBF6A" />
          <stop offset="100%" stopColor="#00A651" />
        </linearGradient>
      </defs>
      <path d="M40 12 L68 36 V68 H50 V50 H30 V68 H12 V36 Z" fill="url(#homeGrad)" />
      <path d="M40 12 L68 36 V68 H50 V50 H40 V12Z" fill="white" fillOpacity="0.15" />
    </svg>
  );
}

const STATS = [
  { icon: ShieldIcon, label: "Fully Insured",  sub: "Licensed & covered" },
  { icon: HomeIcon,   label: "500+ Jobs Done", sub: "Lake Norman area"   },
  { icon: SparkleIcon, label: "5★ Rated",      sub: "Google reviews"     },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function StatsBar() {
  return (
    <>
      {/* ── Desktop: stacked glassmorphic badges on the right ── */}
      <div className="hidden md:flex absolute right-[clamp(24px,4vw,80px)] top-1/2 -translate-y-1/2 z-20 flex-col gap-3 mt-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 + i * 0.15, ease: EASE }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px) saturate(1.8)",
                WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 16,
                boxShadow: "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                minWidth: 200,
              }}
            >
              {/* Icon bubble */}
              <div
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 10,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <stat.icon />
              </div>

              {/* Text */}
              <div>
                <div className="text-[0.78rem] font-extrabold tracking-[0.06em] uppercase text-white leading-tight">
                  {stat.label}
                </div>
                <div className="text-[0.65rem] text-white/60 tracking-wide mt-0.5">
                  {stat.sub}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Mobile: bottom frosted bar (unchanged) ── */}
      <div
        className="md:hidden absolute bottom-0 left-0 right-0 z-20"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          borderTop: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <div className="px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-[0.6rem] font-bold tracking-[0.06em] uppercase text-white">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
