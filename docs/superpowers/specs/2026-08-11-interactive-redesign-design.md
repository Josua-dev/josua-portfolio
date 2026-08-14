# Design Spec: Interactive "Software Developer & AI Enthusiast" Portfolio

**Date:** 2026-08-11
**Status:** Approved (autonomous execution — user is absent; critique workflow `wf_ef649d3b-8e7` incorporated)
**Site:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, GSAP 3.15 (already a dependency)
**Live reference:** https://josua-portfolio-j4it.vercel.app/

---

## 1. Goal

Transform the current "Namibian editorial" portfolio into a visually impressive,
highly interactive portfolio with the new identity **"Software Developer & AI
Enthusiast"**, while preserving every authenticity guarantee from the prior
human-authenticity audit. A visitor should think *"THIS PERSON ACTUALLY BUILDS
THINGS."* — never *"THIS PERSON USED AI TO MAKE A PORTFOLIO."*

## 2. Design direction: "Interactive Namibian editorial"

Keep the editorial foundation (paper `#f3eddc`, ink `#191612`, flag green
`#0b5d3b` + red `#9a281e`, hairline rules `#d9ceb3`, Fraunces masthead, Sometype
mono datelines) and make it *interactive*: document/docket metaphors, blueprint
lines, a case-register ledger, a live terminal, and scroll-linked scenes. No
rounded-card-everything, no glassmorphism, no gradients, no purple-AI.

## 3. Positioning copy (single source of truth)

Add to `src/data/site.ts`: `tagline: "Software Developer & AI Enthusiast"`,
`tags: ["Android", "Web", "AI", "Software Systems"]`, `role: "Software
Developer"`. Derive all consumer strings from these — **layout.tsx** metadata
(title/description/OpenGraph/twitter), **opengraph-image.tsx** (alt + body),
**Hero** markers, **Contact** intro, **Footer**. No stale "Android-first"
string survives.

**Domain question (from critique):** `metadataBase`/`openGraph.url` currently
point at `https://josua.dev`, which is **unverified**. Remove `metadataBase`
and set `openGraph.url` to the GitHub profile `https://github.com/Josua-dev`
unless Josua confirms the domain. **No new URLs beyond verified GitHub repos,
the GitHub profile, and the mailto.**

## 4. Page structure

```
<header>              → Nav (skip link first DOM element)
<main id="main" tabIndex={-1}>
  Hero (id="top")
  Manifesto           → add visually-hidden h2
  Work showcase       (id="work")
    - 4 featured projects + 2 compact ledger rows
  About               (id="about")
  AI Enthusiast       (id="ai")
  Tech ecosystem      (id="stack")
  Contact             (id="contact")
</main>
<footer>              → real footer landmark; © colophon moves here from Contact
```

Section order chosen so narrative flows: identity → belief → proof of work →
who → AI → tools → contact. `aria-labelledby` on each section pointing to its
h2. Keep `<ol>` for the work ledger; build AI chips and tech ecosystem as
`<ul><li><button>`.

## 5. Hero (LCP-critical)

Split grid: left = masthead typography, right = interactive technical visual
(CodeTerminal). **NOT** an AI brain / stock imagery / robots / particles.

**Left:**
- Dateline row (mono) + double rule, unchanged editorial markers.
- Masthead: "JOSUA" huge Fraunces 900, "Uuyuni" light italic.
- New green-italic identity line: "Software Developer" / "& AI Enthusiast".
- **Rewritten tagline paragraph** (critique: current copy fabricates
  deployment): *"I build Android and web software modeled on Namibian systems:
  from a court case tracker to a road-fund dashboard."* Never claim software is
  "in people's hands" or "on a government desk".
- Magnetic CTAs: "View my work" → `#work`, "Email me" → mailto.
- Markers row becomes real tag chips (Android / Web / AI / Software Systems).

**LCP contract (critique CRITICAL):** the hero subtitle (tagline paragraph) is
the LCP element. Every hero element gets a **transform-only entrance**
(translateY 12–18px → 0), **opacity held at 1** — never opacity-0 start, never
`animation-fill-mode: backwards/both` with an opacity-0 from-state. No
`[data-reveal]`/`[data-project]` opacity gate anywhere above the fold.

