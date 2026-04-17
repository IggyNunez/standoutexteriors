import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityLandingPage from "@/components/sections/CityLandingPage";
import {
  BreadcrumbJsonLd,
  CityServiceJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { CITY_DETAILS, CITY_SLUGS, getCityDetail } from "@/lib/city-details";

interface RouteParams {
  params: Promise<{ city: string }>;
}

/** Statically pre-render every /areas/[city] route at build time. */
export function generateStaticParams() {
  return CITY_SLUGS.map((slug) => ({ city: slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityDetail(slug);

  if (!city) return { title: "City not found" };

  const url = `${SITE_URL}/areas/${city.slug}`;

  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: city.metaTitle,
      description: city.metaDescription,
      images: [
        {
          url: "/assets/og-home.jpg",
          width: 1200,
          height: 630,
          alt: `Pressure washing in ${city.name}, ${city.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
      images: ["/assets/og-home.jpg"],
    },
  };
}

export default async function Page({ params }: RouteParams) {
  const { city: slug } = await params;
  const city = CITY_DETAILS[slug];

  if (!city) notFound();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Service Areas", url: `${SITE_URL}/areas` },
    {
      name: `${city.name}, ${city.state}`,
      url: `${SITE_URL}/areas/${city.slug}`,
    },
  ];

  return (
    <>
      <CityServiceJsonLd city={city} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <CityLandingPage city={city} />
    </>
  );
}
