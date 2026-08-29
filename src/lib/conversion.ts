/**
 * Google Ads conversion tracking.
 *
 * Everything about the conversion lives here so the two forms, the
 * thank-you page, and the layout tag can never drift apart.
 *
 * How the flow works now:
 *   1. A form POSTs to /api/lead. On a real success it stashes a small
 *      "pending conversion" record in sessionStorage and navigates to
 *      /thank-you.
 *   2. /thank-you reads that record, fires the conversion once, and clears
 *      it. Firing on a dedicated page load (rather than inline on the form)
 *      is what Google's tag assistant and the conversion diagnostics expect
 *      to see, and it gives us a real URL to test and to point a
 *      "page load" conversion action at if we ever need to.
 *   3. `transaction_id` de-duplicates, so a refresh or a back-button on
 *      /thank-you cannot inflate the count.
 */

declare global {
  interface Window {
    /** Google Ads gtag.js, loaded in src/app/layout.tsx. */
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Google Ads account ID. Also referenced in src/app/layout.tsx. */
export const GOOGLE_ADS_ID = "AW-10894480187";

/** Conversion action label for the lead-form submission. */
export const LEAD_CONVERSION_LABEL = "8sSpCLHUkoAcELum8soo";

/** Full send_to value, e.g. "AW-10894480187/8sSpCLHUkoAcELum8soo". */
export const LEAD_CONVERSION_SEND_TO = `${GOOGLE_ADS_ID}/${LEAD_CONVERSION_LABEL}`;

const PENDING_KEY = "soe_pending_conversion";

export interface PendingConversion {
  /** Unique per submission. Sent as transaction_id so Google de-dupes. */
  id: string;
  /** Which form produced it, for our own reporting. */
  formSource: string;
  /** Lower-cased email, for enhanced conversions. gtag hashes it for us. */
  email?: string;
  /** E.164 phone, for enhanced conversions. */
  phone?: string;
}

/** Crypto-random ID with a Math.random fallback for older browsers. */
function newId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Normalize a phone number to E.164 for enhanced conversions. Google
 * rejects unformatted numbers, so "(704) 555-1234" has to become
 * "+17045551234". Returns undefined when we can't confidently format it.
 */
function toE164(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
}

/**
 * Called by a form right before it navigates to /thank-you.
 * Returns the generated conversion ID so the caller can log it if needed.
 */
export function stagePendingConversion(input: {
  formSource: string;
  email?: string;
  phone?: string;
}): string {
  const pending: PendingConversion = {
    id: newId(),
    formSource: input.formSource,
    email: input.email?.trim().toLowerCase() || undefined,
    phone: toE164(input.phone),
  };

  try {
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    // Storage blocked. /thank-you still fires a conversion below, just
    // without enhanced-conversion user data.
  }

  return pending.id;
}

/** Read and immediately clear the staged conversion. */
function consumePendingConversion(): PendingConversion | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(PENDING_KEY);
    return JSON.parse(raw) as PendingConversion;
  } catch {
    return null;
  }
}

/**
 * Result of an attempt to report the conversion.
 *
 * The three cases are kept distinct because the caller treats them very
 * differently. "no-pending" is the correct, expected outcome for someone who
 * refreshed /thank-you or opened it directly, and must stay silent.
 * "gtag-unavailable" is worth retrying while the tag script loads.
 */
export type ConversionResult = "fired" | "no-pending" | "gtag-unavailable";

/** True when a submission is staged and still waiting to be reported. */
export function hasPendingConversion(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(PENDING_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * Fire the lead conversion. Call this from /thank-you on mount.
 *
 * The staged record is only consumed once gtag actually exists, so calling
 * this repeatedly while the tag loads can never double-count.
 */
export function fireLeadConversion(): ConversionResult {
  if (typeof window === "undefined") return "gtag-unavailable";

  // Checked before consuming: a visitor who lands on /thank-you directly
  // (bookmark, refresh, shared link) has no staged conversion, and firing
  // for them would inflate the count with non-leads.
  if (!hasPendingConversion()) return "no-pending";

  // Do not consume the record until we know we can actually report it.
  if (typeof window.gtag !== "function") return "gtag-unavailable";

  const pending = consumePendingConversion();
  if (!pending) return "no-pending";

  // Enhanced conversions: gtag hashes these client-side before sending.
  // Requires "Enhanced conversions for leads" to be switched on for this
  // conversion action inside the Google Ads UI; harmless if it is not.
  if (pending.email || pending.phone) {
    window.gtag("set", "user_data", {
      email: pending.email,
      phone_number: pending.phone,
    });
  }

  window.gtag("event", "conversion", {
    send_to: LEAD_CONVERSION_SEND_TO,
    transaction_id: pending.id,
    value: 1.0,
    currency: "USD",
  });

  // Mirror it as a plain named event so it is visible in GA4 / DebugView
  // and in the browser console when troubleshooting.
  window.gtag("event", "generate_lead", {
    transaction_id: pending.id,
    form_source: pending.formSource,
  });

  return "fired";
}
