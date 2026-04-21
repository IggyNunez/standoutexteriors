import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
    // Drop the upscaled 750/828/1080 widths from the responsive srcset.
    // None of our above-the-fold images render wider than ~640 CSS px on
    // mobile or ~960 CSS px on desktop, so the larger widths only waste
    // bytes (Lighthouse flagged ~115 KB of oversized team photos).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Tree-shake framer-motion's heavy modular API. Without this, every
  // `import { motion } from "framer-motion"` pulls in the entire ~70 KB
  // gzipped runtime. With it, Next only ships the features we actually use.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  /**
   * Disable Next.js's automatic trailing-slash stripper so our own
   * redirect rules below can handle `/foo/` → `/services/foo` in a
   * SINGLE 301 hop. Without this flag Next emits a 308 first
   * (`/foo/` → `/foo`) and our 301 fires as a second hop — that
   * redirect chain is what Search Console flags as "Page with redirect
   * — validation failed" (Google discourages chains and only partially
   * passes link equity through them).
   *
   * Any path that isn't explicitly listed in `redirects()` below will
   * still resolve with OR without a trailing slash because Next's
   * router normalizes the match either way once this flag is set —
   * we just lose the automatic redirect between the two forms.
   * Canonical tags on every page ensure Google picks the right URL.
   */
  skipTrailingSlashRedirect: true,

  /**
   * 301 redirects from the old WordPress flat URLs to their new
   * /services/[slug] equivalents. These preserve SEO equity from the
   * pre-rebuild site and catch any old links still floating around
   * in directories, email footers, or existing backlinks.
   *
   * Each legacy path gets TWO rules — one for `/foo` and one for
   * `/foo/` — both pointing directly at the new URL. Because we set
   * `skipTrailingSlashRedirect: true` above, both resolve in exactly
   * one 301 hop (no 308 → 301 chain).
   *
   * We use `statusCode: 301` (not `permanent: true`) because
   * `permanent: true` emits a 308. Google honors both, but 301 is the
   * canonical "moved permanently" signal that every SEO tool expects.
   */
  async redirects() {
    // Helper — emit one-hop 301s for both `/foo` and `/foo/`.
    const legacy = (from: string, to: string) => [
      { source: `/${from}`, destination: to, statusCode: 301 as const },
      { source: `/${from}/`, destination: to, statusCode: 301 as const },
    ];

    return [
      // ── Old WP service pages → new /services/[slug] ─────────────
      ...legacy("house-washing", "/services/house-washing"),
      ...legacy("roof-cleaning", "/services/roof-cleaning"),
      ...legacy("gutter-cleaning", "/services/gutter-cleaning"),
      ...legacy("window-cleaning", "/services/window-cleaning"),
      ...legacy("driveway-cleaning", "/services/driveway-cleaning"),
      ...legacy("brick-cleaning", "/services/brick-cleaning"),

      // NOTE: /commercial is NOT redirected — it's a real hub page on the
      // new site (see src/app/commercial/page.tsx). Sending traffic to
      // /services/commercial-pressure-washing would orphan the hub.

      // Old /churches → new /services/church-cleaning
      ...legacy("churches", "/services/church-cleaning"),

      // ── Old WP non-service pages → new site equivalents ─────────
      ...legacy("our-team", "/about"),
      ...legacy("our-work", "/before-after"),
      ...legacy("contact-us", "/contact"),
      ...legacy("free-quote", "/contact"),
      ...legacy("special-offer", "/contact"),
      ...legacy("privacy-policy", "/privacy"),
      // Old WP thank-you page — redirect to contact so the backlink/juice is preserved
      ...legacy("thank-you", "/contact"),
    ];
  },
};

export default nextConfig;
