/**
 * Monthly NAP (Name/Address/Phone) audit.
 *
 * Checks that the business name, street address, and phone number
 * appear CONSISTENTLY across major directory listings. Inconsistency
 * is one of Google's local-ranking penalty triggers.
 *
 * This is a "lightweight" audit — we can't scrape most directories
 * for automated consistency checks reliably (Yelp / Facebook / BBB
 * don't want to be scraped, and doing so reliably at scale requires
 * a paid tool like Yext or BrightLocal). What we CAN do is fetch the
 * site's own structured data, verify the source-of-truth is correct
 * in our own code, and remind you every month to spot-check the
 * external listings.
 *
 * Full-scale citation automation = Yext ($199/mo) or manual once a
 * month. We do the manual nudge + source-of-truth verification for
 * free, and if you spot a drift during the spot-check you fix it
 * in the platform that drifted.
 *
 * Required env:
 *   RESEND_API_KEY
 *   SITE_URL (optional, defaults to standoutexterior.com)
 */
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Stand Out Ops <ops@updates.standoutexterior.com>";
const TO = "dev@ignacionunez.dev";
const PROJECT_NAME = "standoutexterior-next";
const SITE_URL = process.env.SITE_URL || "https://www.standoutexterior.com/";

// Single source of truth for this project. Keep in sync with
// src/lib/constants.ts. If you change this, change both places.
const SOURCE_OF_TRUTH = {
  name: "Stand Out Exterior Cleaning LLC",
  nameShort: "Stand Out Exterior Cleaning",
  phone: "(704) 917-9649",
  phoneDigits: "7049179649",
  streetAddress: "7238 Windy Pine Cir",
  city: "Denver",
  state: "NC",
  zip: "28037",
};

const DIRECTORIES = [
  { name: "Google Business Profile", url: "https://business.google.com/u/0/" },
  { name: "Yelp", url: "https://biz.yelp.com/" },
  { name: "Facebook", url: "https://business.facebook.com/" },
  { name: "Nextdoor", url: "https://business.nextdoor.com/" },
  { name: "Apple Business Connect", url: "https://businessconnect.apple.com/" },
  { name: "Bing Places", url: "https://www.bingplaces.com/" },
  { name: "Angi (Angie's List)", url: "https://pro.angi.com/" },
  { name: "BBB (Better Business Bureau)", url: "https://www.bbb.org/" },
];

// ── Step 1: verify source-of-truth by fetching site JSON-LD ──────────
async function verifySourceOfTruth() {
  try {
    const res = await fetch(SITE_URL, { headers: { "User-Agent": "nap-audit/1.0" } });
    const html = await res.text();
    const jsonLdMatches = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)];
    for (const m of jsonLdMatches) {
      try {
        const ld = JSON.parse(m[1]);
        if (ld["@type"] === "ProfessionalService" || ld["@type"] === "LocalBusiness") {
          return {
            found: true,
            name: ld.name,
            telephone: ld.telephone,
            streetAddress: ld.address?.streetAddress,
            city: ld.address?.addressLocality,
            state: ld.address?.addressRegion,
            zip: ld.address?.postalCode,
          };
        }
      } catch {
        // skip unparseable LD block
      }
    }
    return { found: false };
  } catch (err) {
    return { found: false, error: err.message };
  }
}

function compareSourceOfTruth(actual) {
  const issues = [];
  if (!actual.found) {
    issues.push({
      field: "JSON-LD",
      expected: "LocalBusiness or ProfessionalService structured data",
      actual: "not found on homepage",
    });
    return issues;
  }
  if (actual.name !== SOURCE_OF_TRUTH.name) {
    issues.push({ field: "name", expected: SOURCE_OF_TRUTH.name, actual: actual.name });
  }
  // Phone: normalize both sides to digits for comparison
  const actualPhoneDigits = (actual.telephone || "").replace(/\D/g, "");
  if (!actualPhoneDigits.endsWith(SOURCE_OF_TRUTH.phoneDigits)) {
    issues.push({ field: "phone", expected: SOURCE_OF_TRUTH.phone, actual: actual.telephone });
  }
  if (actual.streetAddress !== SOURCE_OF_TRUTH.streetAddress) {
    issues.push({ field: "address", expected: SOURCE_OF_TRUTH.streetAddress, actual: actual.streetAddress });
  }
  if (actual.city !== SOURCE_OF_TRUTH.city) {
    issues.push({ field: "city", expected: SOURCE_OF_TRUTH.city, actual: actual.city });
  }
  if (actual.state !== SOURCE_OF_TRUTH.state) {
    issues.push({ field: "state", expected: SOURCE_OF_TRUTH.state, actual: actual.state });
  }
  if (actual.zip !== SOURCE_OF_TRUTH.zip) {
    issues.push({ field: "ZIP", expected: SOURCE_OF_TRUTH.zip, actual: actual.zip });
  }
  return issues;
}

