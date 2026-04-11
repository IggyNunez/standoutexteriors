import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

// Below-the-fold sections are heavy framer-motion clients. Dynamic-import
// them so their JS chunks load after the hero is interactive, slashing the
// initial bundle parse / hydration cost (TBT). SSR is still on so the HTML
// remains crawlable and there is no layout shift.
const Process       = dynamic(() => import("@/components/sections/Process"));
const WhyUs         = dynamic(() => import("@/components/sections/WhyUs"));
const Testimonials  = dynamic(() => import("@/components/sections/Testimonials"));
const FAQ           = dynamic(() => import("@/components/sections/FAQ"));
const ServiceAreas  = dynamic(() => import("@/components/sections/ServiceAreas"));
const CTAContact    = dynamic(() => import("@/components/sections/CTAContact"));

export default function Home() {
  return (
    <main className="w-full min-w-full">
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <CTAContact />
    </main>
  );
}
