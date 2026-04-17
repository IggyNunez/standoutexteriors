import type { CityDetail } from "@/types";

/**
 * Per-city landing page content for /areas/[city].
 *
 * Each entry MUST have unique copy. Do NOT reuse paragraphs across cities.
 * Google's local-search algorithm penalizes near-duplicate doorway pages.
 * Include local landmarks, ZIPs, and conditions that prove real presence
 * in each market.
 */
export const CITY_DETAILS: Record<string, CityDetail> = {
  "denver-nc": {
    slug: "denver-nc",
    name: "Denver",
    state: "NC",
    county: "Lincoln County",
    latitude: 35.5307,
    longitude: -81.0293,
    zipCodes: ["28037"],
    landmarks: [
      "East Lincoln",
      "Westport",
      "Smithstone",
      "Sailview",
      "Verdict Ridge",
      "Trilogy Lake Norman",
      "NC-16",
      "NC-73",
      "Lake Norman shoreline",
    ],
    heroIntro:
      "Stand Out Exterior Cleaning is headquartered right here in Denver, NC. This is our home market. Owner Ridge Curwood grew up cleaning homes along the west side of Lake Norman, and today our crews work the 28037 ZIP every single week.",
    bodyIntro:
      "Denver homes face a specific combination of lake humidity, heavy pollen drop from hardwoods, and the dusty red-clay runoff that coats driveways and foundations. Vinyl siding in Westport and Smithstone darkens with algae faster than inland homes 20 miles away. Cedar shake and painted brick in Verdict Ridge and Trilogy need the soft-wash approach. Anything hotter strips finish. We use the right chemistry and the right PSI for each Denver neighborhood because we actually live here.",
    localChallenges: [
      {
        title: "Lake Norman humidity stains",
        desc: "Homes near the water grow algae on north-facing siding faster than inland properties. Annual soft washing keeps it in check.",
      },
      {
        title: "Red-clay driveway buildup",
        desc: "Denver's clay-heavy soil stains concrete pink-orange. Our surface cleaner pulls clay out of the pores, not just off the top.",
      },
      {
        title: "Pollen and oak-tannin drip",
        desc: "Spring pollen and tannin from mature oaks stain painted wood and stucco. We time roof and siding jobs around the pollen calendar.",
      },
      {
        title: "Cedar shake roofs in older neighborhoods",
        desc: "Verdict Ridge and parts of East Lincoln still have cedar shake. These require a specialized soft-wash mix that kills moss without bleaching the wood.",
      },
    ],
    metaTitle: "Pressure Washing in Denver NC | Stand Out Exterior Cleaning",
    metaDescription:
      "Denver, NC pressure washing and soft washing by the locally-owned team based right here in 28037. House washing, roof cleaning, driveway, and more. Free estimates. Call 704-917-9649.",
  },

  "mooresville-nc": {
    slug: "mooresville-nc",
    name: "Mooresville",
    state: "NC",
    county: "Iredell County",
    latitude: 35.5848,
    longitude: -80.8101,
    zipCodes: ["28115", "28117"],
    landmarks: [
      "The Point",
      "Bridgeport",
      "Mooresville Golf Club",
      "Lake Norman State Park",
      "Brawley School Road",
      "Morrison Plantation",
      "Byers Creek",
      "I-77 Exit 36",
      "NC-150",
    ],
    heroIntro:
      "We cross the bridge into Mooresville almost daily. The 28117 corridor along Brawley School Road is one of our busiest service zones. From waterfront homes in The Point to custom builds off NC-150, we've washed hundreds of Mooresville properties.",
    bodyIntro:
      "Mooresville's lakefront homes take a beating that inland homes never see: constant humidity lift off Lake Norman, seasonal pollen from surrounding hardwoods, and the fine lake dust that settles onto every horizontal surface. Waterfront properties in The Point and Bridgeport need soft-wash cleaning twice as often as homes three miles inland. Stamped-concrete pool decks and paver patios in Morrison Plantation collect algae in every joint. We pull it out with polymeric sand replacement, not just a surface rinse.",
    localChallenges: [
      {
        title: "Waterfront algae acceleration",
        desc: "Homes on Lake Norman see 2x the algae growth of inland Mooresville homes. We recommend annual (not biannual) soft washing for lakefront siding.",
      },
      {
        title: "Boat-slip dock cleaning",
        desc: "Concrete and composite decking on boat slips grow slick biofilm that's a fall hazard. We clean slips without harming aquatic life.",
      },
      {
        title: "Pool deck algae and stamped concrete",
        desc: "Pool surrounds in The Point and Bridgeport collect chlorine residue and organic growth. Our soft-wash solution removes both without etching the stamp pattern.",
      },
      {
        title: "Brawley School corridor pollen",
        desc: "Mature oaks along Brawley drop heavy tannin stains on painted shutters and porch ceilings. Spring and fall cleanings keep it from setting in.",
      },
    ],
    metaTitle: "Pressure Washing in Mooresville NC | Stand Out Exterior",
    metaDescription:
      "Mooresville, NC pressure washing and soft washing for The Point, Bridgeport, Brawley School Road, and 28117 homes. Waterfront siding, roof, driveway cleaning. Free estimates. Call 704-917-9649.",
  },

  "huntersville-nc": {
    slug: "huntersville-nc",
    name: "Huntersville",
    state: "NC",
    county: "Mecklenburg County",
    latitude: 35.4107,
    longitude: -80.8428,
    zipCodes: ["28078"],
    landmarks: [
      "Birkdale Village",
      "Skybrook",
      "Northstone",
      "Wynfield",
      "Latta Plantation",
      "Rosedale",
      "Gilead Road",
      "I-77 Exit 23",
      "NC-115",
    ],
    heroIntro:
      "Huntersville is a 15-minute drive from our Denver shop and one of the first markets we expanded into. We service Skybrook, Northstone, Wynfield, and the Birkdale area weekly. We know the HOA expectations in each neighborhood.",
    bodyIntro:
      "Huntersville's mix of HOA neighborhoods means most homes are on a maintenance schedule whether the owner realizes it or not. Skybrook and Northstone have covenant-enforced siding cleaning requirements. Older brick homes near Latta Plantation need a gentler approach that handles efflorescence without damaging aged mortar joints. Rosedale's newer construction collects mortar haze that only the right chemistry (NMD 80, not bleach) will dissolve. We match the method to the age and material of each Huntersville home.",
    localChallenges: [
      {
        title: "HOA compliance deadlines",
        desc: "Skybrook, Northstone, and Wynfield send 30-day letters for algae-stained siding. We schedule around HOA deadlines to keep clients out of violation.",
      },
      {
        title: "Brick efflorescence near Latta",
        desc: "Older brick in the Latta corridor develops white salt bloom. Standard pressure washing pushes it deeper. We use the right masonry detergent.",
      },
      {
        title: "New-construction mortar haze",
        desc: "Fresh builds in Rosedale and north Huntersville often have mortar splatter on brick fronts. We remove it with NMD 80 before it bonds permanently.",
      },
      {
        title: "Gilead Road storefront cleanliness",
        desc: "Our commercial crews handle storefront and sidewalk cleaning along the Gilead Road corridor. Flexible scheduling means we clean before you open.",
      },
    ],
    metaTitle: "Pressure Washing in Huntersville NC | Stand Out Exterior",
    metaDescription:
      "Huntersville, NC pressure washing and soft washing for Skybrook, Northstone, Birkdale Village, 28078. House washing, roof, driveway, HOA cleanings. Free estimates. Call 704-917-9649.",
  },

  "cornelius-nc": {
    slug: "cornelius-nc",
    name: "Cornelius",
    state: "NC",
    county: "Mecklenburg County",
    latitude: 35.4868,
    longitude: -80.8601,
    zipCodes: ["28031"],
    landmarks: [
      "The Peninsula",
      "Robbins Park",
      "Antiquity",
      "Ramsey Creek Park",
      "Jetton Road",
      "Catawba Avenue",
      "I-77 Exit 28",
    ],
    heroIntro:
      "Cornelius sits between two of our busiest markets (Mooresville and Huntersville) and gets the same lake-humidity challenges as both. We service The Peninsula, Antiquity, Robbins Park, and the Jetton Road corridor regularly.",
    bodyIntro:
      "Cornelius homes in The Peninsula and along Jetton Road sit on some of the most valuable waterfront in the entire Lake Norman area, and they take the hardest beating from lake humidity. Cedar shake, stone veneer, hardiplank, and stucco each need a different cleaning approach. We match the method to the material. Paver patios in Antiquity and pool decks throughout 28031 collect algae in joints faster than inland homes. Our soft-wash chemistry kills it at the root so it doesn't grow back in six weeks.",
    localChallenges: [
      {
        title: "Peninsula waterfront humidity",
        desc: "North- and west-facing siding in The Peninsula grows algae year-round. We schedule these on an annual soft-wash rotation.",
      },
      {
        title: "Stone veneer and mixed siding",
        desc: "Cornelius custom homes often mix stone, hardiplank, and painted wood on one elevation. Each surface needs a different method, and we adjust on the job.",
      },
      {
        title: "Jetton Road pollen and oak tannin",
        desc: "Mature oaks along Jetton drop tannin that stains painted shutters and porch ceilings. We time jobs for after heavy pollen weeks.",
      },
      {
        title: "Pool deck algae in Antiquity",
        desc: "Stamped and travertine pool decks collect chlorine residue and organic growth. Our soft wash removes both without etching the stamp.",
      },
    ],
    metaTitle: "Pressure Washing in Cornelius NC | Stand Out Exterior",
    metaDescription:
      "Cornelius, NC pressure washing and soft washing for The Peninsula, Antiquity, Jetton Road, 28031. Waterfront siding, roofs, paver patios. Free estimates. Call 704-917-9649.",
  },

  "sherrills-ford-nc": {
    slug: "sherrills-ford-nc",
    name: "Sherrills Ford",
    state: "NC",
    county: "Catawba County",
    latitude: 35.6115,
    longitude: -80.9693,
    zipCodes: ["28673"],
    landmarks: [
      "Mountain Creek",
      "Northview Harbour",
      "Bayshore",
      "Island Forks",
      "Hager Creek",
      "NC-150",
      "Lake Norman west shore",
    ],
    heroIntro:
      "Sherrills Ford sits on the west side of Lake Norman, about 12 minutes from our Denver shop, and is one of the fastest-growing markets we serve. Newer builds in Northview Harbour and Mountain Creek call us within the first two years of ownership.",
    bodyIntro:
      "Sherrills Ford's lakefront growth has outpaced most Catawba County towns. New construction in Northview Harbour and Mountain Creek arrives with mortar haze on brick, overspray on windows, and stamped-concrete driveways already collecting red-clay runoff. Older homes along the original NC-150 corridor battle heavy tree cover, roof algae, and cedar-shake moss. The west-shore lake humidity is identical to Denver's. If we can clean a 28037 home, we know exactly what a 28673 home needs.",
    localChallenges: [
      {
        title: "New-construction cleanup",
        desc: "Northview Harbour and Mountain Creek homes often need a first-year clean. Mortar haze on brick, stucco overspray, and concrete left with drywall dust.",
      },
      {
        title: "Heavy tree cover and roof moss",
        desc: "Older lots along NC-150 have mature canopies that keep roofs damp for days after rain. Moss and algae on shingles need a soft-wash treatment every 1 to 2 years.",
      },
      {
        title: "Red-clay stamped-concrete stains",
        desc: "Stamped driveways in Island Forks and Bayshore collect iron-rich clay that etches into the surface. Our surface cleaner pulls it without damaging the pattern.",
      },
      {
        title: "West-shore lake humidity",
        desc: "The west shore gets the same algae growth as Denver and Cornelius. Annual house washing is the minimum, and biannual for north-facing walls.",
      },
    ],
    metaTitle: "Pressure Washing in Sherrills Ford NC | Stand Out Exterior",
    metaDescription:
      "Sherrills Ford, NC pressure washing and soft washing for Northview Harbour, Mountain Creek, NC-150, 28673. New-construction cleanup, house washing, roof cleaning. Free estimates. Call 704-917-9649.",
  },
};

/** All city slugs in the order they should appear in nav/lists. */
export const CITY_SLUGS = Object.keys(CITY_DETAILS);

/** Safe lookup. Returns undefined if the slug isn't a real city page. */
export function getCityDetail(slug: string): CityDetail | undefined {
  return CITY_DETAILS[slug];
}
