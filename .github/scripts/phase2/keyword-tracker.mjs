/**
 * Weekly keyword rank tracker.
 *
 * Pulls per-keyword ranking data from Google Search Console API for
 * the list of target keywords in data/target-keywords.json. Records
 * each week's snapshot in data/keyword-history.json so we have a
 * durable trend line. If any keyword dropped 5+ positions since the
 * prior snapshot, emails an alert.
 *
 * Uses Search Console API — no external paid service needed, and the
 * data is authoritative (it's what Google actually shows us).
 *
 * Required env:
 *   GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET,
 *   GOOGLE_OAUTH_REFRESH_TOKEN, RESEND_API_KEY, SC_SITE_URL
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getAccessToken, googleFetch } from "./google-auth.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..", "..");

const KEYWORDS_PATH = join(ROOT, "data", "target-keywords.json");
const HISTORY_PATH = join(ROOT, "data", "keyword-history.json");
const SITE_URL = process.env.SC_SITE_URL || "https://www.standoutexterior.com/";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Stand Out Ops <ops@updates.standoutexterior.com>";
const TO = "dev@ignacionunez.dev";
const PROJECT_NAME = "standoutexterior-next";
const DROP_THRESHOLD = 5; // positions

function loadKeywords() {
  if (!existsSync(KEYWORDS_PATH)) {
    console.error(`[kw] no ${KEYWORDS_PATH}; using default list`);
    return [];
  }
  return JSON.parse(readFileSync(KEYWORDS_PATH, "utf-8"));
}

function loadHistory() {
  if (!existsSync(HISTORY_PATH)) return { snapshots: [] };
  return JSON.parse(readFileSync(HISTORY_PATH, "utf-8"));
}

function saveHistory(history) {
  mkdirSync(dirname(HISTORY_PATH), { recursive: true });
  writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2) + "\n");
}

/** Fetch 28 days of query data so we have enough signal for low-volume
 *  keywords to actually show an avg position (GSC hides data below
 *  privacy thresholds). */
async function fetchKeywordData(accessToken) {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - 28);

  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const data = await googleFetch(url, {
    accessToken,
    method: "POST",
    body: {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      dimensions: ["query"],
      rowLimit: 1000,
      dataState: "final",
    },
  });
  return data.rows || [];
}

function matchKeyword(target, gscRows) {
  const t = target.toLowerCase();
  const exact = gscRows.find((r) => r.keys[0].toLowerCase() === t);
  if (exact) return { match: "exact", row: exact };
  const partial = gscRows.find((r) => r.keys[0].toLowerCase().includes(t));
  if (partial) return { match: "partial", row: partial };
  return { match: "none", row: null };
}

function buildAlertHtml(drops) {
  const monthName = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const rows = drops
    .map(
      (d) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0A2E5C;font-weight:600;">${escapeHtml(d.keyword)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;color:#64748b;">${d.prevPosition.toFixed(1)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;font-weight:800;color:#C2352C;">${d.currPosition.toFixed(1)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:13px;font-weight:800;color:#C2352C;">▼ ${d.drop.toFixed(1)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
        <tr><td style="background:linear-gradient(135deg,#C2352C 0%,#EF4444 100%);padding:24px 28px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;margin-bottom:4px;">Keyword Rank Drops · ${PROJECT_NAME}</div>
          <div style="font-size:20px;font-weight:800;">${drops.length} keyword${drops.length === 1 ? "" : "s"} dropped ${DROP_THRESHOLD}+ positions</div>
          <div style="font-size:12px;margin-top:6px;opacity:0.9;">Week of ${monthName}</div>
        </td></tr>
        <tr><td style="padding:20px 28px 0 28px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Keyword</th>
                <th style="text-align:center;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Prev</th>
                <th style="text-align:center;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Now</th>
                <th style="text-align:center;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Drop</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </td></tr>
        <tr><td style="padding:14px 28px 20px 28px;">
          <div style="font-size:12px;color:#6B7280;line-height:1.6;">
            History is kept in <code>data/keyword-history.json</code> on the repo.
            Investigate each drop in Google Search Console → Performance → Queries.
            A single bad week often reverses on its own; two consecutive weeks is
            a real regression worth digging into.
          </div>
        </td></tr>
        <tr><td style="padding:14px 28px;border-top:1px solid #e5e7eb;background:#f8fafc;">
          <div style="font-size:11px;color:#94a3b8;">
            Automated by .github/workflows/keyword-tracker-weekly.yml · Next run: Monday 11:30 UTC
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendAlert(drops) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[kw] RESEND_API_KEY not set; skipping email");
    return;
  }
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `Keyword rank drop · ${PROJECT_NAME} · ${drops.length} keyword${drops.length === 1 ? "" : "s"}`,
      html: buildAlertHtml(drops),
    }),
  });
  if (!res.ok) {
    console.error("[kw] resend failed:", res.status, await res.text());
  } else {
    console.log(`[kw] alert email sent for ${drops.length} drops`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  const keywords = loadKeywords();
  if (keywords.length === 0) {
    console.log("[kw] no target keywords configured; nothing to track");
    return;
  }
  console.log(`[kw] tracking ${keywords.length} keywords`);

  const accessToken = await getAccessToken();
  const gscRows = await fetchKeywordData(accessToken);
  console.log(`[kw] got ${gscRows.length} queries from GSC`);

  const history = loadHistory();
  const prevSnapshot = history.snapshots[history.snapshots.length - 1];

  const snapshot = {
    date: new Date().toISOString().slice(0, 10),
    keywords: keywords.map((kw) => {
      const m = matchKeyword(kw, gscRows);
      return {
        keyword: kw,
        match: m.match,
        clicks: m.row?.clicks ?? 0,
        impressions: m.row?.impressions ?? 0,
        position: m.row?.position ?? null,
        ctr: m.row?.ctr ?? 0,
      };
    }),
  };

  // Detect drops
  const drops = [];
  if (prevSnapshot) {
    for (const curr of snapshot.keywords) {
      if (curr.position == null) continue;
      const prev = prevSnapshot.keywords.find((k) => k.keyword === curr.keyword);
      if (!prev || prev.position == null) continue;
      const drop = curr.position - prev.position; // positive = worse ranking
      if (drop >= DROP_THRESHOLD) {
        drops.push({
          keyword: curr.keyword,
          prevPosition: prev.position,
          currPosition: curr.position,
          drop,
        });
      }
    }
  }

  // Append snapshot + prune to last 26 weeks (6 months of history)
  history.snapshots.push(snapshot);
  if (history.snapshots.length > 26) {
    history.snapshots = history.snapshots.slice(-26);
  }
  saveHistory(history);
  console.log(`[kw] snapshot recorded; history now ${history.snapshots.length} weeks`);

  if (drops.length > 0) {
    console.log(`[kw] ${drops.length} keywords dropped ≥${DROP_THRESHOLD} positions`);
    await sendAlert(drops);
  } else {
    console.log("[kw] no significant drops this week");
  }
}

main().catch((err) => {
  console.error("[kw] FATAL:", err);
  process.exit(1);
});
