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

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  service?: string;
  message?: string;
}

export interface LeadApiResponse {
  success: boolean;
  message: string;
}
