import type { ServiceDetail } from "@/types";

/**
 * Deep page content for each /services/[slug] route.
 * Keyed by the same slug used in SERVICES (src/lib/constants.ts).
 *
 * Copy is SEO-optimized and rewritten from the old WordPress pages
 * (standoutexterior.com/*), with expanded process, benefits, and FAQs so
 * each page is genuinely useful and rankable on its own.
 */
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "house-washing": {
    eyebrow: "Soft Washing",
    heroHeadline: "House Washing\nThat Restores Curb Appeal.",
    heroSubline:
      "Professional soft washing for every type of siding in Denver, NC and the Lake Norman area.",
    metaTitle: "House Washing in Denver NC | Soft Washing Lake Norman",
    metaDescription:
      "Professional house washing in Denver, NC & Lake Norman. Soft-wash method safely removes algae, mold & mildew from vinyl, brick, stucco & wood siding. Free estimates.",
    bodyParagraphs: [
      "Over time, your home's exterior collects dirt, pollen, algae, mold, and mildew. In a humid climate like ours, that buildup doesn't just look bad — it actively eats away at paint, sealants, and siding, shortening the lifespan of some of the most expensive parts of your home. A yearly house wash is one of the single best investments you can make in curb appeal and preventative maintenance.",
      "At Stand Out Exterior Cleaning, we match the cleaning method to the surface. For siding, we use a low-pressure soft-wash process: a biodegradable cleaning solution that kills mold and algae at the root, followed by a gentle rinse. No blasting water into vents. No stripping paint. No damaging sealants. Just a safe, thorough clean on vinyl, brick, stucco, painted wood, Hardie, and cedar.",
      "We treat every home like it's our own. That means moving furniture off the porch, rinsing landscaping before and after, protecting your outdoor fixtures, and walking the whole property with you at the end to make sure every inch meets your expectations. If we missed a spot, we come back. That's the Stand Out standard.",
    ],
    benefits: [
      {
        title: "Safe on Every Siding",
        desc: "Soft-wash method is gentle on vinyl, brick, stucco, Hardie, wood, and painted surfaces.",
      },
      {
        title: "Kills Mold at the Root",
        desc: "Our cleaning solution eliminates mold spores so the algae and mildew don't come back in weeks.",
      },
      {
        title: "Extends Siding Lifespan",
        desc: "Removing organic growth prevents staining, rot, and costly premature repairs.",
      },
      {
        title: "Instant Curb Appeal",
        desc: "A fresh house wash is the single highest-ROI exterior improvement you can make.",
      },
      {
        title: "Plant-Safe Rinse Process",
        desc: "We pre-rinse and post-rinse all landscaping so your plants stay healthy.",
      },
      {
        title: "Fully Insured",
        desc: "Licensed, insured, and happy to send a Certificate of Insurance before we arrive.",
      },
    ],
    process: [
      {
        title: "Walk-Through",
        desc: "We walk the property with you to identify problem areas, mark fragile landscaping, and confirm access points and water sources.",
      },
      {
        title: "Pre-Rinse & Protect",
        desc: "Plants get a thorough pre-rinse. Delicate light fixtures, outlets, and hardware get protected.",
      },
      {
        title: "Apply Soft Wash",
        desc: "We apply our biodegradable cleaning solution from the roofline down, giving it time to break down dirt, algae, and mildew.",
      },
      {
        title: "Low-Pressure Rinse",
        desc: "Top-down rinse with a gentle pressure that's safe for siding, paint, and caulk — never blasting water into vents or seams.",
      },
      {
        title: "Final Walk-Through",
        desc: "You walk the property with us before we pack up. If it's not right, we fix it. No charge, no questions.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between soft washing and pressure washing a house?",
        answer:
          "Pressure washing blasts dirt off with high-force water, which is perfect for concrete but can damage siding, strip paint, and force water behind vents. Soft washing uses low pressure plus a biodegradable cleaning solution that chemically removes mold, algae, and dirt — safer for siding and far more effective on organic growth.",
      },
      {
        question: "How often should I get my house washed?",
        answer:
          "Most homes in the Lake Norman area benefit from an annual wash. Homes near the lake or in heavy shade may need cleaning every 6–8 months because organic growth happens faster in damp, low-sun conditions.",
      },
      {
        question: "Will the cleaning solution hurt my plants or pets?",
        answer:
          "No. We use biodegradable, plant-friendly cleaners and pre-rinse and post-rinse all landscaping thoroughly. Pets should stay inside during the wash as a precaution, but there's no residual risk afterwards.",
      },
      {
        question: "Can you wash painted wood siding without damaging the paint?",
        answer:
          "Yes — that's exactly why we soft wash instead of pressure wash painted surfaces. Our low-pressure rinse is the same pressure as a heavy rainstorm, but combined with the right chemistry to actually clean rather than just rinse.",
      },
      {
        question: "Do I need to be home?",
        answer:
          "Not necessarily. We just need access to an outdoor water spigot and for gates to be unlocked. We'll send before-and-after photos when we're done.",
      },
    ],
    related: ["roof-cleaning", "gutter-cleaning", "window-cleaning"],
    surfaces: ["Vinyl siding", "Brick", "Stucco", "Hardie board", "Painted wood", "Cedar shake"],
  },

  "roof-cleaning": {
    eyebrow: "Soft Wash Roof Cleaning",
    heroHeadline: "Roof Cleaning\nThat Saves Your Shingles.",
    heroSubline:
      "Remove black streaks, moss, and algae safely — without stripping a single granule.",
    metaTitle: "Roof Cleaning in Denver NC | Soft Wash Roof Washing Lake Norman",
    metaDescription:
      "Soft-wash roof cleaning in Denver, NC & Lake Norman. Remove black streaks, algae & moss without damaging shingles. Extends roof life & restores curb appeal.",
    bodyParagraphs: [
      "Those ugly black streaks on your roof? That's Gloeocapsa magma — a hardy, airborne algae that eats the limestone filler in asphalt shingles. Left alone, it doesn't just hurt your curb appeal; it actively shortens the life of your roof by feeding on the shingle itself. Moss is even worse: it holds moisture against the roof deck and wedges shingles apart as it grows.",
      "Pressure washing a roof is a terrible idea. It strips the protective granule layer off asphalt shingles and voids most manufacturer warranties. The correct method is soft washing — applying a specialized cleaning solution at low pressure that kills the algae and moss at the cellular level, then letting gentle rinses and the next rainfall do the rest. It's the same method the Asphalt Roofing Manufacturers Association recommends.",
      "We've cleaned roofs across Denver, Mooresville, Huntersville, Cornelius, Iron Station, and the rest of the Lake Norman area — everything from modest ranches to three-story lakefront homes. Every job is walked, protected, and pressure-tested with our own eyes before we call it done.",
    ],
    benefits: [
      {
        title: "Manufacturer-Approved Method",
        desc: "Soft washing is the only cleaning method approved by the Asphalt Roofing Manufacturers Association (ARMA).",
      },
      {
        title: "Extends Roof Lifespan",
        desc: "Killing Gloeocapsa magma stops the bacteria from feeding on your shingles — you could easily add years to your roof.",
      },
      {
        title: "Kills Moss at the Root",
        desc: "Our solution penetrates the moss down to its base, so it dies off and washes away — no scrubbing, no granule loss.",
      },
      {
        title: "Saves Your Warranty",
        desc: "Pressure washing voids most shingle warranties. Soft washing doesn't — we clean the way manufacturers recommend.",
      },
      {
        title: "Lakefront & High-Shade Safe",
        desc: "Shady, damp homes grow algae fastest. Our method handles the worst cases without damaging anything underneath.",
      },
      {
        title: "Satisfaction Guaranteed",
        desc: "If you're not happy with the clean, we come back. Period.",
      },
    ],
    process: [
      {
        title: "Roof Inspection",
        desc: "We check shingle condition, look for loose flashing, and identify moss and algae concentrations so we can plan access and coverage.",
      },
      {
        title: "Protect Landscaping",
        desc: "Heavy pre-rinse on plants, shrubs, and grass around the drip line so nothing absorbs runoff.",
      },
      {
        title: "Apply Soft-Wash Solution",
        desc: "Low-pressure application from the ridge down. The chemistry does the work — zero scrubbing, zero high-pressure impact.",
      },
      {
        title: "Dwell & Kill",
        desc: "The solution sits long enough to kill algae and moss at the root so they don't grow back in weeks.",
      },
      {
        title: "Gentle Rinse",
        desc: "Final low-pressure rinse cleans everything off without disturbing granules or seals.",
      },
    ],
    faqs: [
      {
        question: "Will roof cleaning damage my shingles?",
        answer:
          "Not when done correctly. The key is NEVER to pressure wash shingles — it strips the protective granules and voids warranties. We use the ARMA-recommended soft-wash method, which applies a cleaning solution at low pressure and lets the chemistry do the work.",
      },
      {
        question: "How often should my roof be cleaned?",
        answer:
          "Every 2–5 years for most homes, depending on how much shade and moisture you have. Heavily shaded or lakefront homes see algae return faster and may benefit from a cleaning every 2 years.",
      },
      {
        question: "Can you get rid of moss completely?",
        answer:
          "Yes. We apply a solution that kills the moss down to its base. Dead moss then washes away in rainfall over the following weeks. For heavy moss, we sometimes do a second visit to blow off the debris once it's fully dried and loose.",
      },
      {
        question: "Is a roof cleaning actually worth it?",
        answer:
          "Absolutely. A full roof replacement on an average home runs $15,000+. Roof cleaning is a tiny fraction of that and can add years of life to the shingles you already have — especially if you're catching algae before it's had time to do serious damage.",
      },
      {
        question: "What about metal roofs or tile roofs?",
        answer:
          "We clean those too. The method is slightly different for metal and tile, but the underlying principle is the same: the right chemistry, not brute force.",
      },
    ],
    related: ["house-washing", "gutter-cleaning", "brick-cleaning"],
    surfaces: ["Asphalt shingle", "Metal", "Tile", "Cedar shake"],
  },

  "driveway-cleaning": {
    eyebrow: "Surface Cleaning",
    heroHeadline: "Driveway Cleaning\nThat Looks Brand New.",
    heroSubline:
      "Remove oil stains, mold, red clay, and years of grime from concrete, pavers, and asphalt.",
    metaTitle: "Driveway Cleaning in Denver NC | Concrete Pressure Washing Lake Norman",
    metaDescription:
      "Professional driveway & concrete pressure washing in Denver, NC & Lake Norman. Remove oil, mold, red clay & tire marks. Dramatic before/after results.",
    bodyParagraphs: [
      "Concrete in the Carolinas takes a beating. Mold thrives in our humid, shady driveways. Red clay runs off every rainstorm and stains the concrete orange. Fallen leaves leave tannin stains. And then there's the usual parade of oil, tire marks, and rust. Most homeowners don't realize how dirty their driveway has gotten until they see the strip we've cleaned next to the strip we haven't.",
      "Pressure washing a driveway with a handheld wand is slow and leaves streaks. The right tool is a commercial-grade surface cleaner — a rotating spray bar inside a shroud that scrubs the entire surface evenly at once. We pre-treat the driveway with a detergent that breaks down organic growth and loosens oil, then run the surface cleaner in overlapping passes. The result is an even, striped-free clean from edge to edge.",
      "We handle concrete driveways, paver driveways, asphalt, sidewalks, back patios, walkways, and garage floors. Every job finishes with a full edge-rinse to flush loose debris away from your garage and landscape beds — so you're not cleaning up after our cleanup.",
    ],
    benefits: [
      {
        title: "Commercial Surface Cleaner",
        desc: "Rotating spray-bar technology gives you even, streak-free results the whole way across.",
      },
      {
        title: "Removes Mold & Red Clay",
        desc: "Our pre-treatment chemistry handles the Carolinas' toughest stains — not just surface dirt.",
      },
      {
        title: "Oil & Rust Treatment",
        desc: "Stubborn oil patches and rust spots get targeted treatment before we run the surface cleaner.",
      },
      {
        title: "Concrete & Pavers",
        desc: "We clean poured concrete, brick pavers, stamped concrete, asphalt, and stone walkways.",
      },
      {
        title: "Safe on Joints & Sealant",
        desc: "We use just enough pressure to clean — never enough to damage polymeric sand or sealer.",
      },
      {
        title: "Edge Rinse Included",
        desc: "Every job finishes with a full perimeter rinse so debris ends up in the street, not your garage.",
      },
    ],
    process: [
      {
        title: "Pre-Treatment",
        desc: "We apply a specialized detergent that breaks down dirt, mold, and organic stains on the surface.",
      },
      {
        title: "Spot-Treat Stains",
        desc: "Oil, rust, and deep stains get targeted chemistry while the main detergent is doing its work.",
      },
      {
        title: "Surface Cleaner Pass",
        desc: "Commercial surface cleaner runs in overlapping passes for an even, striped-free result.",
      },
      {
        title: "Detail Wand Work",
        desc: "Edges, cracks, and areas a surface cleaner can't reach get hand-detailed with a pressure wand.",
      },
      {
        title: "Final Edge Rinse",
        desc: "The entire perimeter gets flushed so any loose debris and residue washes clear of your garage and beds.",
      },
    ],
    faqs: [
      {
        question: "How often should I pressure wash my driveway?",
        answer:
          "Once a year is ideal for most homes. If you have heavy shade, lots of trees, or you're close to a busy road, you may benefit from every 6–8 months.",
      },
      {
        question: "Will pressure washing damage my concrete?",
        answer:
          "Not when done correctly. We use the right pressure and nozzle for concrete — enough to clean, not enough to etch. Streaking and etching happens when someone uses a point-tip wand instead of a surface cleaner, which we never do on driveways.",
      },
      {
        question: "Can you get oil stains out?",
        answer:
          "Most oil stains, yes — especially if they're less than a year old. Very old, deeply soaked-in oil may lighten significantly but not disappear entirely. We'll tell you up front what to expect before we start.",
      },
      {
        question: "What about paver driveways? Will the sand come out?",
        answer:
          "We adjust the pressure and distance for pavers to minimize sand loss. For homes where the polymeric sand is already compromised, we can also re-sand and seal as part of our paver cleaning service.",
      },
      {
        question: "Do you clean sidewalks and walkways too?",
        answer:
          "Yes. Sidewalks, walkways, patios, garage floors, and any other concrete surface you have. Most customers add these on for a small incremental cost.",
      },
    ],
    related: ["paver-cleaning", "house-washing", "commercial-pressure-washing"],
    surfaces: ["Concrete driveway", "Brick pavers", "Stamped concrete", "Asphalt", "Garage floors", "Sidewalks", "Patios"],
  },

  "gutter-cleaning": {
    eyebrow: "Gutter Cleaning & Brightening",
    heroHeadline: "Gutter Cleaning\nThat Actually Fixes It.",
    heroSubline:
      "Full debris removal, downspout flush, and gutter-face brightening — not just a quick pass.",
    metaTitle: "Gutter Cleaning in Denver NC | Gutter Brightening Lake Norman",
    metaDescription:
      "Professional gutter cleaning & brightening in Denver NC. Full debris removal, downspout flush, and oxidation removal. Protect your foundation from water damage.",
    bodyParagraphs: [
      "Clogged gutters cause real, expensive damage. Water overflowing the back edge runs straight down your siding and into the fascia. Overflow pooling along the foundation turns into basement water. Full gutters during winter freeze into ice dams that push water back under your shingles. A $200 gutter cleaning protects thousands of dollars of siding, soffit, foundation, and roof.",
      "Our gutter cleaning is a full service, not a quick look. We remove debris by hand from every run, flush every downspout with water to confirm it's clear, bag the debris, and clean off any mess left on your roof or patio. Then we offer gutter brightening — a specialized treatment that removes the oxidized black streaks ('tiger striping') that build up on the outside of aluminum gutters over time and make them look old even when they're not.",
      "We're fully insured and comfortable on every residential roofline in the area. Tall? Steep? Lakefront with limited ladder access? Send a photo — there's very little we haven't cleaned.",
    ],
    benefits: [
      {
        title: "Hand-Scooped Debris",
        desc: "We pull debris out by hand from every gutter run — no leaf blowers blasting muck all over your roof.",
      },
      {
        title: "Downspout Flush Verified",
        desc: "Every downspout gets flushed with water and verified flowing before we call it done.",
      },
      {
        title: "Gutter Face Brightening",
        desc: "Optional treatment removes oxidized black 'tiger stripes' from aluminum gutters — they look new again.",
      },
      {
        title: "Debris Bagged & Removed",
        desc: "We bag every bit of debris and take it with us, or leave it at your bin per your preference.",
      },
      {
        title: "Full Cleanup After",
        desc: "We wash down your patio, driveway, and siding if any mess ends up there during the clean.",
      },
      {
        title: "Fully Insured Up High",
        desc: "Our team is licensed and insured for rooftop and ladder work — Certificate of Insurance available on request.",
      },
    ],
    process: [
      {
        title: "Gutter Inspection",
        desc: "We walk the roofline and identify problem areas — overflow spots, loose hangers, rust, damaged sections.",
      },
      {
        title: "Hand-Scoop Debris",
        desc: "Every run gets cleared by hand from ladder or roof. Leaves, sticks, pine straw, and nests — all of it.",
      },
      {
        title: "Downspout Flush",
        desc: "Each downspout gets flushed and verified flowing freely. Partial clogs get cleared before we move on.",
      },
      {
        title: "Roof & Patio Rinse",
        desc: "Any debris that hit the roof, patio, or driveway during the clean gets rinsed away.",
      },
      {
        title: "Optional Brightening",
        desc: "For customers who want the gutters looking brand new, we follow up with a brightening treatment on the aluminum face.",
      },
    ],
    faqs: [
      {
        question: "How often should I have my gutters cleaned?",
        answer:
          "At least twice a year for most homes — once in late spring and once in late fall after leaves are down. Homes with lots of pine trees or oak trees often need 3–4 cleanings to keep up.",
      },
      {
        question: "What's 'gutter brightening'? Do I need it?",
        answer:
          "Gutter brightening removes the dark oxidized streaks ('tiger striping') that build up on the face of aluminum gutters from years of rainwater runoff. It's purely cosmetic, but it's the difference between gutters that look 15 years old and gutters that look brand new. It's a popular add-on to a full house wash.",
      },
      {
        question: "Can you clean gutters with leaf guards or gutter covers?",
        answer:
          "Yes. Depending on the cover type we'll remove, clean, and re-install, or clean around them. Mention the brand when you book and we'll know exactly how to handle it.",
      },
      {
        question: "What if I have a really tall or steep roof?",
        answer:
          "We handle tall and steep roofs all the time — send a photo when you book so we can make sure we have the right ladder and harness equipment on board the day of.",
      },
      {
        question: "Do you fix damaged gutters or hangers too?",
        answer:
          "We do minor re-securing of loose hangers as part of our cleaning service. For replacement sections or major repairs, we'll refer you to a trusted local gutter company.",
      },
    ],
    related: ["roof-cleaning", "house-washing", "commercial-pressure-washing"],
  },

  "window-cleaning": {
    eyebrow: "Pure-Water Window Cleaning",
    heroHeadline: "Streak-Free\nWindow Cleaning.",
    heroSubline:
      "Our purified-water system leaves zero spots, zero residue — inside, outside, and every frame in between.",
    metaTitle: "Window Cleaning in Denver NC | Streak-Free Window Washing Lake Norman",
    metaDescription:
      "Professional window cleaning in Denver NC. Pure-water system leaves zero streaks and zero spots. Interior and exterior residential window washing.",
    bodyParagraphs: [
      "Windows connect you to the view you chose when you bought your home. But pollen, pollution, lake mist, hard-water spots from sprinklers, and just plain Carolina humidity cover them up fast. Paper-towel-and-Windex can only do so much — and usually just pushes the dirt around. Professional window cleaning makes the glass genuinely disappear.",
      "We use a pure-water cleaning system: ordinary tap water gets filtered through our deionization and reverse-osmosis setup until it has a TDS (total dissolved solids) reading of essentially zero. That pure water is then scrubbed across the glass with a soft brush on a carbon-fiber extension pole. Because there are no minerals in the rinse water, the windows dry without a single spot — no streaks, no squeegee marks, no residue along the edges.",
      "We clean interior and exterior windows, wipe frames and sills, clean tracks, and wipe screens where requested. Everything gets done the way we'd want it in our own house.",
    ],
    benefits: [
      {
        title: "Zero Streaks, Zero Spots",
        desc: "Pure water dries without leaving mineral residue — the only way to get true streak-free results.",
      },
      {
        title: "Interior & Exterior",
        desc: "Inside glass, outside glass, frames, sills, and screens. Full service or exterior-only — your call.",
      },
      {
        title: "Reach Every Window",
        desc: "Carbon-fiber extension poles let us clean two- and three-story windows from the ground — safer and faster.",
      },
      {
        title: "Hard-Water Spot Removal",
        desc: "Sprinkler overspray and lake mist leave stubborn mineral deposits. We have dedicated treatment for them.",
      },
      {
        title: "No Soap Residue",
        desc: "Traditional soap-and-squeegee leaves residue at the edges that attracts dirt fast. Pure water doesn't.",
      },
      {
        title: "Screen & Track Cleaning",
        desc: "We pull and wipe screens and vacuum tracks on request so everything feels brand new.",
      },
    ],
    process: [
      {
        title: "Pre-Inspection",
        desc: "We walk the home and count windows, note any with damaged seals, paint overspray, or hard-water etching.",
      },
      {
        title: "Exterior Pure-Water Wash",
        desc: "Pure-water brush-scrub on every exterior pane and frame, from the ground up with extension poles.",
      },
      {
        title: "Interior Detail",
        desc: "If you booked interior, we move to the inside: drop cloths down, glass cleaned with microfiber and squeegee, sills wiped.",
      },
      {
        title: "Screen & Track Work",
        desc: "On request we pull screens and wipe them down, then vacuum and wipe window tracks.",
      },
      {
        title: "Final Check",
        desc: "We walk every room with you to make sure every window meets your standard before we leave.",
      },
    ],
    faqs: [
      {
        question: "Why is pure-water window cleaning better than soap and squeegee?",
        answer:
          "Pure water dries spot-free because there are no minerals in it. Soap leaves residue along the edges that attracts dirt quickly and can cause streaking. Pure water also lets us clean higher windows from the ground safely, which is faster and lower-risk for you and for us.",
      },
      {
        question: "How often should I have my windows cleaned?",
        answer:
          "For most homes, twice a year is ideal — once in spring to clear off pollen and once in fall to clear off summer dust and mildew. Homes close to the lake or near dirt roads may want cleaning more often.",
      },
      {
        question: "Can you get hard-water spots off glass?",
        answer:
          "Yes, in most cases. If the spots have been there for a long time and have actually etched the glass, we'll be up-front about what's cleanable vs. what's permanent damage. A quick visit lets us tell you for certain.",
      },
      {
        question: "Do you clean screens and tracks too?",
        answer:
          "On request. Screens get pulled and wiped. Tracks get vacuumed and wiped. Let us know at booking and we'll quote it with the main job.",
      },
      {
        question: "Will you clean interior windows?",
        answer:
          "Absolutely. We offer exterior-only, interior-only, or full-service. Most customers book full-service the first time and switch to exterior-only for maintenance cleans.",
      },
    ],
    related: ["house-washing", "gutter-cleaning", "roof-cleaning"],
  },

  "fence-washing": {
    eyebrow: "Fence Restoration",
    heroHeadline: "Fence Washing\nThat Brings It Back.",
    heroSubline:
      "Wood, vinyl, aluminum, and chain-link — we remove the weathering that's making your fence look old.",
    metaTitle: "Fence Washing in Denver NC | Wood & Vinyl Fence Cleaning",
    metaDescription:
      "Professional fence washing in Denver NC. Restore wood, vinyl, aluminum & chain-link fences. Removes algae, stains, and weather damage. Preps wood for staining.",
    bodyParagraphs: [
      "Your fence takes more weather abuse than almost anything on your property. Full sun bleaches wood. Constant humidity grows algae and mildew. Lawn sprinklers leave mineral stains. Lawn mowers kick dirt on the lower boards. It all adds up — and then one day you notice the fence looks dingy, green, or just plain old, even though it's not.",
      "A professional fence wash reverses most of that. For wood fences, we use a gentle pressure and the right chemistry to remove algae, mildew, and graying without stripping the wood fibers. For vinyl, aluminum, and chain-link, we use a low-pressure soft wash that removes the same buildup without damaging the finish. If you're planning to stain or seal a wood fence, this is the essential first step — a clean, dry surface is the only one that takes stain properly.",
      "Pair a fence wash with your annual house wash for maximum curb appeal (and a small discount). Most jobs are done in a single afternoon.",
    ],
    benefits: [
      {
        title: "Every Fence Material",
        desc: "Wood, vinyl, aluminum, chain-link, wrought iron — we've cleaned them all and know the right method for each.",
      },
      {
        title: "Stain-Prep Wash",
        desc: "Planning to stain or seal wood? A clean, dry surface is essential — we set you up for a successful stain job.",
      },
      {
        title: "Safe on Finishes",
        desc: "Correct pressure and chemistry for each material means no stripping paint or damaging vinyl.",
      },
      {
        title: "Removes Algae & Mildew",
        desc: "Green growth on the shady side of the fence goes away completely — not just on the surface.",
      },
      {
        title: "Lawn-Friendly Rinse",
        desc: "We pre-rinse and post-rinse grass and plants along the fence line so your lawn stays happy.",
      },
      {
        title: "Discount With House Wash",
        desc: "Bundle it with your annual house wash and we'll knock a little off the total.",
      },
    ],
    process: [
      {
        title: "Fence Inspection",
        desc: "We check for loose boards, rot, and any spots we need to be extra gentle around — then map the run.",
      },
      {
        title: "Pre-Rinse Landscape",
        desc: "Grass, shrubs, and flowers along the fence line get a thorough rinse before we introduce any detergent.",
      },
      {
        title: "Apply Cleaning Solution",
        desc: "We apply a biodegradable cleaning solution matched to the fence material — wood, vinyl, or metal.",
      },
      {
        title: "Pressure Wash or Soft Wash",
        desc: "Wood gets the right-pressure wash. Vinyl/metal gets the soft-wash rinse. We never use 'blast it' settings.",
      },
      {
        title: "Final Rinse",
        desc: "Entire fence gets a clean-water rinse top to bottom, and we post-rinse landscaping before packing up.",
      },
    ],
    faqs: [
      {
        question: "Can you wash an old wood fence without damaging it?",
        answer:
          "Yes — the key is using the right pressure. Too high and you strip wood fibers and 'furry' the surface. We dial it in carefully and use cleaning chemistry to do most of the work, not raw pressure.",
      },
      {
        question: "Will it prep the fence for staining?",
        answer:
          "Yes. A clean, bare fence is the best possible starting point for a stain or seal application. Just make sure you give it 24–48 hours to dry completely before applying stain.",
      },
      {
        question: "What about vinyl fences?",
        answer:
          "Vinyl gets a soft-wash treatment — low pressure plus a cleaning solution that removes algae, mold, and stains without scrubbing the finish. It comes out looking new.",
      },
      {
        question: "Do you clean the neighbor's side too?",
        answer:
          "If the neighbor is okay with it and there's access, absolutely — and most neighbors are happy to have their side cleaned for free. We just need to know beforehand so we can plan the time.",
      },
      {
        question: "How much does fence washing cost?",
        answer:
          "It depends on linear footage, material, and condition. Most residential fences in our area run $X–$Y — call or text us with your address and we'll give you an exact number within a few minutes.",
      },
    ],
    related: ["house-washing", "driveway-cleaning", "paver-cleaning"],
    surfaces: ["Wood fence", "Vinyl fence", "Aluminum fence", "Chain-link fence", "Wrought iron"],
  },

  "paver-cleaning": {
    eyebrow: "Paver Restoration & Sealing",
    heroHeadline: "Paver Cleaning,\nSanding & Sealing.",
    heroSubline:
      "Full paver restoration — deep clean, polymeric sand replacement, and professional sealant.",
    metaTitle: "Paver Cleaning & Sealing in Denver NC | Lake Norman Paver Restoration",
    metaDescription:
      "Professional paver cleaning, sanding & sealing in Denver NC. Deep clean, polymeric sand joint replacement, and long-lasting sealer. Protect your patio & driveway.",
    bodyParagraphs: [
      "Pavers are beautiful when they're new — and very easy to let go once the joint sand starts washing out. Once the sand is gone, weeds sprout between every paver, ants move in, and individual bricks start shifting. The patio starts looking tired, and worse, it starts actually failing. The fix is a full restoration: deep clean, replace the polymeric sand in the joints, and seal the surface.",
      "Our paver restoration process is end-to-end. We start with a thorough pressure wash to remove dirt, organic growth, weeds, and old sand. Once the paver field is clean and dry, we sweep in fresh polymeric sand and activate it with a controlled mist — this turns it into a bound joint that resists weeds and keeps pavers locked together. Finally, we apply a professional-grade sealer that deepens the color, protects against stains, and extends the life of the entire system.",
      "A full paver restoration can make a 10-year-old patio look better than the day it was installed. And once it's sealed, maintenance becomes dramatically easier — just a light annual wash and you're set.",
    ],
    benefits: [
      {
        title: "Deep-Clean Paver Field",
        desc: "We blast out old sand, weeds, moss, and organic growth from every joint for a full reset.",
      },
      {
        title: "Polymeric Sand Refill",
        desc: "Fresh polymeric sand binds into a hard joint that resists weed growth and paver shifting.",
      },
      {
        title: "Professional Sealer",
        desc: "High-quality sealant protects the paver surface, deepens color, and makes stains much easier to remove.",
      },
      {
        title: "Prevents Shifting",
        desc: "Bound joints lock pavers in place so frost-heave and foot traffic don't knock them around.",
      },
      {
        title: "Easier Long-Term Upkeep",
        desc: "Sealed pavers stay clean with minimal effort — an annual rinse is enough for most homes.",
      },
      {
        title: "Dramatic Color Boost",
        desc: "Sealing deepens the natural color of the paver — think 'after rain' tone, all the time.",
      },
    ],
    process: [
      {
        title: "Deep Clean",
        desc: "Full pressure wash of the paver field removes dirt, weeds, organic growth, and any failing old sand.",
      },
      {
        title: "Dry Time",
        desc: "Pavers must be fully dry before sanding — we schedule the sanding step for a day the weather cooperates.",
      },
      {
        title: "Polymeric Sand Sweep",
        desc: "Fresh polymeric sand gets swept into every joint and worked down with brushes and vibration.",
      },
      {
        title: "Activate & Bind",
        desc: "Light misting activates the polymer binder — it hardens into flexible, weed-resistant joints.",
      },
      {
        title: "Apply Sealer",
        desc: "After the sand cures, we apply a professional-grade sealer that protects the surface and deepens the color.",
      },
    ],
    faqs: [
      {
        question: "How often do pavers need to be cleaned and sealed?",
        answer:
          "Most residential pavers benefit from a full clean-sand-seal cycle every 3–5 years. Between full restorations, an annual wash keeps things looking great with minimal effort.",
      },
      {
        question: "What's polymeric sand and why is it important?",
        answer:
          "It's a specialized sand mixed with a polymer binder. When activated with water, it hardens into a semi-flexible material that fills the joints between pavers, resists weeds, and keeps the pavers from shifting. It's the single biggest difference between a paver patio that lasts 10 years and one that lasts 30.",
      },
      {
        question: "Will the sealer make the pavers slippery?",
        answer:
          "We use sealers with added grip and flat/natural finishes. Your pavers will look darker and richer but won't feel slicker underfoot.",
      },
      {
        question: "Can you clean pavers without re-sanding and sealing?",
        answer:
          "Yes — we offer cleaning-only service for customers who've had pavers done recently or aren't ready for the full restoration. But if the joints are compromised, cleaning alone won't stop the long-term problems.",
      },
      {
        question: "How long does a paver restoration take?",
        answer:
          "Most residential patios are a 1–2 day job depending on size. Cleaning and sanding happen on day one. Sealing happens after the sand has cured — typically the next day.",
      },
    ],
    related: ["driveway-cleaning", "fence-washing", "house-washing"],
  },

  "brick-cleaning": {
    eyebrow: "Brick & Masonry",
    heroHeadline: "Brick Cleaning\nDone Right.",
    heroSubline:
      "Mold, mildew, efflorescence, and new-construction mortar haze — we handle it all.",
    metaTitle: "Brick Cleaning in Denver NC | New Construction & Mortar Haze Removal",
    metaDescription:
      "Professional brick cleaning in Denver NC. Removes mold, mildew, efflorescence & new-construction mortar haze. NMD 80 detergent for mortar residue. Free estimates.",
    bodyParagraphs: [
      "Brick is tough, but it's not immune. In shady, damp areas, black and green mold colonies take hold in the porous surface of the brick. Efflorescence — that white, chalky residue that appears on older brick — is caused by salts migrating to the surface. And on new construction, mortar haze and mortar splatter can actually become part of the brick if it's not cleaned off before it sets.",
      "The key to brick cleaning is using the right chemistry before you use water. Mold needs to be killed at the cellular level with a mildewcide, not just rinsed off the surface — otherwise it regrows in weeks. New-construction mortar haze needs a specialized masonry detergent like NMD 80 to break down the lime binder before any pressure washing. Skip either step and the job either doesn't last or damages the brick.",
      "We handle mold and mildew removal, efflorescence treatment, new-construction brick cleaning, and historic brick restoration across the Denver, NC and Lake Norman area. For new-construction jobs specifically, time matters — the sooner you call us after the mortar is set, the easier and cheaper the job is.",
    ],
    benefits: [
      {
        title: "Kills Mold at the Root",
        desc: "Mildewcide treatment kills mold spores so it doesn't come back in a few weeks the way surface cleaning does.",
      },
      {
        title: "New Construction Ready",
        desc: "We clean mortar haze and splatter off freshly laid brick before it bonds to the surface permanently.",
      },
      {
        title: "NMD 80 Detergent",
        desc: "Industry-standard masonry detergent breaks down mortar residue so it rinses away cleanly.",
      },
      {
        title: "Safe on Aged Brick",
        desc: "We tune pressure and chemistry for the age and condition of the brick so we never damage what we're cleaning.",
      },
      {
        title: "Efflorescence Treatment",
        desc: "We treat the white chalky salt residue that migrates to the surface of older brick.",
      },
      {
        title: "Residential & Commercial",
        desc: "Homes, garages, chimneys, retaining walls, commercial facades — we clean them all.",
      },
    ],
    process: [
      {
        title: "Brick Assessment",
        desc: "We check the age of the brick, mortar condition, and extent of staining to match chemistry and pressure.",
      },
      {
        title: "Apply Mildewcide or NMD 80",
        desc: "Existing mold gets a mildewcide treatment. New construction gets two coats of NMD 80 detergent.",
      },
      {
        title: "Hand Scrape If Needed",
        desc: "Large chunks of mortar splatter get scraped by hand with a blade before the pressure rinse.",
      },
      {
        title: "Pressure Rinse",
        desc: "Controlled pressure rinse removes treated dirt, killed mold, and broken-down mortar residue.",
      },
      {
        title: "Inspection & Touch-Up",
        desc: "We walk the whole elevation and touch up any stubborn spots before we pack up.",
      },
    ],
    faqs: [
      {
        question: "Why does mold come back so fast on my brick?",
        answer:
          "Because most 'cleaning' just knocks the surface mold off — the spores underneath are still alive. We use a mildewcide that kills the spores, which buys you significantly longer clean-looking brick. In heavily shaded areas, nothing is permanent, but the difference is dramatic.",
      },
      {
        question: "Can you clean new construction brick?",
        answer:
          "Yes, and the sooner the better. New construction brick should be cleaned within a few weeks of the mortar curing. After that, mortar haze bonds more permanently to the brick surface and becomes much harder (and more expensive) to remove.",
      },
      {
        question: "What's efflorescence? Can you fix it?",
        answer:
          "Efflorescence is the white, chalky residue that forms when soluble salts in the brick or mortar migrate to the surface and crystallize. It's treatable with the right chemistry, though in very old brick it can return until the underlying moisture issue is addressed.",
      },
      {
        question: "Will pressure washing damage my brick?",
        answer:
          "Not when done correctly. Old or soft brick needs lower pressure and more reliance on chemistry. New or hard brick can take more pressure. The mistake is treating all brick the same — which we don't.",
      },
      {
        question: "Do you clean brick chimneys?",
        answer:
          "Yes, chimneys are a common brick cleaning job for us. Let us know at booking if the chimney is especially tall so we plan ladder/access equipment.",
      },
    ],
    related: ["house-washing", "roof-cleaning", "paver-cleaning"],
  },

  "commercial-pressure-washing": {
    eyebrow: "Commercial",
    heroHeadline: "Commercial\nPressure Washing.",
    heroSubline:
      "Storefronts, sidewalks, parking lots, dumpster pads, and more — scheduled around your business hours.",
    metaTitle: "Commercial Pressure Washing in Denver NC | Storefront & Lot Cleaning",
    metaDescription:
      "Commercial pressure washing for Denver NC & Lake Norman businesses. Storefronts, sidewalks, parking lots, dumpster pads & more. Fully insured, COI available.",
    bodyParagraphs: [
      "First impressions happen before a customer even walks in. A dingy sidewalk, gum-stained storefront, or algae-covered dumpster pad tells customers something about how much you care about the rest of your operation. Regular commercial pressure washing keeps that story straight — and for most businesses, it's one of the cheapest visible improvements available.",
      "We work with retail, restaurants, HOAs, property managers, churches, and industrial clients across the Lake Norman area. Everything we do on residential jobs — proper chemistry, the right pressure for the surface, respectful cleanup — we bring to commercial work. The difference is we're also comfortable scheduling around your business hours, providing Certificates of Insurance, invoicing through your AP process, and handling recurring maintenance schedules.",
      "Stand Out Exterior Cleaning is fully insured and offers workman's comp coverage for commercial jobs. COIs are available on request. Need a one-time clean, a quarterly maintenance contract, or an annual HOA service? We'll build a plan that works for your business.",
    ],
    benefits: [
      {
        title: "Scheduled Off-Hours",
        desc: "Evening, early morning, or weekend cleaning so your customers and staff aren't disrupted.",
      },
      {
        title: "COI on Request",
        desc: "Fully insured with workman's comp. Certificates of Insurance available for property managers and facilities teams.",
      },
      {
        title: "Recurring Service Plans",
        desc: "Quarterly, monthly, or weekly pressure washing schedules for busy properties.",
      },
      {
        title: "Gum & Grease Removal",
        desc: "Specialized treatment for the tough stuff storefronts and restaurants deal with daily.",
      },
      {
        title: "Graffiti Removal",
        desc: "Paint, marker, and spray-can graffiti removed cleanly without etching underlying surfaces.",
      },
      {
        title: "Simple Invoicing",
        desc: "Net terms, AP-friendly invoices, and easy PO integration for property managers.",
      },
    ],
    process: [
      {
        title: "Site Walk-Through",
        desc: "We walk the property with your facilities contact and map the areas of focus — storefront, walkways, lot, dumpster pad, drive-through.",
      },
      {
        title: "Scope & Schedule",
        desc: "You get a clear written scope, a fixed price, and a service schedule that fits your operating hours.",
      },
      {
        title: "Pre-Treat Heavy Areas",
        desc: "Gum, grease, and organic growth get specialized pre-treatment chemistry that handles the hard-to-remove stuff.",
      },
      {
        title: "Surface-Cleaner Pass",
        desc: "Large flat areas get the commercial surface cleaner for fast, even, streak-free results.",
      },
      {
        title: "Detail & Walk-Through",
        desc: "Edges and corners get hand-detailed, then we walk the site with your team and handle any follow-up items immediately.",
      },
    ],
    faqs: [
      {
        question: "Do you provide a Certificate of Insurance?",
        answer:
          "Yes — COIs are available on request before any commercial job. We can name your property management company or landlord as additionally insured if required.",
      },
      {
        question: "Can you work after hours?",
        answer:
          "Absolutely. Most of our commercial cleans happen before stores open, after they close, or on weekends. We'll schedule the work around your operating hours so there's no disruption.",
      },
      {
        question: "Do you offer recurring maintenance contracts?",
        answer:
          "Yes. Many of our commercial clients are on quarterly or monthly schedules. It keeps the property looking consistently great and avoids the 'it only looks good right after a clean' cycle.",
      },
      {
        question: "What surfaces do you clean for commercial?",
        answer:
          "Storefronts, sidewalks, parking lots, drive-throughs, dumpster pads, awnings, signage, exterior building washing, and more. If it's outside and needs cleaning, we can probably do it.",
      },
      {
        question: "How is pricing structured for commercial work?",
        answer:
          "For one-time cleans, we quote a fixed price after walking the property. For recurring service, we usually quote a flat monthly or quarterly rate. We're happy to build custom scopes for HOAs, property managers, and multi-site clients.",
      },
    ],
    related: ["church-cleaning", "driveway-cleaning", "gutter-cleaning"],
  },

  "church-cleaning": {
    eyebrow: "Commercial · Churches",
    heroHeadline: "We Clean\nSteeples (and Everything Else).",
    heroSubline:
      "Specialized exterior cleaning for churches across Denver, NC and the Lake Norman area.",
    metaTitle: "Church Cleaning in Denver NC | Steeple & Exterior Washing for Churches",
    metaDescription:
      "Specialized church exterior cleaning in Denver NC. Steeples, siding, sidewalks & stairs. Soft-wash method kills mold at the root. Fully insured, COI available.",
    bodyParagraphs: [
      "Churches have a unique set of cleaning challenges. Tall steeples that most pressure-washing companies can't or won't reach. Historic masonry that can't be blasted with high pressure. Sidewalks and stairs that become slip hazards when mold grows on them. And — of course — the responsibility to keep the building looking welcoming for every service without breaking a tight facilities budget.",
      "We specialize in church exterior cleaning. Our soft-wash method safely handles steeples, painted siding, cedar shake, stucco, and brick without the risks that come with high-pressure alternatives. The cleaning chemistry we use kills mold and algae at the root, so the result lasts — instead of needing to be redone every three months. And because we understand how churches operate, we schedule around services, fellowship hours, and special events.",
      "Fully insured with workman's comp. Certificates of Insurance available on request. Whether your church is a small country chapel or a large campus with multiple buildings, we'll put together a service plan that fits your budget and your schedule.",
    ],
    benefits: [
      {
        title: "Steeple Specialists",
        desc: "We have the equipment and expertise to clean tall steeples safely — something most pressure washers can't offer.",
      },
      {
        title: "Soft-Wash Method",
        desc: "Low-pressure chemistry protects historic masonry, painted wood, and delicate architectural details.",
      },
      {
        title: "Kills Slip-Hazard Mold",
        desc: "Sidewalks and stairs get treated with chemistry that kills slip-causing mold, not just surface rinses.",
      },
      {
        title: "Scheduled Around Services",
        desc: "We work around Sunday services, fellowship hours, weddings, funerals, and special events — your schedule drives ours.",
      },
      {
        title: "Fully Insured",
        desc: "Workman's comp coverage and COIs available on request for church boards and insurance files.",
      },
      {
        title: "Church Budget Friendly",
        desc: "We understand church budgets are tight. We'll build a service plan that fits what you have to spend.",
      },
    ],
    process: [
      {
        title: "Site Walk With Facilities",
        desc: "We walk the property with your facilities lead or pastor to understand every building, every surface, every concern.",
      },
      {
        title: "Written Scope",
        desc: "You get a clear written scope and fixed price before any work happens. No surprises at invoicing time.",
      },
      {
        title: "Soft-Wash Chemistry",
        desc: "Soft-wash cleaning solution goes on steeples, siding, and high surfaces. Chemistry kills mold at the root, not just the surface.",
      },
      {
        title: "Safe High-Access Work",
        desc: "Steeple and high-access cleaning happens with proper equipment, harnesses, and insurance — no shortcuts.",
      },
      {
        title: "Sidewalk & Step Safety Pass",
        desc: "Walkways, stairs, and entry areas get cleaned last with attention to slip-hazard reduction before congregants return.",
      },
    ],
    faqs: [
      {
        question: "Can you really clean a steeple?",
        answer:
          "Yes. Steeples are one of our specialties. We have the equipment and insurance to work safely at high elevations, and the soft-wash chemistry we use is the correct method for painted wood and metal steeples that would be damaged by traditional high-pressure washing.",
      },
      {
        question: "Will high-pressure washing damage historic church masonry?",
        answer:
          "It absolutely can — which is why we don't use high-pressure on historic or delicate surfaces. Our soft-wash method is specifically designed to clean without damaging mortar joints, old brick, or aged painted wood.",
      },
      {
        question: "How do you handle scheduling around services?",
        answer:
          "Tell us your Sunday schedule, fellowship hours, and any upcoming events. We build our work plan around them — usually Monday through Thursday, with finishing touches wrapped up well before any weekend service.",
      },
      {
        question: "Do you clean sidewalks and church steps too?",
        answer:
          "Yes — and these are often the most important areas for congregant safety. Moldy, mildew-covered steps and walkways become slip hazards. We treat them with chemistry that kills the mold rather than just rinsing it off.",
      },
      {
        question: "Are you insured to work on our building?",
        answer:
          "Yes. We're fully insured, carry workman's compensation, and provide Certificates of Insurance on request so your church board or insurance carrier has everything they need on file before we start work.",
      },
    ],
    related: ["commercial-pressure-washing", "roof-cleaning", "house-washing"],
  },

  "christmas-lights": {
    eyebrow: "Holiday Lighting",
    heroHeadline: "Christmas Light Installation\nDone For You.",
    heroSubline:
      "Full-service holiday lighting across Denver, NC and the Lake Norman area — design, install, service, takedown, and storage included.",
    metaTitle: "Christmas Light Installation in Denver NC | Holiday Lighting Lake Norman",
    metaDescription:
      "Professional Christmas light installation in Denver, NC & Lake Norman. Commercial-grade LED rooflines, trees, windows & pathways. Design, install, takedown & storage included. Fully insured. Book now.",
    bodyParagraphs: [
      "Hanging Christmas lights on a two-story roofline is one of those projects that looks easy in November and humbling by the first cold Saturday in December. Between the ladder work, the icy gutters, the bulbs that don't match, and the clip system that won't stay on the shingles, most homeowners either skip the rooflines entirely or spend half a weekend fighting with them. We take the whole thing off your plate: we design the display, install it, service it if anything goes out mid-season, take it down after the holidays, and store the lights in our warehouse so nothing clutters your garage the other ten months of the year.",
      "Every install is custom-designed around your house — rooflines, peaks, and ridges; window outlines and wreaths; trees, shrubs, and pathway lighting; driveway and walkway accents; and timers or photocell controls so the lights turn on by themselves every night at dusk. Because we provide and install commercial-grade LED lighting (we don't install customer-provided lights), the display looks sharp from the street and holds up to the weather — and because we use the same lights year after year, the cost drops significantly after the first season. Most returning customers see roughly 20% off in year two, and pricing usually simplifies into a single flat annual fee after that.",
      "We're fully insured and take roof-access safety seriously. Our team uses ladder stabilizers so we don't damage gutters, GOAT ladders and roof hoppers for steep-pitch access, and Cougar Paws for grip on every surface. Bookings are open year-round, but installation slots fill up through the fall — if you're thinking about it for this season, the earlier you reach out, the easier it is to lock in the dates you want. Takedown is included with every install and is typically wrapped up by the end of January at whatever date works best for you.",
    ],
    benefits: [
      {
        title: "Fully Custom Design",
        desc: "We walk the property with you, sketch a plan that suits the architecture, and quote based on linear footage and layout — no cookie-cutter kits.",
      },
      {
        title: "Commercial-Grade LEDs",
        desc: "We provide the lights. They're bright, uniform, and built for outdoor winters — not the big-box strands that fade or half-die by December 20th.",
      },
      {
        title: "Install, Service, Takedown, Storage",
        desc: "Everything is included: installation, mid-season service calls if a strand goes dark, scheduled takedown after the holidays, and off-season storage.",
      },
      {
        title: "Returning-Customer Pricing",
        desc: "Year two is roughly 20% less than year one. After that, pricing typically transitions into a simple flat annual fee for ongoing service.",
      },
      {
        title: "Roof & Gutter Safe",
        desc: "Ladder stabilizers, GOAT ladders, roof hoppers, and Cougar Paws — professional-grade safety gear that protects both our installers and your house.",
      },
      {
        title: "Fully Insured",
        desc: "Licensed and insured. Happy to send a Certificate of Insurance before we arrive so there's zero liability to you.",
      },
    ],
    process: [
      {
        title: "Design Consultation",
        desc: "Phone call or in-person walk-through. We map out rooflines, peaks, windows, trees, shrubs, and pathways and put together a design plan that fits your style and budget.",
      },
      {
        title: "Custom Quote",
        desc: "Pricing is based on linear footage and the specific layout of your property. You get a clear written quote — no surprise add-ons after installation.",
      },
      {
        title: "Professional Installation",
        desc: "We install commercial-grade LED lights with the right clips for your roofing material, run timers or photocells so the lights turn on automatically at dusk, and test the entire display before we leave.",
      },
      {
        title: "Mid-Season Service",
        desc: "If anything goes out between installation and takedown, we come back and fix it. No extra charge, no 'sorry, we're booked.'",
      },
      {
        title: "Takedown & Storage",
        desc: "After the holidays — most takedowns are wrapped by the end of January — we remove every strand, label it, and store it in our warehouse so your garage stays clear until next season.",
      },
    ],
    faqs: [
      {
        question: "Do I buy the lights, or do you provide them?",
        answer:
          "We provide and install commercial-grade LED lighting. We don't install customer-provided lights — partly because warranty and service only works if we control the gear, and partly because the big-box strands don't hold up to a full North Carolina winter. Because we own the lights, the cost comes down significantly in year two and beyond.",
      },
      {
        question: "How is pricing determined?",
        answer:
          "Every job is custom-quoted. Most projects are priced based on linear footage — rooflines, peaks, ridges, and any accent areas — and the specific layout of your property. After the first installation, returning customers get roughly 20% off in year two, and pricing usually transitions into a single flat annual fee for ongoing service.",
      },
      {
        question: "What's included in the price?",
        answer:
          "Design consultation, the lights themselves (commercial-grade LEDs we provide), professional installation, timer or photocell setup, mid-season service calls if anything stops working, scheduled takedown after the holidays, and off-season storage of the lighting. You get the whole package for one price.",
      },
      {
        question: "When should I book?",
        answer:
          "We take bookings and inquiries year-round. Installation itself happens primarily in the fall leading into the holiday season. The earlier you reach out, the more flexibility you have on install dates — by mid-October, premium weekends are usually spoken for.",
      },
      {
        question: "What areas of the house can you light up?",
        answer:
          "Rooflines (gutters, peaks, and roof ridges), window outlines and wreaths, trees and shrubs, driveway and pathway lighting, and accent areas. We also set up timers and photocells so the whole display turns on automatically at dusk and off at your preferred time.",
      },
      {
        question: "How do you handle taking the lights down?",
        answer:
          "Takedown is included with every installation. We schedule removal at your preference — some customers want their lights up through mid-January for Three Kings' Day or just to enjoy them longer. Most takedowns are completed by the end of January so nothing's still hanging when spring hits.",
      },
      {
        question: "Is it safe for my roof and gutters?",
        answer:
          "Yes. We use ladder stabilizers that keep ladders off your gutters (one of the most common sources of Christmas-light damage), and professional roof safety gear — GOAT ladders, roof hoppers, and Cougar Paws — to navigate steep pitches without damaging shingles. We're fully insured on top of that.",
      },
      {
        question: "What if a strand goes out mid-season?",
        answer:
          "Call or text us. Mid-season service is included — if anything stops working between installation and takedown, we come back out to fix it. You never have to climb a ladder with a multimeter.",
      },
      {
        question: "Do you service commercial properties too?",
        answer:
          "Yes. We handle storefronts, offices, HOA entrances, and other commercial properties across the Lake Norman area. Pricing and scheduling work the same way — custom design, commercial-grade LEDs, full-service install and takedown. Ask about Certificates of Insurance when you reach out.",
      },
    ],
    related: ["house-washing", "gutter-cleaning", "window-cleaning"],
  },
};

/** Convenience helper to get a service detail by slug with type safety. */
export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS[slug];
}
