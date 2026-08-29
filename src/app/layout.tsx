import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/layout/MotionProvider";
import AttributionCapture from "@/components/analytics/AttributionCapture";
import { GOOGLE_ADS_ID } from "@/lib/conversion";
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
    "Christmas light installation Denver NC",
    "holiday lighting Lake Norman",
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
        alt: "Stand Out Exterior Cleaning, professional pressure washing in Denver NC",
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
        {/* Preload LCP hero background image with high priority.
            Mobile gets a 67 KB tightly-cropped WebP; desktop gets the
            larger one. The <link> media= attribute lets the browser only
            fetch the version it needs. */}
        <link
          rel="preload"
          as="image"
          href="/assets/hero-bg-mobile.webp"
          type="image/webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/hero-bg.webp"
          type="image/webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased">
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        {/* Captures gclid / UTM params on landing and stores them for 90 days
            so the lead form can report the exact campaign and keyword. */}
        <AttributionCapture />

        <MotionProvider>
          <Nav />
          {children}
          <Footer />
        </MotionProvider>

        {/* Google Ads global site tag.
            The lead conversion fires from /thank-you on page load, after a
            confirmed form submission (see src/lib/conversion.ts).

            conversion_linker writes the _gcl_aw cookie that carries the
            gclid from the ad click through to the conversion. Without it,
            a visitor who clicks the ad and then navigates before converting
            is invisible to Google Ads. It defaults on, but we set it
            explicitly so nobody removes it by accident.

            allow_enhanced_conversions lets the thank-you page pass a hashed
            email and phone with the conversion, which recovers matches that
            cookie-based tracking misses. It also has to be switched on for
            the conversion action inside the Google Ads UI. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}', {
  conversion_linker: true,
  allow_enhanced_conversions: true
});`}
        </Script>
      </body>
    </html>
  );
}
