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
  {
    slug: "pressure-washing-denver-nc",
    title: "Pressure Washing in Denver, NC: A Homeowner's Guide",
    metaDescription:
      "What to pressure wash and what to soft wash on a Denver, NC home, how often to do it, and the local clay, pollen, and lake humidity that make it necessary.",
    h1: "Pressure Washing in Denver, NC: What to Clean and How Often",
    publishedAt: "2026-06-08",
    targetKeyword: "pressure washing denver nc",
    heroImage: "/assets/team/ridge-driveway-surface-cleaner-neighborhood.webp",
    heroImageAlt:
      "Ridge Curwood pressure washing a concrete driveway with a surface cleaner in a Denver NC neighborhood",
    eyebrow: "Pressure Washing Guide",
    heroSubline:
      "A local, practical guide to pressure washing a Denver home: what to blast, what to soft wash instead, and how often our clay and lake humidity make it worth doing.",
    intro: [
      "Pressure washing is one of those jobs that looks simple until you are standing in front of a stained driveway with a rented machine, watching it leave zebra stripes across the concrete. Used on the right surface with the right technique, a pressure washer is the fastest way to take years off the look of a Denver, NC home. Used on the wrong surface, it strips paint, gouges wood, and forces water where it does not belong.",
      "This guide breaks down what actually belongs under high pressure on a typical 28037 property, what should be soft washed instead, how often our local conditions make cleaning worthwhile, and when it pays to hand the machine to someone who does this every day.",
    ],
    sections: [
      {
        heading: "Pressure washing versus soft washing",
        paragraphs: [
          "The single most important thing to understand before you clean any exterior surface is that pressure washing and soft washing are two different tools for two different jobs. Getting this wrong is how most homeowners damage their own homes.",
          "Pressure washing uses high-force water to physically blast grime off hard, durable surfaces. It is the right call for concrete, brick pavers, and most stone. Soft washing uses low pressure plus a biodegradable cleaning solution that kills algae, mold, and mildew at the root, then rinses gently. It is the right call for anything that water can damage or get behind: siding, roofs, painted wood, and stucco.",
          "The rule of thumb that keeps Denver homeowners out of trouble: if it is horizontal and made of concrete or stone, you can usually pressure wash it. If it is vertical and part of the house itself, it almost always wants a soft wash instead.",
        ],
      },
      {
        heading: "What pressure washing actually fixes on a Denver home",
        paragraphs: [
          "Denver sits on clay-heavy soil in a humid pocket of Lincoln County, and that combination leaves a very specific set of stains on hard surfaces. Pressure washing, done with a surface cleaner rather than a point-tip wand, handles all of them:",
        ],
        bullets: [
          "Red-clay staining. Our soil runs off in every storm and tints concrete a stubborn pink-orange. The clay works into the pores of the slab, so a surface cleaner has to pull it out, not just rinse the top.",
          "Mold and mildew on shaded concrete. North-facing driveways, back patios, and walkways under tree cover grow a slick green-black film that gets dangerously slippery when wet.",
          "Oil, rust, and tire marks. Driveways and garage aprons collect drips and scuffs that need targeted pre-treatment before the pressure pass.",
          "Leaf and acorn tannin. The mature oaks across East Lincoln and Westport drop debris that rots into dark tannin stains on patios and pavers.",
          "Pollen paste. Denver's heavy spring pollen settles into the texture of stamped concrete and paver joints and turns to a grimy film.",
        ],
      },
      {
        heading: "How often should you pressure wash in Denver?",
        paragraphs: [
          "For most Denver homes, an annual cleaning of the concrete and hard surfaces is the right baseline. Once a year keeps the clay film, mold, and tannin from building into the deeper stains that take real effort to remove.",
          [
            "If your driveway sits in heavy shade, backs up to woods, or is close to a busy road like NC-16 or NC-73, plan on cleaning every six to eight months. Shade and moisture grow mold faster, and road grit accelerates everything. The same logic applies to the ",
            {
              text: "driveway and concrete cleaning",
              href: "/services/driveway-cleaning",
            },
            " we do most often out here: the shadier and lower the spot, the faster it comes back.",
          ],
          "Siding and roofs run on a longer schedule. A soft wash of the house once a year and a roof cleaning every two to five years is usually enough, with lakefront and heavily shaded homes landing at the more frequent end of that range.",
        ],
      },
      {
        heading: "Surfaces you should never pressure wash",
        paragraphs: [
          "This is the part that saves homeowners the most money, because the damage from pressure washing the wrong surface is rarely cheap to fix. Keep the high-pressure wand off these:",
        ],
        bullets: [
          "Roof shingles. High pressure strips the protective granules off asphalt shingles and voids most manufacturer warranties. Roofs need a soft wash, the method the shingle makers actually recommend.",
          "Vinyl, Hardie, and wood siding. Pressure can crack vinyl, drive water behind the panels, and strip paint off wood trim. Siding gets a low-pressure soft wash.",
          "Stucco and dryvit. The texture is far more fragile than it looks, and a wand can blow holes straight through it.",
          "Windows and screens. High pressure breaks seals and bends frames. Glass gets cleaned with a pure-water system instead.",
          "Old or soft brick and mortar joints. Aged masonry needs chemistry and a careful touch, not brute force that erodes the mortar.",
        ],
      },
      {
        heading: "DIY versus hiring a local pro",
        paragraphs: [
          "Plenty of Denver homeowners rent a machine and clean their own driveway, and for a flat, open slab in good shape that can work out fine. The trouble starts in three places: a point-tip wand leaves visible stripes across the concrete that a surface cleaner avoids, the wrong nozzle etches lines into the slab that never come out, and the temptation to turn that same pressure on siding or a roof leads to real damage.",
          "A pro brings a commercial surface cleaner that scrubs the whole slab evenly, the right chemistry to lift clay and kill mold at the root instead of just wetting it, and the judgment to know which surfaces get pressure and which get a soft wash. For a one-story ranch with a small driveway, DIY is reasonable. Once you are dealing with a large driveway, a stained patio, and a house that also needs washing, hiring it out usually costs less than the rental, the chemicals, and the do-over.",
        ],
      },
      {
        heading: "What our Denver pressure washing includes",
        paragraphs: [
          [
            "We are a locally owned company based right here in Denver, working the 28037 ZIP every week. For hard surfaces, we pre-treat the area to break down clay, mold, and oil, run a commercial surface cleaner in overlapping passes for an even, stripe-free finish, hand-detail the edges and cracks, and flush the whole perimeter so debris ends up in the street instead of your garage. For the house itself, we switch to a ",
            { text: "soft wash", href: "/services/house-washing" },
            " that safely clears the algae and mildew our lake humidity grows on siding.",
          ],
          [
            "Most homeowners have us handle the whole exterior in one visit: driveway and walkways under pressure, siding and ",
            { text: "roof", href: "/services/roof-cleaning" },
            " by soft wash. If you want the full picture of how we serve the area, see our ",
            { text: "Denver, NC service page", href: "/areas/denver-nc" },
            ", or request a ",
            { text: "free estimate", href: "/contact" },
            " and we will walk the property with you and give you an exact number before any work starts.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "How much does pressure washing cost in Denver, NC?",
        answer:
          "It depends on the surfaces involved, the square footage, and how much buildup there is. A driveway alone is very different from a full exterior package with siding and a roof. We give every Denver homeowner a free, no-obligation estimate, so you know the exact number before we start. Call 704-917-9649 or request a quote online.",
      },
      {
        question: "Is pressure washing safe for my siding and roof?",
        answer:
          "High pressure is not safe for siding, roofs, stucco, or windows. Those surfaces should be soft washed, which uses low pressure plus a cleaning solution that removes algae and mildew without forcing water behind panels or stripping shingle granules. We reserve true high pressure for concrete, pavers, and other hard surfaces.",
      },
      {
        question: "How often should I pressure wash my driveway in Denver?",
        answer:
          "Once a year is the right baseline for most homes. If your driveway sits in heavy shade, backs up to woods, or is near a busy road, every six to eight months keeps the mold and red-clay staining from setting in deeper.",
      },
      {
        question: "Can you remove red-clay and oil stains from concrete?",
        answer:
          "Most of them, yes. Red-clay film and mold come up well with pre-treatment and a commercial surface cleaner. Oil that is less than a year old usually lifts with targeted treatment, while very old, deeply soaked-in oil may lighten significantly rather than disappear. We tell you what to expect before we start.",
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
