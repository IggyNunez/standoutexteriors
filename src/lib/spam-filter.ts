/**
 * Spam filter for the /api/lead contact form.
 *
 * Philosophy — never REJECT outright. Real leads with unusual message
 * phrasing or a disposable-looking email (e.g. privacy-minded users who
 * use Apple Hide My Email) shouldn't silently lose their submission.
 * Instead we SCORE each submission and return one of three verdicts:
 *
 *   "clean"      → normal processing, send to the lead inbox
 *   "quarantine" → deliver to a separate spam folder/inbox, not the
 *                  main lead inbox. Ridge can review periodically.
 *   "reject"     → reserved for obviously malicious payloads (honeypot
 *                  tripped, clearly non-ASCII attack strings). Returns
 *                  200 to the bot so it can't iterate on failures.
 *
 * This file is plain TypeScript with no runtime deps so it can be
 * imported cleanly into the edge / serverless route handler.
 */

import type { LeadFormData } from "@/types";

export type SpamVerdict = "clean" | "quarantine" | "reject";

export interface SpamAnalysis {
  verdict: SpamVerdict;
  score: number;
  /** Human-readable reasons for the verdict, logged for debugging. */
  reasons: string[];
}

/* ─── Layer 1a: disposable / throwaway email providers ───────────────
 *
 * List is kept intentionally short and conservative — includes domains
 * that exist ONLY for throwaway mail. We do NOT block gmail, outlook,
 * icloud, proton, etc. because real customers use those constantly.
 *
 * When you spot a new spam domain in your inbox, add it here and the
 * next submission from that domain gets quarantined.
 */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  // Seen in real spam to standoutexterior.com
  "jmailservice.com",
  // Classic throwaway providers
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "sharklasers.com",
  "10minutemail.com",
  "10minutemail.net",
  "yopmail.com",
  "throwawaymail.com",
  "trashmail.com",
  "dispostable.com",
  "maildrop.cc",
  "getnada.com",
  "mohmal.com",
  "mintemail.com",
  "fakeinbox.com",
  "spam4.me",
  "getairmail.com",
  "inboxbear.com",
  // SEO/marketing spam outfit throwaway patterns
  "jmailservice.net",
  "emailondeck.com",
  "mailforspam.com",
]);

/* ─── Layer 1b: SEO / marketing / cold-pitch giveaway phrases ───────
 *
 * Any submission containing these phrases in the message is almost
 * certainly an SEO agency cold pitch dressed as a contact form.
 * The list covers the most common templates (Grant Cardone, HubSpot,
 * Breakout Growth, etc.) seen in the wild.
 *
 * Matching is case-insensitive and substring-based, so catching
 * minor variations ("release the keyword" vs "release any keyword")
 * is free. If a phrase is too broad and catches real leads, drop it.
 */
const SPAM_MESSAGE_PATTERNS: RegExp[] = [
  // The exact pattern in the SEO cold-email that prompted this filter
  /haven'?t heard back from you/i,
  /release any open keyword/i,
  /release\s+(the|any|your)\s+keyword/i,
  /guaranteed traffic/i,
  /guaranteed\s+(first|top|page|ranking)/i,
  /(rank|ranking)\s+(you|your\s+site|your\s+business)\s+on\s+google/i,
  /send your website and the keywords/i,
  /send (me )?your (website|url)/i,
  /first page of google/i,
  /top of google/i,
  /grow your business online/i,
  /i'?ll send (you )?availability/i,
  /i'?ll assume you'?re passing/i,
  /three things[:.]/i,
  /\btiming isn'?t right\b/i,
  // Common SEO/marketing/lead-gen agency sales lines
  /SEO (services|audit|proposal|consultation)/i,
  /digital marketing (services|agency|package|audit|proposal)/i,
  /web design (services|agency|proposal)/i,
  /lead generation (services|agency)/i,
  /we can (help you|grow your)/i,
  /(qualified|exclusive)\s+leads/i,
  /\bbacklinks?\b/i,
  /\blink\s*building\b/i,
  /link-?building/i,
  /\bdomain authority\b/i,
  /outsource\s+(your|to)/i,
  /white\s*label\s+(seo|design|services)/i,
  // Crypto / wallet / investment scams sometimes find contact forms
  /bitcoin|cryptocurrency|investment opportunity|forex/i,
  // Adult / pharmacy / suspicious product pitches
  /\b(viagra|cialis|pharmacy|casino|loan)\b/i,
];

