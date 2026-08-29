import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import ThankYouContent from "@/components/sections/ThankYouContent";
import { POST_SUBMIT_FAQS } from "@/lib/thank-you-faqs";

/**
 * /thank-you — the post-submission confirmation page.
 *
 * This is where the Google Ads lead conversion actually fires. Both the
 * /contact form and the /get-quote ad landing form stage a conversion in
 * sessionStorage and then navigate here; the client component reads it,
 * fires it once with a transaction_id, and clears it.
 *
 * Why a real page instead of the old inline success message:
 *   - Google's tag diagnostics, the Tag Assistant preview, and the
 *     "Recent conversions" report all key off a page view. An event fired
 *     into a component that never changes the URL is far harder to verify
 *     and easy to lose silently.
 *   - It gives us a testable URL. You can load /thank-you with Tag
 *     Assistant attached and watch the conversion fire.
 *   - It gives us a fallback: if the event-based conversion action ever
 *     misbehaves, a URL-based "page load" conversion action pointed at
 *     /thank-you will work without a code change.
 *
 * IMPORTANT: next.config.ts used to 301 /thank-you to /contact (a leftover
 * WordPress redirect). That redirect has been removed. If it ever comes
 * back, every conversion silently stops again.
 *
 * noindex: this page is only meaningful to someone who just submitted, and
 * indexing it would let it absorb "thank you" long-tail traffic and pollute
 * the conversion count with organic landings. It stays out of the sitemap
 * for the same reason.
 */
export const metadata: Metadata = {
  title: "Thank You. Your Free Estimate Request Is In",
  description:
    "Thanks for reaching out to Stand Out Exterior Cleaning. Ridge reviews every request personally and replies with a free estimate, usually within a few hours.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/thank-you` },
};

export default function ThankYouPage() {
  return (
    <main className="w-full min-w-full bg-white">
      {/* FAQPage schema. The page is noindex'd so this will not win a rich
          result, but it keeps the markup honest if that ever changes. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: POST_SUBMIT_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
      <ThankYouContent />
    </main>
  );
}
