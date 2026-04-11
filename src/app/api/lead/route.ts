import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { LeadFormData, LeadApiResponse } from "@/types";

/**
 * POST /api/lead
 *
 * Receives a contact-form submission, sends it to Ridge via Resend, and
 * BCCs the dev inbox so we can spot-check leads are arriving.
 *
 * Required env var:
 *   - RESEND_API_KEY  (set in Vercel project settings)
 *
 * Sender domain:
 *   - Sends from leads@updates.standoutexterior.com
 *     (subdomain must be verified in the Resend dashboard)
 */

const RESEND_FROM = "Stand Out Exterior Leads <leads@updates.standoutexterior.com>";
const LEAD_INBOX = "standoutexterior@gmail.com";
const DEV_BCC = "dev@ignacionunez.dev";

// Initialize Resend once at module load. If the env var is missing we still
// return a helpful 500 at request time instead of crashing at import.
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/** Escape a string for safe inclusion in HTML content (prevents HTML injection). */
function esc(v: string | undefined | null): string {
  if (!v) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Build the HTML lead notification email. */
function buildHtml(lead: LeadFormData) {
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  const received = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>New Lead — ${esc(fullName)}</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0A2E5C;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7fa;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(10,46,92,0.08);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0A2E5C 0%,#2B7DE9 100%);padding:24px 32px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.7;margin-bottom:4px;">New Lead · standoutexterior.com</div>
          <div style="font-size:22px;font-weight:800;letter-spacing:0.02em;">${esc(fullName) || "New Contact Form Submission"}</div>
          ${lead.service ? `<div style="font-size:14px;margin-top:6px;color:#7ecfff;">Interested in: <strong style="color:#ffffff;">${esc(lead.service)}</strong></div>` : ""}
        </td></tr>

        <!-- Contact info -->
        <tr><td style="padding:28px 32px 12px 32px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:12px;">Contact Info</div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;width:90px;vertical-align:top;">Name</td>
              <td style="padding:6px 0;font-size:14px;color:#0A2E5C;font-weight:600;">${esc(fullName) || "—"}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;vertical-align:top;">Email</td>
              <td style="padding:6px 0;font-size:14px;"><a href="mailto:${esc(lead.email)}" style="color:#2B7DE9;text-decoration:none;font-weight:600;">${esc(lead.email)}</a></td>
            </tr>
            ${lead.phone ? `<tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;vertical-align:top;">Phone</td>
              <td style="padding:6px 0;font-size:14px;"><a href="tel:${esc(lead.phone)}" style="color:#2B7DE9;text-decoration:none;font-weight:600;">${esc(lead.phone)}</a></td>
            </tr>` : ""}
            ${lead.address ? `<tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;vertical-align:top;">Address</td>
              <td style="padding:6px 0;font-size:14px;color:#0A2E5C;">${esc(lead.address)}</td>
            </tr>` : ""}
            ${lead.service ? `<tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;vertical-align:top;">Service</td>
              <td style="padding:6px 0;font-size:14px;color:#0A2E5C;font-weight:600;">${esc(lead.service)}</td>
            </tr>` : ""}
            ${lead.source ? `<tr>
              <td style="padding:6px 0;font-size:13px;color:#64748b;vertical-align:top;">Found Us Via</td>
              <td style="padding:6px 0;font-size:14px;color:#00A651;font-weight:700;">${esc(lead.source)}</td>
            </tr>` : ""}
          </table>
        </td></tr>

        ${lead.message ? `<!-- Message -->
        <tr><td style="padding:12px 32px 8px 32px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">Message</div>
          <div style="font-size:14px;line-height:1.7;color:#1f2937;background:#f8fafc;border-left:3px solid #00A651;padding:14px 18px;border-radius:6px;white-space:pre-wrap;">${esc(lead.message)}</div>
        </td></tr>` : ""}

        <!-- Quick actions -->
        <tr><td style="padding:20px 32px 24px 32px;">
          <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#2B7DE9;font-weight:700;margin-bottom:10px;">Quick Actions</div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${lead.phone ? `<td style="padding-right:8px;"><a href="tel:${esc(lead.phone)}" style="display:inline-block;background:#00A651;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:10px 18px;border-radius:999px;">Call ${esc(lead.phone)}</a></td>` : ""}
              <td><a href="mailto:${esc(lead.email)}" style="display:inline-block;background:#2B7DE9;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:10px 18px;border-radius:999px;">Reply by Email</a></td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:16px 32px 24px 32px;border-top:1px solid #e5e7eb;">
          <div style="font-size:11px;color:#94a3b8;">Received ${esc(received)} · standoutexterior.com</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Simple plain-text fallback for email clients that don't render HTML. */
function buildText(lead: LeadFormData) {
  const fullName = `${lead.firstName} ${lead.lastName}`.trim();
  const lines = [
    `New lead from standoutexterior.com`,
    ``,
    `Name:    ${fullName}`,
    `Email:   ${lead.email}`,
  ];
  if (lead.phone) lines.push(`Phone:   ${lead.phone}`);
  if (lead.address) lines.push(`Address: ${lead.address}`);
  if (lead.service) lines.push(`Service: ${lead.service}`);
  if (lead.source) lines.push(`Source:  ${lead.source}`);
  if (lead.message) {
    lines.push(``, `Message:`, lead.message);
  }
  lines.push(``, `Received ${new Date().toISOString()}`);
  return lines.join("\n");
}

export async function POST(request: Request) {
  try {
    // Parse body. We accept an optional "company" honeypot field — real users
    // won't see or fill it; bots happily will. Any non-empty value = discard silently.
    const body = (await request.json()) as LeadFormData & { company?: string };

    if (body.company && body.company.trim() !== "") {
      // Honeypot tripped — pretend success so bots don't learn they were caught.
      return NextResponse.json<LeadApiResponse>({
        success: true,
        message: "Thanks! We'll be in touch shortly.",
      });
    }

    // Minimum validation
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json<LeadApiResponse>(
        { success: false, message: "First name, last name, and email are required." },
        { status: 400 },
      );
    }

    // Log for Vercel logs — last-resort backup so no lead is ever fully lost
    console.log("[lead] new submission", {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      service: body.service,
      source: body.source,
      timestamp: new Date().toISOString(),
    });

    // If Resend isn't configured, surface a clear error instead of silently 200ing
    if (!resend) {
      console.error("[lead] RESEND_API_KEY is not set — email NOT sent");
      return NextResponse.json<LeadApiResponse>(
        {
          success: false,
          message:
            "Email delivery is not configured yet. Please call us directly or try again shortly.",
        },
        { status: 500 },
      );
    }

    const subject = `New Lead — ${body.firstName} ${body.lastName}${body.service ? " · " + body.service : ""}`;

    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [LEAD_INBOX],
      bcc: [DEV_BCC],
      replyTo: body.email,
      subject,
      html: buildHtml(body),
      text: buildText(body),
    });

    if (error) {
      console.error("[lead] resend error", error);
      return NextResponse.json<LeadApiResponse>(
        {
          success: false,
          message:
            "We couldn't deliver your message. Please call 704-917-9649 or try again shortly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json<LeadApiResponse>({
      success: true,
      message: "Thank you! We'll get back to you shortly.",
    });
  } catch (err) {
    console.error("[lead] unexpected error", err);
    return NextResponse.json<LeadApiResponse>(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
