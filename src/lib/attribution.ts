/**
 * Ad attribution capture and persistence.
 *
 * Problem this solves: Google Ads sends traffic with `gclid` (and UTM tags)
 * on the landing URL. If the visitor browses to another page before
 * submitting the form, those query params are gone, so the lead email had
 * no campaign data and we could never tie a booked job back to a keyword.
 *
 * What we do: on every page load we read the ad params off the URL. If any
 * are present, we write them to localStorage as the CURRENT attribution
 * (Google Ads is last-click attribution, so a newer click wins). If none are
 * present we leave whatever is already stored alone, so the data survives
 * internal navigation. Entries expire after 90 days, which matches Google's
 * default click-to-conversion window.
 *
 * NOTE: this is a marketing-attribution record only. It never contains
 * personal data, so it is safe to keep in localStorage.
 */

const STORAGE_KEY = "soe_attribution";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

/** Query params we lift off the landing URL. */
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
] as const;

/**
 * Click identifiers. `gclid` is the standard Google Ads one; `gbraid` and
 * `wbraid` are its iOS/privacy-safe replacements and show up on real ad
 * traffic, so we capture all three. `msclkid` covers Microsoft Ads if that
 * ever gets turned on.
 */
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid"] as const;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  fbclid?: string;
  /** Full URL of the page the visitor first landed on for this click. */
  landingPage?: string;
  /** document.referrer at landing time, blank for direct/paid clicks. */
  referrer?: string;
  /** ISO timestamp of when this attribution record was captured. */
  capturedAt?: string;
}

interface StoredAttribution extends Attribution {
  /** Epoch ms, used for the 90-day expiry check. */
  _ts: number;
}

/** Trim and cap a value so a junk/oversized query param can't bloat storage. */
function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, 300);
  return trimmed || undefined;
}

/**
 * Read ad params off the current URL. Returns null when the URL carries no
 * attribution at all, which is the signal to keep any stored record.
 */
function readFromUrl(search: string): Attribution | null {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  }
  for (const key of CLICK_ID_KEYS) {
    const value = clean(params.get(key));
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  }

  if (!hasAny) return null;

  // A gclid with no UTM tags is normal: auto-tagging alone produces it.
  // Backfill the source/medium so the lead email always reads sensibly.
  if ((found.gclid || found.gbraid || found.wbraid) && !found.utm_source) {
    found.utm_source = "google";
    found.utm_medium = found.utm_medium ?? "cpc";
  }

  return found;
}

/**
 * Capture attribution from the current URL and persist it.
 * Safe to call on every page load and in every environment; it no-ops
 * during SSR and swallows storage errors (Safari private mode throws).
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const fromUrl = readFromUrl(window.location.search);
    if (!fromUrl) return; // No new ad params, keep whatever we already have.

    const record: StoredAttribution = {
      ...fromUrl,
      landingPage: window.location.href.slice(0, 500),
      referrer: document.referrer ? document.referrer.slice(0, 500) : undefined,
      capturedAt: new Date().toISOString(),
      _ts: Date.now(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable. Attribution is best-effort; never break the page.
  }
}

/**
 * Read the stored attribution record, or an empty object if there is none,
 * it is expired, or storage is unavailable.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed || typeof parsed._ts !== "number") return {};

    if (Date.now() - parsed._ts > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return {};
    }

    const { _ts: _discard, ...attribution } = parsed;
    void _discard;
    return attribution;
  } catch {
    return {};
  }
}

/**
 * Human-readable one-liner for the "Found Us Via" line of the lead email,
 * e.g. `Google Ads (cpc) · campaign: Pressure Washing Denver · term: house washing denver nc`.
 * Falls back to the passed-in form value when there is no ad attribution.
 */
export function describeAttribution(attribution: Attribution, fallback: string): string {
  const hasGoogleClick = Boolean(attribution.gclid || attribution.gbraid || attribution.wbraid);
  const parts: string[] = [];

  if (hasGoogleClick) {
    parts.push(`Google Ads (${attribution.utm_medium ?? "cpc"})`);
  } else if (attribution.utm_source) {
    parts.push(`${attribution.utm_source}${attribution.utm_medium ? ` (${attribution.utm_medium})` : ""}`);
  }

  if (attribution.utm_campaign) parts.push(`campaign: ${attribution.utm_campaign}`);
  if (attribution.utm_term) parts.push(`term: ${attribution.utm_term}`);
  if (attribution.utm_content) parts.push(`ad: ${attribution.utm_content}`);

  if (parts.length === 0) return fallback;

  // Keep the visitor's own "how did you find us?" answer alongside the
  // measured data; the two disagreeing is itself useful signal.
  return fallback ? `${parts.join(" · ")} | visitor said: ${fallback}` : parts.join(" · ");
}
