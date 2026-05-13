import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Dynamic robots.txt generator.
 * Next.js 16 serves this at /robots.txt automatically.
 *
 * Allows all crawlers on all public pages. Blocks /api/* (backend
 * routes shouldn't be indexed). Points crawlers at the sitemap so they
 * discover every page on the first pass.
 */
export default function robots(): MetadataRoute.Robots {
  // No `host` directive — it's a non-standard Yandex-only field that
  // Lighthouse's robots-txt audit flags as invalid.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