**Right — CodeTerminal (client island, `next/dynamic` or small client
component):**
- **Hydration contract (critique CRITICAL):** SSR renders the full final lines;
  the client's first render matches (final state). A `useEffect` then adds
  per-line classes (CSS opacity/translate stagger) that read as "typing"
  without rebuilding text — no hydration mismatch, no height change.
- **Fixed height**: fixed line count + line-height + min-height → zero CLS.
- **Lines** (critique: no invented artifacts): `whoami` → "josua-uuyuni";
  `echo "android · web · ai"`; `cd MovieRecommendationSystem`; `git push`. No
  `focus.txt`, no `python recommend`. Caption the terminal *"illustrative"* so
  it isn't read as a literal machine log.
- Body text `--color-ink` (not ink-muted) on paper-deep (4.67:1 borderline).
- `aria-hidden="true"` on the animated layer + visually-hidden text transcript.
- Typing driven by a single `setInterval`, cleared on unmount, paused on
  `document.hidden`. Click-to-replay re-triggers the class reveal only.
- Reduced-motion: all lines visible immediately, no blink.

## 6. Animation system

- **Entrance:** CSS-only, transform-only (above fold) / reveal for below fold.
- **Scroll reveals:** enhance `useReveal` to a translateY reveal with `.is-in`
  (existing `data-reveal` contract kept: hidden only under `.js`, forced
  visible under reduced motion). `prefers-reduced-motion` blanket catch-all:
  `*, ::before, ::after { animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important; transition-duration: 0.01ms
  !important; scroll-behavior: auto !important; }` plus explicit
  `transform: none` on reveal/entrance targets.
- **Project hover:** cover image scale, title shift, arrow slide (transform
  only), flag marker green→red.
- **Magnetic CTAs:** translate toward cursor within a radius, spring back on
  leave; transform-only.
- **Custom cursor:** dot + lagging label pill.
  - Labels EXACTLY: "VIEW PROJECT" over project cards/rows, "OPEN GITHUB" over
    GitHub links, "SEND EMAIL" over mailto, "REPLAY" over the terminal.
  - **Mount guard (critique):** `.has-cursor` (which sets `cursor: none`)
    applied ONLY after the cursor is mounted, tracking (first pointermove +
    rAF confirmed), wrapped in try/catch that removes the class on error.
  - Gated on `(pointer: fine)` AND `(prefers-reduced-motion: no-preference)`.
  - `pointer-events: none`, `aria-hidden="true"`; pill labels never block
    clicks. Dot gets a 1px paper-tone outline ring so it reads over red/ink.
  - Disabled entirely on touch (no cursor:none) and reduced motion.

## 7. Nav

