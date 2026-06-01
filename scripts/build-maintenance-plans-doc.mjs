/**
 * Generates the Stand Out Exterior Maintenance Plans proposal as a .docx.
 *
 * Styling matches the brand: navy #0A2E5C for primary headings, orange
 * #C2410C for the pricing tier labels, black body, Arial throughout.
 * Tables use navy header rows + light blue cell backgrounds for the
 * pricing summary. The document is laid out as a professional one-pager
 * proposal on US Letter with 1" margins so it prints cleanly.
 *
 * Run with: node scripts/build-maintenance-plans-doc.mjs
 */
import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  LevelFormat,
  BorderStyle,
  PageOrientation,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  VerticalAlign,
} from "docx";

// ── Brand palette ─────────────────────────────────────────────────────
const NAVY = "0A2E5C";
const ORANGE = "C2410C";
const GREEN = "00A651";
const GRAY_TEXT = "374151";
const GRAY_LIGHT = "6B7280";
const GRAY_BORDER = "E5E7EB";
const CREAM = "FFF8EE";
const LIGHT_NAVY_FILL = "EEF3FA";

// ── Helpers ───────────────────────────────────────────────────────────
/** Body paragraph (12pt Arial, dark gray, tight line spacing). */
const p = (text, opts = {}) =>
  new Paragraph({
    spacing: { before: 60, after: 60, line: 300 },
    children: [new TextRun({ text, size: 22, color: GRAY_TEXT, ...opts })],
  });

/** Bullet list item. */
const bullet = (runs) =>
  new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40, line: 280 },
    children: Array.isArray(runs) ? runs : [runs],
  });

const bulletText = (text) =>
  bullet(new TextRun({ text, size: 22, color: GRAY_TEXT }));

/** Bold label + plain description for a bullet (e.g. "**Hosting.** fast…"). */
const bulletLabelled = (label, rest) =>
  bullet([
    new TextRun({ text: label, bold: true, size: 22, color: NAVY }),
    new TextRun({ text: " " + rest, size: 22, color: GRAY_TEXT }),
  ]);

/** Section heading (Heading 2 - navy, bold). */
const h2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 160 },
    children: [new TextRun({ text, bold: true, size: 28, color: NAVY })],
  });

/** Sub-heading inside a plan (smaller, orange accent). */
const h3 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, color: ORANGE })],
  });

/** Plan title with price (e.g. "Essentials — $49/month"). */
const planTitle = (name, price) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 420, after: 120 },
    children: [
      new TextRun({ text: name, bold: true, size: 40, color: NAVY }),
      new TextRun({ text: "  ", size: 40 }),
      new TextRun({ text: price, bold: true, size: 40, color: ORANGE }),
    ],
  });

/** Italic tagline under the plan title. */
const planTagline = (text) =>
  new Paragraph({
    spacing: { before: 0, after: 200, line: 280 },
    children: [
      new TextRun({ text, italics: true, size: 22, color: GRAY_LIGHT }),
    ],
  });

/** Thin horizontal rule (via a bottom-bordered empty paragraph). */
const hr = () =>
  new Paragraph({
    spacing: { before: 240, after: 240 },
    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: ORANGE,
        space: 1,
      },
    },
    children: [new TextRun("")],
  });

/** Small empty spacer. */
const spacer = (after = 200) =>
  new Paragraph({ spacing: { before: 0, after }, children: [new TextRun("")] });

// ── Content ───────────────────────────────────────────────────────────

