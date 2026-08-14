# Deploy Notes — Josua Portfolio

Everything below is for after the repo is pushed; steps marked **(user)** are manual actions in Vercel / GitHub.

## Push to GitHub

```bash
git remote add origin https://github.com/Josua-dev/josua-portfolio.git
git branch -M main
git push -u origin main
```

> Note: the working branch is currently `feat/portfolio-site`. If you want `main` to carry the finished build, either merge/rename as above, or push the feature branch and open a PR into `main`. The `git branch -M main` in the brief renames it — do that only when you're happy the branch is final.

## Import to Vercel (recommended)

1. Open [vercel.com/new](https://vercel.com/new), sign in with GitHub.
2. **Import** the `josua-portfolio` repo. Vercel auto-detects **Next.js** (Next 16, Turbopack).
3. Framework preset: **Next.js**. Build command `npm run build`, output defaults are fine — the site is fully static (`next build` emits pre-rendered HTML for `/`, `/icon.svg`, `/opengraph-image`).
4. **Deploy.** You get a `*.vercel.app` URL immediately.
5. Marketplace: no DB, no env vars, no secrets — a static SPA-equivalent. No Edge functions needed.

## Custom domain (e.g. `josua.dev`)

1. In the Vercel project: **Settings → Domains → Add** `josua.dev` (and `www.josua.dev`).
2. Point DNS (Vercel will show records; typically a CNAME to `cname.vercel-dns.com` or A records for the apex).
3. After the domain resolves, update the canonical URLs in **`src/app/layout.tsx`**:

```ts
metadataBase: new URL("https://josua.dev"),
// and in openGraph: url: "https://josua.dev"
```

Rebuild/redeploy once that's updated so `og:url`, Twitter card, and the sitemap/robots point at the real domain.

## Optional static hosting instead

`next build` already produces a fully static site. You can deploy the `.next` output to any static host — but Next.js's image optimizer (`/_next/image`) is a Node feature, so static hosts (GitHub Pages, Netlify static) **lose remote-image optimization** for the GitHub avatar. Vercel is the intended target — it keeps `next/image` working.

## Still to do by you (user action)

- **LinkedIn + WhatsApp:** not on the site right now — the `#` placeholder entries and their `TODO` comments were removed in the authenticity audit (a portfolio shouldn't list channels that don't exist yet). To add them back, put real URLs in `src/data/site.ts` under `contact:` and add a `channel(...)` row in `src/components/Contact.tsx`.
- **Domain in metadata:** swap `metadataBase` once your custom domain is live (above).
- **Verify final metrics:** run Lighthouse on the deployed URL (`npx lighthouse https://josua.dev`). Target ≥ 90 on performance / accessibility / best-practices.

## QA state at write time

- `npm run lint` — clean (0 errors, 0 warnings).
- `npm run build` — clean, 5 static routes: `/`, `/_not-found`, `/icon.svg`, `/opengraph-image`; TurboPack compile in ~4s.
- Reduced-motion & no-JS — below-fold `[data-reveal]` / `[data-project]` are CSS-gated (hidden only when `.js` is present, forced visible under `prefers-reduced-motion: reduce`). The hero and whole above-the-fold masthead are static editorial print — no opacity gating — so LCP paints at first paint. Reveals are a single shared `useReveal` IntersectionObserver hook (try/catch fallback reveals everything if the observer can't attach) adding `.is-in`. No Lenis — smooth scroll was removed in the authenticity audit as decoration on a static page; `gsap`/`lenis` are no longer dependencies.
- Editorial identity (v2 redesign): cream paper `#f3eddc`, ink `#191612`, ink-muted `#6b6150`, flag-green `#0b5d3b`, flag-red `#9a281e`, hairline rule `#d9ceb3`; Fraunces variable serif (normal + italic) and Sometype Mono; ruled docket ledger for Selected Work; no gradients anywhere.
- Metadata: title, description, OG image (statically generated 1200×630, editorial palette — ink masthead, green bar), Twitter `summary_large_image`, SVG favicon (cream tile, green flag bar, ink `J`).