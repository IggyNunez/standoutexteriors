import type { NavLink, ServiceCard, ProcessStep, Testimonial, FAQ, HeroStat, CTAStat } from "@/types";

// ── Navigation ──
export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Commercial", href: "/commercial" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const PHONE = "704-917-9649";
export const PHONE_HREF = "tel:+17049179649";
export const EMAIL = "info@standoutexterior.com";
export const ADDRESS = "Denver, NC 28037";
export const SITE_URL = "https://www.standoutexterior.com";
export const COMPANY_NAME = "Stand Out Exterior Cleaning LLC";
export const TAGLINE = "Denver's Trusted Pressure Washing Experts";

// ── Social ──
export const SOCIAL = {
  facebook: "https://www.facebook.com/standoutsolution/",
  instagram: "https://www.instagram.com/standoutexterior/",
  nextdoor: "https://nextdoor.com/pages/ridge-curwood-pressure-washing-denver-nc/",
};

// ── Hero Stats ──
export const HERO_STATS: HeroStat[] = [
  { value: "5+", label: "Years Experience" },
  { value: "500+", label: "Jobs Completed" },
  { value: "5.0", label: "Star Rating" },
  { value: "100%", label: "Satisfaction" },
];

// ── CTA Stats ──
export const CTA_STATS: CTAStat[] = [
  { value: "500+", label: "Properties Cleaned" },
  { value: "5.0", label: "Average Rating" },
  { value: "100%", label: "Satisfaction Guaranteed" },
];

// ── Services ──
export const SERVICES: ServiceCard[] = [
  {
    slug: "house-washing",
    label: "Residential",
    title: "House Washing",
    description: "Restore your home's curb appeal with our professional soft washing service. We safely remove dirt, algae, mold, and mildew from all siding types including vinyl, brick, stucco, and wood.",
    image: "/assets/house-washing.jpg",
    imageAlt: "Professional house washing service in Denver NC",
    icon: "home",
    bullets: [
      "Safe for vinyl, brick, stucco & wood siding",
      "Removes algae, mold, mildew & dirt buildup",
      "Low-pressure soft wash protects surfaces",
      "Boosts curb appeal and property value",
    ],
  },
  {
    slug: "driveway-cleaning",
    label: "Residential",
    title: "Driveway Cleaning",
    description: "Blast away oil stains, tire marks, mold, and years of built-up grime from your concrete and paver driveways. Our high-pressure cleaning delivers dramatic before-and-after results.",
    image: "/assets/driveway-cleaning.jpg",
    imageAlt: "Driveway pressure washing in Denver NC",
    icon: "road",
    bullets: [
      "Removes oil stains, tire marks & grime",
      "Concrete, pavers & asphalt surfaces",
      "High-pressure cleaning for stubborn stains",
      "Dramatic before-and-after results",
    ],
  },
  {
    slug: "roof-cleaning",
    label: "Residential",
    title: "Roof Cleaning",
    description: "Remove unsightly black streaks, algae, and moss from your roof with our low-pressure cleaning method. We extend the life of your shingles without causing any damage.",
    image: "/assets/roof-cleaning.jpg",
    imageAlt: "Roof cleaning and moss removal in Denver NC",
    icon: "roof",
    bullets: [
      "Removes black streaks, algae & moss",
      "Low-pressure method prevents shingle damage",
      "Extends roof lifespan by years",
      "Restores original appearance",
    ],
  },
  {
    slug: "gutter-cleaning",
    label: "Residential",
    title: "Gutter Cleaning & Brightening",
    description: "Keep your gutters flowing freely and looking brand new. We remove debris, flush downspouts, and brighten oxidized gutter faces to restore their original shine.",
    image: "/assets/gutter-cleaning.jpg",
    imageAlt: "Gutter cleaning and brightening service in Denver NC",
    icon: "gutter",
    bullets: [
      "Complete debris removal & downspout flush",
      "Gutter face brightening & oxidation removal",
      "Prevents water damage & foundation issues",
      "Extends gutter system lifespan",
    ],
  },
  {
    slug: "fence-washing",
    label: "Residential",
    title: "Fence Washing",
    description: "Bring your fences back to life with our professional cleaning service. We handle wood, vinyl, aluminum, and chain-link fences, removing years of weather staining and green growth.",
    image: "/assets/fence-washing.jpg",
    imageAlt: "Fence washing and restoration in Denver NC",
    icon: "fence",
    bullets: [
      "Wood, vinyl, aluminum & chain-link fences",
      "Removes green growth, stains & weathering",
      "Prepares surfaces for staining or sealing",
      "Restores natural beauty of the material",
    ],
  },
  {
    slug: "paver-cleaning",
    label: "Residential",
    title: "Paver Cleaning, Sealing & Sanding",
    description: "Complete paver restoration including deep cleaning, joint re-sanding, and professional sealing. Protect your pavers from moisture damage, weeds, and shifting.",
    image: "/assets/paver-cleaning.jpg",
    imageAlt: "Paver cleaning and sealing service in Denver NC",
    icon: "paver",
    bullets: [
      "Deep cleaning removes embedded dirt & stains",
      "Polymeric sand replacement in joints",
      "Professional sealer protects against moisture",
      "Prevents weed growth & paver shifting",
    ],
  },
  {
    slug: "commercial-pressure-washing",
    label: "Commercial",
    title: "Commercial Pressure Washing",
    description: "Keep your business looking professional with our commercial pressure washing services. We clean storefronts, sidewalks, parking lots, dumpster pads, and more.",
    image: "/assets/commercial-washing.jpg",
    imageAlt: "Commercial pressure washing in Denver NC",
    icon: "building",
    bullets: [
      "Storefronts, sidewalks & parking lots",
      "Dumpster pad cleaning & sanitization",
      "Drive-through lane cleaning",
      "Flexible scheduling to minimize disruption",
    ],
  },
];

