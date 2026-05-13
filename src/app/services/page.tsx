import type { Metadata } from "next";
import ServicesPage from "@/components/sections/ServicesPage";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Professional pressure washing and soft washing services in Denver, NC. House washing, driveway cleaning, roof cleaning, gutter brightening, fence washing, paver sealing, and commercial pressure washing.",
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function Services() {
  return (
    <main className="w-full min-w-full">
      <ServicesPage />
    </main>
  );
}
