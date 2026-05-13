/**
 * Seasonal config flag.
 *
 * Single source of truth for "what season is it?" that auto-rotates
 * based on the current date. Components read `getCurrentSeason()` and
 * branch on the returned key to render season-appropriate banners,
 * emphasize relevant services, and swap CTA copy.
 *
 * Why not a feature flag service (GrowthBook / LaunchDarkly)? For a
 * single-operator home-service business the extra infrastructure is
 * overkill. A pure-date-based switch is free, deterministic, has zero
 * runtime cost, and always renders the same on SSR + client (no
 * hydration mismatch).
 *
 * The whole table below can be changed in one place. A service that
 * wants to override for a one-off promo (Memorial Day push, etc.)
 * can call `getCurrentSeason({ override: "spring" })` explicitly.
 */

export type SeasonKey = "winter" | "spring" | "summer" | "fall" | "christmas";

export interface Season {
  key: SeasonKey;
  label: string;
  /** One-line banner shown at the top of the homepage during this season. */
  banner: string;
  /** Services to emphasize (by slug) this season — use in sorting/filtering. */
  featuredServices: string[];
  /** Season-appropriate CTA text for the primary button. */
  ctaText: string;
  /** Palette accent color — optional, leave undefined to use default brand. */
  accent?: string;
}

/**
 * Monthly map. Index = month number (1-12). The Christmas season is
 * carved out specially: November + December + first half of January.
 * Everything else falls into the standard four seasons.
 */
const SEASON_TABLE: Record<SeasonKey, Season> = {
  winter: {
    key: "winter",
    label: "Winter",
    banner: "Fresh-start January: book your house wash + gutter cleaning for the spring",
    featuredServices: ["house-washing", "gutter-cleaning", "roof-cleaning"],
    ctaText: "Get a Free Estimate",
  },
  spring: {
    key: "spring",
    label: "Spring",
    banner: "Spring pollen season: book your house wash before the yellow dust takes over",
    featuredServices: ["house-washing", "roof-cleaning", "driveway-cleaning"],
    ctaText: "Book Spring Cleaning",
  },
  summer: {
    key: "summer",
    label: "Summer",
    banner: "Summer maintenance: refresh your driveway, pavers, and fence before the heat bakes them",
    featuredServices: ["driveway-cleaning", "paver-cleaning", "fence-washing"],
    ctaText: "Schedule Your Clean",
  },
  fall: {
    key: "fall",
    label: "Fall",
    banner: "Pre-winter prep: gutter cleaning and roof treatment before the first freeze",
    featuredServices: ["gutter-cleaning", "roof-cleaning", "house-washing"],
    ctaText: "Book Fall Service",
  },
  christmas: {
    key: "christmas",
    label: "Christmas",
    banner: "Now booking 2026 Christmas light installations — premium LED rooflines, installed and maintained",
    featuredServices: ["christmas-lights", "house-washing", "gutter-cleaning"],
    ctaText: "Reserve Your Install",
    accent: "#C2352C",
  },
};

/**
 * Return the active season for a given date (defaults to now). The
 * explicit `now` param exists for testing + for any place we need
 * to render "next season" copy (e.g. an upcoming-promo banner).
 */
export function getCurrentSeason({
  now = new Date(),
  override,
}: { now?: Date; override?: SeasonKey } = {}): Season {
  if (override) return SEASON_TABLE[override];

  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // Christmas light installation season: Sept 15 → Jan 15
  // (Sept/Oct for booking, Nov/Dec for active installs, first half of
  // Jan for late takedowns before spring season kicks in.)
  if (month === 1 && day <= 15) return SEASON_TABLE.christmas;
  if (month >= 9 && (month > 9 || day >= 15)) return SEASON_TABLE.christmas;

  // Standard four seasons for everything else:
  if (month === 1 || month === 2) return SEASON_TABLE.winter;
  if (month >= 3 && month <= 5) return SEASON_TABLE.spring;
  if (month >= 6 && month <= 8) return SEASON_TABLE.summer;
  return SEASON_TABLE.fall; // Sept 1-14 only; Sept 15+ → christmas above
}

/**
 * Convenience helper: is a given service slug one of the featured
 * services for the current season? Useful in components that want
 * to apply a subtle "promoted" visual treatment.
 */
export function isSeasonFeatured(slug: string, now: Date = new Date()): boolean {
  return getCurrentSeason({ now }).featuredServices.includes(slug);
}
