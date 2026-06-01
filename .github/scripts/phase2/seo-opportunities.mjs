/**
 * Weekly SEO opportunity finder.
 *
 * Pulls the last 28 days of Search Console query data and ranks
 * "opportunity keywords": searches where the site already earns
 * impressions but ranks just off page one (roughly position 8-20)
 * and converts few of those impressions to clicks. Those are the
 * queries where one focused blog post can realistically move the
 * needle, so they make the best topics for the silent blog.
 *
 * Writes the ranked shortlist to data/seo-opportunities.json (which
 * the blog-writer step reads to choose a topic) and emails a short
 * note with the shortlist via Resend.
 *
 * Required env:
 *   GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET,
 *   GOOGLE_OAUTH_REFRESH_TOKEN, RESEND_API_KEY, SC_SITE_URL
 * Optional env:
 *   LEAD_INBOX_CC   also CC this address on the weekly note
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getAccessToken, googleFetch } from "./google-auth.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..", "..");
const OUT_PATH = join(ROOT, "data", "seo-opportunities.json");

const SITE_URL = process.env.SC_SITE_URL || "https://www.standoutexterior.com/";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Stand Out Ops <ops@updates.standoutexterior.com>";
const TO = "dev@ignacionunez.dev";
const CC = process.env.LEAD_INBOX_CC || null;
const PROJECT_NAME = "standoutexterior-next";

// Opportunity scoring window. 28 days gives low-volume local queries
// enough signal to clear Google's privacy thresholds.
const WINDOW_DAYS = 28;

// A query is an "opportunity" when it ranks off page one but is close
// enough that a focused page can plausibly pull it up, and it is
// already getting seen (impressions) without earning the clicks.
const MIN_POSITION = 5; // already top-5: not much headroom, skip
const MAX_POSITION = 25; // beyond page ~2-3: too far to move with one post
const MIN_IMPRESSIONS = 15; // needs real search demand to be worth it

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

async function fetchQueries(accessToken) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - WINDOW_DAYS);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const data = await googleFetch(url, {
    accessToken,
    method: "POST",
    body: {
      startDate: isoDate(start),
      endDate: isoDate(end),
      dimensions: ["query"],
      rowLimit: 1000,
      dataState: "final",
    },
  });
  return data.rows || [];
}

/**
 * Score = impressions weighted by how recoverable the position is.
 * Queries sitting at position 8-15 with lots of impressions and a
 * weak CTR score highest. Higher score = better blog topic.
 */
function scoreRow(row) {
  const { impressions, position, ctr } = row;
  // Position recoverability: best around 8-12, tapering to the edges.
  const posFactor = Math.max(0, 1 - Math.abs(position - 10) / 15);
  // Reward low CTR (clicks left on the table) but only mildly so a
  // single high-impression term still wins.
  const ctrFactor = 1 - Math.min(ctr, 0.15) / 0.15; // 0 ctr -> 1, >=15% -> 0
  return impressions * (0.6 + 0.4 * posFactor) * (0.7 + 0.3 * ctrFactor);
}

