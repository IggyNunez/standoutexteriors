import { COMPANY_NAME, PHONE, EMAIL, ADDRESS, SITE_URL, SOCIAL, SERVICE_AREAS } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
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
      "Fence Washing",
      "Paver Cleaning and Sealing",
      "Commercial Pressure Washing",
    ],
    sameAs: [SOCIAL.facebook, SOCIAL.nextdoor],
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
