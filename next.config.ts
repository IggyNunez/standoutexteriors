import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },

  /**
   * 301 redirects from the old WordPress flat URLs to their new
   * /services/[slug] equivalents. These preserve SEO equity from the
   * pre-rebuild site and catch any old links still floating around
   * in directories, email footers, or existing backlinks.
   */
  async redirects() {
    return [
      // ── Old WP service pages → new /services/[slug] ─────────────
      { source: "/house-washing", destination: "/services/house-washing", permanent: true },
      { source: "/house-washing/", destination: "/services/house-washing", permanent: true },

      { source: "/roof-cleaning", destination: "/services/roof-cleaning", permanent: true },
      { source: "/roof-cleaning/", destination: "/services/roof-cleaning", permanent: true },

      { source: "/gutter-cleaning", destination: "/services/gutter-cleaning", permanent: true },
      { source: "/gutter-cleaning/", destination: "/services/gutter-cleaning", permanent: true },

      { source: "/window-cleaning", destination: "/services/window-cleaning", permanent: true },
      { source: "/window-cleaning/", destination: "/services/window-cleaning", permanent: true },

      { source: "/driveway-cleaning", destination: "/services/driveway-cleaning", permanent: true },
      { source: "/driveway-cleaning/", destination: "/services/driveway-cleaning", permanent: true },

      { source: "/brick-cleaning", destination: "/services/brick-cleaning", permanent: true },
      { source: "/brick-cleaning/", destination: "/services/brick-cleaning", permanent: true },

      // NOTE: /commercial is NOT redirected — it's a real hub page on the
      // new site (see src/app/commercial/page.tsx). Sending traffic to
      // /services/commercial-pressure-washing would orphan the hub.
      // Only redirect the trailing-slash variant if anyone lands there.
      // (Next handles /commercial <-> /commercial/ automatically.)

      // Old /churches → new /services/church-cleaning
      { source: "/churches", destination: "/services/church-cleaning", permanent: true },
      { source: "/churches/", destination: "/services/church-cleaning", permanent: true },

      // ── Old WP non-service pages → new site equivalents ─────────
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/our-team/", destination: "/about", permanent: true },

      { source: "/our-work", destination: "/before-after", permanent: true },
      { source: "/our-work/", destination: "/before-after", permanent: true },

      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },

      { source: "/free-quote", destination: "/contact", permanent: true },
      { source: "/free-quote/", destination: "/contact", permanent: true },

      { source: "/special-offer", destination: "/contact", permanent: true },
      { source: "/special-offer/", destination: "/contact", permanent: true },

      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/privacy-policy/", destination: "/privacy", permanent: true },

      // Old WP thank-you page — redirect to contact so the backlink/juice is preserved
      { source: "/thank-you", destination: "/contact", permanent: true },
      { source: "/thank-you/", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
