# GSC Canonical-Tag Validation Report — 2026-05-21

## 1. Live Canonical Verification

> **Note:** The remote execution environment's IP is blocked by Vercel's edge network
> (`403 host_not_allowed`). Canonical verification was performed by code analysis of
> the repository, not by live HTTP requests. The code analysis is authoritative for
> what `next build` will output.

### Results (code analysis)

| Page | File | `alternates.canonical` value | Status |
|------|------|------------------------------|--------|
| `/` | `src/app/layout.tsx:76` | `https://www.standoutexterior.com` | ✅ Correct |
| `/services` | `src/app/services/page.tsx:9` | `https://www.standoutexterior.com/services` | ✅ Fixed (2026-05-13) |
| `/contact` | `src/app/contact/page.tsx:10` | `https://www.standoutexterior.com/contact` | ✅ Fixed (2026-05-13) |
| `/reviews` | `src/app/reviews/page.tsx:6` | `https://www.standoutexterior.com/reviews` | ✅ Fixed (2026-05-13) |
| `/before-after` | `src/app/before-after/page.tsx:6` | `https://www.standoutexterior.com/before-after` | ✅ Fixed (2026-05-13) |
| `/areas` | `src/app/areas/page.tsx:11` | `https://www.standoutexterior.com/areas` | ✅ Pre-existing |
| `/commercial` | `src/app/commercial/page.tsx` | `https://www.standoutexterior.com/commercial` | ✅ Fixed (this PR) |
| `/about` | `src/app/about/page.tsx` | `https://www.standoutexterior.com/about` | ✅ Fixed (this PR) |
| `/privacy` | `src/app/privacy/page.tsx` | `https://www.standoutexterior.com/privacy` | ✅ Fixed (this PR) |
| `/terms` | `src/app/terms/page.tsx` | `https://www.standoutexterior.com/terms` | ✅ Fixed (this PR) |

### Key finding — regression in the May 13 fix

The commit `3fcb2de` (2026-05-13, "perf+a11y: site speed audit fixes") only added
self-canonicals to **4 of the 8 targeted pages** (`/services`, `/contact`, `/reviews`,
`/before-after`). The four remaining pages (`/commercial`, `/about`, `/privacy`,
`/terms`) still exported no `alternates` and therefore inherited the root-layout
default of `alternates: { canonical: "https://www.standoutexterior.com" }` — i.e.
the homepage canonical — which is exactly the root cause of the original GSC alerts.

This PR adds the missing `alternates.canonical` to all four pages.

---

## 2. GSC Email / Validation Status

> **Note:** The Gmail MCP tool required user approval and was not accessible in this
> automated run. GSC validation status below is inferred from the code analysis and
> timeline, not from actual GSC email data. To get ground-truth, search Gmail for:
>
> ```
> from:sc-noreply@google.com newer_than:25d standoutexterior
> ```

### Timeline inferred from git history

| Date | Event |
|------|-------|
| 2026-04-16 | GSC alert: "Redirect error" |
| 2026-04-30 | (Stated fix date — **no matching git commit found**) |
| 2026-05-13 | `3fcb2de` merged to master — partial fix (4/8 pages) |
| 2026-05-21 | This PR — remaining 4 pages fixed |

### Status of the three original GSC issues

1. **"Duplicate, Google chose different canonical than user"** (newest, noted 2026-04-30)
   - Root cause: pages without `alternates.canonical` inherited the homepage canonical.
   - `/services`, `/contact`, `/reviews`, `/before-after` — fixed 2026-05-13. GSC
     validation window ~3–4 weeks; may already show "Passed" for these.
   - `/commercial`, `/about`, `/privacy`, `/terms` — **still broken until this PR**.
     Validation almost certainly still failing or re-queued for these four.

2. **"Page with redirect" — validation kept failing**
   - Likely tied to the same four un-fixed pages still signalling the wrong canonical,
     or to a redirect chain between `http://`, `https://`, `www` vs non-www variants.
   - With all canonicals now pointing to `https://www.standoutexterior.com/<path>` the
     redirect chain from the non-www property should resolve after Googlebot re-crawls.

3. **"Redirect error"** (2026-04-16)
   - Same root cause. Should resolve once Google re-crawls the corrected pages.

### New alerts

Cannot confirm from this run (Gmail not accessible). Check GSC for both properties:
- `https://standoutexterior.com/` (non-www)
- `https://www.standoutexterior.com/` (www, preferred)

---

## 3. Recommended Next Actions

1. **Merge this PR immediately** — it completes the canonical fix for the four missed pages.

2. **Verify live canonicals after deploy** (from a non-Vercel-blocked machine):
   ```bash
   for p in / /services /commercial /about /contact /before-after /reviews /privacy /terms /areas; do
     printf "%-15s -> " "$p"
     curl -s "https://www.standoutexterior.com$p" | grep -oE '<link[^>]*rel="canonical"[^>]*>' | head -1
     echo
   done
   ```
   Each line except `/` should end with `href="https://www.standoutexterior.com<p>"`.

3. **Check Gmail** for `from:sc-noreply@google.com newer_than:25d standoutexterior` to
   get actual pass/fail verdicts on the three issues.

4. **In GSC**, for the pages that were fixed on 2026-05-13 (`/services`, `/contact`,
   `/reviews`, `/before-after`), click "Validate Fix" if not already done — Google
   won't close the issue automatically unless asked.

5. **Wait 2–4 weeks** after this PR deploys, then click "Validate Fix" for the remaining
   four pages in GSC.

6. **Check the non-www property** (`https://standoutexterior.com/`) as well — the root
   layout uses `metadataBase: new URL("https://www.standoutexterior.com")` which is
   correct, but any non-www URLs indexed before the fix may still show in that property.