/* ─── Layer 1c: phone-number sanity check ────────────────────────────
 *
 * NC + neighboring states area codes that real Stand Out customers
 * would plausibly call from. A phone from a far-off area code (CA,
 * NY, TX, etc.) combined with other signals bumps the spam score
 * but doesn't by itself quarantine — plenty of real people move.
 */
const LOCAL_AREA_CODES = new Set([
  // North Carolina
  "252", "336", "704", "743", "828", "910", "919", "980", "984",
  // South Carolina
  "803", "839", "843", "854", "864",
  // Virginia
  "276", "434", "540", "571", "703", "757", "804", "826",
  // Georgia
  "229", "404", "470", "478", "678", "706", "762", "770", "912",
  // Tennessee
  "423", "615", "629", "731", "865", "901", "931",
]);

function isDisposableEmail(email: string): boolean {
  const at = email.lastIndexOf("@");
  if (at === -1) return false;
  const domain = email.slice(at + 1).toLowerCase().trim();
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

function matchesSpamPattern(text: string): { matched: boolean; pattern?: string } {
  for (const rx of SPAM_MESSAGE_PATTERNS) {
    if (rx.test(text)) return { matched: true, pattern: rx.source };
  }
  return { matched: false };
}

function extractAreaCode(phone: string | undefined): string | null {
  if (!phone) return null;
  // Strip everything but digits, then pull the first 3 digits of the
  // 10-digit number (handles leading "1", parens, dashes, spaces).
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits.slice(0, 3);
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1, 4);
  return null;
}

/**
 * Analyze a contact-form submission and return a verdict.
 *
 * Scoring thresholds:
 *   0-2  → clean        (let it through)
 *   3-5  → quarantine   (deliver to spam inbox instead of main)
 *   6+   → reject       (swallow silently, bot gets a fake 200)
 */
export function analyzeLead(lead: LeadFormData): SpamAnalysis {
  const reasons: string[] = [];
  let score = 0;

  // ── Layer 1a: disposable email ────────────────────────────────────
  if (lead.email && isDisposableEmail(lead.email)) {
    score += 5;
    reasons.push(`disposable email domain: ${lead.email.split("@")[1]}`);
  }

  // ── Layer 1b: SEO-pitch phrase detection in message ───────────────
  if (lead.message) {
    const { matched, pattern } = matchesSpamPattern(lead.message);
    if (matched) {
      score += 4;
      reasons.push(`spam phrase match: /${pattern}/`);
    }
    // Links are a strong signal. Real customers almost never paste
    // URLs; cold-pitch agencies always link their portfolio or calendar.
    const urlMatches = lead.message.match(/https?:\/\/|www\./gi);
    if (urlMatches && urlMatches.length >= 1) {
      score += 2;
      reasons.push(`message contains ${urlMatches.length} URL(s)`);
    }
    // Extremely long messages (>1500 chars) from strangers are usually
    // copy-pasted pitches. Genuine leads are short and to the point.
    if (lead.message.length > 1500) {
      score += 1;
      reasons.push(`message unusually long (${lead.message.length} chars)`);
    }
    // Cyrillic / CJK characters in a US pressure-washing contact form
    // are a near-100% spam signal.
    if (/[\u0400-\u04FF\u3040-\u30FF\u4E00-\u9FFF\u0E00-\u0E7F]/.test(lead.message)) {
      score += 4;
      reasons.push("non-Latin script in message");
    }
  }

  // ── Layer 1c: phone area-code sanity check ────────────────────────
  const areaCode = extractAreaCode(lead.phone);
  if (areaCode && !LOCAL_AREA_CODES.has(areaCode)) {
    // Non-local area code alone is only +1 — lots of legit customers
    // have out-of-state cell numbers. Combined with other signals
    // this gets strong enough to quarantine.
    score += 1;
    reasons.push(`non-local phone area code: ${areaCode}`);
  }

  // ── Layer 1d: name is literally "Test", "Asdf", etc. ──────────────
  const fullName = `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim().toLowerCase();
  if (
    fullName &&
    (/^(test|asdf|qwerty|admin|user|john doe|jane doe)\s*(test|asdf|qwerty|admin|user|doe)?$/.test(
      fullName,
    ) ||
      /^(.)\1{4,}$/.test(fullName.replace(/\s+/g, ""))) // "aaaaa aaaaa"
  ) {
    score += 3;
    reasons.push(`placeholder-style name: "${fullName}"`);
  }

  // ── Verdict ───────────────────────────────────────────────────────
  let verdict: SpamVerdict;
  if (score >= 6) verdict = "reject";
  else if (score >= 3) verdict = "quarantine";
  else verdict = "clean";

  return { verdict, score, reasons };
}
