import type { MetadataRoute } from "next";
import { SERVICES, SITE_URL } from "@/lib/constants";
import { CITY_SLUGS } from "@/lib/city-details";

/**
 * Dynamic sitemap.xml generator.
 * Next.js 16 serves this at /sitemap.xml automatically.
 *
 * Includes:
 *  - Static marketing pages (home, about, services index, commercial,
 *    contact, before-after, reviews)
 *  - All 10 /services/[slug] pages (pulled from SERVICES constants)
 *  - Legal pages (privacy, terms)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top priority — money pages
  const topLevel: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/commercial`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/before-after`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Each service page — highest-intent SEO pages on the site
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Per-city landing pages — local SEO money pages
  const areasIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
  const cityPages: MetadataRoute.Sitemap = CITY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/areas/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Legal — low priority but still indexed
  const legal: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...topLevel, ...servicePages, ...areasIndex, ...cityPages, ...legal];
}
