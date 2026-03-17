import type { Metadata } from "next";
import { COMPANY_NAME, EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${COMPANY_NAME}.`,
};

export default function TermsPage() {
  return (
    <main className="w-full min-w-full pt-[140px] md:pt-[160px] pb-24 md:pb-32 bg-canvas">
      <div className="max-w-[800px] mx-auto px-[clamp(20px,4vw,48px)]">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] uppercase text-blue-900 leading-none mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-[0.88rem] text-gray-600 leading-relaxed">
          <p>
            <strong className="text-blue-900">Last updated:</strong> March 2026
          </p>
          <p>
            By using the {COMPANY_NAME} website, you agree to these terms. Please read them
            carefully.
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] uppercase text-blue-900 mt-8">
            Services
          </h2>
          <p>
            {COMPANY_NAME} provides pressure washing and soft washing services in the Denver, NC
            and Lake Norman area. All service agreements, pricing, and scheduling are handled
            separately from this website.
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] uppercase text-blue-900 mt-8">
            Website Use
          </h2>
          <p>
            This website is provided for informational purposes. We make reasonable efforts to
            keep the content accurate and up to date but make no guarantees. Images shown may
            represent typical results but actual results may vary.
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[1.4rem] uppercase text-blue-900 mt-8">
            Contact Us
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
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
