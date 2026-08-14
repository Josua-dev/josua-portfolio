# Josua Uuyuni Portfolio — Emilian Misera Design Language Rebuild

**Date:** 2026-08-12
**Status:** Approved (standing instruction: implement, do not stop at analysis)

## 1. Purpose

Rebuild the Josua Uuyuni portfolio (`josua-portfolio`) so it carries the **EXACT**
visual design language of **emilianmisera.com**, but with **Josua's identity,
content, projects, and personality**. This is a strict skin + content transplant:

> "Emilian Misera's design language, but this is Josua Uuyuni."

The reference design system (source of truth: **GitReverse =
`https://gitreverse.com/designs/emilianmisera-com`**) is NOT to be redesigned,
reinterpreted, modernized, simplified, or replaced. The person and content
change; the design system does not.

## 2. Non-negotiable constraints (verbatim from the brief)

- **DO NOT CHANGE THE DESIGN SYSTEM.** No redesign of: visual direction, layout
  philosophy, typography style/scale, hero composition, spacing system, grid
  structure, dark/light treatment, color relationships, editorial feel,
  navigation concept, project presentation style, interaction/animation
  philosophy, motion language, hover behavior, scroll behavior, page rhythm,
  section hierarchy, visual density, overall personality.
- Do NOT invent experience, clients, awards, statistics, companies, URLs, or
  generic AI copy. Do NOT portray Josua as a senior engineer. Missing info is
  left out.
- Do NOT add unnecessary libraries just to claim they were used.
- Do NOT invent URLs.
- OM'KUMOH: preserve the 3D/GSAP/scroll-driven camera from the existing repo.
  Do NOT replace with fake 3D.
- AI Enthusiast content: integrate naturally. NO glowing brains, neural
  networks, purple gradients, robot illustrations, futuristic AI graphics,
  random particles.
- Motion: preserve reference philosophy; NO random/generic animations.
- Contact: clickable EMAIL, GITHUB, LINKEDIN with actual links — but LinkedIn
  has NO real URL for Josua, so LinkedIn/Instagram are **omitted** (nothing
  invented).
