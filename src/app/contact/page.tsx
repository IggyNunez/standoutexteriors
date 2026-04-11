import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import MapSection from "@/components/sections/MapSection";

export const metadata: Metadata = {
  title: "Contact Us — Free Estimate",
  description:
    "Get a free pressure washing estimate from Stand Out Exterior Cleaning. Serving Denver, NC and the Lake Norman area. Call 704-917-9649 or fill out our form.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-w-full">
      <ContactForm />
      <MapSection />
    </main>
  );
}
