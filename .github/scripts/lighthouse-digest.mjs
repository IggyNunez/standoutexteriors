/**
 * Weekly Lighthouse digest emailer.
 *
 * Runs inside the lighthouse-weekly GitHub Action *after* lhci has
 * written its manifest to `.lighthouseci/manifest.json`. Parses each
 * run, builds a concise HTML summary (one row per page, color-coded
 * by score), and emails it to dev@ignacionunez.dev via Resend.
 *
 * Resend's free tier gives us 3,000 emails / month which is plenty
 * for one digest per week per project. The REPORTS_TO address is
 * hardcoded because this is *my* ops inbox, not a per-project setting.
 *
 * Env vars expected:
 *   RESEND_API_KEY   provided by GitHub secrets
 *
 * Exits non-zero if any category score regressed from the previous
 * week — GitHub's default email-on-failure then notifies me in
 * addition to the digest. (Currently disabled until we have a
 * baseline; we'll re-enable after 2–3 weeks of data.)
 */
import fs from "node:fs";
import path from "node:path";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Stand Out Ops <ops@updates.standoutexterior.com>";
const TO = "dev@ignacionunez.dev";
const PROJECT_NAME = "standoutexterior-next";
const PRODUCTION_URL = "https://www.standoutexterior.com";

const LHCI_DIR = path.join(process.cwd(), ".lighthouseci");

/**
 * Parse Lighthouse CI report files directly from `.lighthouseci/`.
 *
 * Earlier versions of this script looked for `manifest.json`, which
 * Lighthouse CI only writes when the upload target is a persistent
 * server. With `temporary-public-storage` we get individual
 * `lhr-<hash>.json` files (one per audited URL) but no manifest.
 *
 * Each lhr JSON has the full Lighthouse Result at the top level:
 *   { finalUrl, categories: { performance: { score }, ... }, ... }
 * We pluck what we need and turn it into the same shape the email
 * template expects (url + summary { performance, accessibility, ... }).
 */
function loadManifest() {
  if (!fs.existsSync(LHCI_DIR)) {
    console.error(`[digest] directory not found at ${LHCI_DIR}`);
    return [];
  }

  const lhrFiles = fs
    .readdirSync(LHCI_DIR)
    .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"));

  if (lhrFiles.length === 0) {
    console.error(`[digest] no lhr-*.json files found in ${LHCI_DIR}`);
    console.error(`[digest] contents: ${fs.readdirSync(LHCI_DIR).join(", ")}`);
    return [];
  }

  const entries = [];
  for (const file of lhrFiles) {
    try {
      const lhr = JSON.parse(fs.readFileSync(path.join(LHCI_DIR, file), "utf-8"));
      const cats = lhr.categories || {};
      entries.push({
        url: lhr.finalDisplayedUrl || lhr.finalUrl || lhr.requestedUrl || "",
        summary: {
          performance: cats.performance?.score ?? null,
          accessibility: cats.accessibility?.score ?? null,
          "best-practices": cats["best-practices"]?.score ?? null,
          seo: cats.seo?.score ?? null,
        },
      });
    } catch (err) {
      console.error(`[digest] failed to parse ${file}:`, err.message);
    }
  }

  // Sort by URL for stable table order across runs
  entries.sort((a, b) => a.url.localeCompare(b.url));
  console.log(`[digest] parsed ${entries.length} Lighthouse results`);
  return entries;
}

/** Convert a 0.0–1.0 Lighthouse score into a 0–100 integer + color. */
function scoreCell(rawScore) {
  if (rawScore == null) return { value: "—", color: "#94a3b8" };
  const pct = Math.round(rawScore * 100);
  const color = pct >= 90 ? "#00A651" : pct >= 75 ? "#E8B84C" : "#C2352C";
  return { value: String(pct), color };
}

function buildRows(manifest) {
  return manifest
    .map((entry) => {
      const summary = entry.summary || {};
      const url = entry.url;
      const urlPath = new URL(url).pathname || "/";
      const perf = scoreCell(summary.performance);
      const a11y = scoreCell(summary.accessibility);
      const bp = scoreCell(summary["best-practices"]);
      const seo = scoreCell(summary.seo);
      const reportLink = entry.htmlPath
        ? `file:${entry.htmlPath.replace(/\\/g, "/")}`
        : url;
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0A2E5C;font-weight:600;">
            <a href="${url}" style="color:#0A2E5C;text-decoration:none;">${urlPath}</a>
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:14px;font-weight:800;color:${perf.color};">${perf.value}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:14px;font-weight:800;color:${a11y.color};">${a11y.value}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:14px;font-weight:800;color:${bp.color};">${bp.value}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:14px;font-weight:800;color:${seo.color};">${seo.value}</td>
        </tr>
      `;
    })
    .join("");
}

function buildHtml(manifest) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });
  const rows = manifest.length
    ? buildRows(manifest)
    : `<tr><td colspan="5" style="padding:24px;text-align:center;color:#C2352C;font-weight:700;">
        Lighthouse run produced no results. Check the GitHub Actions log.
       </td></tr>`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
        <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:24px 28px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;margin-bottom:4px;">Weekly Lighthouse · ${PROJECT_NAME}</div>
          <div style="font-size:20px;font-weight:800;">${date}</div>
          <div style="font-size:13px;margin-top:6px;color:#7ecfff;"><a href="${PRODUCTION_URL}" style="color:#7ecfff;text-decoration:none;">${PRODUCTION_URL}</a></div>
        </td></tr>

        <tr><td style="padding:20px 28px 0 28px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:12px;">Scores</div>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th style="padding:10px 12px;text-align:left;font-size:11px;color:#64748b;letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Page</th>
                <th style="padding:10px 12px;text-align:center;font-size:11px;color:#64748b;letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">Perf</th>
                <th style="padding:10px 12px;text-align:center;font-size:11px;color:#64748b;letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">A11y</th>
                <th style="padding:10px 12px;text-align:center;font-size:11px;color:#64748b;letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">BP</th>
                <th style="padding:10px 12px;text-align:center;font-size:11px;color:#64748b;letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #e5e7eb;">SEO</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </td></tr>

        <tr><td style="padding:16px 28px 24px 28px;">
          <div style="font-size:12px;color:#64748b;line-height:1.6;">
            <strong style="color:#0A2E5C;">Scoring:</strong>
            <span style="color:#00A651;">●</span> 90+ good ·
            <span style="color:#E8B84C;">●</span> 75–89 watch ·
            <span style="color:#C2352C;">●</span> &lt;75 fix
            <br><br>
            Full interactive reports are uploaded to temporary public storage
            by Lighthouse CI. Check the GitHub Actions run log for each
            "Open the report at ..." link.
          </div>
        </td></tr>

        <tr><td style="padding:14px 28px;border-top:1px solid #e5e7eb;background:#f8fafc;">
          <div style="font-size:11px;color:#94a3b8;">
            Automated by .github/workflows/lighthouse-weekly.yml · Next run: Monday 10:30 UTC
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function send(html) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[digest] RESEND_API_KEY not set; email NOT sent");
    process.exit(1);
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `Weekly Lighthouse · ${PROJECT_NAME} · ${new Date().toISOString().slice(0, 10)}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[digest] resend error", res.status, text);
    process.exit(1);
  }
  console.log("[digest] email sent to", TO);
}

const manifest = loadManifest();
const html = buildHtml(manifest);
await send(html);
