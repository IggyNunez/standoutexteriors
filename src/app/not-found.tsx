import type { Metadata } from "next";
import Link from "next/link";
import { PHONE, PHONE_HREF, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Stand Out Exterior Cleaning" },
  description:
    "The page you were looking for cannot be found. Browse our services or call 704-917-9649 for a free estimate on pressure washing in Denver NC and Lake Norman.",
  robots: { index: false, follow: true },
};

const POPULAR_SERVICE_SLUGS = [
  "house-washing",
  "roof-cleaning",
  "driveway-cleaning",
  "gutter-cleaning",
];

export default function NotFound() {
  const popular = SERVICES.filter((s) =>
    POPULAR_SERVICE_SLUGS.includes(s.slug)
  );

  return (
    <main className="relative overflow-hidden bg-[#061e38] text-white min-h-screen flex flex-col">
      {/* Soft blue glow blobs */}
      <div
        className="absolute top-[8%] left-[12%] w-[520px] h-[320px] rounded-full pointer-events-none blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(43,125,233,0.35) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[480px] h-[280px] rounded-full pointer-events-none blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(ellipse, rgba(126,207,255,0.25) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <section className="relative z-[1] flex-1 flex items-center pt-[140px] pb-20 min-[1200px]:pt-[180px]">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)] w-full grid md:grid-cols-12 gap-10 items-center">
          {/* Left: big 404 + copy */}
          <div className="md:col-span-7">
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-6"
              style={{
                backgroundColor: "rgba(43,125,233,0.18)",
                color: "#7ecfff",
                border: "1px solid rgba(43,125,233,0.3)",
              }}
            >
              Error 404
            </span>

            <h1
              className="font-[family-name:var(--font-bebas)] leading-[0.88] tracking-tight"
              style={{
                fontSize: "clamp(5.5rem, 16vw, 13rem)",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #7ecfff 60%, #2b7de9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </h1>

            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(1.8rem,4vw,3rem)] tracking-tight mt-2 mb-4">
              This page got power-washed away
            </h2>

            <p className="text-white/80 text-lg leading-relaxed max-w-[560px] mb-8">
              The page you were looking for doesn&apos;t exist, moved, or was
              cleaned a little too thoroughly. Head back to the home page or
              pick one of our most-booked services below.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-transform hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #2b7de9 0%, #0a2e5c 100%)",
                  color: "white",
                }}
              >
                Back to Home
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Call {PHONE}
              </a>
            </div>
          </div>

          {/* Right: decorative pressure-washer spray */}
          <div className="md:col-span-5 hidden md:flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-square">
              {/* Concentric rings */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-white/10"
                  style={{
                    transform: `scale(${1 - i * 0.18})`,
                    opacity: 0.6 - i * 0.12,
                  }}
                />
              ))}
              {/* Central orb */}
              <div
                className="absolute inset-[38%] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(126,207,255,0.5) 50%, rgba(43,125,233,0.3) 100%)",
                  boxShadow:
                    "0 0 60px rgba(126,207,255,0.45), inset 0 2px 8px rgba(255,255,255,0.4)",
                }}
              />
              {/* Scattered droplets */}
              {[
                { top: "14%", left: "22%", size: 10 },
                { top: "28%", left: "72%", size: 6 },
                { top: "62%", left: "18%", size: 8 },
                { top: "78%", left: "66%", size: 12 },
                { top: "44%", left: "82%", size: 5 },
                { top: "8%", left: "58%", size: 7 },
              ].map((d, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    top: d.top,
                    left: d.left,
                    width: d.size,
                    height: d.size,
                    background:
                      "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85), rgba(126,207,255,0.3))",
                    boxShadow: "0 2px 8px rgba(126,207,255,0.4)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular links */}
      <section className="relative z-[1] pb-24">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
            <h3 className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#7ecfff]">
              Most-booked services
            </h3>
            <Link
              href="/services"
              className="text-sm font-bold text-white/80 hover:text-white transition-colors"
            >
              View all services →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all"
              >
                <p className="font-bold text-white text-lg mb-1">{s.title}</p>
                <p className="text-white/60 text-sm line-clamp-2">
                  {s.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[#7ecfff] text-sm font-bold">
                  See details
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Secondary links */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/areas"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/before-after"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Before &amp; After
            </Link>
            <Link
              href="/reviews"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/commercial"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Commercial
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
