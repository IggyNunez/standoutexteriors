import {
  COMPANY_NAME,
  PHONE,
  EMAIL,
  SITE_URL,
  STREET_ADDRESS,
  SOCIAL,
  SERVICE_AREAS,
} from "@/lib/constants";
import type { CityDetail, ServiceCard, ServiceDetail } from "@/types";

/* ─── LocalBusiness (root layout) ────────────────────────────────────── */
export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: COMPANY_NAME,
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    description:
      "Professional pressure washing & soft washing in Denver, NC & the Lake Norman area. House washing, roof cleaning, driveway cleaning, gutter brightening & more.",
    logo: `${SITE_URL}/assets/logo-transparent.png`,
    image: `${SITE_URL}/assets/og-home.jpg`,
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET_ADDRESS,
      addressLocality: "Denver",
      addressRegion: "NC",
      postalCode: "28037",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "19:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "15:00",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.531,
      longitude: -81.029,
    },
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City",
      name: `${city}, NC`,
    })),
    serviceType: [
      "Pressure Washing",
      "Soft Washing",
      "House Washing",
      "Roof Cleaning",
      "Driveway Cleaning",
      "Gutter Cleaning",
      "Window Cleaning",
      "Fence Washing",
      "Paver Cleaning and Sealing",
      "Brick Cleaning",
      "Commercial Pressure Washing",
      "Church Exterior Cleaning",
      "Christmas Light Installation",
      "Holiday Lighting Installation",
    ],
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.nextdoor],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "20",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Service schema (per-service page) ──────────────────────────────── */
export function ServiceJsonLd({
  service,
  detail,
}: {
  service: ServiceCard;
  detail: ServiceDetail;
}) {
  const url = `${SITE_URL}/services/${service.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: detail.metaDescription,
    url,
    image: `${SITE_URL}${service.image}`,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: COMPANY_NAME,
      telephone: PHONE,
      url: SITE_URL,
    },
    areaServed: SERVICE_AREAS.map((city) => ({
      "@type": "City",
      name: `${city}, NC`,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── FAQPage schema (per-service FAQ) ───────────────────────────────── */
export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── BreadcrumbList schema (per-service page) ───────────────────────── */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── City landing page schema ───────────────────────────────────────── */
/**
 * Emits a Service schema pinned to a specific city, with geo coordinates
 * and areaServed narrowed to that city. This tells Google "this page is
 * about exterior cleaning, offered specifically in <city>" — the
 * strongest signal for local-pack rankings.
 */
export function CityServiceJsonLd({ city }: { city: CityDetail }) {
  const url = `${SITE_URL}/areas/${city.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Pressure Washing in ${city.name}, ${city.state}`,
    serviceType: "Pressure Washing",
    description: city.metaDescription,
    url,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: COMPANY_NAME,
      telephone: PHONE,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: `${city.name}, ${city.state}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.county,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.latitude,
        longitude: city.longitude,
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── WebSite schema (root layout — helps Google understand site name) ── */
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stand Out Exterior Cleaning",
    url: SITE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