function buildEmailHtml(siteIssues) {
  const monthName = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const allGood = siteIssues.length === 0;

  const siteSection = allGood
    ? `<div style="padding:14px 18px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;font-size:13px;color:#065f46;">
         <strong>Site structured data matches source-of-truth.</strong> Every
         NAP field on the homepage JSON-LD is identical to the constants in
         src/lib/constants.ts. No internal drift to fix.
       </div>`
    : `<div style="padding:14px 18px;background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;font-size:13px;color:#78350f;">
         <strong>⚠ Site-level drift detected (${siteIssues.length} issue${siteIssues.length === 1 ? "" : "s"}):</strong>
         <table style="width:100%;margin-top:8px;border-collapse:collapse;">
           <thead><tr>
             <th style="text-align:left;padding:6px;font-size:11px;color:#78350f;">Field</th>
             <th style="text-align:left;padding:6px;font-size:11px;color:#78350f;">Expected</th>
             <th style="text-align:left;padding:6px;font-size:11px;color:#78350f;">Actual</th>
           </tr></thead>
           <tbody>
             ${siteIssues
               .map(
                 (i) => `<tr>
                 <td style="padding:6px;font-size:12px;color:#78350f;font-weight:700;">${escapeHtml(i.field)}</td>
                 <td style="padding:6px;font-size:12px;color:#78350f;">${escapeHtml(i.expected || "—")}</td>
                 <td style="padding:6px;font-size:12px;color:#C2352C;">${escapeHtml(i.actual || "—")}</td>
               </tr>`,
               )
               .join("")}
           </tbody>
         </table>
       </div>`;

  const directoryRows = DIRECTORIES.map(
    (d) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#0A2E5C;font-weight:600;">${escapeHtml(d.name)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">
          <a href="${d.url}" style="color:#2B7DE9;text-decoration:none;font-size:12px;">Open →</a>
        </td>
      </tr>`,
  ).join("");

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="640" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
        <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:24px 28px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;margin-bottom:4px;">Monthly NAP Audit · ${PROJECT_NAME}</div>
          <div style="font-size:20px;font-weight:800;">${monthName}</div>
        </td></tr>

        <tr><td style="padding:20px 28px 0 28px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">Source of truth</div>
          <div style="font-size:13px;color:#0A2E5C;line-height:1.7;padding:14px 18px;background:#f8fafc;border-radius:8px;">
            <strong>${escapeHtml(SOURCE_OF_TRUTH.name)}</strong><br>
            ${escapeHtml(SOURCE_OF_TRUTH.streetAddress)}, ${escapeHtml(SOURCE_OF_TRUTH.city)}, ${escapeHtml(SOURCE_OF_TRUTH.state)} ${escapeHtml(SOURCE_OF_TRUTH.zip)}<br>
            ${escapeHtml(SOURCE_OF_TRUTH.phone)}
          </div>
        </td></tr>

        <tr><td style="padding:20px 28px 0 28px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">Site-level check</div>
          ${siteSection}
        </td></tr>

        <tr><td style="padding:20px 28px 0 28px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">External directories · spot-check</div>
          <div style="font-size:12px;color:#6B7280;line-height:1.6;margin-bottom:12px;">
            Automated scraping of these directories at scale requires a paid
            tool (Yext, BrightLocal). For a single-location business, a
            monthly 5-minute click-through is usually enough. Open each link,
            confirm name / address / phone match the source-of-truth above.
          </div>
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <tbody>${directoryRows}</tbody>
          </table>
        </td></tr>

        <tr><td style="padding:14px 28px;border-top:1px solid #e5e7eb;background:#f8fafc;">
          <div style="font-size:11px;color:#94a3b8;">
            Automated by .github/workflows/nap-audit-monthly.yml · Next run: 1st of next month at 13:00 UTC
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

async function main() {
  console.log("[nap] fetching site JSON-LD from", SITE_URL);
  const actual = await verifySourceOfTruth();
  const siteIssues = compareSourceOfTruth(actual);

  if (siteIssues.length === 0) {
    console.log("[nap] site JSON-LD matches source-of-truth ✓");
  } else {
    console.log(`[nap] found ${siteIssues.length} site-level drift issue(s)`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[nap] RESEND_API_KEY not set; skipping email");
    return;
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `Monthly NAP audit · ${PROJECT_NAME} · ${siteIssues.length === 0 ? "all clean" : `${siteIssues.length} issue${siteIssues.length === 1 ? "" : "s"}`}`,
      html: buildEmailHtml(siteIssues),
    }),
  });

  if (!res.ok) {
    console.error("[nap] resend failed:", res.status, await res.text());
  } else {
    console.log("[nap] audit email sent");
  }
}

main().catch((err) => {
  console.error("[nap] FATAL:", err);
  process.exit(1);
});
