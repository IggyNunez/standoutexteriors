import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import FounderStory from "@/components/sections/FounderStory";
import InActionGallery from "@/components/sections/InActionGallery";
import WhyUs from "@/components/sections/WhyUs";
import CTAContact from "@/components/sections/CTAContact";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Stand Out Exterior Cleaning LLC. Denver NC's trusted pressure washing and soft washing experts serving the Lake Norman area.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <main className="w-full min-w-full">
      <AboutContent />
      <FounderStory />
      <InActionGallery />
      <WhyUs />
      <CTAContact />
    </main>
  );
}
