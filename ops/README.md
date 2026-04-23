# Ops Automation — reusable template

Everything in this folder is **project-agnostic**. It's meant to be
lifted verbatim into any Next.js client website to get the same
hands-off automation you have on standoutexterior-next:

- GitHub Actions CI (typecheck + build on every PR)
- Renovate bot (auto-PR for deps, auto-merge patches/minor-devDeps)
- Weekly Lighthouse digest emailed to dev@ignacionunez.dev
- Better Stack uptime monitoring

## Bootstrapping a new project

From inside the new project's repo root:

```bash
# 1. Copy the workflow + config files from an existing project
cp -r ../standoutexterior-next/.github ./
cp ../standoutexterior-next/renovate.json ./
cp ../standoutexterior-next/.lighthouserc.json ./
cp ../standoutexterior-next/scripts/setup-uptime-monitor.mjs ./scripts/

# 2. Open .lighthouserc.json and replace the URL list with the new
#    project's pages.

# 3. Open .github/scripts/lighthouse-digest.mjs and update the three
#    constants at the top:
#       FROM             sender-verified domain in Resend
#       PROJECT_NAME     used in subject line + email header
#       PRODUCTION_URL   shown in the digest

# 4. Open scripts/setup-uptime-monitor.mjs and update the PROJECT +
#    MONITORS array with the new project's URLs.

# 5. Add secrets to the GitHub repo (Settings → Secrets → Actions):
#       RESEND_API_KEY   same key you use in production for the lead form

# 6. Enable Renovate for the repo:
#    https://github.com/apps/renovate → Configure → pick the new repo.

# 7. Run once to provision uptime checks:
#    BETTER_STACK_TOKEN=xxxxx node scripts/setup-uptime-monitor.mjs

# 8. Commit + push. First CI run happens on next PR.
#    First Lighthouse digest arrives on the next Monday 10:30 UTC.
```

## Per-project customization

| File | What to change |
|---|---|
| `.lighthouserc.json` | URL list — keep it to 10 pages max |
| `.github/scripts/lighthouse-digest.mjs` | `FROM`, `PROJECT_NAME`, `PRODUCTION_URL` constants |
| `scripts/setup-uptime-monitor.mjs` | `PROJECT` name + `MONITORS` array |
| `renovate.json` | `assignees` if the repo owner isn't IggyNunez |

## Where alerts land

All alerts route to `dev@ignacionunez.dev`:

- **CI failures** → GitHub's default failure notifications (email)
- **Uptime failures** → Better Stack (configured in your dashboard)
- **Weekly Lighthouse digest** → sent via Resend from the project's
  verified sender domain
- **Renovate dep-update PRs** → GitHub notifications

To route alerts somewhere else per-project (e.g. a separate client's
ops inbox), change the `TO` constant in
`.github/scripts/lighthouse-digest.mjs` and add a separate Better
Stack API token + team for that client.

## Cost

Everything on this stack is $0 on free tiers:

| Service | Free tier | What we use |
|---|---|---|
| GitHub Actions | 2,000 min/mo | ~30 min/mo per project |
| Renovate | unlimited | ~5 PRs/mo |
| Better Stack | 10 monitors | 4/project |
| Resend | 3,000 emails/mo | ~4 digests/mo |
| Lighthouse CI | unlimited | public temporary storage |

## Upgrade path

When you grow beyond a handful of projects:

1. **GitHub Actions minutes** — upgrade the GitHub org to Pro ($4/user/mo) for 3,000 minutes, or move long-running workflows to self-hosted runners.
2. **Resend** — $20/mo gets 50,000 emails.
3. **Better Stack** — $29/mo for 50 monitors + 15-second checks.
4. **Reusable workflows** — once you have 3+ projects, promote the CI + Lighthouse workflows to a `ignacionunez/ci-templates` repo and use GitHub's [reusable workflow syntax](https://docs.github.com/en/actions/using-workflows/reusing-workflows) so each project has a 5-line workflow file that just calls the template. This consolidates updates in one place.
