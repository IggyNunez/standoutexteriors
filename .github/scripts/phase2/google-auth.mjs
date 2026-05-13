/**
 * Shared Google OAuth2 helper for Phase 2 cron jobs.
 *
 * Uses a long-lived refresh token (stored in GitHub secrets) to mint
 * short-lived access tokens on demand. This is the standard "offline
 * access" pattern for server-to-server access to a user's own Google
 * data.
 *
 * One-time setup (see ops/README.md):
 *   1. Create Google Cloud project + OAuth consent screen
 *   2. Create OAuth 2.0 Client ID (type: Desktop)
 *   3. Run scripts/phase2/setup-google-oauth.mjs locally — it opens
 *      a browser, you click "Authorize", script prints a refresh token
 *   4. Save client ID, secret, and refresh token as GitHub secrets:
 *        GOOGLE_OAUTH_CLIENT_ID
 *        GOOGLE_OAUTH_CLIENT_SECRET
 *        GOOGLE_OAUTH_REFRESH_TOKEN
 *
 * The refresh token doesn't expire as long as you use it every 6
 * months. Our cron runs weekly so that's never a concern.
 */

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

/**
 * Exchange the stored refresh token for a fresh access token.
 * Call once at the start of each cron run and reuse the returned
 * token for all subsequent API calls in that run (access tokens
 * are valid for ~1 hour, plenty for a cron job).
 */
export async function getAccessToken() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Google OAuth env vars. Required: GOOGLE_OAUTH_CLIENT_ID, " +
        "GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN. See " +
        ".github/scripts/phase2/setup-google-oauth.mjs for first-time setup.",
    );
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token refresh failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

/**
 * Thin wrapper around fetch() that auto-injects the access token.
 * Use for any Google API call that needs Authorization: Bearer.
 */
export async function googleFetch(url, { accessToken, method = "GET", body = null } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${url} → ${res.status}\n${text}`);
  }
  return text ? JSON.parse(text) : null;
}
