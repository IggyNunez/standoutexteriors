import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = "https://www.standoutexterior.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Trusted Denver Pressure Washing Experts | Stand Out Exterior Cleaning",
    template: "%s | Stand Out Exterior Cleaning",
  },
  description:
    "Professional pressure washing & soft washing in Denver, NC & the Lake Norman area. House washing, roof cleaning, driveway cleaning, gutter brightening & more. Free estimates. 704-917-9649.",
  keywords: [
    "pressure washing Denver NC",
    "soft washing Lake Norman",
    "house washing Denver NC",
    "roof cleaning Denver NC",
    "driveway cleaning Mooresville",
    "gutter cleaning Huntersville",
    "commercial pressure washing",
    "paver cleaning and sealing",
    "fence washing Cornelius NC",
    "exterior cleaning Lake Norman",
    "Stand Out Exterior Cleaning",
    "pressure washing near me",
  ],
  authors: [{ name: "Stand Out Exterior Cleaning LLC" }],
  creator: "Stand Out Exterior Cleaning LLC",
  publisher: "Stand Out Exterior Cleaning LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Stand Out Exterior Cleaning",
    title: "Trusted Denver Pressure Washing Experts | Stand Out Exterior Cleaning",
    description:
      "Professional pressure washing & soft washing in Denver, NC & the Lake Norman area. Free estimates. 704-917-9649.",
    images: [
      {
        url: "/assets/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Stand Out Exterior Cleaning — professional pressure washing in Denver NC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Denver Pressure Washing Experts | Stand Out Exterior Cleaning",
    description:
      "Professional pressure washing & soft washing in Denver, NC & the Lake Norman area. Free estimates.",
    images: ["/assets/og-home.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <meta name="geo.region" content="US-NC" />
        <meta name="geo.placename" content="Denver" />
        <meta
          name="google-site-verification"
          content="_8rZ_rADJuifVCxDdPlhDYaBL5b86xTmyaRu3p_Zv3I"
        />
        {/* Preload LCP hero background image with high priority */}
        <link
          rel="preload"
          as="image"
          href="/assets/hero-bg.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