function buildHtml(opportunities, totalCandidates) {
  const monthName = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
  const rows = opportunities
    .slice(0, 10)
    .map(
      (o, i) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0A2E5C;">${i + 1}. ${escapeHtml(o.query)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#64748b;">${fmt(o.impressions)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#64748b;">${o.position.toFixed(1)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;font-weight:600;color:${i === 0 ? "#00A651" : "#0A2E5C"};">${(o.ctr * 100).toFixed(1)}%</td>
      </tr>`,
    )
    .join("");

  const topPick = opportunities[0];

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;"><tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
      <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:26px 30px;color:#ffffff;">
        <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;margin-bottom:4px;">Weekly Blog Topic · ${PROJECT_NAME}</div>
        <div style="font-size:20px;font-weight:800;">${monthName}</div>
      </td></tr>
      <tr><td style="padding:22px 30px 0 30px;">
        <p style="font-size:14px;color:#0A2E5C;margin:0 0 6px 0;">This week's post targets:</p>
        <p style="font-size:18px;font-weight:800;color:#00A651;margin:0 0 14px 0;">${topPick ? escapeHtml(topPick.query) : "no clear opportunity found"}</p>
        <p style="font-size:13px;color:#64748b;margin:0 0 16px 0;">
          ${topPick ? `Currently ranks position ${topPick.position.toFixed(1)} with ${fmt(topPick.impressions)} impressions and only ${(topPick.ctr * 100).toFixed(1)}% CTR. A focused post can pull this onto page one.` : "Search Console did not surface a query in the opportunity band this week. The writer will fall back to a fresh local long-tail topic."}
        </p>
      </td></tr>
      <tr><td style="padding:6px 30px 0 30px;">
        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:8px;">Top opportunities</div>
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          <thead><tr>
            <th style="text-align:left;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Query</th>
            <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Impr</th>
            <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Pos</th>
            <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">CTR</th>
          </tr></thead>
          <tbody>${rows || `<tr><td colspan="4" style="padding:14px 12px;font-size:13px;color:#94a3b8;">No queries in the opportunity band this week.</td></tr>`}</tbody>
        </table>
      </td></tr>
      <tr><td style="padding:20px 30px;border-top:1px solid #e5e7eb;background:#f8fafc;margin-top:16px;">
        <div style="font-size:11px;color:#94a3b8;">
          Scanned ${fmt(totalCandidates)} queries over the last ${WINDOW_DAYS} days. A draft post and PR follow automatically. Automated by .github/workflows/seo-blog-weekly.yml
        </div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function fmt(n) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(html) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[opp] RESEND_API_KEY not set, skipping email");
    return;
  }
  const subject = `Weekly blog topic · ${PROJECT_NAME} · ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], cc: CC ? [CC] : undefined, subject, html }),
  });
  if (!res.ok) {
    console.error("[opp] resend failed:", res.status, await res.text());
    return;
  }
  console.log("[opp] weekly note emailed to", TO, CC ? `cc ${CC}` : "");
}

/** Slugs of posts already published, so we don't repeat a topic. */
function alreadyCovered() {
  if (!existsSync(OUT_PATH)) return [];
  try {
    const prev = JSON.parse(readFileSync(OUT_PATH, "utf-8"));
    return prev.used || [];
  } catch {
    return [];
  }
}

async function main() {
  const accessToken = await getAccessToken();
  console.log("[opp] fetching Search Console query data…");
  const rows = await fetchQueries(accessToken);
  console.log(`[opp] ${rows.length} queries returned`);

  const used = alreadyCovered();

  const opportunities = rows
    .filter(
      (r) =>
        r.position >= MIN_POSITION &&
        r.position <= MAX_POSITION &&
        r.impressions >= MIN_IMPRESSIONS,
    )
    .map((r) => ({
      query: r.keys[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
      score: scoreRow(r),
      alreadyTargeted: used.includes(r.keys[0]),
    }))
    .sort((a, b) => b.score - a.score);

  // Prefer an untargeted opportunity for the top pick.
  const fresh = opportunities.filter((o) => !o.alreadyTargeted);
  const ranked = [...fresh, ...opportunities.filter((o) => o.alreadyTargeted)];

  const payload = {
    generatedAt: new Date().toISOString(),
    window: { days: WINDOW_DAYS },
    siteUrl: SITE_URL,
    totalQueriesScanned: rows.length,
    criteria: { MIN_POSITION, MAX_POSITION, MIN_IMPRESSIONS },
    topPick: ranked[0] || null,
    opportunities: ranked.slice(0, 25),
    used, // carried forward; the blog-writer step appends the chosen query
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  console.log(
    `[opp] wrote ${ranked.length} opportunities to data/seo-opportunities.json · top pick:`,
    payload.topPick ? payload.topPick.query : "(none)",
  );

  await sendEmail(buildHtml(ranked, rows.length));
}

main().catch((err) => {
  console.error("[opp] FATAL:", err);
  process.exit(1);
});
