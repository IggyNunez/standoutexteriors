/**
 * Monthly SEO digest.
 *
 * Runs from GitHub Actions on the 1st of every month at 12:00 UTC
 * (8 AM US-Eastern). Pulls Search Console + Business Profile data
 * for the last 30 days AND the previous 30 days (for month-over-month
 * comparisons), builds an HTML email with the scorecard, and sends
 * it via Resend to dev@ignacionunez.dev.
 *
 * Optional: set LEAD_INBOX_CC env var to also deliver to the client
 * (e.g. standoutexterior@gmail.com). Leaving it unset = internal-only.
 *
 * Required env:
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_OAUTH_REFRESH_TOKEN
 *   RESEND_API_KEY
 *   SC_SITE_URL                 e.g. "https://www.standoutexterior.com/"
 *   GBP_ACCOUNT_ID              (optional — skip GBP section if absent)
 *   GBP_LOCATION_ID             (optional)
 */
import { getAccessToken, googleFetch } from "./google-auth.mjs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Stand Out Ops <ops@updates.standoutexterior.com>";
const TO = "dev@ignacionunez.dev";
const CC = process.env.LEAD_INBOX_CC || null;
const PROJECT_NAME = "standoutexterior-next";
const SITE_URL = process.env.SC_SITE_URL || "https://www.standoutexterior.com/";
const GBP_ACCOUNT = process.env.GBP_ACCOUNT_ID || null;
const GBP_LOCATION = process.env.GBP_LOCATION_ID || null;

// ── Date helpers ──────────────────────────────────────────────────────
function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

const LAST_30_END = isoDate(daysAgo(1));
const LAST_30_START = isoDate(daysAgo(30));
const PREV_30_END = isoDate(daysAgo(31));
const PREV_30_START = isoDate(daysAgo(60));

// ── Search Console helpers ────────────────────────────────────────────
async function searchAnalytics(accessToken, startDate, endDate, dimensions = []) {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  return googleFetch(url, {
    accessToken,
    method: "POST",
    body: {
      startDate,
      endDate,
      dimensions,
      rowLimit: 100,
      dataState: "final",
    },
  });
}

// ── GBP helpers (optional) ────────────────────────────────────────────
async function fetchGbpInsights(accessToken) {
  if (!GBP_ACCOUNT || !GBP_LOCATION) {
    console.log("[seo] GBP_ACCOUNT_ID/GBP_LOCATION_ID not set — skipping GBP section");
    return null;
  }
  // Note: the Performance API was renamed; business.googleapis.com v1 is current.
  const url = `https://businessprofileperformance.googleapis.com/v1/locations/${GBP_LOCATION}:fetchMultiDailyMetricsTimeSeries` +
    `?dailyMetrics=BUSINESS_IMPRESSIONS_DESKTOP_MAPS&dailyMetrics=BUSINESS_IMPRESSIONS_MOBILE_MAPS` +
    `&dailyMetrics=CALL_CLICKS&dailyMetrics=BUSINESS_DIRECTION_REQUESTS&dailyMetrics=WEBSITE_CLICKS` +
    `&dailyRange.startDate.year=${LAST_30_START.slice(0, 4)}&dailyRange.startDate.month=${parseInt(LAST_30_START.slice(5, 7))}&dailyRange.startDate.day=${parseInt(LAST_30_START.slice(8, 10))}` +
    `&dailyRange.endDate.year=${LAST_30_END.slice(0, 4)}&dailyRange.endDate.month=${parseInt(LAST_30_END.slice(5, 7))}&dailyRange.endDate.day=${parseInt(LAST_30_END.slice(8, 10))}`;
  try {
    return await googleFetch(url, { accessToken });
  } catch (err) {
    console.error("[seo] GBP fetch failed:", err.message);
    return null;
  }
}

function sumGbpMetric(data, metricName) {
  if (!data?.multiDailyMetricTimeSeries) return 0;
  let total = 0;
  for (const series of data.multiDailyMetricTimeSeries) {
    for (const metric of series.dailyMetricTimeSeries || []) {
      if (metric.dailyMetric !== metricName) continue;
      for (const point of metric.timeSeries?.datedValues || []) {
        total += Number(point.value || 0);
      }
    }
  }
  return total;
}