// ── Process Steps ──
export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    icon: "phone",
    title: "Free Estimate",
    desc: "Call us or fill out our contact form. We'll assess your property and provide a free, no-obligation estimate.",
  },
  {
    num: "02",
    icon: "clipboard",
    title: "Custom Plan",
    desc: "We'll determine the best cleaning method for each surface, soft wash or pressure wash, and schedule your service.",
  },
  {
    num: "03",
    icon: "sparkle",
    title: "Expert Clean",
    desc: "Our trained professionals arrive on time with commercial-grade equipment and get to work transforming your property.",
  },
  {
    num: "04",
    icon: "star",
    title: "Stand Out Results",
    desc: "Walk through the results with us. We don't leave until you're 100% satisfied with our work.",
  },
];

// ── Service Areas ──
export const SERVICE_AREAS = [
  "Denver",
  "Mooresville",
  "Huntersville",
  "Cornelius",
  "Iron Station",
  "Sherrills Ford",
  "Lincolnton",
  "Hickory",
  "Lake Norman",
  "Charlotte",
];

// ── Testimonials ──
export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Ridge did an amazing job on our house wash and driveway. The difference was night and day. Super professional, on time, and the price was very fair. Already booked for next year!",
    name: "Sarah M.",
    location: "Mooresville, NC",
    rating: 5,
  },
  {
    text: "Called Stand Out for a roof cleaning and they were fantastic. They explained the soft wash process, were careful with our landscaping, and the roof looks brand new. Highly recommend!",
    name: "David K.",
    location: "Denver, NC",
    rating: 5,
  },
  {
    text: "We had our entire fence and patio cleaned and sealed. The pavers look incredible, like they were just installed. Ridge and his team are the real deal. Will be using them for everything.",
    name: "Jennifer L.",
    location: "Huntersville, NC",
    rating: 5,
  },
  {
    text: "Best pressure washing service in the Lake Norman area. They did our driveway, sidewalks, and back patio. The before and after photos speak for themselves. Fair pricing too.",
    name: "Michael R.",
    location: "Cornelius, NC",
    rating: 5,
  },
];

// ── FAQs ──
export const FAQS: FAQ[] = [
  {
    question: "What's the difference between soft washing and pressure washing?",
    answer: "Pressure washing uses high water pressure to blast away dirt and grime, great for hard surfaces like concrete driveways and sidewalks. Soft washing uses lower pressure combined with eco-friendly cleaning solutions to safely clean delicate surfaces like roofs, siding, and painted wood without causing damage.",
  },
  {
    question: "How often should I get my house washed?",
    answer: "We recommend getting your house washed at least once a year. Annual cleaning prevents the buildup of algae, mold, and mildew that can damage your siding and reduce your home's curb appeal. Homes near lakes or in shaded areas may benefit from cleaning every 6-8 months.",
  },
  {
    question: "Will pressure washing damage my surfaces?",
    answer: "Not when done by professionals. We assess every surface and choose the appropriate cleaning method. Soft washing is used for delicate materials like shingles, vinyl siding, and stucco, while pressure washing is reserved for hard surfaces like concrete. We never use more pressure than necessary.",
  },
  {
    question: "Do you offer free estimates?",
    answer: "Absolutely! We provide free, no-obligation estimates for all of our services. Simply give us a call at 704-917-9649 or fill out our contact form, and we'll get back to you promptly.",
  },
  {
    question: "Are your cleaning solutions safe for pets and plants?",
    answer: "Yes. We use eco-friendly, biodegradable cleaning solutions that are safe for your family, pets, and landscaping. We also take precautions to protect your plants during the cleaning process.",
  },
  {
    question: "Do you work with commercial clients?",
    answer: "Yes! We offer commercial pressure washing for businesses throughout the Denver and Lake Norman area. We can clean storefronts, sidewalks, parking lots, dumpster pads, and more. We offer flexible scheduling to minimize disruption to your business.",
  },
  {
    question: "What areas do you serve?",
    answer: "We proudly serve Denver, Mooresville, Huntersville, Cornelius, Iron Station, Sherrills Ford, Lincolnton, Hickory, and the greater Lake Norman and Charlotte area. If you're not sure if we service your area, give us a call!",
  },
  {
    question: "How long does a typical cleaning take?",
    answer: "It depends on the size of the job. A standard house wash typically takes 1-2 hours, while a driveway or patio can be done in 30-60 minutes. Larger commercial jobs may take longer. We'll give you a time estimate when we provide your quote.",
  },
  {
    question: "Do I need to be home during the service?",
    answer: "Not necessarily. As long as we have access to the areas being cleaned and a water source, we can complete the job while you're away. We'll send you before and after photos when we're done!",
  },
  {
    question: "Why should I hire a professional instead of doing it myself?",
    answer: "Professional-grade equipment delivers better results, and our experience means we know the right pressure and technique for every surface. DIY pressure washing can damage siding, strip paint, or gouge wood if done incorrectly. We're fully insured, so you're protected.",
  },
];

// ── Ticker Items (for marquee) ──
export const TICKER_ITEMS = [
  "Soft Washing",
  "Pressure Washing",
  "House Washing",
  "Roof Cleaning",
  "Gutter Brightening",
  "Driveway Cleaning",
  "Fence Washing",
  "Paver Sealing",
  "Commercial Cleaning",
  "Free Estimates",
  "Lake Norman Area",
  "5-Star Rated",
];