- Responsive: desktop closely follows reference; adapt (don't shrink) for
  tablet/mobile with the same philosophy.
- **"DO NOT MAKE IT 'BETTER'."** Do not redesign the reference, add trendy UI
  patterns, or turn it into a standard dev portfolio.
- En dash (U+2013) only in year ranges; NO em dashes (U+2014) anywhere in
  rendered copy.

## 3. Reference identity (source: emilianmisera.com front page)

### 3.1 Design tokens

| Token | Value |
|---|---|
| `--color-bg` | `#000000` |
| `--color-cursor` | `#ff30d9` |
| `--color-gray-bg` | `#fafaf8` |
| `--color-hint` | `#9f9f9f` |
| `--color-primary` | `#0fd6d9` |
| `--color-selected-blue` | `#00a3ff` |
| `--color-text` | `#ffffff` |
| `--color-white` | `#ffffff` |

### 3.2 Fonts

- **Open Sans** — body/headings (`--font-sans`), Google Fonts woff2
- **Source Code Pro** — mono/code (`--font-source-code`), Google Fonts woff2
- **Telma** — display/hero gradian (`--font-telma`), 5 weights
  (Black/Bold/Light/Medium/Regular) self-hosted `.otf`

### 3.3 Animated gradient (hero "creative", CTA "create")

```
background: linear-gradient(90deg, #0FD6D9 0%, #43E5D8 24%, #7CF1D4 46%, #6BE7E9 68%, #4DB8FF 100%);
background-size: 300% 300%;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: gradient-shift 7s ease-in-out infinite;
font-family: var(--font-telma);
padding-right: 0.12em;
```

Keyframes:
```
@keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
```

### 3.4 Dracula code palette (grid-paper snippets)

`#50fa7b` green, `#f8f8f2` white, `#ff79c6` pink, `#8be9fd` cyan,
`#f1fa8c` yellow, `#bd93f9` purple, `#ffb86c` orange, `#6272a4` gray comment.

### 3.5 Signature elements to preserve

- **Run-together-words** typographic signature ("say hello to your
  creativedeveloper", "Let's createsomethingtogether.")
- **Custom cursor** — dot + pill with `[data-cursor]` labels,
  `--color-cursor:#ff30d9`
- **Scroll-hint** — "Have a look" tracking-wide + animated mouse SVG
  (`scrollBounce` + `textFade` keyframes)
- **Chat bubble (creative-phase)** — animated cursor pill with the hand-drawn
  SVG cursor path, 8 hand-drawn skill SVGs in a grid
- **8 hand-drawn SVGs** (beer glass, gem, feather, notebook, bottle, coffee
  cup, signature, paint roller) — `#0FD6D9` cyan stroke + white scribble
- **Red vertical lines column** hero section (8 red columns) + gray decorative
  SVGs (frame, rounded rect, circles, pill, 4-panel grid)
- **IDE window** with active tab highlight and 3 icons
- **grid-paper** background (linear-gradient `rgba(255,255,255,0.022)`, 52px)
  with floating Dracula code blocks
- **White CTA section** with dashed contact box with external-arrow button and
  animated "create" gradient
- **Selected Work** — heavy chunky cards with eyebrow, image, title, sub, tags,
  corner dots on selected first card, arrow icon
- **Footer** — `bg-gray-300 w-full h-px` divider, right-aligned icon row

## 4. Content mapping (Josua's identity into the reference shell)

### 4.1 Identity

- **Name:** Josua Uuyuni
- **Tagline:** Software Developer · AI Enthusiast
- **Location:** Windhoek, Namibia
- **Education:** Studying Software Development at NUST (Namibia University of
  Science and Technology)
- **Persona:** Junior developer, AI-curious student. NOT a senior engineer. No
  invented experience claims.

### 4.2 Hero

- Structure preserved exactly (`relative flex min-h-screen w-full flex-col
  items-center justify-center`).
- Oversized typography: "say hello to your" + gradient "creativedeveloper".
  Josua's version: keeps the same structure with Josua-appropriate words.
- CTAs: Email (mailto) + GitHub + View Work.

### 4.3 Story section (creative-phase)

- Chat bubble: replace "Emilian / 7 years ago" with Josua's real story — NUST,
  Software Development studies, building web/Android apps, AI enthusiasm,
  Namibia.
- The "7 years ago" is invented experience — replaced with a truthful framing
  (e.g. "Currently studying …" / NUST context).
- 8 hand-drawn skill SVGs: reuse the exact same hand-drawn SVG style
  (0FD6D9 cyan + white scribble), keeping the beer-glass/coffee/signature
  doodle language (the reference's own personality texture) — these aren't
  claims of experience, they are the reference's decorative lead-in to the
  "creative" identity.

### 4.4 Selected Work

Priority order (real projects, real GitHub URLs — already in `projects.ts`):

1. **01 MOJ Case Management System** — JavaScript, Web App, Data Modeling
2. **02 Road Fund Administration** — TypeScript, Web App, Dashboard
3. **03 OM'KUMOH Consulting Engineers** — Next.js 16, TypeScript, GSAP, 3D
4. **04 Movie Recommendation System** — Python, ML, Recommendation
5. **05 Namibian Express Bank ATM System** — Python, CLI, Banking
6. **06 Phonebook Project** — Java, OOP, CLI

The ENTIRE 6-project set is shown as cards in the reference card grid.
Reference layout: 2-column desktop (col1 projects 1+3, col2 project 2) —
adapt to show all 6 while preserving the card anatomy, alternation, and
the `mt-20` rhythm (col1: 1+3+5, col2: 2+4+6).

**Image strategy (no invented assets):** Use the GitHub repo social-OG image
`https://github.com/Josua-dev/<repo>.png` for each project card. This is a
real, canonical image per repo and avoids fabricating mockup screenshots.
`next/image` with the remote host (`opengraph.githubassets.com` / `github.com`)
and `unoptimized` for reliability.

**Floating chips:** replace the 6 person-name chips (fc-emilian … fc-joschi)
with 6 Josua-authentic labels tied to his real stack/identity.

### 4.5 OM'KUMOH

- Keep the existing `OmkumohStage` GSAP scroll-pinned camera scene (the repo
  already has it) but re-skin to the Emilian dark/mono/cyan language.
- Preserve: pin, camera dot travel, building-block bob, progress rail, facet
  crossfade. NO fake 3D.

### 4.6 AI Enthusiast

- Integrated naturally into the story and Selected Work copy (Movie
  Recommender is a real ML build). No neural-network/brain AI imagery.

### 4.7 Contact / CTA

- White CTA section: "Let's create something together" with gradient "create",
  dashed box, Email + GitHub links (mailto + real GitHub). No invented links.

## 5. Copy principles

- Every word is true of Josua. Where the reference claims something Josua
  cannot truthfully claim (e.g. "7 years ago", specific design clients), the
  slot is rewritten with Josua's honest content — NOT deleted, NOT glossed.
- No em dashes. En dash only in year ranges (e.g. 2024–2026).
- No hype, no invented stats, no fake companies.

## 6. Technical implementation approach

### Files to create/modify (src/):

- `src/app/layout.tsx` — swap fonts to Open Sans + Source Code Pro (Google) +
  Telma (self-hosted). Keep the `.js` doc class gate.
- `src/app/globals.css` — replace `@theme` with reference tokens; delete cream
  palette; port `emil.css` keyframes + component CSS; keep robust no-JS /
  reduced-motion / print architecture.
- `src/app/page.tsx` — new section order matching reference.
- `src/components/Hero.tsx` — Emilian hero (black, oversized, gradient word).
- `src/components/Nav.tsx` — reference nav (fixed top, transparent → bg-white
  on scroll, Home/Work/Resume/Contact; mobile hamburger overlay `#080808`).
- `src/components/*Story`, `RedLineSection`, `IdeSection`, `GridPaper`,
  `CtaSection`, `SelectedWork`, `Footer` — new reference-faithful sections.

### Reuse (keep as-is or lightly re-skin):

- `Cursor.tsx` — logic identical, swap colourably to `--color-cursor`.
- `Magnetic.tsx` — reusable.
- `OmkumohStage.tsx` — keep GSAP logic, re-skin CSS.

### Dependencies

No new runtime deps. GSAP is already present, Framer/Three are NOT in the repo
and NOT required — do not add them.

## 7. Verification checklist (final audit)

- [ ] Hero composition matches reference (oversized type, gradient, spacing)
- [ ] Typography: Open Sans + Source Code Pro + Telma all load
- [ ] Spacing (px-6 md:px-16 rhythm) matches reference
- [ ] Editorial feel: run-together words strip
- [ ] Nav philosophy + mobile overlay matches reference
- [ ] Project presentation: chunky cards + 6 chips + alternation
- [ ] Motion language: GSAP scroll reveals, cursor, scroll-hint
- [ ] Hover interactions: hover backgrounds, hover outline, image scale
- [ ] Scroll experience: Lenis absent but GSAP ScrollTrigger reveals present
- [ ] Contact: clickable email/GitHub, no dead/non-real links
- [ ] Dark aesthetic preserved throughout (black + white + cyan + pink cursor)
- [ ] Visual hierarchy per reference
- [ ] Identity clearly visible: "JOSUA UUYUNI", Software Developer, AI Enthusiast
- [ ] AI Enthusiast natural (no fake AI graphics)
- [ ] Real projects only, real URLs only
- [ ] Mobile/tablet adapts (don't shrink)
- [ ] No console errors
- [ ] No broken animations
- [ ] No unnecessary dependencies
- [ ] No em dashes anywhere in rendered copy