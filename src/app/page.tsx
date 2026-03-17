import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ServiceAreas from "@/components/sections/ServiceAreas";
import CTAContact from "@/components/sections/CTAContact";

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
