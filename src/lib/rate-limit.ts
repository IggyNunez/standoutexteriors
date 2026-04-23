/**
 * Simple in-memory rate limiter for the /api/lead route.
 *
 * Each serverless instance keeps its own map of IP → submission
 * timestamps. Bursts within a single instance are caught; bursts
 * spread across cold-started instances are not. For a small local
 * service business that's a perfectly acceptable trade-off — a
 * spammer hitting 10 different instances in 10 seconds would still
 * be caught by the spam-filter module on content.
 *
 * If traffic grows enough that we need cross-instance limits,
 * swap the Map below for an Upstash Redis client. The function
 * signature stays identical.
 */

interface WindowRecord {
  /** Timestamps (ms since epoch) of requests within the longest window. */
  hits: number[];
}

/** IP → record. Kept at module scope so it persists for the lifetime
 *  of the warm serverless instance. */
const store = new Map<string, WindowRecord>();

/** Tunable limits. Expressed as (max requests, window in ms). */
const SHORT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const SHORT_WINDOW_MAX = 1;            // 1 submission per 5 min per IP

const LONG_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const LONG_WINDOW_MAX = 3;             // 3 submissions per hour per IP

/** Opportunistic cleanup — drop any record whose newest hit is older
 *  than the longest window so the map doesn't grow without bound. */
function prune(now: number) {
  for (const [ip, rec] of store.entries()) {
    const newest = rec.hits[rec.hits.length - 1] ?? 0;
    if (now - newest > LONG_WINDOW_MS) store.delete(ip);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Which window (if any) was exceeded. */
  reason?: "short-window" | "long-window";
  /** How many ms the caller should wait before retrying. */
  retryAfterMs?: number;
}

/**
 * Record a hit from `ip` and return whether it's allowed.
 * The caller should early-return 429 when `allowed` is false.
 */
export function rateLimitCheck(ip: string): RateLimitResult {
  const now = Date.now();
  prune(now);

  const rec = store.get(ip) ?? { hits: [] };
  // Drop hits outside the longest window
  rec.hits = rec.hits.filter((t) => now - t <= LONG_WINDOW_MS);

  // Count within the shorter window
  const shortHits = rec.hits.filter((t) => now - t <= SHORT_WINDOW_MS).length;
  if (shortHits >= SHORT_WINDOW_MAX) {
    return {
      allowed: false,
      reason: "short-window",
      retryAfterMs: SHORT_WINDOW_MS - (now - rec.hits[rec.hits.length - 1]!),
    };
  }

  // Count within the longer window
  if (rec.hits.length >= LONG_WINDOW_MAX) {
    const oldest = rec.hits[0]!;
    return {
      allowed: false,
      reason: "long-window",
      retryAfterMs: LONG_WINDOW_MS - (now - oldest),
    };
  }

  // Allowed — record the hit
  rec.hits.push(now);
  store.set(ip, rec);
  return { allowed: true };
}

/**
 * Best-effort IP extraction from a Next.js Request. Vercel sets
 * `x-forwarded-for`; the leftmost entry is the original client IP.
 * If neither header is present we fall back to a single bucket
 * ("unknown") — better to rate-limit everyone together than not
 * at all.
 */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
