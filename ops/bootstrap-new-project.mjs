#!/usr/bin/env node
/**
 * Bootstrap a new Next.js project with the full ops automation stack.
 *
 * Copies the CI workflow, Renovate config, Lighthouse config, and
 * uptime-monitor script from this source repo into a target repo,
 * with per-project placeholders pre-filled via interactive prompts.
 *
 * Usage:
 *   cd path/to/new-project
 *   node ../standoutexterior-next/ops/bootstrap-new-project.mjs
 *
 * Or from anywhere with a --target flag:
 *   node ops/bootstrap-new-project.mjs --target D:/newclient-next
 *
 * What this does NOT do — manual steps that still need you:
 *   1. Add RESEND_API_KEY to the new repo's GitHub secrets.
 *   2. Install the Renovate GitHub App on the new repo.
 *   3. Run `BETTER_STACK_TOKEN=xxxx node scripts/setup-uptime-monitor.mjs`
 *      in the new project to provision uptime monitors.
 *
 * The script prints these steps at the end as a checklist.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = join(__dirname, "..");

// Parse args
const args = process.argv.slice(2);
const targetFlag = args.findIndex((a) => a === "--target");
const targetDir =
  targetFlag !== -1 ? args[targetFlag + 1] : process.cwd();

if (!existsSync(join(targetDir, "package.json"))) {
  console.error(`[bootstrap] ${targetDir} doesn't look like a Node project (no package.json).`);
  process.exit(1);
}

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, fallback) =>
  rl.question(`${q}${fallback ? ` [${fallback}]` : ""}: `).then((ans) => ans.trim() || fallback || "");

console.log(`\n┌─────────────────────────────────────────────────────────┐`);
console.log(`│  Bootstrapping ops automation for new project            │`);
console.log(`│  Target: ${targetDir.padEnd(48)}│`);
console.log(`└─────────────────────────────────────────────────────────┘\n`);

// ── Prompt for per-project values ────────────────────────────────────
const targetPkg = JSON.parse(readFileSync(join(targetDir, "package.json"), "utf-8"));
const defaultName = targetPkg.name || "new-project";

const projectName = await ask("Project name (shown in digest emails)", defaultName);
const prodUrl = await ask("Production URL (no trailing slash)", "https://example.com");
const emailSenderDomain = await ask(
  "Resend sender domain (must be verified in Resend)",
  "updates.example.com",
);
const alertsTo = await ask("Alerts email", "dev@ignacionunez.dev");

// URLs to audit — start with a sensible default list for a marketing site
const defaultUrls = [
  "/",
  "/services",
  "/contact",
  "/about",
].map((p) => `${prodUrl}${p}`);

console.log("\nDefault Lighthouse audit URLs:");
defaultUrls.forEach((u) => console.log("  " + u));
const customize = await ask("Customize URL list? (y/N)", "n");
let urls = defaultUrls;
if (customize.toLowerCase() === "y") {
  console.log("Enter one URL per line, blank line to finish:");
  urls = [];
  while (true) {
    const u = await ask("URL", "");
    if (!u) break;
    urls.push(u);
  }
}

rl.close();

// ── 1. Copy .github/ directory ───────────────────────────────────────
const ghSrc = join(SOURCE_ROOT, ".github");
const ghDst = join(targetDir, ".github");
mkdirSync(join(ghDst, "workflows"), { recursive: true });
mkdirSync(join(ghDst, "scripts"), { recursive: true });

copyFileSync(join(ghSrc, "workflows", "ci.yml"), join(ghDst, "workflows", "ci.yml"));
copyFileSync(join(ghSrc, "workflows", "lighthouse-weekly.yml"), join(ghDst, "workflows", "lighthouse-weekly.yml"));
console.log(`[bootstrap] copied .github/workflows/`);

// Lighthouse digest script — find/replace the per-project constants
let digestSrc = readFileSync(join(ghSrc, "scripts", "lighthouse-digest.mjs"), "utf-8");
digestSrc = digestSrc
  .replace(/const FROM = "[^"]+";/, `const FROM = "${projectName} Ops <ops@${emailSenderDomain}>";`)
  .replace(/const TO = "[^"]+";/, `const TO = "${alertsTo}";`)
  .replace(/const PROJECT_NAME = "[^"]+";/, `const PROJECT_NAME = "${projectName}";`)
  .replace(/const PRODUCTION_URL = "[^"]+";/, `const PRODUCTION_URL = "${prodUrl}";`);
writeFileSync(join(ghDst, "scripts", "lighthouse-digest.mjs"), digestSrc);
console.log(`[bootstrap] wrote .github/scripts/lighthouse-digest.mjs`);

// ── 2. Copy + customize .lighthouserc.json ───────────────────────────
const lhRc = {
  ci: {
    collect: {
      url: urls,
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
        chromeFlags: "--no-sandbox --disable-gpu --headless=new",
      },
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "uses-responsive-images": "off",
        "csp-xss": "off",
        "unused-javascript": "off",
        "total-byte-weight": "off",
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
writeFileSync(join(targetDir, ".lighthouserc.json"), JSON.stringify(lhRc, null, 2) + "\n");
console.log(`[bootstrap] wrote .lighthouserc.json (${urls.length} URLs)`);

// ── 3. Copy renovate.json ────────────────────────────────────────────
copyFileSync(join(SOURCE_ROOT, "renovate.json"), join(targetDir, "renovate.json"));
console.log(`[bootstrap] copied renovate.json`);

// ── 4. Copy + customize uptime setup script ──────────────────────────
let uptimeSrc = readFileSync(join(SOURCE_ROOT, "scripts", "setup-uptime-monitor.mjs"), "utf-8");
uptimeSrc = uptimeSrc
  .replace(/const PROJECT = "[^"]+";/, `const PROJECT = "${projectName}";`)
  // Replace the MONITORS array with default entries pointing at the new domain
  .replace(
    /const MONITORS = \[[\s\S]*?\];/,
    `const MONITORS = [
  {
    url: "${prodUrl}/",
    pronounceable_name: \`\${PROJECT} · home\`,
    check_frequency: 180,
  },
  {
    url: "${prodUrl}/contact",
    pronounceable_name: \`\${PROJECT} · contact\`,
    check_frequency: 300,
  },
  {
    url: "${prodUrl}/sitemap.xml",
    pronounceable_name: \`\${PROJECT} · sitemap\`,
    check_frequency: 600,
  },
];`,
  );
mkdirSync(join(targetDir, "scripts"), { recursive: true });
writeFileSync(join(targetDir, "scripts", "setup-uptime-monitor.mjs"), uptimeSrc);
console.log(`[bootstrap] wrote scripts/setup-uptime-monitor.mjs`);

// ── Finish ───────────────────────────────────────────────────────────
console.log(`
┌─────────────────────────────────────────────────────────┐
│  Done — files written. Manual follow-ups:               │
└─────────────────────────────────────────────────────────┘

  1. Add Resend API key to the repo's GitHub secrets:
     Settings → Secrets and variables → Actions → New repository secret
     Name:  RESEND_API_KEY
     Value: (paste your Resend API key)

  2. Verify ${emailSenderDomain} in Resend:
     https://resend.com/domains

  3. Install Renovate on the repo:
     https://github.com/apps/renovate

  4. Provision uptime monitors:
     cd ${targetDir}
     BETTER_STACK_TOKEN=xxxxx node scripts/setup-uptime-monitor.mjs

  5. Commit + push:
     git add .github renovate.json .lighthouserc.json scripts/setup-uptime-monitor.mjs
     git commit -m "chore: add ops automation (CI + Renovate + Lighthouse + uptime)"
     git push

  First CI run:      on your next PR
  First LH digest:   next Monday 10:30 UTC
  Uptime alerts:     immediate once step 4 runs
`);
