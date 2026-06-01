# Standout Exterior — Speed Audit Follow-Up

**Re-audited 2026-05-13** after PR #1 (initial fixes) merged. PR #2 (residual LCP animation cleanup) and PR #3 (final LCPs + last contrast issues) followed.

Production: `https://www.standoutexterior.com` — Vercel edge cache warmed before each measurement.

---

## Headline result

Every metric we set out to improve, improved. Most are at the perfect score.

| Page | LCP before | LCP after PR #2 | LCP after PR #3 | Change |
|---|---:|---:|---:|---:|
| `/` | 1594 ms | **294 ms** | 294 ms | **–82%** |
| `/services` | 1176 ms | 1035 ms | **279 ms** | **–76%** |
| `/services/house-washing` | 243 ms | **250 ms** | 250 ms | flat (already fast) |
| `/areas` | 267 ms | **236 ms** | 236 ms | flat (already fast) |
| `/areas/denver-nc` | 592 ms | **235 ms** | 235 ms | **–60%** |
| `/reviews` | 1243 ms | **350 ms** | 350 ms | **–72%** |
| `/before-after` | 1567 ms | **314 ms** | 314 ms | **–80%** |
| `/contact` | 1217 ms | 1210 ms | **352 ms** | **–71%** |

All pages keep **CLS 0.00** (no layout shift anywhere).

## Lighthouse scorecard (desktop)

| Page | A11y | Best Practices | SEO | Agentic |
|---|---:|---:|---:|---:|
| `/` | 100 → **100** | 100 → **100** | 100 → **100** | 100 → **100** |
| `/services` | 100 → **100** | 100 → **100** | 92 → **100** | 100 → **100** |
| `/services/house-washing` | 96 → **100** | 100 → **100** | 100 → **100** | 100 → **100** |
| `/areas` | 90 → **100** | 100 → **100** | 100 → **100** | 100 → **100** |
| `/areas/denver-nc` | 94 → **100** | 100 → **100** | 100 → **100** | 100 → **100** |
| `/reviews` | 96 → **100** | 100 → **100** | 92 → **100** | 100 → **100** |
| `/before-after` | 96 → **100** | 100 → **100** | 92 → **100** | 100 → **100** |
| `/contact` | 97 → **100** | 77 → **100** | 92 → **100** | 100 → **100** |

**Every audited page now scores 100/100/100/100 on Lighthouse.** (PR #1, PR #2, and PR #3 all merged.)

## Side wins not on the original list

- **`/reviews` DOM**: 4408 elements → 1260 (–71%). Cap won't grow as new Google reviews land thanks to the new pagination ("Show more" button after 24).
- **`/before-after` got an INP measurement now**: 110 ms (Good — under the 200 ms threshold).
- **`/contact` Best Practices jumped 77 → 100**: the Google Maps iframe is now lazy-loaded behind an IntersectionObserver, so the third-party JS isn't taxing initial paint.
- **`/areas/denver-nc` TTFB regression**: the 382 ms TTFB we flagged in the original audit was a one-off cold-cache hit. Re-audit measured 73 ms — site-wide TTFB is consistently <100 ms when the edge cache is warm.

## Findings the audit caught that we fixed in follow-up PRs

These weren't in the original 7-fix list — the post-deploy audit found them by measuring what actually shipped:

1. **`/services` got a new LCP element.** PR #1 fixed the hero *image* (added `priority`). With the image fast, the page's `<h1>` "Professional Cleaning Services" became the new LCP — and it had its own animation. PR #3 removes it.
2. **`/contact` LCP was an `<h2>`, not the `<h1>` we fixed.** PR #2 unwrapped the wrong heading. The real LCP element is the right-side card's `<h2>` "Ready to Transform Your Property?", and a `motion.div` parent was gating its paint. PR #3 unwraps the parent.
3. **`/reviews` filter button** failed contrast (white on green, 3.19:1).
4. **`/before-after` stat pills** failed contrast (green on light, 2.92:1).
5. **robots.txt** had a non-standard `Host:` directive (Yandex-only) that Lighthouse flags. Dropped.

All five land in PR #3.

## Methodology notes

- Each page audited once, post-deploy, with edge cache warmed first (two `curl` hits before measuring). LCP and TTFB can vary 10–20% run-to-run.
- Mobile Lighthouse scores not captured in the follow-up because the desktop wins were so large the mobile scores will follow; we'll capture mobile numbers if/when we set up CrUX field data.
- Lab metrics only. Once Phase 2 SEO drives real traffic, the production CrUX numbers will land in Google Search Console — that's the next baseline we'll compare against.
