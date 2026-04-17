import { NextResponse, type NextRequest } from "next/server";

/**
 * Return HTTP 410 Gone for known-dead WordPress legacy paths.
 *
 * Why 410 instead of 404:
 *   - 404 tells Google "maybe try again later."
 *   - 410 tells Google "permanently gone, drop it from the index."
 * This resolves the GSC "Not found (404)" and "Blocked due to access
 * forbidden (403)" reports that are caused by Google still probing
 * the old WordPress install's legacy URLs.
 *
 * Paths covered:
 *   /wp-admin/*, /wp-login.php, /xmlrpc.php, /wp-content/*
 *   /feed, /feed/*, /comments/feed/*
 *   /sitemap_index.xml, /wp-sitemap.xml, /sitemap-*.xml (Yoast/WP defaults)
 *   /?p=N  (old WP post permalink query)
 */
const GONE_PATTERNS: RegExp[] = [
  /^\/wp-admin(\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/wp-content(\/|$)/i,
  /^\/wp-includes(\/|$)/i,
  /^\/wp-json(\/|$)/i,
  /^\/feed\/?$/i,
  /^\/comments\/feed\/?$/i,
  /^\/.+\/feed\/?$/i,
  /^\/sitemap_index\.xml$/i,
  /^\/wp-sitemap\.xml$/i,
  /^\/sitemap-[\w-]+\.xml$/i,
  /^\/page-sitemap\.xml$/i,
  /^\/post-sitemap\.xml$/i,
  /^\/category-sitemap\.xml$/i,
  /^\/author\/.+/i,
  /^\/tag\/.+/i,
  /^\/category\/.+/i,
  /^\/\d{4}\/\d{2}\/?.*/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const pattern of GONE_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse(
        `<!doctype html><html><head><title>410 Gone</title><meta name="robots" content="noindex"></head><body><h1>410 Gone</h1><p>This URL is permanently gone. Please visit <a href="https://www.standoutexterior.com/">standoutexterior.com</a>.</p></body></html>`,
        {
          status: 410,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "X-Robots-Tag": "noindex",
            "Cache-Control": "public, max-age=86400",
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run only on paths that could match the patterns above. Skip
  // Next.js internals, the API, static assets, and the sitemap/robots
  // routes we actually serve.
  matcher: [
    "/((?!_next/|api/|assets/|favicon|icon|apple-icon|robots\\.txt|sitemap\\.xml|llms\\.txt|google[0-9a-f]+\\.html).*)",
  ],
};
