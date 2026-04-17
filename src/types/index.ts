export interface NavLink {
  label: string;
  href: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ServiceCard {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  bullets: string[];
}

/**
 * Deep content for an individual /services/[slug] page.
 * Keyed by slug in src/lib/service-details.ts
 */
export interface ServiceDetail {
  /** One-word marketing label that appears in the hero eyebrow (e.g. "Soft Washing") */
  eyebrow: string;
  /** Big display headline — can be multi-line via \n split handled in the component */
  heroHeadline: string;
  /** Optional hero sub-headline / tagline */
  heroSubline: string;
  /** Plain-english meta description (used for <meta name="description">) */
  metaDescription: string;
  /** SEO-friendly <title> override; if absent we fall back to title + location */
  metaTitle?: string;
  /** Ordered body paragraphs — pure prose, no HTML */
  bodyParagraphs: string[];
  /** 4–6 short benefits shown in a grid under the body */
  benefits: { title: string; desc: string }[];
  /** Ordered process steps — how we do this specific service */
  process: { title: string; desc: string }[];
  /** Page-specific FAQs — power FAQPage JSON-LD schema too */
  faqs: { question: string; answer: string }[];
  /** Related service slugs to cross-link at the bottom of the page */
  related: string[];
  /** Optional surfaces / materials we handle for this service */
  surfaces?: string[];
}

export interface ProcessStep {
  num: string;
  icon: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  text: string;
  name: string;
  location: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CTAStat {
  value: string;
  label: string;
}

/**
 * Per-city landing page content for /areas/[city].
 * Keyed by URL slug (e.g. "denver-nc") in src/lib/city-details.ts.
 * Unique copy per city is critical — duplicate content across city
 * pages triggers Google's low-quality-page filter.
 */
export interface CityDetail {
  /** URL slug — e.g. "denver-nc" (no leading slash) */
  slug: string;
  /** Display name — e.g. "Denver" */
  name: string;
  /** State abbreviation — e.g. "NC" */
  state: string;
  /** County for LocalBusiness schema — e.g. "Lincoln County" */
  county: string;
  /** Approximate latitude for GeoCoordinates schema */
  latitude: number;
  /** Approximate longitude for GeoCoordinates schema */
  longitude: number;
  /** ZIP codes primarily served in this city */
  zipCodes: string[];
  /** Local landmarks, neighborhoods, or references that signal authentic local knowledge */
  landmarks: string[];
  /** Unique 2–3 sentence intro paragraph — NEVER reused across cities */
  heroIntro: string;
  /** Unique body paragraph expanding on local conditions (humidity, pollen, lake homes, etc.) */
  bodyIntro: string;
  /** Local pain points this city's homeowners commonly face */
  localChallenges: { title: string; desc: string }[];
  /** SEO meta title override */
  metaTitle: string;
  /** SEO meta description */
  metaDescription: string;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  service?: string;
  /** "How did you find us?" attribution field for marketing analytics */
  source?: string;
  message?: string;
}

export interface LeadApiResponse {
  success: boolean;
  message: string;
}