- Transparent over the hero → condensed paper bar on scroll (translateY +
  backdrop only; **background paper-toned at all times** so links stay
  readable over the pinned OM'KUMOH stage).
- Active section indicator via IntersectionObserver; sets
  `aria-current="true"` on the active link **plus** a visual dot/underline.
- Smooth scrolling with `scroll-padding-top` ≥ the taller nav state.
- **Mobile:** hamburger → full-screen overlay; `aria-expanded`/`aria-controls`,
  closes on Escape and link click, focus trap, focus restore to the button.
  Nav is `display:none` without JS (CSS-gated) so no-JS users see inline links.
  Distinct `aria-label="Primary"` on the bar; overlay labeled separately.
- Skip link: first DOM element, visible on focus, targets `#main`.
- `<header>` landmark wrapping the nav.

## 8. Work showcase — 4 non-identical featured layouts + compact ledger

Data: add `id` and `featured` to `projects.ts`. Covers are CSS/SVG motifs, no
images fetched from anywhere, **no numbers/metrics on any cover or card**
(critique: forbids invented stats).

1. **01 MOJ Case Management System V2** — cover right, text left. Cover motif:
   case-file dossier (manila tab + ruled field lines). *Title stays "MOJ"; never
   expand to "Ministry of Justice" (critique).*
2. **02 Road Fund Administration** — cover left, text right. Motif: maintenance
   report form (mono form rows, a stamp). Keep the "modeled on the Road Fund
   Administration" framing.
3. **03 OM'KUMOH Consulting Engineers** — immersive, scroll-linked GSAP stage
   (full section). See §9.
4. **04 Movie Recommendation System** — horizontal native snap rail with edge
   fade + arrow buttons + visible styled scrollbar; `scroll-snap-type: x
   proximity` (not mandatory), fixed-height container, `overscroll-behavior-x:
   contain` (critique). Motif: recommendation matrix (generic, unreferenced).

**Compact ledger rows** for ATM (Python CLI) + Phonebook (Java) using the
existing ProjectCard pattern (flag square + "05"/"06" + "View on GitHub").

**Work intro (critique CRITICAL — keep "modeled on", never "client"):**
*"Recent builds, all on GitHub: a case-tracking app modeled on a court
workflow, a road-fund dashboard modeled on the RFA, a consulting-engineers
website, and a movie recommender."*

Each featured card links to GitHub, carries `data-project-id`, and is the
target of the tech-ecosystem highlight.

## 9. OM'KUMOH scroll-linked stage (GSAP)

**Honest scope:** the repo genuinely uses three/GSAP (verified in the audit), so
a scroll-linked treatment of its "3D campus scene" is real — but we will NOT
fabricate a 3D scene. Instead: a paper-toned **blueprint schematic** of the
site's 3D campus scene — abstract rectangles labeled formally A/B/C (critique:
no building-sounding names), grid + dimension ticks, a "camera path" dotted
line, and crossfading info panels (title / stack / GitHub link).

**Implementation contract (critique):**
- Pinned stage fixed height `h-[100svh]` — **no content-dependent sizing**.
- Lazy-load GSAP+ScrollTrigger via `next/dynamic({ ssr: false })`, gated by an
  IntersectionObserver that loads it just before the section enters.
- `ScrollTrigger.refresh()` on window load (fonts/images settle → pin distances
  correct).
- Drive all motion through `gsap.matchMedia()` in a
  `(prefers-reduced-motion: no-preference)` context so reduced-motion users get
  no pin and no pin-spacer at all. Reduced-motion fallback = stacked panels.
- **Never apply `[data-reveal]`/`[data-project]` opacity gates to the pinned
  element.**
- Inactive info panels get `inert` (React 19 supports the attribute) or
  `aria-hidden` + `tabindex=-1` so keyboard can't reach invisible links.
- Progress indicator is decorative → `aria-hidden`.
- Globals: `overflow-x: clip` on html/body (NOT `hidden` — hidden creates a
  scroll container that breaks pinning on iOS Safari). Verify on iOS Safari.

## 10. AI Enthusiast section

Header: "AI Enthusiast" with honest intro. **Every chip description is a
definition + learning stance (critique-provided exact lines):**
- **LLMs** — "Large language models. I'm studying how they're built, from the
  data up."
- **Machine Learning** — "My first hands-on pass was the movie recommender."
- **AI Agents** — "Models that act on their own. Reading about them, nothing
  shipped yet."
- **RAG** — "Retrieval-augmented generation: how a model answers using sources
  it can fetch."
- **AI Integrations** — "Wiring model calls into software. A goal, not yet a
  skill."
- **Python** — "My main language for the recommender and ATM projects."

Framing rule (critique): the AI section NEVER uses "I build/ship" about AI
capabilities. Intro uses the blurb's own language: *"I'm early in this. My
movie recommender got me started on turning descriptions into features and
matching them against preferences."* — no unverifiable internals.

Interaction: chips are focusable `<button>`s (`<ul><li><button>`); hover/focus
reveals description. Description space **reserved (min-height) or absolutely
positioned** so showing it never shifts layout (critique). `aria-describedby`
wires button → description. Chips always visible on coarse pointers. A "proof"
card links to MovieRecommendationSystem as the one shipped ML artifact.
**LLMs/RAG/Agents/Integrations never light a project card** (no project uses
them).