const children = [
  // ─── Header block ───────────────────────────────────────────────
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: "Stand Out Exterior Cleaning LLC",
        bold: true,
        size: 20,
        color: NAVY,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 0 },
    children: [
      new TextRun({
        text: "Website Maintenance & Support Plans",
        size: 18,
        color: GRAY_LIGHT,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: "Prepared for Ridge Curwood",
        size: 18,
        color: GRAY_LIGHT,
      }),
    ],
  }),
  hr(),

  // ─── Opening ───────────────────────────────────────────────────
  p("Hi Ridge,"),
  p(
    "Wanted to walk you through the two ongoing support options we're moving to for the site going forward. Both are month-to-month, no contract, cancel anytime.",
  ),

  // ─── Essentials plan ───────────────────────────────────────────
  planTitle("Essentials", "$49 / month"),
  planTagline("Keeps the lights on and the site current."),
  bulletText("Website hosting on Vercel (fast, global, 99.99% uptime)"),
  bulletText("SSL certificate and domain renewal handling"),
  bulletText("Next.js framework and dependency updates"),
  bulletText("Security patches as they're released"),
  bulletText("Quarterly backup verification"),
  bulletLabelled(
    "Transactional email delivery.",
    "Every submission from your contact form is delivered straight to your inbox through a dedicated sender (leads@updates.standoutexterior.com) with bot and spam protection already in place. Up to 3,000 emails per month included.",
  ),
  bulletText("Email support with 2-business-day response"),

  // ─── Growth plan ───────────────────────────────────────────────
  planTitle("Growth", "$79 / month"),
  planTagline(
    "Everything in Essentials, plus active monthly work to keep you ranking on Google and converting visitors into calls.",
  ),

  h3("Local search & visibility"),
  bulletLabelled(
    "Google Maps listing upkeep.",
    "I'll publish 2 to 4 updates per month to your Google Business Profile (new jobs, seasonal promos, recent reviews, before and after photos). Active listings rank higher on \u201Cpressure washing near me\u201D searches, and most of your competitors don't do this.",
  ),
  bulletLabelled(
    "Business-listing audit.",
    "Every month I'll check that your business name, address, and phone number are spelled consistently across Google, Yelp, Facebook, Nextdoor, Apple Maps, Bing, Angi, and the BBB. Google penalizes inconsistent listings, and they drift over time as directories auto-update from scraped data.",
  ),
  bulletLabelled(
    "Monthly Search Console report.",
    "I'll pull your traffic data, write a short summary (what's ranking, what's slipping, which keywords are growing), and send it to you by the 5th of each month.",
  ),
  bulletLabelled(
    "Keyword tracking.",
    "I watch your position on the searches that actually bring in money: \u201Cpressure washing Denver NC,\u201D \u201Croof cleaning Lake Norman,\u201D \u201CChristmas light installation Mooresville,\u201D and so on, so we know what's working.",
  ),
  bulletLabelled(
    "On-page tune-ups.",
    "Titles, descriptions, and page structure adjusted based on what's actually converting.",
  ),
  bulletLabelled(
    "AI search optimization.",
    "I'll keep your site's llms.txt file current so when someone asks ChatGPT or Perplexity \u201Cwho does pressure washing in Denver NC,\u201D your business is one of the answers.",
  ),
  bulletLabelled(
    "Structured data upkeep.",
    "The behind-the-scenes code that tells Google about your services, service area, and hours. It gets added automatically when I add pages or services, so it's always current.",
  ),

  h3("Customer email & outreach"),
  bulletLabelled(
    "50,000 emails per month included.",
    "That's enough headroom to run real campaigns (seasonal promos, follow-ups, reminders) without ever touching a Mailchimp or Constant Contact bill. Sent through the same Resend infrastructure the contact form uses, from leads@updates.standoutexterior.com for deliverability.",
  ),
  bulletLabelled(
    "Branded email templates.",
    "Up to 2 custom-designed templates per month in your navy-and-orange palette (monthly newsletter, seasonal promo, booking confirmation, post-service thank-you, review request, etc.). You send me the copy; I build the template and schedule the send.",
  ),
  bulletLabelled(
    "Spam protection and domain reputation.",
    "SPF, DKIM, and DMARC records on your sender domain are monitored and kept current so emails land in the inbox, not the promotions tab or spam folder.",
  ),
  bulletLabelled(
    "Lead-form bot filtering.",
    "Incoming contact submissions are scored for spam (disposable email domains, cold-pitch phrases, non-local phone numbers, etc.). Real leads land in your main inbox; suspicious ones are quarantined separately so they never clutter your pipeline.",
  ),
  bulletLabelled(
    "Bounce and unsubscribe handling.",
    "Hard bounces are removed from your list automatically so you don't accumulate dead addresses that hurt deliverability. Unsubscribe links are built into every template for CAN-SPAM compliance.",
  ),

  h3("Content & conversions"),
  bulletText(
    "Up to 3 new landing pages per month (service areas, seasonal campaigns, new offerings)",
  ),
  bulletText("Unlimited copy and design edits to existing pages"),
  bulletText("New before and after photos and reviews added as you send them"),
  bulletText(
    "Seasonal banner and CTA swaps (Christmas lights bookings, spring roof cleaning season, etc.)",
  ),

  h3("Technical"),
  bulletText("PageSpeed monitoring with optimizations as needed"),
  bulletText("Broken link monitoring"),
  bulletText("Form submission testing monthly"),
  bulletText("Priority email support with same-day response"),

  // ─── What's not included ───────────────────────────────────────
  h2("What's not included in either plan"),
  bulletText("Major redesigns or full rebuilds (quoted separately)"),
  bulletText(
    "Third-party integration setup (CRM, booking systems, payment processors)",
  ),
  bulletText("Paid ad management (Google Ads, Meta Ads)"),
  bulletText("Custom development beyond content and SEO work"),

  // ─── Getting started ───────────────────────────────────────────
  h2("Getting started"),
  p(
    "Reply with which plan you'd like and I'll send an invoice link. First month is prorated to the start of the next calendar month, so whatever you pick today you'll only pay the partial month plus the next full one up front.",
  ),
  p("Happy to hop on a quick call if it's easier to talk through."),

  spacer(200),
  new Paragraph({
    spacing: { before: 120, after: 60 },
    children: [new TextRun({ text: "Thanks,", size: 22, color: GRAY_TEXT })],
  }),
  new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        text: "Ignacio Nunez",
        bold: true,
        size: 22,
        color: NAVY,
      }),
    ],
  }),
];

// ── Document setup ────────────────────────────────────────────────────
const doc = new Document({
  creator: "Ignacio Nunez",
  title: "Stand Out Exterior Maintenance Plans",
  description: "Website maintenance and support proposal for Ridge Curwood",

  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 40, bold: true, font: "Arial", color: NAVY },
        paragraph: {
          spacing: { before: 420, after: 120 },
          outlineLevel: 0,
        },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: NAVY },
        paragraph: {
          spacing: { before: 360, after: 160 },
          outlineLevel: 1,
        },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: ORANGE },
        paragraph: {
          spacing: { before: 240, after: 100 },
          outlineLevel: 2,
        },
      },
    ],
  },

  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 540, hanging: 270 } },
            },
          },
        ],
      },
    ],
  },

  sections: [
    {
      properties: {
        page: {
          size: {
            width: 12240, // US Letter
            height: 15840,
          },
          margin: {
            top: 1080, // 0.75 inch
            right: 1440,
            bottom: 1080,
            left: 1440,
          },
        },
      },
      children,
    },
  ],
});

const outPath = path.resolve(
  "D:/standoutexterior-next/Stand-Out-Exterior-Maintenance-Plans.docx",
);
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  const kb = (buffer.length / 1024).toFixed(1);
  console.log(`wrote ${outPath} (${kb} KB)`);
});