// ── Formatting ────────────────────────────────────────────────────────
function fmt(n) {
  return new Intl.NumberFormat("en-US").format(n);
}
function delta(curr, prev) {
  if (!prev) return { pct: null, dir: "new", color: "#6B7280" };
  const pct = Math.round(((curr - prev) / prev) * 100);
  return {
    pct,
    dir: pct >= 0 ? "up" : "down",
    color: pct >= 10 ? "#00A651" : pct <= -10 ? "#C2352C" : "#6B7280",
  };
}

function buildHtml({ scSummary, scPrev, topQueries, topPages, gbp }) {
  const clicksD = delta(scSummary.clicks, scPrev.clicks);
  const imprD = delta(scSummary.impressions, scPrev.impressions);
  const ctrD = delta(scSummary.ctr * 100, scPrev.ctr * 100);
  const posD = delta(scPrev.position, scSummary.position); // inverted: lower = better

  const monthName = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "America/New_York",
  });

  const queryRows = topQueries
    .slice(0, 10)
    .map(
      (q) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0A2E5C;">${escapeHtml(q.keys[0])}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;font-weight:600;color:#0A2E5C;">${fmt(q.clicks)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#64748b;">${fmt(q.impressions)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#64748b;">${q.position.toFixed(1)}</td>
      </tr>`,
    )
    .join("");

  const pageRows = topPages
    .slice(0, 8)
    .map((p) => {
      const path = new URL(p.keys[0]).pathname || "/";
      return `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0A2E5C;font-weight:600;">${escapeHtml(path)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#0A2E5C;">${fmt(p.clicks)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:13px;color:#64748b;">${fmt(p.impressions)}</td>
      </tr>`;
    })
    .join("");

  const gbpSection = gbp
    ? `
      <tr><td style="padding:20px 28px 0 28px;">
        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:12px;">Google Maps · last 30 days</div>
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;font-size:13px;color:#64748b;">Map impressions</td>
            <td style="padding:10px 0;text-align:right;font-size:16px;font-weight:800;color:#0A2E5C;">${fmt(gbp.impressions)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#64748b;">Phone calls</td>
            <td style="padding:10px 0;border-top:1px solid #e5e7eb;text-align:right;font-size:16px;font-weight:800;color:#00A651;">${fmt(gbp.calls)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#64748b;">Direction requests</td>
            <td style="padding:10px 0;border-top:1px solid #e5e7eb;text-align:right;font-size:16px;font-weight:800;color:#0A2E5C;">${fmt(gbp.directions)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-top:1px solid #e5e7eb;font-size:13px;color:#64748b;">Website clicks from map</td>
            <td style="padding:10px 0;border-top:1px solid #e5e7eb;text-align:right;font-size:16px;font-weight:800;color:#0A2E5C;">${fmt(gbp.websiteClicks)}</td>
          </tr>
        </table>
      </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="680" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">

        <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:28px 32px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;margin-bottom:4px;">Monthly SEO Report · ${PROJECT_NAME}</div>
          <div style="font-size:22px;font-weight:800;">${monthName}</div>
          <div style="font-size:13px;margin-top:6px;color:#7ecfff;">${escapeHtml(SITE_URL)}</div>
        </td></tr>

        <tr><td style="padding:22px 32px 0 32px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:14px;">Search Console · last 30 days vs previous 30</div>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <tr>
              <td style="width:25%;padding:12px 8px;border-right:1px solid #e5e7eb;text-align:center;">
                <div style="font-size:10px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Clicks</div>
                <div style="font-size:22px;font-weight:800;color:#0A2E5C;">${fmt(scSummary.clicks)}</div>
                <div style="font-size:11px;color:${clicksD.color};margin-top:2px;">${formatDelta(clicksD)}</div>
              </td>
              <td style="width:25%;padding:12px 8px;border-right:1px solid #e5e7eb;text-align:center;">
                <div style="font-size:10px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Impressions</div>
                <div style="font-size:22px;font-weight:800;color:#0A2E5C;">${fmt(scSummary.impressions)}</div>
                <div style="font-size:11px;color:${imprD.color};margin-top:2px;">${formatDelta(imprD)}</div>
              </td>
              <td style="width:25%;padding:12px 8px;border-right:1px solid #e5e7eb;text-align:center;">
                <div style="font-size:10px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">CTR</div>
                <div style="font-size:22px;font-weight:800;color:#0A2E5C;">${(scSummary.ctr * 100).toFixed(1)}%</div>
                <div style="font-size:11px;color:${ctrD.color};margin-top:2px;">${formatDelta(ctrD)}</div>
              </td>
              <td style="width:25%;padding:12px 8px;text-align:center;">
                <div style="font-size:10px;color:#6B7280;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Avg position</div>
                <div style="font-size:22px;font-weight:800;color:#0A2E5C;">${scSummary.position.toFixed(1)}</div>
                <div style="font-size:11px;color:${posD.color};margin-top:2px;">${formatDelta(posD)}</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:24px 32px 0 32px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">Top queries</div>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Query</th>
                <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Clicks</th>
                <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Impr</th>
                <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Pos</th>
              </tr>
            </thead>
            <tbody>${queryRows}</tbody>
          </table>
        </td></tr>

        <tr><td style="padding:24px 32px 0 32px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">Top pages</div>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th style="text-align:left;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Page</th>
                <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Clicks</th>
                <th style="text-align:right;padding:8px 12px;font-size:10px;letter-spacing:0.1em;color:#6B7280;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Impr</th>
              </tr>
            </thead>
            <tbody>${pageRows}</tbody>
          </table>
        </td></tr>

        ${gbpSection}

        <tr><td style="padding:22px 32px;border-top:1px solid #e5e7eb;background:#f8fafc;">
          <div style="font-size:11px;color:#94a3b8;">
            Automated by .github/workflows/seo-digest-monthly.yml · Next run: 1st of next month at 12:00 UTC
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function formatDelta(d) {
  if (d.pct === null) return "new";
  const arrow = d.dir === "up" ? "▲" : "▼";
  return `${arrow} ${Math.abs(d.pct)}% vs prev 30d`;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  const accessToken = await getAccessToken();
  console.log("[seo] fetching Search Console data…");

  const [summaryCurr, summaryPrev, queries, pages, gbpRaw] = await Promise.all([
    searchAnalytics(accessToken, LAST_30_START, LAST_30_END),
    searchAnalytics(accessToken, PREV_30_START, PREV_30_END),
    searchAnalytics(accessToken, LAST_30_START, LAST_30_END, ["query"]),
    searchAnalytics(accessToken, LAST_30_START, LAST_30_END, ["page"]),
    fetchGbpInsights(accessToken),
  ]);

  const scSummary = summaryCurr.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const scPrev = summaryPrev.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const topQueries = (queries.rows || []).sort((a, b) => b.clicks - a.clicks);
  const topPages = (pages.rows || []).sort((a, b) => b.clicks - a.clicks);

  const gbp = gbpRaw
    ? {
        impressions:
          sumGbpMetric(gbpRaw, "BUSINESS_IMPRESSIONS_DESKTOP_MAPS") +
          sumGbpMetric(gbpRaw, "BUSINESS_IMPRESSIONS_MOBILE_MAPS"),
        calls: sumGbpMetric(gbpRaw, "CALL_CLICKS"),
        directions: sumGbpMetric(gbpRaw, "BUSINESS_DIRECTION_REQUESTS"),
        websiteClicks: sumGbpMetric(gbpRaw, "WEBSITE_CLICKS"),
      }
    : null;

  console.log(
    `[seo] clicks: ${scSummary.clicks} (prev ${scPrev.clicks}) · impressions: ${scSummary.impressions}`,
  );

  const html = buildHtml({ scSummary, scPrev, topQueries, topPages, gbp });
  const subject = `Monthly SEO · ${PROJECT_NAME} · ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const to = [TO];
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to,
      cc: CC ? [CC] : undefined,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`resend failed: ${res.status}\n${text}`);
  }
  console.log("[seo] digest email sent to", to.join(", "), CC ? `cc ${CC}` : "");
}

main().catch((err) => {
  console.error("[seo] FATAL:", err);
  process.exit(1);
});
