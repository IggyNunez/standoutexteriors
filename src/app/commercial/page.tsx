import type { Metadata } from "next";
import CommercialContent from "@/components/sections/CommercialContent";
import CTAContact from "@/components/sections/CTAContact";

export const metadata: Metadata = {
  title: "Commercial Pressure Washing | Denver & Lake Norman NC",
  description:
    "Professional commercial pressure washing for businesses across the Lake Norman area. Fully insured, COIs available. Storefronts, parking lots, dumpster pads, sidewalks & more.",
};

export default function CommercialPage() {
  return (
    <main className="w-full min-w-full">
      <CommercialContent />
      <CTAContact />
    </main>
  );
}
