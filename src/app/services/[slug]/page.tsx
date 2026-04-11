import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/sections/ServiceDetailPage";
import {
  ServiceJsonLd,
  FaqJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { SERVICES, SITE_URL } from "@/lib/constants";
import { getServiceDetail } from "@/lib/service-details";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** Statically pre-render every /services/[slug] route at build time. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) {
    return { title: "Service not found" };
  }

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: detail.metaTitle ?? `${service.title} in Denver NC`,
    description: detail.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: detail.metaTitle ?? service.title,
      description: detail.metaDescription,
      images: [
        {
          url: service.image,
          width: 1600,
          height: 1200,
          alt: service.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: detail.metaTitle ?? service.title,
      description: detail.metaDescription,
      images: [service.image],
    },
  };
}

export default async function Page({ params }: RouteParams) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) notFound();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
  ];

  return (
    <>
      <ServiceJsonLd service={service} detail={detail} />
      <FaqJsonLd faqs={detail.faqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceDetailPage service={service} detail={detail} />
    </>
  );
}
