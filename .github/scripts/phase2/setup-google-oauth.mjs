#!/usr/bin/env node
/**
 * One-time script to generate a Google OAuth refresh token for the
 * automation stack. Run it ONCE per project on your laptop, save the
 * printed refresh token to GitHub secrets, and never think about it
 * again. Refresh tokens don't expire as long as they're used within
 * a 6-month window, and our crons run weekly.
 *
 * Prereqs (5 min, one-time per Google account):
 *   1. Create a Google Cloud project at console.cloud.google.com
 *   2. Enable APIs:
 *        - Search Console API (webmasters.googleapis.com)
 *        - My Business Business Information API
 *        - My Business Account Management API
 *   3. OAuth consent screen:
 *        - User type: External
 *        - Publishing status: Testing (don't submit for verification)
 *        - Add yourself (the Google account that owns the client data)
 *          as a test user
 *   4. Credentials → Create Credentials → OAuth client ID
 *        - Application type: Desktop app
 *        - Name: "automation-stack"
 *      Copy the client ID and client secret.
 *
 * Usage:
 *   GOOGLE_OAUTH_CLIENT_ID=xxx.apps.googleusercontent.com \
 *   GOOGLE_OAUTH_CLIENT_SECRET=xxx \
 *   node .github/scripts/phase2/setup-google-oauth.mjs
 *
 * The script will:
 *   1. Print a URL for you to open in your browser
 *   2. You sign in with the Google account that owns GSC/GBP
 *   3. You approve the scopes
 *   4. Google redirects to a localhost server this script is running
 *   5. Script exchanges the auth code for a refresh token
 *   6. Script prints the refresh token — copy and save to GitHub secrets
 *
 * After this, set three secrets on EVERY repo that uses the Phase 2
 * automation:
 *     GOOGLE_OAUTH_CLIENT_ID
 *     GOOGLE_OAUTH_CLIENT_SECRET
 *     GOOGLE_OAUTH_REFRESH_TOKEN
 */

import { createServer } from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET.\n\n" +
      "Example:\n" +
      '  $env:GOOGLE_OAUTH_CLIENT_ID = "xxx.apps.googleusercontent.com"\n' +
      '  $env:GOOGLE_OAUTH_CLIENT_SECRET = "xxx"\n' +
      "  node .github/scripts/phase2/setup-google-oauth.mjs\n",
  );
  process.exit(1);
}

const PORT = 53199; // arbitrary high port; must match redirect_uri in OAuth client config
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

// Scopes we need for the automation:
//   - webmasters.readonly: read GSC search analytics
//   - business.manage: read GBP insights (yes, "manage" is read+write
//     scope; Google hasn't split it into read-only yet)
const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/business.manage",
].join(" ");

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPES);
// `access_type=offline` + `prompt=consent` is what forces Google to
// return a refresh token (they only mint it on first consent).
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

function openBrowser(url) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd);
}

async function exchangeCodeForToken(code) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`token exchange failed: ${res.status}\n${text}`);
  }
  return res.json();
}

console.log("\n┌─────────────────────────────────────────────────────────┐");
console.log("│  Google OAuth refresh-token generator                     │");
console.log("└─────────────────────────────────────────────────────────┘\n");

console.log("1. Starting local callback server on port", PORT);
console.log("2. Opening your browser to Google consent screen…");
console.log("   (if it doesn't open automatically, paste this URL):\n");
console.log(`   ${authUrl.toString()}\n`);

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404);
    res.end();
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `<h1>OAuth error: ${error}</h1><p>You can close this tab.</p>`,
    );
    console.error("\n[oauth] authorization denied:", error);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400);
    res.end("missing code");
    return;
  }

  try {
    const tokens = await exchangeCodeForToken(code);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h1 style="font-family:system-ui;color:#0A2E5C;">Done — you can close this tab.</h1>
      <p style="font-family:system-ui;color:#6B7280;">Refresh token written to your terminal.</p>
    `);

    console.log("\n┌─────────────────────────────────────────────────────────┐");
    console.log("│  Success — save these three values to GitHub secrets     │");
    console.log("└─────────────────────────────────────────────────────────┘\n");
    console.log(`  GOOGLE_OAUTH_CLIENT_ID       ${CLIENT_ID}`);
    console.log(`  GOOGLE_OAUTH_CLIENT_SECRET   ${CLIENT_SECRET}`);
    console.log(`  GOOGLE_OAUTH_REFRESH_TOKEN   ${tokens.refresh_token}`);
    console.log("\nAdd them at:");
    console.log(
      "  https://github.com/IggyNunez/standoutexteriors/settings/secrets/actions\n",
    );
    console.log(
      "After that the weekly crons can read GSC data on your behalf forever.\n",
    );

    server.close();
  } catch (err) {
    res.writeHead(500);
    res.end(`error: ${err.message}`);
    console.error("\n[oauth] token exchange failed:", err.message);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  openBrowser(authUrl.toString());
});
