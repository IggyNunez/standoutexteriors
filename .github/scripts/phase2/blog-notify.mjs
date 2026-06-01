/**
 * Blog-published notifier (Standout).
 *
 * Runs from blog-published.yml after a new post lands on master (the
 * weekly blog routine writes + merges its own PR). Emails the live post
 * link via Resend.
 *
 * The Action extracts the new post's slug/title/keyword from the commit
 * diff and passes them as POST_SLUG / POST_TITLE / POST_KEYWORD env vars,
 * so this is layout-agnostic (Standout keeps posts in src/lib/blog-posts.ts).
 *
 * Required env: RESEND_API_KEY, POST_SLUG. Optional: POST_TITLE, POST_KEYWORD.
 */
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Stand Out Ops <ops@updates.standoutexterior.com>";
const TO = "dev@ignacionunez.dev";
const PROJECT_NAME = "standoutexterior-next";
const SITE_URL = "https://www.standoutexterior.com";

function buildHtml({ title, kw, url }) {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f5f7fa;"><tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
      <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:24px 30px;color:#fff;">
        <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;">New blog published &middot; ${PROJECT_NAME}</div>
        <div style="font-size:19px;font-weight:800;margin-top:4px;">${escapeHtml(title)}</div>
      </td></tr>
      <tr><td style="padding:22px 30px;">
        ${kw ? `<p style="margin:0 0 8px;font-size:12px;color:#2B7DE9;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Target keyword: ${escapeHtml(kw)}</p>` : ""}
        <a href="${url}" style="display:inline-block;background:#00A651;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:8px;">View live post &rarr;</a>
        <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">${url}</p>
      </td></tr>
      <tr><td style="padding:18px 30px;border-top:1px solid #e5e7eb;background:#f8fafc;">
        <div style="font-size:11px;color:#94a3b8;">Silent SEO blog &middot; indexed in the sitemap, not linked in nav. Automated by the weekly blog routine.</div>
      </td></tr>
    </table>
  </td></tr></table>
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");

  const slug = process.env.POST_SLUG;
  if (!slug) {
    console.log("[blog-notify] no POST_SLUG, nothing to send");
    return;
  }
  const title = process.env.POST_TITLE || slug;
  const kw = process.env.POST_KEYWORD || "";
  const url = `${SITE_URL}/blog/${slug}`;
  console.log("[blog-notify] post:", slug, "->", url);

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `New blog live: ${title} · ${PROJECT_NAME}`,
      html: buildHtml({ title, kw, url }),
    }),
  });
  if (!res.ok) throw new Error(`resend failed: ${res.status}\n${await res.text()}`);
  console.log("[blog-notify] emailed", TO);
}

main().catch((err) => {
  console.error("[blog-notify] FATAL:", err);
  process.exit(1);
});