## 11. Tech ecosystem (rebuild of Skills)

**Rebuild strictly from real project stacks (critique IMPORTANT — drop Kotlin,
Node, PostgreSQL, PHP, Ballerina):**
- **WEB** — JavaScript, TypeScript, Next.js 16, GSAP, Dashboards
- **BACKEND** — Python, Java, CLI tools, Data Modeling
- **MOBILE** — Android (tagline-level claim only; lights no project card)
- **AI / Exploring** — Python · ML (Movie Rec); LLMs/RAG/Agents/Integrations
  listed as "exploring / in progress", never mapped to a card

Interaction: hovering/focusing a tech highlights related project cards
(`[data-project-id]` via `.is-lit`); the AI "exploring" chips dim all cards +
show a hint line *"no public project yet — learning in public"* (explicit empty
state, critique). Dimming via token swap (color-mix toward paper or an opacity
floor ≥ 0.6), JS-gated, never dim a focused card (critique). No-JS: tech items
render as `<span>`s (CSS-gated `.js` pattern), `aria-pressed` when JS is on
(critique). Reserved description space for the hint line.

## 12. Contact + Footer

**Contact:** h2 *"Have something worth building?"* (brief-mandated); intro
updated to the new positioning: *"I'm open to Android, web, and AI work. Email
is fastest."* Tags: Android / Web / AI / Software Systems. Two channel rows:
**Email** (`mailto:`, `external=false`, no new tab) and **GitHub** (verified
profile). "Send me an email →" + "View my work →". Keep the red "OPEN TO WORK"
stamp as a manual flag (critique: it's a live claim — treat as togglable).
Move the © colophon out of Contact into the new `<footer>`.

**Footer:** real `<footer>` landmark. Sophisticated closing: rule, mono
"WINDHOEK · NAMIBIA" dateline, a blinking block cursor (CSS, gated behind
no-preference), back-to-top link → `#top`, colophon, and "Built in Windhoek,
Namibia" line. No em dashes anywhere. In print, footer cursor hidden.

## 13. Accessibility & performance contracts (critique-driven)

- **Print:** `@media print` block forcing every reveal/entrance target to final
  state (`opacity: 1 !important; transform: none !important`), hiding fixed
  nav/cursor/back-to-top, rail `overflow: visible` + `scroll-snap-type: none`.
- **No-JS:** all interactivity degrades to static content at full contrast;
  nav shows inline links; tech items are spans; chips always visible.
- **Reduced-motion:** blanket catch-all (§6) + GSAP/typing/cursor all gated.
- **CLS:** terminal fixed height; rail fixed height; reveal never expands
  containers.
- **Contrast:** terminal body ink (not ink-muted) on paper-deep; cursor dot has
  paper ring; dimmed cards ≥0.6 floor / color-mix.
- **Keyboard:** every interaction focusable (buttons not spans with JS on),
  visible `:focus-visible` rings independent of cursor, Escape/aria contracts in
  nav, inert panels, `aria-describedby` on chip/tech descriptions.
- **Performance:** transforms only (GPU), `content-visibility: auto` on
  below-fold sections WITHOUT pinned stages (OM'KUMOH exempt), no new font
  CDNs, keep next/font `display: swap`.
- **Responsive:** 320 / 375 / 414 / 768 / 1024 / 1440px+. Terminal hides or
  condenses on small screens; hero stacks; showcase layouts collapse to rows.

## 14. Scope / non-goals

- No images hosted anywhere; covers are CSS/SVG.
- No LinkedIn, no invented URLs, no metrics.
- GSAP 3.15 is **already installed** — the task is to wire it + lazy-load via
  `next/dynamic`, not reinstall.
- One library (GSAP) is justified: the brief names it for OM'KUMOH and the
  OM'KUMOH repo itself uses it.

## 15. Deliverables

Final report enumerates these 6 sections (brief-mandated):
1. What was changed
2. What skills/tools were invoked
3. What animations were added
4. How the AI Enthusiast identity was introduced
5. Which projects received the biggest upgrades
6. Remaining improvements / known risks

Plus an explicit **self-critique** pass before the final commit.
