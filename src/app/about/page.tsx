import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Stand Out Exterior Cleaning LLC — Denver NC's trusted pressure washing and soft washing experts serving the Lake Norman area.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-w-full">
      <AboutContent />
    </main>
  );
}
