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
  // ── Post 3 ──────────────────────────────────────────────────────────────
  // NOTE: images skipped - OPENAI_API_KEY was not set in the build environment.
  {
    slug: "roof-cleaning-mooresville-nc",
    title: "Roof Cleaning in Mooresville, NC: A Homeowner's Guide",
    metaDescription:
      "Black streaks on your Mooresville, NC roof? A local guide to soft washing, how often to clean, and what lake humidity does to your shingles.",
    h1: "Roof Cleaning in Mooresville, NC: What Local Homeowners Need to Know",
    publishedAt: "2026-06-08",
    targetKeyword: "roof cleaning mooresville nc",
    heroImage: "/assets/team/ridge-roof-cleaning-aerial.webp",
    heroImageAlt:
      "Aerial view of a freshly soft-washed roof in Mooresville NC with algae and black streaks removed",
    eyebrow: "Roof Cleaning Guide",
    heroSubline:
      "A practical look at why Mooresville roofs grow black streaks and algae faster than you'd expect, how soft washing clears them safely, and when to call a local pro.",
    intro: [
      "If you own a home in Mooresville, NC, chances are good you have noticed dark streaks or greenish patches spreading across your roof. They appear gradually, then multiply every wet season until half the roof looks stained. Most homeowners assume it is dirt or aging shingles. It is usually neither.",
      "This guide explains what is actually growing on your Mooresville roof, why the Lake Norman area is especially prone to it, how soft washing clears it safely without damaging your shingles, and how often you should clean to protect the investment over the life of the home.",
    ],
    sections: [
      {
        heading: "Why Mooresville roofs grow black streaks and algae",
        paragraphs: [
          "The dark streaks spreading across roofs throughout Mooresville and the wider Lake Norman corridor are almost always caused by a cyanobacterium called Gloeocapsa magma. It arrives as airborne spores, takes hold on asphalt shingles, and spreads in a dark biological film that feeds on the limestone filler in the shingle mat. Left alone, it grows from streak to near-full coverage within a few seasons.",
        ],
        bullets: [
          "Lake Norman humidity. The lake keeps the air consistently moist, especially on properties within a mile or two of the shoreline. Algae and moss thrive in damp conditions, and a humid Mooresville summer is close to ideal growing weather for roof organisms.",
          "Shade from mature hardwoods and pines. A large share of Mooresville lots sit under established tree canopy. Shaded roof sections stay wet longer after rain, giving spores more time to anchor and spread before the surface dries out.",
          "North-facing slopes. The north side of any roof gets less direct sun and stays damper than the south side, which is why algae almost always appears there first and grows fastest.",
          "Pine needle accumulation. Needles that blow onto the roof hold moisture against the shingles and accelerate growth in the areas where they collect, particularly in roof valleys and near the ridge.",
          "Airborne spore circulation. In neighborhoods near the water along Brawley School Road, Langtree, and The Point, the combination of humid air and dense canopy keeps spores circulating all spring and summer.",
        ],
      },
      {
        heading: "Soft washing versus pressure washing a roof",
        paragraphs: [
          "The single most important thing to understand about roof cleaning is that high-pressure washing damages shingles. An asphalt shingle's protective layer is a coating of ceramic granules bonded to the mat. A pressure washer strips those granules off in seconds, shortens the shingle's functional lifespan significantly, and voids most manufacturer warranties. This is not a risk worth taking for any exterior cleaning job on a roof.",
          "Soft washing uses low-pressure delivery to apply a biodegradable cleaning solution - typically a sodium hypochlorite blend - that kills algae, lichen, and moss at the biological root rather than blasting the surface. Once dead, the growth rinses away cleanly with a gentle rinse pass and a rain or two. The shingles stay intact, the granules stay in place, and the warranty stays valid.",
          [
            "Soft washing is the method recommended by the Asphalt Roofing Manufacturers Association, and it is the only method we use on every Mooresville roof we service. See our full ",
            { text: "roof cleaning service page", href: "/services/roof-cleaning" },
            " for the complete process breakdown.",
          ],
        ],
      },
      {
        heading: "How often should you clean your roof in Mooresville?",
        paragraphs: [
          "For most Mooresville homes, a roof cleaning every two to three years keeps the algae and moss from getting a serious foothold. Cleaned on that schedule, the biological film never builds deep enough to stain the shingle mat itself, and each subsequent wash stays straightforward.",
          "If your home sits close to the water - on or near Lake Norman, Lake Davidson, or any of the smaller coves around Davidson and Mooresville - plan on cleaning every one to two years. Near-water properties see consistently higher humidity levels, which means faster biological growth on every exterior surface, including the roof.",
          [
            "Homes under heavy tree cover are in the same camp. If you can already see green or black growth from the street, the roof is behind schedule and cleaning sooner protects the shingle warranty and slows the spread. Our ",
            { text: "before and after gallery", href: "/before-after" },
            " shows how quickly a Mooresville roof transforms with a proper soft wash.",
          ],
        ],
      },
      {
        heading: "Warning signs your Mooresville roof needs cleaning",
        paragraphs: [
          "You do not always need to wait for the calendar. These are the most common signs we see on Mooresville roofs that are ready for a cleaning:",
        ],
        bullets: [
          "Dark streaks or a black discoloration running down the slope, typically starting on the north-facing sections first.",
          "Green, fuzzy moss patches forming in shaded roof valleys, near the gutters, or around a chimney or skylight.",
          "A gray or chalky overall look across sections that were darker and more uniform when the shingles were new.",
          "Visible growth concentrating where debris collects, including around any low-slope transition, pipe boot, or roof penetration.",
          "Granule loss accelerating, visible as a rough texture fading from the shingle surface and granules collecting in gutters.",
        ],
      },
      {
        heading: "DIY versus hiring a local pro",
        paragraphs: [
          "Cleaning your own roof is possible for a confident homeowner with the right chemistry and a ground-level delivery system, but it carries real risk. Walking on a wet, algae-covered roof is slippery, and a fall from even a single-story pitch is a serious injury. On steeper rooflines and two-story homes, the margin for error essentially disappears.",
          [
            "Beyond the safety factor, getting the chemistry right matters. Too weak a solution and the algae returns within a few months. Too strong without proper prep and you risk runoff into the gutters, downspouts, and onto landscaping. A local pro brings the right concentration, correct delivery pressure, and the judgment to protect plants and gutters during the job. If you want to compare cleaning methods side by side, our ",
            { text: "house washing service", href: "/services/house-washing" },
            " page explains the soft-wash approach we use across all exterior surfaces.",
          ],
        ],
      },
      {
        heading: "What our Mooresville roof cleaning includes",
        paragraphs: [
          [
            "Our ",
            { text: "roof cleaning service", href: "/services/roof-cleaning" },
            " uses a low-pressure soft wash system applied in overlapping passes so every section of the roof gets treated evenly. We pre-rinse the landscaping and gutters before application, apply our biodegradable cleaning blend, let it dwell to kill the growth at the root, and rinse the roof, gutters, and plant beds below. We serve Mooresville weekly and work the neighborhoods along Brawley School Road, the Langtree corridor, and the communities close to Lake Norman. Full details about how we serve the area are on our ",
            { text: "Mooresville, NC service page", href: "/areas/mooresville-nc" },
            ".",
          ],
          [
            "If you are not sure whether your roof needs a cleaning or just want an honest look from someone who has seen a few hundred Mooresville roofs up close, we are happy to help. ",
            { text: "Request a free estimate", href: "/contact" },
            " and we will give you a straight assessment and an exact number before any work starts.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "How much does roof cleaning cost in Mooresville, NC?",
        answer:
          "Price depends on the size and pitch of the roof and how much growth has built up. We give every Mooresville homeowner a free, no-obligation estimate so you know the exact number before we start. Call 704-917-9649 or request a quote online.",
      },
      {
        question: "Will soft washing damage my roof shingles or void my warranty?",
        answer:
          "No. Soft washing uses low pressure and a biodegradable cleaning solution, not a high-pressure wand. High-pressure washing strips shingle granules and voids manufacturer warranties. Soft washing is the method the Asphalt Roofing Manufacturers Association recommends, and it is the only method we use on every roof job.",
      },
      {
        question: "How long does a roof cleaning last in Mooresville?",
        answer:
          "Most Mooresville roofs stay clean for two to three years after a soft wash. Homes near Lake Norman or under heavy shade may see regrowth start within one to two years due to higher ambient humidity and longer damp periods after rain. We will tell you what schedule makes sense for your specific property.",
      },
      {
        question: "What causes the black streaks on my roof?",
        answer:
          "Almost always Gloeocapsa magma, a cyanobacterium that grows in the limestone filler of asphalt shingles. It arrives as airborne spores and spreads in a dark biological film. The streaks are common across the entire Lake Norman area because the lake keeps ambient humidity high enough for algae to thrive on most roof surfaces year-round.",
      },
    ],
  },
  // ── Post 4 ──────────────────────────────────────────────────────────────
  {
    slug: "roof-cleaning-denver-nc",
    title: "Roof Cleaning in Denver, NC: A Local Homeowner's Guide",
    metaDescription:
      "Black streaks on your Denver, NC roof? A local guide to soft washing, how often to clean, and why Lake Norman humidity and tree cover speed up roof algae.",
    h1: "Roof Cleaning in Denver, NC: What Local Homeowners Need to Know",
    publishedAt: "2026-06-15",
    targetKeyword: "roof cleaning denver nc",
    heroImage: "/assets/team/ridge-roof-cleaning-aerial-full.webp",
    heroImageAlt:
      "Aerial view of a soft-washed asphalt shingle roof in Denver NC with black algae streaks removed",
    eyebrow: "Roof Cleaning Guide",
    heroSubline:
      "A practical, local look at why Denver roofs streak and grow algae so fast, how soft washing clears it without harming your shingles, and how often to clean.",
    intro: [
      "If you own a home in Denver, NC, take a look at your roof from the street the next time you pull in. If you see dark streaks running down the slope, or green and black patches spreading across the shingles, you are looking at a living problem, not just dirt. It shows up slowly, then seems to take over a whole section of roof in a couple of wet seasons.",
      "This guide explains what is actually growing on Denver roofs, why our corner of Lincoln County is so hard on shingles, how soft washing clears the growth safely, how often a 28037 home should be cleaned, and when it makes sense to hand the job to a local pro instead of climbing up there yourself.",
    ],
    sections: [
      {
        heading: "Why Denver, NC roofs streak and grow algae so fast",
        paragraphs: [
          "The dark streaks you see on roofs all over Denver and the wider Lake Norman area are almost always a cyanobacterium called Gloeocapsa magma. It arrives on the wind as airborne spores, settles on asphalt shingles, and feeds on the limestone filler in the shingle mat. Left alone, it spreads from a few thin streaks to most of the roof within a handful of seasons. Several local conditions speed that up:",
        ],
        bullets: [
          "Lake Norman humidity. The lake keeps the air damp, especially on lots within a mile or two of the shoreline near Westport and Sailview. Algae and moss love steady moisture, and a Denver summer is close to ideal growing weather.",
          "Heavy tree cover. Many Denver lots, particularly the older ones around East Lincoln and Verdict Ridge, sit under mature oaks and pines. Shaded roof sections stay wet long after a rain, giving spores more time to take hold.",
          "North-facing slopes. The north side of any roof gets the least sun and dries the slowest, which is why the streaks almost always start there and spread fastest.",
          "Pine needle buildup. Needles that collect in valleys and along the ridge hold moisture against the shingles and feed growth right where debris piles up.",
          "Cedar shake in older neighborhoods. Parts of Verdict Ridge and East Lincoln still have cedar shake, which grows moss readily and needs a gentler soft-wash mix than asphalt.",
        ],
      },
      {
        heading: "Soft washing versus pressure washing a roof",
        paragraphs: [
          "The single most important thing to know about roof cleaning is that high-pressure washing damages shingles. The protective layer on an asphalt shingle is a coating of ceramic granules bonded to the mat, and a pressure washer strips those granules off in seconds. That shortens the life of the roof and voids most manufacturer warranties. It is not a risk worth taking to clean a roof.",
          [
            "Soft washing uses low-pressure delivery to apply a biodegradable cleaning solution that kills the algae, lichen, and moss at the root instead of blasting the surface. Once the growth is dead, it rinses away cleanly and the next rain or two finishes the job. The shingles stay intact and the warranty stays valid. It is the method the Asphalt Roofing Manufacturers Association recommends, and the only one we use on Denver roofs. Our full ",
            { text: "roof cleaning service page", href: "/services/roof-cleaning" },
            " walks through the complete process.",
          ],
        ],
      },
      {
        heading: "How often should you clean your roof in Denver?",
        paragraphs: [
          "For most Denver homes, a roof cleaning every two to five years keeps algae and moss from getting a serious foothold. On that schedule the biological film never builds deep enough to stain the shingle mat itself, and each later cleaning stays straightforward.",
          "If your home sits close to the water, on or near the Lake Norman shoreline, plan on the shorter end of that range, every two to three years. Near-water lots see consistently higher humidity, which means faster growth on every exterior surface, the roof included.",
          [
            "Homes under heavy oak and pine cover are in the same camp. If you can already see green or black growth from the street, the roof is overdue, and cleaning sooner protects the shingle warranty and slows the spread. If you are not sure what your roof needs, we are happy to take a look during a ",
            { text: "free estimate", href: "/contact" },
            ".",
          ],
        ],
      },
      {
        heading: "Warning signs your Denver roof needs cleaning",
        paragraphs: [
          "You do not have to wait for the calendar. These are the signs we see most often on Denver roofs that have gone too long between cleanings:",
        ],
        bullets: [
          "Dark streaks or black discoloration running down the slope, usually starting on the north-facing sections.",
          "Green, fuzzy moss patches in shaded valleys, near the gutters, or around a chimney or skylight.",
          "A gray, chalky look across sections that were darker and more uniform when the shingles were newer.",
          "Visible growth concentrating where pine needles and leaves collect, including valleys and roof penetrations.",
          "Shingle granules collecting in the gutters and downspouts, a sign the surface is wearing.",
        ],
      },
      {
        heading: "Why it matters for Lake Norman area homes",
        paragraphs: [
          "A streaked roof is not just an eyesore. Gloeocapsa magma feeds on the shingle itself, and moss holds moisture against the deck and wedges shingles apart as it grows, both of which shorten the life of the roof. A roof replacement on an average Denver home runs many thousands of dollars, so a periodic cleaning that adds years to the shingles you already have is some of the cheapest protection available.",
          [
            "The same humidity and shade that streak the roof tend to green up the rest of the exterior too. If the roof is stained, the siding usually is not far behind, so a lot of Denver homeowners pair roof cleaning with a ",
            { text: "professional house washing", href: "/services/house-washing" },
            " to reset the whole exterior at once. The pine needles that feed roof algae also clog gutters, so it is worth checking those while the crew is up there.",
          ],
        ],
      },
      {
        heading: "DIY versus hiring a local pro",
        paragraphs: [
          "Cleaning your own roof is possible for a confident homeowner with the right chemistry and a ground-level delivery system, but it carries real risk. Walking a wet, algae-covered roof is slippery, and a fall from even a single-story pitch is a serious injury. On the steep rooflines and two-story homes common on Denver lake lots, the margin for error essentially disappears.",
          [
            "Getting the chemistry right matters just as much. Too weak a mix and the algae is back within months. Too strong without proper prep and the runoff can scorch landscaping or pool in the gutters. A local pro brings the correct concentration, the right delivery pressure, and the judgment to protect plants, gutters, and downspouts during the job. For most homes past a simple one-story ranch, hiring it out is the smarter call. Our ",
            { text: "before and after gallery", href: "/before-after" },
            " shows how dramatically a proper soft wash changes a roof.",
          ],
        ],
      },
      {
        heading: "What our Denver roof cleaning includes",
        paragraphs: [
          [
            "Our ",
            { text: "roof cleaning service", href: "/services/roof-cleaning" },
            " is a low-pressure soft wash applied in overlapping passes so every section of the roof gets treated evenly. We pre-rinse the landscaping and gutters before application, apply our biodegradable cleaning blend, let it dwell to kill the growth at the root, then rinse the roof, gutters, and plant beds below. We are a locally owned company based right here in Denver, working the 28037 ZIP every week, from modest ranches in Smithstone to tall lakefront rooflines near the shoreline.",
          ],
          [
            "If you want the full background on how we serve the area, see our ",
            { text: "Denver, NC service page", href: "/areas/denver-nc" },
            ". If you just want an honest look from someone who has been on a few hundred Denver roofs, ",
            { text: "request a free estimate", href: "/contact" },
            " and we will give you a straight assessment and an exact number before any work starts.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "How much does roof cleaning cost in Denver, NC?",
        answer:
          "Price depends on the size and pitch of the roof and how much growth has built up. We give every Denver homeowner a free, no-obligation estimate, so you know the exact number before we start. Call 704-917-9649 or request a quote online.",
      },
      {
        question: "Will soft washing damage my shingles or void my warranty?",
        answer:
          "No. Soft washing uses low pressure and a biodegradable cleaning solution, not a high-pressure wand. High-pressure washing is what strips shingle granules and voids manufacturer warranties. Soft washing is the method the Asphalt Roofing Manufacturers Association recommends, and it is the only method we use on every roof job.",
      },
      {
        question: "How long does a roof cleaning last in Denver?",
        answer:
          "Most Denver roofs stay clean for two to five years after a soft wash. Homes near the Lake Norman shoreline or under heavy oak and pine cover may see regrowth start within two to three years because of the higher humidity and longer damp periods after rain. We will tell you what schedule makes sense for your specific roof.",
      },
      {
        question: "What causes the black streaks on my roof?",
        answer:
          "Almost always Gloeocapsa magma, a cyanobacterium that grows in the limestone filler of asphalt shingles. It arrives as airborne spores and spreads in a dark biological film. The streaks are common across Denver and the entire Lake Norman area because the lake keeps ambient humidity high enough for algae to thrive on most roofs year-round.",
      },
    ],
  },
  // ── Post 5 ──────────────────────────────────────────────────────────────
  // NOTE: images skipped - OPENAI_API_KEY was not set in the build environment.
  {
    slug: "house-washing-huntersville-nc",
    title: "House Washing in Huntersville, NC | Stand Out Exterior",
    metaDescription:
      "HOA notice for dirty siding? We soft wash vinyl, brick, and Hardie homes in Skybrook, Northstone, and Birkdale Village. Free estimates. 704-917-9649.",
    h1: "House Washing in Huntersville, NC: What Local Homeowners Need to Know",
    publishedAt: "2026-06-15",
    targetKeyword: "house washing huntersville nc",
    heroImage: "/assets/team/ridge-house-washing-brick-side.webp",
    heroImageAlt:
      "Soft washing a brick home exterior in Huntersville NC, removing algae and mildew from siding",
    eyebrow: "House Washing Guide",
    heroSubline:
      "A practical look at why Huntersville siding goes green faster than you expect, how soft washing clears it without damaging your panels, and how to stay ahead of HOA letters.",
    intro: [
      "House washing in Huntersville, NC gets put off more than almost any other home maintenance job, and it is easy to understand why. The siding looks acceptable from the driveway, the algae builds in gradually, and it is not until you park on the street and look up at the roofline that you realize the entire north elevation has gone green. By that point, your HOA may already have noticed.",
      "Huntersville is one of the faster-growing corners of Mecklenburg County, and most of its established neighborhoods, including Skybrook, Northstone, Wynfield, and Birkdale, have appearance covenants. A lot of the 28078 homeowners we work with come to us after receiving a 30-day notice. This guide walks through what makes Huntersville siding dirty, how soft washing clears it safely, and how to get in front of the problem before it turns into a fine.",
    ],
    sections: [
      {
        heading: "Why Huntersville siding gets dirty faster than you expect",
        paragraphs: [
          "The mix of Mecklenburg County humidity, mature tree cover, and HOA-era construction creates conditions where algae and mildew establish themselves faster than most homeowners expect. A few local factors stack up against the siding:",
        ],
        bullets: [
          "HOA construction materials. Skybrook, Northstone, and Wynfield were built largely in the 2000s with vinyl and Hardie plank siding. Both materials hold onto biological film once it gets a foothold, and neither sheds it without intervention.",
          "Heavy pollen season. Spring in Mecklenburg drops a thick coat of pollen on every exterior surface. On siding and under gutters it combines with moisture and sticks, turning into a grimy paste that feeds mold and mildew.",
          "Shade from established tree canopy. Mature oaks along Gilead Road and the older lots near Latta Plantation keep north-facing elevations damp for days after a rain, giving algae more time to anchor before the surface dries.",
          "New-construction residue. Rosedale and the newer subdivisions north of 28078 often carry mortar haze on brick fronts and concrete film on paver driveways from the build-out. That residue creates a staining base that compounds with pollen and algae season by season.",
          "Active HOA compliance programs. Because Skybrook, Northstone, and Wynfield enforce appearance standards, dirty siding that would go unnoticed for years in a no-covenant neighborhood gets flagged at the two-year mark here instead.",
        ],
      },
      {
        heading: "Soft washing versus pressure washing siding",
        paragraphs: [
          "The most important thing to know before cleaning any Huntersville home is that pressure washing and soft washing are two completely different tools. Pointing a pressure washer at vinyl siding or Hardie plank is one of the fastest ways to create a costly repair bill.",
          "Pressure washing uses high-force water to physically blast material off a surface. On concrete driveways and pavers, that is the right call. On vinyl siding, Hardie plank, stucco, or painted wood, it drives water behind the panels, cracks vinyl, strips paint, and forces moisture into the wall cavity. The algae that gets blasted off the surface also survives if the root structure is not killed, which means it comes back within weeks.",
          [
            "Soft washing uses low-pressure delivery to apply a biodegradable cleaning solution that kills algae, mold, and mildew at the biological root before a gentle rinse removes the dead growth. It does not come back in six weeks because it is dead, not just displaced. Our ",
            { text: "house washing service", href: "/services/house-washing" },
            " handles all siding types found in Huntersville neighborhoods on that basis, vinyl, brick, Hardie plank, and stucco.",
          ],
        ],
      },
      {
        heading: "HOA compliance: what Huntersville neighborhoods require",
        paragraphs: [
          "This is the section most Huntersville homeowners actually need. Skybrook, Northstone, and Wynfield run active compliance programs. A 30-day notice for dirty or algae-stained siding is common, and the fine schedule in most Mecklenburg HOAs escalates if the property is not brought into compliance before the reinspection.",
          [
            "We schedule around those deadlines. When a Huntersville homeowner calls with a notice in hand, we prioritize the appointment so there is time to clean and dry the siding before the reinspection date. We work the 28078 ZIP every week and are familiar with what each neighborhood's compliance team looks for. Full details on how we serve the Huntersville area are on our ",
            { text: "Huntersville, NC service page", href: "/areas/huntersville-nc" },
            ". If you need to move quickly, ",
            { text: "contact us", href: "/contact" },
            " and we will get you scheduled fast.",
          ],
        ],
      },
      {
        heading: "How often should you wash your house in Huntersville?",
        paragraphs: [
          "For most 28078 homes, once a year is the right baseline. An annual soft wash prevents the biological film from building deep enough to stain the siding material itself, keeps the HOA satisfied, and costs far less than siding replacement on a home that has been allowed to degrade for five years.",
          "If your home sits under heavy tree cover, faces north on any elevation, or backs up to a wooded lot, plan on every nine months. Shaded areas recolonize faster than open, sun-exposed walls. Missing one of those cleanings in a shaded spot is what turns a standard soft wash into a two-pass job that takes twice as long.",
          [
            "The difference between a freshly washed Huntersville home and a neglected one is visible from 50 feet. Our ",
            { text: "before and after gallery", href: "/before-after" },
            " shows examples from homes in Skybrook and Northstone where the exterior went from green-streaked and flagged by the HOA to clean and approved in a single visit.",
          ],
        ],
      },
      {
        heading: "Warning signs your Huntersville siding needs cleaning now",
        paragraphs: [
          "You do not have to wait for the calendar or for an HOA letter. These are the signals we most often see on Huntersville homes that are past due:",
        ],
        bullets: [
          "Green or black streaking on north-facing walls and in the corners where two elevations meet.",
          "Yellow or gray film on horizontal trim, window sills, and porch ceilings that does not rinse off with a garden hose.",
          "Tiger striping on gutter faces, the dark vertical streaks caused by oxidation and runoff that drips down from the trough.",
          "Soft, fuzzy green patches on brick joints near the foundation, where moisture wicks up from the soil.",
          "Any visible mold or mildew on soffits or fascia boards, which can spread into the wood if left untreated.",
          "An HOA 30-day letter. That is the most unambiguous signal, and the clock is already running.",
        ],
      },
      {
        heading: "What our Huntersville house washing includes",
        paragraphs: [
          [
            "Our ",
            { text: "house washing service", href: "/services/house-washing" },
            " is a complete soft wash of every siding surface: vinyl, brick, stucco, Hardie plank, and painted wood. We wet down the landscaping before applying any chemistry, apply our biodegradable cleaning solution to all elevations, let it dwell long enough to kill the growth at the root, and rinse the house and the plant beds below. We are a locally owned company based in Denver, NC, and we work Huntersville every week.",
          ],
          [
            "Most Huntersville homeowners have us handle the gutters at the same visit. Gutter faces pick up the same tiger striping as siding, and clogged troughs spill water back onto freshly cleaned siding the next time it rains. Our ",
            { text: "gutter cleaning and brightening service", href: "/services/gutter-cleaning" },
            " pairs naturally with any house wash. If you want an exact number before we start, ",
            { text: "request a free estimate", href: "/contact" },
            " and we will walk the property with you and give you a quote with no pressure and no contracts.",
          ],
        ],
      },
    ],
    faqs: [
      {
        question: "How much does house washing cost in Huntersville, NC?",
        answer:
          "Pricing depends on the square footage, the number of stories, and how much biological buildup has developed. We give every Huntersville homeowner a free, no-obligation estimate before any work starts. Call 704-917-9649 or request a quote online.",
      },
      {
        question: "Can soft washing damage my vinyl or Hardie siding?",
        answer:
          "No. Soft washing uses low pressure and a biodegradable cleaning solution, not a high-pressure wand. High pressure is what damages siding: it cracks vinyl, drives water behind panels, and strips paint from wood trim. Soft washing cleans the surface without any of those risks.",
      },
      {
        question: "How long does a house wash take in Huntersville?",
        answer:
          "Most single-family homes in Skybrook, Northstone, and similar Huntersville neighborhoods take between one and two hours for a complete soft wash. Larger homes or properties with heavy buildup may take a little longer. We will give you a time estimate when we provide the quote.",
      },
      {
        question: "Will a house washing satisfy my HOA requirements in Huntersville?",
        answer:
          "In nearly every case, yes. Soft washing removes the algae, mildew, and discoloration that HOA compliance teams flag. We know the 28078 neighborhoods and their standards, and we schedule the job so there is buffer time before your reinspection deadline.",
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
