import Image from "next/image";
import Link from "next/link";
import type { CityDetail, Testimonial } from "@/types";
import {
  PHONE,
  PHONE_HREF,
  SERVICES,
  TESTIMONIALS,
} from "@/lib/constants";

interface Props {
  city: CityDetail;
}

/**
 * City landing page, server-rendered, no client JS.
 * Every piece of copy is pulled from CITY_DETAILS so each city page
 * is genuinely unique (avoiding Google's duplicate-doorway penalty).
 *
 * Content order optimized for E-E-A-T signals:
 *   1. H1 with city name
 *   2. Unique intro paragraph (local presence)
 *   3. Local landmarks / neighborhoods (authenticity)
 *   4. Local challenges (expertise)
 *   5. Services offered in that city (internal linking)
 *   6. City-specific testimonials (social proof)
 *   7. ZIP codes served (specificity)
 *   8. CTA
 */
export default function CityLandingPage({ city }: Props) {
  const cityTestimonials: Testimonial[] = TESTIMONIALS.filter((t) =>
    t.location.toLowerCase().startsWith(city.name.toLowerCase())
  );

  const servicesToShow = SERVICES.filter((s) => s.label === "Residential").slice(0, 6);

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#061e38] text-white pt-[120px] min-[1200px]:pt-[160px] pb-20">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt={`Pressure washing services in ${city.name}, ${city.state}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(6,30,56,0.92) 0%, rgba(10,46,92,0.8) 45%, rgba(10,46,92,0.45) 100%)",
            }}
          />
        </div>

        <div className="relative z-[1] max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
          <nav className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/areas" className="hover:text-white transition-colors">
              Service Areas
            </Link>
            <span className="opacity-40">/</span>
            <span style={{ color: "#7ecfff" }}>
              {city.name}, {city.state}
            </span>
          </nav>

          <span
            className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-5"
            style={{
              backgroundColor: "rgba(43,125,233,0.18)",
              color: "#7ecfff",
              border: "1px solid rgba(43,125,233,0.3)",
            }}
          >
            Serving {city.county}
          </span>

          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight mb-5">
            Pressure Washing in <br className="hidden md:block" />
            {city.name}, {city.state}
          </h1>

          <p className="text-white/85 text-lg md:text-xl max-w-[720px] leading-relaxed mb-8">
            {city.heroIntro}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #2b7de9 0%, #0a2e5c 100%)",
                color: "white",
              }}
            >
              Call {PHONE}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-colors border border-white/30 text-white hover:bg-white/10"
            >
              Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Local intro + landmarks ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-7">
              <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight mb-5 text-[#061e38]">
                Why {city.name} Homeowners Call Stand Out
              </h2>
              <p className="text-[#061e38]/80 text-lg leading-relaxed">
                {city.bodyIntro}
              </p>
            </div>
            <aside className="md:col-span-5">
              <div className="p-6 rounded-2xl border border-[#061e38]/10 bg-[#f6fafd]">
                <h3 className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#2b7de9] mb-4">
                  {city.name} Neighborhoods We Serve
                </h3>
                <ul className="grid grid-cols-1 gap-2 text-[#061e38] text-sm">
                  {city.landmarks.map((lm) => (
                    <li key={lm} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2b7de9]" />
                      {lm}
                    </li>
                  ))}
                </ul>
                {city.zipCodes.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-[#061e38]/10">
                    <p className="text-xs text-[#061e38]/60 uppercase font-bold tracking-wider mb-1">
                      ZIP Codes Served
                    </p>
                    <p className="text-[#061e38] font-bold">
                      {city.zipCodes.join(" · ")}
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Local challenges ──────────────────────────────────── */}
      <section className="py-20 bg-[#f6fafd]">
        <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="max-w-[720px] mb-12">
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#2b7de9]">
              What we see in {city.name}
            </span>
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight mt-3 text-[#061e38]">
              Local Conditions We Handle Every Week
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {city.localChallenges.map((ch) => (
              <div
                key={ch.title}
                className="p-6 rounded-2xl bg-white border border-[#061e38]/8 shadow-sm"
              >
                <h3 className="font-bold text-[#061e38] text-lg mb-2">
                  {ch.title}
                </h3>
                <p className="text-[#061e38]/75 text-sm leading-relaxed">
                  {ch.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services offered in this city ─────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="max-w-[720px] mb-12">
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#2b7de9]">
              Services in {city.name}, {city.state}
            </span>
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight mt-3 text-[#061e38]">
              Every Surface, Every Season
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesToShow.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block rounded-2xl overflow-hidden border border-[#061e38]/8 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`${s.title} in ${city.name}, ${city.state}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#061e38] text-lg mb-2">
                    {s.title} in {city.name}
                  </h3>
                  <p className="text-[#061e38]/70 text-sm leading-relaxed line-clamp-3">
                    {s.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[#2b7de9] text-sm font-bold">
                    See details
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Local testimonials (if any) ───────────────────────── */}
      {cityTestimonials.length > 0 && (
        <section className="py-20 bg-[#061e38] text-white">
          <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)]">
            <div className="max-w-[720px] mb-12">
              <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#7ecfff]">
                Reviews from {city.name}
              </span>
              <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight mt-3">
                What Your {city.name} Neighbors Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cityTestimonials.map((t, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <p className="text-white/90 italic leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-[#7ecfff] text-sm font-bold">
                    {t.name}, {t.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-[clamp(20px,4vw,80px)] text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-tight mb-5 text-[#061e38]">
            Ready for a clean home in {city.name}?
          </h2>
          <p className="text-[#061e38]/75 text-lg mb-8 max-w-[620px] mx-auto">
            Call or request a free estimate. We typically respond within the
            same business day and can schedule your {city.name} property
            within the week.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase"
              style={{
                background: "linear-gradient(135deg, #2b7de9 0%, #0a2e5c 100%)",
                color: "white",
              }}
            >
              Call {PHONE}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm tracking-wide uppercase border border-[#061e38]/20 text-[#061e38] hover:bg-[#f6fafd]"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
