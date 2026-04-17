import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PHONE, PHONE_HREF, SERVICE_AREAS, SITE_URL } from "@/lib/constants";
import { CITY_DETAILS, CITY_SLUGS } from "@/lib/city-details";

export const metadata: Metadata = {
  title: "Service Areas | Stand Out Exterior Cleaning",
  description:
    "Stand Out Exterior Cleaning serves Denver, Mooresville, Huntersville, Cornelius, Sherrills Ford, and the greater Lake Norman area of North Carolina. See our dedicated city pages for local service details.",
  alternates: { canonical: `${SITE_URL}/areas` },
};

export default function AreasIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Service Areas", url: `${SITE_URL}/areas` },
  ];

  const citiesWithPages = CITY_SLUGS.map((slug) => CITY_DETAILS[slug]);
  const citiesWithoutPages = SERVICE_AREAS.filter(
    (area) => !citiesWithPages.some((c) => c.name === area)
  );

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Hero */}
      <section className="relative bg-[#061e38] text-white pt-[120px] min-[1200px]:pt-[160px] pb-20">
        <div className="max-w-[1100px] mx-auto px-[clamp(20px,4vw,80px)]">
          <nav className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span style={{ color: "#7ecfff" }}>Service Areas</span>
          </nav>

          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight mb-5">
            Pressure Washing Across <br className="hidden md:block" />
            the Lake Norman Area
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-[720px] leading-relaxed">
            Based in Denver, NC, we serve homes and businesses throughout
            Lincoln, Mecklenburg, Iredell, and Catawba counties. Click your
            city below for the services we offer locally, or call{" "}
            <a href={PHONE_HREF} className="text-[#7ecfff] hover:underline">
              {PHONE}
            </a>{" "}
            for a free estimate.
          </p>
        </div>
      </section>

      {/* City cards */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-[clamp(20px,4vw,80px)]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {citiesWithPages.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group block p-7 rounded-2xl border border-[#061e38]/10 bg-white hover:shadow-lg hover:border-[#2b7de9]/40 transition-all"
              >
                <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#2b7de9]">
                  {city.county}
                </span>
                <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(1.6rem,2.5vw,2.25rem)] leading-tight tracking-tight mt-2 mb-3 text-[#061e38]">
                  {city.name}, {city.state}
                </h2>
                <p className="text-[#061e38]/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {city.heroIntro}
                </p>
                <p className="text-xs font-bold text-[#061e38]/60 uppercase tracking-wider">
                  ZIP {city.zipCodes.join(", ")}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[#2b7de9] text-sm font-bold">
                  See {city.name} details
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>

          {citiesWithoutPages.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#061e38]/10">
              <h2 className="font-[family-name:var(--font-bebas)] text-2xl tracking-tight mb-3 text-[#061e38]">
                Also Serving
              </h2>
              <p className="text-[#061e38]/70 mb-5">
                We service every home and business in these areas too. Call us
                and we&apos;ll confirm availability for your ZIP.
              </p>
              <ul className="flex flex-wrap gap-3">
                {citiesWithoutPages.map((city) => (
                  <li
                    key={city}
                    className="px-4 py-2 rounded-full bg-[#f6fafd] border border-[#061e38]/10 text-[#061e38] text-sm font-medium"
                  >
                    {city}, NC
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
