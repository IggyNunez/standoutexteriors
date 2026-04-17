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
   * 301 redirects from the old WordPress flat URLs to their new
   * /services/[slug] equivalents. These preserve SEO equity from the
   * pre-rebuild site and catch any old links still floating around
   * in directories, email footers, or existing backlinks.
   *
   * NOTE: We use `statusCode: 301` (not `permanent: true`) because
   * `permanent: true` emits a 308. Google honors 308, but 301 is the
   * canonical "moved permanently" signal for SEO tooling and avoids
   * edge-cases where crawlers flag 308 chains as redirect errors.
   */
  async redirects() {
    return [
      // ── Old WP service pages → new /services/[slug] ─────────────
      { source: "/house-washing", destination: "/services/house-washing", statusCode: 301 },
      { source: "/house-washing/", destination: "/services/house-washing", statusCode: 301 },

      { source: "/roof-cleaning", destination: "/services/roof-cleaning", statusCode: 301 },
      { source: "/roof-cleaning/", destination: "/services/roof-cleaning", statusCode: 301 },

      { source: "/gutter-cleaning", destination: "/services/gutter-cleaning", statusCode: 301 },
      { source: "/gutter-cleaning/", destination: "/services/gutter-cleaning", statusCode: 301 },

      { source: "/window-cleaning", destination: "/services/window-cleaning", statusCode: 301 },
      { source: "/window-cleaning/", destination: "/services/window-cleaning", statusCode: 301 },

      { source: "/driveway-cleaning", destination: "/services/driveway-cleaning", statusCode: 301 },
      { source: "/driveway-cleaning/", destination: "/services/driveway-cleaning", statusCode: 301 },

      { source: "/brick-cleaning", destination: "/services/brick-cleaning", statusCode: 301 },
      { source: "/brick-cleaning/", destination: "/services/brick-cleaning", statusCode: 301 },

      // NOTE: /commercial is NOT redirected — it's a real hub page on the
      // new site (see src/app/commercial/page.tsx). Sending traffic to
      // /services/commercial-pressure-washing would orphan the hub.
      // Only redirect the trailing-slash variant if anyone lands there.
      // (Next handles /commercial <-> /commercial/ automatically.)

      // Old /churches → new /services/church-cleaning
      { source: "/churches", destination: "/services/church-cleaning", statusCode: 301 },
      { source: "/churches/", destination: "/services/church-cleaning", statusCode: 301 },

      // ── Old WP non-service pages → new site equivalents ─────────
      { source: "/our-team", destination: "/about", statusCode: 301 },
      { source: "/our-team/", destination: "/about", statusCode: 301 },

      { source: "/our-work", destination: "/before-after", statusCode: 301 },
      { source: "/our-work/", destination: "/before-after", statusCode: 301 },

      { source: "/contact-us", destination: "/contact", statusCode: 301 },
      { source: "/contact-us/", destination: "/contact", statusCode: 301 },

      { source: "/free-quote", destination: "/contact", statusCode: 301 },
      { source: "/free-quote/", destination: "/contact", statusCode: 301 },

      { source: "/special-offer", destination: "/contact", statusCode: 301 },
      { source: "/special-offer/", destination: "/contact", statusCode: 301 },

      { source: "/privacy-policy", destination: "/privacy", statusCode: 301 },
      { source: "/privacy-policy/", destination: "/privacy", statusCode: 301 },

      // Old WP thank-you page — redirect to contact so the backlink/juice is preserved
      { source: "/thank-you", destination: "/contact", statusCode: 301 },
      { source: "/thank-you/", destination: "/contact", statusCode: 301 },
    ];
  },
};

export default nextConfig;
