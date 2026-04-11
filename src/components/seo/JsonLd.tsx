import {
  COMPANY_NAME,
  PHONE,
  EMAIL,
  SITE_URL,
  SOCIAL,
  SERVICE_AREAS,
} from "@/lib/constants";
import type { ServiceCard, ServiceDetail } from "@/types";

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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denver",
      addressRegion: "NC",
      postalCode: "28037",
      addressCountry: "US",
    },
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
