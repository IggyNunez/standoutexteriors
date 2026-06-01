/**
 * File-based content for the "silent" SEO blog at /blog/[slug].
 *
 * IMPORTANT: This blog is intentionally NOT linked from site navigation,
 * the footer, or any visible index. It exists purely to capture long-tail
 * and local search traffic. Posts are crawlable and live in the sitemap,
 * but a visitor only reaches them from Google. Do NOT add a /blog index
 * page or a nav/footer link.
 *
 * To publish a new post, append a new BlogPost object to BLOG_POSTS.
 * generateStaticParams in src/app/blog/[slug]/page.tsx and the sitemap
 * pick it up automatically. Remember to also add the URL to
 * src/app/sitemap.ts (priority ~0.6, monthly).
 *
 * STYLE RULE: never use em dashes in any user-facing copy.
 */

/** An inline link inside a paragraph (text + internal href). */
export interface BlogLink {
  text: string;
  href: string;
}

/**
 * A paragraph is either plain text or an ordered list of segments, where
 * each segment is either a plain string or an inline link. This lets us
 * weave natural internal links into the prose without HTML in the data.
 */
export type RichText = string | (string | BlogLink)[];

export interface BlogSection {
  /** H2 heading for the section. Optional for lead-in blocks. */
  heading?: string;
  paragraphs: RichText[];
  /** Optional bullet list rendered under the paragraphs. */
  bullets?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  /** SEO <title> (~55-60 chars). Used as an absolute title. */
  title: string;
  /** Meta description (~150-160 chars). */
  metaDescription: string;
  /** On-page H1, written to match search intent. */
  h1: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** Optional ISO date of last meaningful update. */
  updatedAt?: string;
  /** The exact keyword this post targets. */
  targetKeyword: string;
  /** Hero background image (public path). */
  heroImage: string;
  heroImageAlt: string;
  /** Short eyebrow label above the H1. */
  eyebrow: string;
  /** Short hero subline under the H1. */
  heroSubline: string;
  /** Lead paragraphs rendered directly under the H1. */
  intro: RichText[];
  sections: BlogSection[];
  faqs?: BlogFaq[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "gutter-cleaning-denver-nc",
    title: "Gutter Cleaning in Denver, NC: A Local Homeowner's Guide",
    metaDescription:
      "How often should you clean gutters in Denver, NC? A local guide to pine needles, oak pollen, and Lake Norman humidity, plus when it pays to call a pro.",
    h1: "Gutter Cleaning in Denver, NC: What Local Homeowners Need to Know",
    publishedAt: "2026-06-01",
    targetKeyword: "gutter cleaning denver nc",
    heroImage: "/assets/team/ridge-gutter-cleaning-bucket.webp",
    heroImageAlt:
      "Ridge Curwood cleaning a home's gutters by hand in Denver NC",
    eyebrow: "Gutter Cleaning Guide",
    heroSubline:
      "A practical, local look at why Denver gutters clog so fast, how often to clean them, and the warning signs you should not ignore.",
    intro: [
      "If you own a home in Denver, NC, your gutters work harder than you might think. Between the mature oaks and loblolly pines that shade so many lots out here, the heavy spring pollen, and the steady humidity that lifts off Lake Norman, our gutters fill up faster than gutters in drier, more open parts of the state.",
      "This guide walks through how often to clean gutters in the 28037 area, the local conditions that clog them, the warning signs to watch for, and when it makes sense to hand the job to a professional instead of climbing a ladder yourself.",
    ],
    sections: [
      {
        heading: "Why Denver, NC gutters clog faster than most",
        paragraphs: [
          "Denver sits in a pocket of Lincoln County with heavy tree cover and lake-driven humidity, and that combination is hard on a gutter system. A few local factors stack up:",
        ],
        bullets: [
          "Pine needles. Loblolly and longleaf pines drop needles year round, not just in fall. Needles knit together into a dense mat that water runs right over instead of through.",
          "Oak tannin and leaf drop. The big hardwoods in neighborhoods like Westport, Sailview, and Verdict Ridge shed leaves and acorns that rot into a sludge in the bottom of the trough.",
          "Spring pollen. Denver's pollen season coats everything in a fine yellow film. Inside a gutter that film mixes with grit and turns into a paste that holds water.",
          "Lake Norman humidity. Damp debris does not dry out and blow away. It stays wet, breaks down, and grows the algae and weeds you sometimes see sprouting from a neglected gutter.",
          "Red-clay grit. Roof runoff carries fine clay sediment off shingles, and it settles into the low spots and downspout elbows where it slowly chokes the flow.",
        ],
      },
      {
        heading: "How often should you clean gutters in Denver?",
        paragraphs: [
          "For most Denver homes, twice a year is the right baseline: once in late spring after the pollen and oak flowers finish dropping, and once in late fall after the leaves come down. That schedule keeps the system clear through the two seasons that clog it the most.",
          "If your home sits under heavy pine or oak cover, which is common on the older lots near East Lincoln and along the Lake Norman shoreline, plan on three or even four visits a year. Pines in particular do not take a season off, so a home tucked into the trees can pack a gutter solid between two scheduled cleanings.",
          [
            "Newer, more open lots in subdivisions like Trilogy or Smithstone may get by with a single thorough cleaning a year, but we still recommend a quick mid-season check. If you are not sure what your property needs, we are happy to take a look during a ",
            { text: "free estimate", href: "/contact" },
            ".",
          ],
        ],
      },
      {
        heading: "Warning signs your gutters need attention now",
        paragraphs: [
          "You do not have to wait for the calendar. These are the signs we see most often on Denver homes that have gone too long between cleanings:",
        ],
        bullets: [
          "Water sheeting over the front edge during a rain instead of running to the downspout.",
          "Sagging or pulling away from the fascia, a sign the trough is heavy with wet debris.",
          "Stripes or dark streaks on the gutter faces, often called tiger striping, which need brightening, not just clearing.",
          "Seedlings, weeds, or moss growing out of the gutter line.",
          "Granules from your shingles collecting in the troughs and downspouts.",
          "Pooling water or erosion in the flower beds directly below the gutters.",
        ],
      },
      {
        heading: "Why it matters for Lake Norman area homes",
        paragraphs: [
          "A clogged gutter is not just a nuisance. When water cannot reach the downspout, it spills over the back edge and runs down the fascia and behind the gutter, where it rots wood trim and can find its way into the soffit. Over time that overflow saturates the soil at your foundation, which is the last thing you want on Denver's clay-heavy ground that already holds water.",
          [
            "Overflowing gutters also dump water right onto siding, which speeds up the algae and mildew growth that our lake humidity already encourages. If your gutter faces are streaked or your siding has gone green, pairing a cleaning with a ",
            { text: "professional house washing", href: "/services/house-washing" },
            " gets the whole exterior back to looking sharp at once.",
          ],
        ],
      },
      {
        heading: "DIY versus hiring a pro",
        paragraphs: [
          "Plenty of Denver homeowners clean their own single-story gutters, and there is nothing wrong with that if you are comfortable on a ladder and have a safe, level place to set it. The trouble starts on two-story homes, on steep lake-lot grades, and around the tall rooflines common on custom builds near the water, where a ladder is hard to place safely and a fall is a real risk.",
          "A pro also does more than scoop. We flush every downspout to confirm it actually drains, check for sagging hangers, and bag the debris so it does not end up back in your beds. The time and risk usually make hiring out the smarter call once you are past a simple one-story ranch.",
        ],
      },
      {
        heading: "What our Denver gutter cleaning includes",
        paragraphs: [
          [
            "Our ",
            {
              text: "gutter cleaning and brightening service",
              href: "/services/gutter-cleaning",
            },
            " is a complete reset for your system. We hand-clear all debris from the troughs, flush every downspout until it runs clear, and bag and haul off everything we pull out. We also brighten oxidized, streaked gutter faces so the exterior of the gutter looks new again, not just the inside.",
          ],
          [
            "We are a locally owned company based right here in Denver, and we work the 28037 ZIP every week. If you want the full background on how we serve the area, see our ",
            { text: "Denver, NC service page", href: "/areas/denver-nc" },
            ". While we are out, a lot of homeowners also have us look at the roof, since the same pine needles that clog gutters tend to pile up in roof valleys and feed ",
            { text: "roof algae and moss", href: "/services/roof-cleaning" },
            ".",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "How much does gutter cleaning cost in Denver, NC?",
        answer:
          "Pricing depends on the size of the home, the number of stories, and how much debris has built up. We give every Denver homeowner a free, no-obligation estimate, so you know the exact number before any work starts. Call 704-917-9649 or request a quote online.",
      },
      {
        question: "Do you clean gutters on two-story homes?",
        answer:
          "Yes. We are equipped to safely clean gutters on single-story and two-story homes, including the tall rooflines and steep lake-lot grades common around the Lake Norman shoreline in Denver.",
      },
      {
        question: "When is the best time of year to clean gutters in Denver?",
        answer:
          "Late spring, after the pollen and oak flowers finish dropping, and late fall, after the leaves come down, are the two most important windows. Homes under heavy pine cover often need an extra cleaning or two during the year since pines shed needles year round.",
      },
      {
        question: "Can you fix gutters that are stained or streaked?",
        answer:
          "Yes. Our service includes gutter face brightening, which removes the oxidized black streaks, sometimes called tiger striping, that build up on the outside of aluminum gutters. The faces come out looking close to new, not just the insides.",
      },
    ],
  },
];

/** All blog post slugs. */
export const BLOG_SLUGS = BLOG_POSTS.map((p) => p.slug);

/** Safe lookup. Returns undefined if the slug is not a real post. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
