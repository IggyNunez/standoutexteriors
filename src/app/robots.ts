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
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
