/**
 * One-shot script to provision Better Stack uptime monitors for this
 * project via their API. Safe to re-run — skips any monitor that
 * already exists with a matching URL.
 *
 * Better Stack free tier: 10 monitors, 3-minute check interval,
 * unlimited email alerts. Plenty for a handful of client sites.
 *
 * Prereqs (5 minutes, one-time):
 *   1. Sign up at https://betterstack.com (free).
 *   2. Dashboard → Monitors → API tokens → "Create token". Copy it.
 *   3. Run:  BETTER_STACK_TOKEN=xxxxx node scripts/setup-uptime-monitor.mjs
 *
 * Alerts go to whatever email you signed up with. Change your
 * notification channel in Better Stack's dashboard under
 * "On-call → Escalation policies".
 */

const TOKEN = process.env.BETTER_STACK_TOKEN;
if (!TOKEN) {
  console.error("Missing BETTER_STACK_TOKEN env var.");
  console.error("Get one at https://betterstack.com → Monitors → API tokens.");
  process.exit(1);
}

const API = "https://uptime.betterstack.com/api/v2";
const PROJECT = "standoutexterior-next";

/** Monitors to provision. Keep the list short — free tier caps at 10. */
const MONITORS = [
  {
    url: "https://www.standoutexterior.com/",
    pronounceable_name: `${PROJECT} · home`,
    check_frequency: 180, // seconds — 3 min is the free-tier minimum
  },
  {
    url: "https://www.standoutexterior.com/services",
    pronounceable_name: `${PROJECT} · services index`,
    check_frequency: 300,
  },
  {
    url: "https://www.standoutexterior.com/contact",
    pronounceable_name: `${PROJECT} · contact`,
    check_frequency: 300,
  },
  {
    url: "https://www.standoutexterior.com/sitemap.xml",
    pronounceable_name: `${PROJECT} · sitemap`,
    check_frequency: 600, // 10 min, sitemap doesn't need tight monitoring
  },
];

async function apiCall(method, pathname, body) {
  const res = await fetch(`${API}${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${pathname} → ${res.status}\n${text}`);
  }
  return text ? JSON.parse(text) : null;
}

async function listExisting() {
  const { data } = await apiCall("GET", "/monitors?per_page=50");
  return data.map((m) => ({
    id: m.id,
    url: m.attributes.url,
  }));
}

async function createMonitor(cfg) {
  return apiCall("POST", "/monitors", {
    monitor_type: "status",
    url: cfg.url,
    pronounceable_name: cfg.pronounceable_name,
    check_frequency: cfg.check_frequency,
    request_timeout: 15,
    follow_redirects: true,
    email: true,
    push: true,
    call: false,
    sms: false,
  });
}

async function main() {
  console.log(`[uptime] fetching existing monitors…`);
  const existing = await listExisting();
  const existingUrls = new Set(existing.map((m) => m.url));

  for (const cfg of MONITORS) {
    if (existingUrls.has(cfg.url)) {
      console.log(`[uptime] skip (exists): ${cfg.url}`);
      continue;
    }
    try {
      await createMonitor(cfg);
      console.log(`[uptime] created: ${cfg.url}`);
    } catch (err) {
      console.error(`[uptime] failed for ${cfg.url}:`, err.message);
    }
  }
  console.log(`[uptime] done. Check https://uptime.betterstack.com/monitors`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
