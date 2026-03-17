import type { Metadata } from "next";
import { COMPANY_NAME, EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${COMPANY_NAME}.`,
};

export default function PrivacyPage() {
  return (
    <main className="w-full min-w-full pt-[140px] md:pt-[160px] pb-24 md:pb-32 bg-canvas">
      <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)]">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] uppercase text-blue-900 leading-none mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-[0.88rem] text-gray-600 leading-relaxed">
          <p>
            <strong className="text-blue-900">Last updated:</strong> March 2026
          </p>
          <p>
            {COMPANY_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the
            standoutexterior.com website. This page informs you of our policies regarding the
            collection, use, and disclosure of personal information when you use our website.
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] uppercase text-blue-900 mt-8">
            Information We Collect
          </h2>
          <p>
            When you fill out our contact form, we collect your name, email address, phone number,
            property address, and any message you include. This information is used solely to
            respond to your inquiry and provide you with a service estimate.
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] uppercase text-blue-900 mt-8">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect to respond to your inquiries, provide service
            estimates, and communicate about our services. We do not sell, trade, or share your
            personal information with third parties except as necessary to provide our services.
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] uppercase text-blue-900 mt-8">
            Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href={`mailto:${EMAIL}`} className="text-blue-700 hover:text-blue-500 underline">
              {EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
