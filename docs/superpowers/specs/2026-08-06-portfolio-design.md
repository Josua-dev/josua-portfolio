# Josua — Cinematic Personal-Brand Portfolio

**Date:** 2026-08-06
**Status:** Approved design
**Source:** Superpowers brainstorming, informed by the user's GitHub profile (github.com/Josua-dev)

## 1. Purpose & person

A single-page, cinematic personal-brand portfolio for **Josua**, an Android &
software developer based in **Windhoek, Namibia**, building for the Namibian
market. The site establishes his identity as a developer and points recruiters,
clients, and peers to his best work and contact channels.

Deliberately not a hard resume drop; it is a curated showcase with a strong
call-to-action to get in touch.

## 2. Design direction

**Bold premium motion** — the same cinematic, scroll-driven sensibility the user
proudly ships in their OM'KUMOH website build.

- **Base:** near-black charcoal (`#0b0b0f`-ish) through most surfaces.
- **Accent:** a saturated aurora gradient — violet → magenta → amber — evoking a
  Namibian sunset. Used for gradient reveals, glows, hover states.
- **Type:** large display sans (e.g. Inter/Space Grotesk) with a thin mono font
  (e.g. JetBrains Mono) used as texture/labels/coordinates.
- **Motion:** GSAP scroll-driven — marquee streak, callout text reveal, parallax
  on project cards, smooth scroll (lenis).
- **Texture:** subtle noise/grid, faint coordinate labels, film-grain glow.
- **Avatar:** the user's GitHub avatar anchors the hero.

## 3. Tech stack

- **Next.js 16** (`create-next-app` with TypeScript, App Router) — matches the
  user's recent builds (OM'KUMOH used Next.js 16, React 19).
- **Tailwind CSS v4** (the default `create-next-app` scaffolds now).
- **GSAP** for scroll-telling; a tiny `useInView` + GSAP wrapper; **lenis** for
  smooth scrolling.
- No heavy UI component library. Static import (no fetch at runtime) — content
  is curated, not live.
- Fonts via `next/font` (display + mono).

## 4. Page structure (single-page scroll)

1. **Hero** — full-viewport. Oversized "JOSUA" with gradient reveal, subtitle
   "Android & software developer · Windhoek, Namibia", avatar, scroll cue, and a
   marquee divider.
2. **Manifesto / scroll line** — a pinned short line ("Building for the Namibian
   market.") with a gradient streak flowing across as you scroll.
3. **Selected Work** — 6 projects as large editorial cards with alternating
   layout, GSAP parallax + reveal, hover glow. Each card: title, one-line blurb,
   stack tags, GitHub link.
   - **MOJ Case Management System V2** (JavaScript)
   - **Road Fund Administration (Namibia)** (TypeScript)
   - **OM'KUMOH Consulting** website (Next.js 16 / TypeScript)
   - **Movie Recommendation System** (Python)
   - **Namibian Express Bank ATM System** (Python)
   - **Phonebook Project** (Java)
4. **About** — short brand paragraph (Android + full-stack + Namibian market),
   background (NUST), a few stat tiles, avatar.
5. **Skills / Toolkit** — grouped chips (Mobile, Web, Data, Languages), scroll-
   reveal grid.
6. **Contact** — "Let's build something for Namibia" with email, WhatsApp,
   LinkedIn, GitHub links and a strong CTA.

## 5. Content & data model

Central, typed `projects.ts` array — each entry:

```ts
interface Project {
  year: string;
  title: string;
  blurb: string;        // one-line story
  stack: string[];      // tag chips
  url: string;          // GitHub (or live) link
  accent: string;       // per-project gradient hue
  role?: string;        // e.g. "Lead developer"
}
```

Contact details centralised in one `site.ts` config so placeholders are trivial
to fill. Defaults:

- GitHub: `https://github.com/Josua-dev`
- Email / LinkedIn / WhatsApp: **placeholder** — user must supply the actual
  address/handle/number. Clearly marked `TODO` in `site.ts`.

## 6. Error handling & resilience

- Static site — no runtime fetch, no network error surface. Build-time only.
- All external links open in a new tab (`target="_blank"`, `rel="noopener"`).
- If an accent color or image is missing, fall back to the base gradient.
- Reduced-motion: respect `prefers-reduced-motion` by degrading scroll
  animations to simple reveals.

## 7. Testing & quality bar

- `next build` / `next lint` must pass clean.
- Works & looks right at mobile / tablet / desktop.
- Lighthouse: ≥ 90 performance, accessibility, best-practices.
- Keyboard-navigable focus states throughout; contrast meets WCAG AA.
- Roll a couple of simple unit/type checks on `projects.ts`.

## 8. Out of scope (YAGNI)

- No blog, no CMS, no contact form backend (mailto + channel links only).
- No live GitHub API feed ("curate best", not "fetch all").
- No multi-page routing, no dark/light toggle — single, intentional dark theme.

## 9. Success criteria

- Shipped as a single-page developer portfolio on Vercel at Josua's chosen
  URL (or GitHub Pages initially).
- Feels "premium + cinematic" to the user on desktop and mobile.
- Links to the 6 curated projects + all 4 contact channels actually resolve.
- Scores ≥ 90 on Lighthouse.
## 10. Confirmed contact details (decided at review gate)

- **Email:** `joshua7919859@gmail.com` (confirmed from git config)
- **GitHub:** `https://github.com/Josua-dev` (confirmed)
- **LinkedIn:** TODO placeholder — user to supply handle in `site.ts`
- **WhatsApp:** TODO placeholder — user to supply number in `site.ts`

All four live in a single `src/data/site.ts`. Placeholders are the only remaining
action; replacing three strings completes the contact section.
