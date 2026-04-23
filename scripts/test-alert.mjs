/**
 * End-to-end uptime-alert test.
 *
 * Creates a throwaway Better Stack monitor pointing at a URL we KNOW
 * will 404, confirms the monitor is registered, and prints exactly
 * what you should see next:
 *
 *   - Within 30-60 seconds, Better Stack's first check runs and sees 404
 *   - Within ~3 minutes, you receive the downtime alert email
 *
 * Then re-run the same script with --cleanup to delete the test
 * monitor, which should fire a "recovered" email.
 *
 * Usage:
 *   $env:BETTER_STACK_TOKEN = "xxxxx"
 *   node scripts/test-alert.mjs             # create test monitor
 *   node scripts/test-alert.mjs --cleanup   # delete test monitor
 */

const TOKEN = process.env.BETTER_STACK_TOKEN;
if (!TOKEN) {
  console.error("Missing BETTER_STACK_TOKEN env var.");
  console.error('PowerShell:  $env:BETTER_STACK_TOKEN = "xxxxx"');
  console.error("Bash:        BETTER_STACK_TOKEN=xxxxx node scripts/test-alert.mjs");
  process.exit(1);
}

const API = "https://uptime.betterstack.com/api/v2";

// URL that's guaranteed to 404 — Vercel returns our custom 404 page here
// (still counts as HTTP 404 from Better Stack's perspective).
const TEST_URL = "https://www.standoutexterior.com/__better-stack-alert-test__";
const TEST_NAME = "TEST · delete me · alert verification";

const CLEANUP = process.argv.includes("--cleanup");

async function api(method, pathname, body) {
  const res = await fetch(`${API}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${pathname} → ${res.status}\n${text}`);
  return text ? JSON.parse(text) : null;
}

async function findTestMonitor() {
  const { data } = await api("GET", "/monitors?per_page=50");
  return data.find((m) => m.attributes.url === TEST_URL);
}

if (CLEANUP) {
  console.log("[test-alert] looking for existing test monitor…");
  const existing = await findTestMonitor();
  if (!existing) {
    console.log("[test-alert] no test monitor found. Nothing to clean up.");
    process.exit(0);
  }
  await api("DELETE", `/monitors/${existing.id}`);
  console.log(`[test-alert] deleted test monitor ${existing.id}`);
  console.log("");
  console.log("Expected behavior:");
  console.log("  - Within ~1 minute, Better Stack stops checking.");
  console.log("  - No 'recovered' email (there's nothing to recover; monitor is gone).");
  console.log("");
  console.log("If you instead want to see the 'recovered' email, skip --cleanup");
  console.log("and manually edit the monitor URL in the dashboard to a real");
  console.log("working URL (like https://www.standoutexterior.com/). Better Stack");
  console.log("will then see 200 and send the 'recovered' notification.");
  process.exit(0);
}

// ── Create ────────────────────────────────────────────────────────────
console.log("[test-alert] checking for existing test monitor…");
const existing = await findTestMonitor();
if (existing) {
  console.log(`[test-alert] test monitor already exists (id=${existing.id})`);
  console.log(`[test-alert] URL: ${existing.attributes.url}`);
  console.log(`[test-alert] status: ${existing.attributes.status}`);
  console.log("");
  console.log("If an alert already fired, check dev@ignacionunez.dev.");
  console.log("To clean up: node scripts/test-alert.mjs --cleanup");
  process.exit(0);
}

console.log(`[test-alert] creating test monitor for ${TEST_URL}…`);
const { data } = await api("POST", "/monitors", {
  monitor_type: "status",
  url: TEST_URL,
  pronounceable_name: TEST_NAME,
  check_frequency: 30, // 30 seconds — fastest alert feedback
  request_timeout: 15,
  follow_redirects: true,
  email: true,
  push: false,
  call: false,
  sms: false,
});

console.log(`[test-alert] created monitor id=${data.id}`);
console.log("");
console.log("Expected behavior (watch dev@ignacionunez.dev):");
console.log("  ~30s  Better Stack first check → 404 detected");
console.log("  ~60s  Second check confirms failure");
console.log("  ~90s  Email alert sent (subject: 'Incident started')");
console.log("");
console.log("If you don't get the email in 5 minutes:");
console.log("  1. Check spam / promotions folder.");
console.log("  2. Verify the notification email in Better Stack settings.");
console.log("");
console.log("Once you've confirmed the alert arrived, clean up with:");
console.log("  node scripts/test-alert.mjs --cleanup");
