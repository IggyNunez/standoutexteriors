import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import QuoteHero from "@/components/sections/QuoteHero";
import WhyUs from "@/components/sections/WhyUs";
import InActionGallery from "@/components/sections/InActionGallery";
import FeaturedReview from "@/components/sections/FeaturedReview";
import QuoteFinalCTA from "@/components/sections/QuoteFinalCTA";

/**
 * /get-quote — DEDICATED GOOGLE ADS LANDING PAGE.
 *
 * Intentionally NOT in NAV_LINKS (the site menu). The ONLY way to reach it is
 * by clicking a Google Ad — so every lead from this page is provably ad-driven
 * (clean attribution, no organic guesswork). noindex'd so it stays paid-only.
 *
 * It reuses the SAME premium components as the real site (video hero, WhyUs,
 * InActionGallery, FeaturedReview, wave dividers, logo) so it matches the brand
 * exactly — it's not a stripped-down clone.
 */
export const metadata: Metadata = {
  title: "Free Pressure Washing Estimate — Denver & Lake Norman, NC",
  description:
    "Get a free, no-obligation pressure washing estimate from Stand Out Exterior. 500+ properties cleaned, 5.0 rating. Serving Denver, NC and Lake Norman. Reply in hours.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/get-quote` },
};

export default function GetQuotePage() {
  return (
    <main className="w-full min-w-full bg-white">
      <QuoteHero />
      <WhyUs />
      <InActionGallery />
      <FeaturedReview />
      <QuoteFinalCTA />
    </main>
  );
}
