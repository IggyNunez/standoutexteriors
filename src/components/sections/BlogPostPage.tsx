import Image from "next/image";
import Link from "next/link";
import type { BlogPost, RichText } from "@/lib/blog-posts";
import { PHONE, PHONE_HREF } from "@/lib/constants";

interface Props {
  post: BlogPost;
}

/** Format an ISO date (YYYY-MM-DD) as e.g. "June 1, 2026". */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Render a RichText value: either a plain string or an array of segments
 * where each segment is text or an inline internal link. Inline links use
 * the brand blue with an underline so they read as links inside prose.
 */
function RichParagraph({ value }: { value: RichText }) {
  if (typeof value === "string") {
    return (
      <p className="text-[0.98rem] md:text-[1.05rem] leading-[1.85] text-gray-600">
        {value}
      </p>
    );
  }
  return (
    <p className="text-[0.98rem] md:text-[1.05rem] leading-[1.85] text-gray-600">
      {value.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <Link
            key={i}
            href={seg.href}
            className="text-blue-600 font-semibold underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600 transition-colors"
          >
            {seg.text}
          </Link>
        )
      )}
    </p>
  );
}

function Hero({ post }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#061e38] text-white pt-[120px] min-[1200px]:pt-[160px] pb-20">
      <div className="absolute inset-0">
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(6,30,56,0.92) 0%, rgba(10,46,92,0.82) 45%, rgba(10,46,92,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative z-[1] max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="max-w-[820px]">
          <nav className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span style={{ color: "#7ecfff" }}>{post.eyebrow}</span>
          </nav>

          <div className="mb-4">
            <span
              className="text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
              style={{
                background: "rgba(0,166,81,0.16)",
                border: "1px solid rgba(0,166,81,0.4)",
                color: "#7ef0a8",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#00A651" }}
              />
              {post.eyebrow}
            </span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.98] tracking-[0.02em] mb-6"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}
          >
            {post.h1}
          </h1>

          <div
            className="w-16 h-[2px] mb-6"
            style={{ background: "#00A651" }}
          />

          <p className="text-[1.02rem] md:text-[1.1rem] text-white/80 leading-[1.7] max-w-[640px] mb-6">
            {post.heroSubline}
          </p>

          <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/55">
            Published{" "}
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                {" · Updated "}
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

function Body({ post }: Props) {
  return (
    <section className="bg-white py-20 md:py-24">
      <article className="max-w-[760px] mx-auto px-[clamp(20px,4vw,80px)]">
        {/* Lead paragraphs */}
        <div className="space-y-5">
          {post.intro.map((p, i) => (
            <RichParagraph key={i} value={p} />
          ))}
        </div>

        {/* Sections */}
        {post.sections.map((section, si) => (
          <div key={si} className="mt-14">
            {section.heading && (
              <h2
                className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[1.05] tracking-[0.02em] mb-5"
                style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.1rem)" }}
              >
                {section.heading}
              </h2>
            )}
            <div className="space-y-5">
              {section.paragraphs.map((p, pi) => (
                <RichParagraph key={pi} value={p} />
              ))}
            </div>
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-5 space-y-3">
                {section.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-3">
                    <span
                      className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "#00A651" }}
                    />
                    <span className="text-[0.98rem] md:text-[1.05rem] leading-[1.8] text-gray-600">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>
    </section>
  );
}

function FaqSection({ post }: Props) {
  if (!post.faqs?.length) return null;
  return (
    <section className="bg-[#f8fafc] py-20 md:py-24">
      <div className="max-w-[820px] mx-auto px-[clamp(20px,4vw,80px)]">
        <div className="mb-10">
          <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-500">
            Questions
          </span>
          <h2
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[1] tracking-[0.02em] mt-3"
            style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.3rem)" }}
          >
            Frequently Asked
          </h2>
          <div
            className="w-12 h-[2px] mt-4"
            style={{ background: "#00A651" }}
          />
        </div>

        <div className="space-y-4">
          {post.faqs.map((f) => (
            <div
              key={f.question}
              className="rounded-2xl bg-white p-6"
              style={{
                border: "1px solid rgba(10,46,92,0.1)",
                boxShadow: "0 1px 3px rgba(10,46,92,0.04)",
              }}
            >
              <h3 className="text-[1rem] md:text-[1.05rem] font-bold text-blue-900 leading-snug mb-2">
                {f.question}
              </h3>
              <p className="text-[0.92rem] md:text-[0.98rem] leading-[1.75] text-gray-600">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #061e38 0%, #0A2E5C 60%, #0d3870 100%)",
      }}
    >
      <div
        className="absolute top-[10%] right-[10%] w-[440px] h-[220px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(43,125,233,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[860px] mx-auto px-[clamp(20px,4vw,80px)] text-center text-white">
        <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-[#7ecfff]">
          Ready to Get Started?
        </span>
        <h2
          className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.95] tracking-[0.02em] mt-4 mb-6"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
        >
          Get Your Gutters
          <br />
          <span style={{ color: "#00A651" }}>Flowing Again.</span>
        </h2>
        <p className="text-[0.95rem] md:text-[1rem] text-white/70 leading-[1.7] max-w-[600px] mx-auto mb-10">
          Quick response, honest pricing, and a satisfaction guarantee. We will
          walk your property, answer every question, and give you an exact number
          with no pressure and no contracts.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-orange-500 text-white text-[0.72rem] font-extrabold tracking-[0.08em] uppercase rounded-full hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] transition-all duration-300"
          >
            Request Free Estimate
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-white text-[0.72rem] font-bold tracking-[0.06em] uppercase border-2 border-white/30 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function BlogPostPage({ post }: Props) {
  return (
    <main className="w-full min-w-full">
      <Hero post={post} />
      <Body post={post} />
      <FaqSection post={post} />
      <FinalCTA />
    </main>
  );
}
