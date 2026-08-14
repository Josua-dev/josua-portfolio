# Interactive "Software Developer & AI Enthusiast" Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Namibian editorial portfolio into a visually impressive, highly interactive "Software Developer & AI Enthusiast" portfolio — new hero with a live terminal, scroll reveals, custom cursor, 4 varied project layouts, a GSAP scroll-linked OM'KUMOH stage, an honest AI Enthusiast section, and an interactive tech ecosystem — without inventing a single fact.

**Architecture:** Server components for static editorial content + small client islands for interaction (Nav, Cursor, Magnetic, CodeTerminal, ProjectsShowcase, OmkumohStage, AiSection, TechEcosystem). GSAP 3.15 (already installed) is lazy-loaded via `next/dynamic`-style dynamic import gated by IntersectionObserver, driven through `gsap.matchMedia` so reduced-motion users get no pin. All animation is transform-only above the fold (LCP contract); reveals stay hidden only under `.js` and are forced visible under reduced motion and print.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, GSAP 3.15 + ScrollTrigger (ships inside gsap).

## Global Constraints

- **No fabricated facts.** Never claim deployment ("in people's hands", "on a government desk"), never "client", never expand "MOJ" to "Ministry of Justice". Keep "modeled on" framing.
- **Hero tagline paragraph (LCP element):** transform-only entrance, `opacity` held at 1. Never opacity-0 start, never `animation-fill-mode: backwards/both` with opacity-0 from-state.
- **CodeTerminal:** SSR renders final lines; first client render matches; typing = class reveal only (never rebuild text); fixed height (zero CLS).
- **Terminal lines:** only real commands — `whoami`, `echo "android · web · ai"`, `cd MovieRecommendationSystem`, `git push origin main`. No invented files/modules.
- **Tech ecosystem rebuilt strictly from project stacks.** Drop Kotlin, Node, PostgreSQL, PHP, Ballerina. AI "exploring" chips (LLMs/RAG/Agents/Integrations) never light a project card; show "no public project yet — learning in public".
- **AI section** never uses "I build/ship" about AI capabilities; every chip is a definition + learning stance.
- **No new URLs** beyond verified GitHub repos, GitHub profile, and mailto. Remove `metadataBase`/`openGraph.url` pointing at unverified `https://josua.dev`; use the live Vercel host instead.
- **No em dashes (U+2014)** anywhere in rendered copy. En dash (U+2013) only in year ranges (`2024&ndash;2026`).
- **No metrics/numbers** on project covers or cards.
- **Reduced motion:** blanket catch-all `*, ::before, ::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }`; GSAP/cursor/typing all gated on `(prefers-reduced-motion: no-preference)`.
- **No-JS:** interactivity degrades to static full-contrast content; nav shows inline links; tech items render as `<span>`s (CSS/`mounted`-gated); AI descriptions always visible.
- **Print:** `@media print` forces all reveal/entrance targets final-state, hides fixed nav/cursor/back-to-top, rail `overflow: visible`.
- **Pinning:** `overflow-x: clip` on html/body (never `hidden`); pinned stage fixed `h-[100svh]`; `ScrollTrigger.refresh()` on window load; never gate the pinned element with `[data-reveal]`.
- **GSAP 3.15 is already installed.** Wire + lazy-load; do not reinstall.
- **Landmarks:** `<header>`, `<main id="main" tabIndex={-1}>` (skip target), `<footer>`; section `aria-labelledby`; `<ol>` for ledger; `<ul><li><button>` for chips/tech.
- **Nav:** `scroll-padding-top` ≥ nav height; mobile overlay gets `aria-expanded`/`aria-controls`, Escape, focus management, `aria-current` on active link; `.js`-gated toggle so no-JS users see inline links.
- **Contrast:** terminal body text `--color-ink` on paper-deep; dimmed cards opacity floor ≥ 0.6, never dim a focused card; cursor dot has paper outline ring.
- **Cursor:** `.has-cursor` (sets `cursor: none`) applied only after first successful tracking frame, wrapped in try/catch that removes the class on error; gated `(pointer: fine)` AND no-preference.
- **Copy changes tracked in the plan must be applied verbatim** (hero tagline, Work intro, AI chip descriptions, AI intro, Contact intro).

---

### Task 1: Positioning copy — single source of truth

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/opengraph-image.tsx`

**Interfaces:**
- Produces: `site.tagline = "Software Developer & AI Enthusiast"`, `site.tags = ["Android","Web","AI","Software Systems"]`. All consumers (Hero, Contact, Footer, layout, OG) read these.

- [ ] **Step 1: Update `src/data/site.ts`**

```ts
export const site = {
  name: "Josua",
  fullName: "Josua Uuyuni",
  tagline: "Software Developer & AI Enthusiast",
  tags: ["Android", "Web", "AI", "Software Systems"],
  location: "Windhoek, Namibia",
  manifesto: "Building for the Namibian market.",
  avatarUrl: "https://avatars.githubusercontent.com/u/183984329?s=192&v=4",
  contact: {
    email: "joshua7919859@gmail.com",
    github: "https://github.com/Josua-dev",
  },
};
```

- [ ] **Step 2: Update `src/app/layout.tsx` metadata**

Replace the `metadata` object (lines 18–38) with:

```tsx
export const metadata: Metadata = {
  title: "Josua · Software Developer & AI Enthusiast · Windhoek",
  description:
    "Josua is a software developer and AI enthusiast in Windhoek, Namibia. Selected work and experiments, all on GitHub.",
  metadataBase: new URL("https://josua-portfolio-j4it.vercel.app"),
  openGraph: {
    title: "Josua · Software Developer & AI Enthusiast",
    description: "Software developer and AI enthusiast building for the Namibian market.",
    url: "https://josua-portfolio-j4it.vercel.app",
    siteName: "Josua",
    locale: "en_NA",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Josua · Software Developer & AI Enthusiast",
    description: "Software developer and AI enthusiast building for the Namibian market.",
  },
};
```

Note: `metadataBase`/`openGraph.url` point at the **live Vercel host** (verified — it is the deployed site), replacing the unverified `https://josua.dev`.

- [ ] **Step 3: Update `src/app/opengraph-image.tsx`**

- Line 3 alt: `"Josua Uuyuni · Software Developer & AI Enthusiast · Windhoek, Namibia"`
- Line 57 body: `Software Developer & AI Enthusiast`
- Keep the masthead, rule, "Building for the Namibian market", palette.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expected: clean. `grep -rn "Android & software" src/` — expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/app/layout.tsx src/app/opengraph-image.tsx
git commit -m "feat: reposition as Software Developer & AI Enthusiast (single source in site.ts)"
```

---

### Task 2: Globals — animation system, LCP/print/no-JS/reduced-motion contracts

**Files:**
- Modify: `src/app/globals.css` (full rewrite)

**Interfaces:**
- Produces CSS contracts consumed by every task: `[data-hero-move]` (transform-only entrance), `[data-reveal]`/`[data-project]` (IO reveal + translateY), `[data-term-line]` (terminal settle), `.has-cursor`/`.cursor-dot`/`.cursor-pill`, `.block-cursor`, `.rail` (snap rail), `.is-lit`/`.is-dimmed` (tech highlight), `.nav`/`.nav-condensed`/`.nav-toggle`/`.js-mobile-menu`/`.no-js-mobile-links`, `.skip-link`, `.chip-desc`, `.omkumoh-stage` (pinned/static), `@media print`, reduced-motion blanket, `overflow-x: clip`, `content-visibility`.

- [ ] **Step 1: Rewrite `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --font-display: var(--font-fraunces), "Georgia", serif;
  --font-mono: var(--font-sometype), ui-monospace, "SFMono-Regular", monospace;

  /* Namibian editorial palette: paper, ink, flag green/red, hairline rules. */
  --color-paper: #f3eddc;
  --color-paper-deep: #eae1c8;
  --color-ink: #191612;
  --color-ink-muted: #6b6150;
  --color-flag-green: #0b5d3b;
  --color-flag-red: #9a281e;
  --color-rule: #d9ceb3;
}

:root {
  color-scheme: light;
}

html {
  background: var(--color-paper);
  color: var(--color-ink);
  /* clip (not hidden): hidden makes the body a scroll container and breaks
     position:sticky / GSAP ScrollTrigger pinning on iOS Safari. */
  overflow-x: clip;
  /* Jump target clearance for the fixed nav. */
  scroll-padding-top: 5.5rem;
}

body {
  margin: 0;
  font-family: var(--font-display);
  background: var(--color-paper);
  color: var(--color-ink);
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

::selection {
  background: var(--color-flag-green);
  color: var(--color-paper);
}

/* ---------------------------------------------------------------------------
   No-JS fallback: reveal targets are only hidden when JS is running.
   --------------------------------------------------------------------------- */
.js [data-reveal],
.js [data-project] { opacity: 0; transform: translateY(16px); }
.js [data-reveal].is-in,
.js [data-project].is-in { opacity: 1; transform: translateY(0); }
[data-reveal], [data-project] {
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ---------------------------------------------------------------------------
   Hero entrance — TRANSFORM ONLY (LCP contract: opacity never < 1).
   data-hero-move elements sit translated down until .is-in is added by the
   HeroEntrance client component. No opacity involved at any point.
   --------------------------------------------------------------------------- */
@media (prefers-reduced-motion: no-preference) {
  .js [data-hero-move] { transform: translateY(18px); }
  .js [data-hero-move].is-in { transform: translateY(0); }
  [data-hero-move] { transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
}

/* ---------------------------------------------------------------------------
   CodeTerminal line settle — transform only (LCP-safe).
   --------------------------------------------------------------------------- */
.js [data-term-line] { transform: translateY(8px); }
.js [data-term-line].is-settled { transform: translateY(0); }
[data-term-line] { transition: transform 0.4s ease; }

/* ---------------------------------------------------------------------------
   Custom cursor
   --------------------------------------------------------------------------- */
.has-cursor,
.has-cursor * { cursor: none !important; }
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--color-flag-green);
  outline: 1px solid var(--color-paper);
  pointer-events: none;
  will-change: transform;
}
.cursor-pill {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--color-ink);
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
  will-change: transform;
}
.cursor-pill[hidden] { display: none; }

/* Block cursor (terminal + footer blink). */
.block-cursor {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  margin-left: 0.15em;
  vertical-align: text-bottom;
  background: var(--color-flag-green);
}
@media (prefers-reduced-motion: no-preference) {
  .block-cursor { animation: cursor-blink 1s steps(2, start) infinite; }
}
@keyframes cursor-blink { to { visibility: hidden; } }

/* ---------------------------------------------------------------------------
   Nav
   --------------------------------------------------------------------------- */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid transparent;
  background: transparent;
}
.nav-condensed {
  background: var(--color-paper);
  border-bottom-color: var(--color-rule);
  box-shadow: 0 1px 0 rgba(25, 22, 18, 0.06);
}
@media (prefers-reduced-motion: no-preference) {
  .nav { transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
}
@media (min-width: 768px) { .nav-inner { padding: 1.25rem 3rem; } }
.nav-condensed .nav-inner { padding-top: 0.7rem; padding-bottom: 0.7rem; }
.nav-links { display: none; gap: 1.75rem; align-items: center; }
@media (min-width: 768px) { .nav-links { display: flex; } }

/* Mobile menu: JS toggle + overlay are hidden without .js; inline links shown. */
.nav-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-ink);
  background: none;
  border: 1px solid var(--color-ink);
  padding: 0.5rem 0.75rem;
}
:not(.js) .nav-toggle,
:not(.js) .js-mobile-menu { display: none; }
@media (min-width: 768px) { .nav-toggle { display: none; } }

.js-mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  padding: 0 1.5rem;
  background: var(--color-paper);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}
@media (prefers-reduced-motion: reduce) { .js-mobile-menu { transition: none; } }
.js-mobile-menu.open { opacity: 1; visibility: visible; }
.js-mobile-menu a {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 12vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  color: var(--color-ink);
}

/* No-JS mobile fallback: hidden once JS is present. */
.no-js-mobile-links {
  display: none;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.25rem 1.5rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
}
@media (max-width: 767px) {
  .js .no-js-mobile-links { display: none; }
  .no-js-mobile-links { display: flex; }
}
.no-js-mobile-links a { color: inherit; }

/* Skip link */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 1100;
  background: var(--color-paper);
  border: 2px solid var(--color-ink);
  color: var(--color-ink);
  padding: 0.75rem 1rem;
  font-family: var(--font-mono);
  font-size: 12px;
}
.skip-link:focus { position: fixed; left: 1rem; top: 1rem; }

/* ---------------------------------------------------------------------------
   Snap rail (Movie Recommendation showcase)
   --------------------------------------------------------------------------- */
.rail {
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--color-ink-muted) var(--color-rule);
}
.rail::-webkit-scrollbar { height: 8px; }
.rail::-webkit-scrollbar-track { background: var(--color-rule); }
.rail::-webkit-scrollbar-thumb { background: var(--color-ink-muted); }
@media (prefers-reduced-motion: no-preference) {
  .rail { scroll-snap-type: x proximity; }
  .rail > * { scroll-snap-align: start; }
}

/* ---------------------------------------------------------------------------
   Tech-ecosystem highlight
   --------------------------------------------------------------------------- */
.js [data-project-id] { transition: opacity 0.4s ease; }
.js .is-dimmed { opacity: 0.6; }
.js .is-dimmed:focus-within,
.js .is-dimmed:focus { opacity: 1; }
.js .is-lit { opacity: 1; }

/* Chip description reserve (AI + stack hint): showing never shifts layout. */
.chip-desc { min-height: 4.5rem; }

/* ---------------------------------------------------------------------------
   OM'KUMOH pinned stage (GSAP adds .is-pinned; static is the no-JS /
   reduced-motion / pre-hydration layout).
   --------------------------------------------------------------------------- */
.omkumoh-stage { position: relative; }
.omkumoh-stage.is-pinned { height: 100svh; overflow: hidden; }
.omkumoh-blueprint {
  background-image:
    linear-gradient(var(--color-rule) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-rule) 1px, transparent 1px);
  background-size: 48px 48px;
  background-color: var(--color-paper-deep);
}
.omkumoh-rect {
  border: 2px solid var(--color-ink);
  background: color-mix(in srgb, var(--color-paper) 82%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--color-ink-muted);
}
.omkumoh-panel { transition: opacity 0.4s ease; }
.omkumoh-progress {
  transform-origin: left;
  transform: scaleX(0);
  background: var(--color-flag-green);
}

/* ---------------------------------------------------------------------------
   Content-visibility for below-fold sections (exempts pinned stages).
   --------------------------------------------------------------------------- */
.cv { content-visibility: auto; contain-intrinsic-size: 1px 600px; }

/* ---------------------------------------------------------------------------
   Reduced-motion blanket catch-all
   --------------------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .js [data-reveal],
  .js [data-project],
  .js [data-term-line],
  [data-hero-move] { opacity: 1 !important; transform: none !important; }
}

/* ---------------------------------------------------------------------------
   Print: everything final-state and visible.
   --------------------------------------------------------------------------- */
@media print {
  [data-reveal],
  [data-project],
  [data-hero-move],
  [data-term-line] { opacity: 1 !important; transform: none !important; }
  .nav,
  .nav-toggle,
  .js-mobile-menu,
  .no-js-mobile-links,
  .cursor-dot,
  .cursor-pill,
  .back-to-top,
  .block-cursor { display: none !important; }
  .rail { overflow: visible !important; scroll-snap-type: none !important; }
  .omkumoh-stage.is-pinned { height: auto !important; overflow: visible !important; }
  body { overflow-x: visible !important; }
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint` — clean. Then `grep -c "em dash\|—"` not applicable; visually confirm the file has no em dashes in comments (use hyphens only).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: animation system + LCP/print/no-JS/reduced-motion contracts in globals.css"
```

---

### Task 3: Enhance `useReveal` + hero entrance helper

**Files:**
- Modify: `src/lib/useReveal.ts`
- Create: `src/components/HeroEntrance.tsx`

**Interfaces:**
- `useReveal(selector, threshold)` → returns a ref; adds `.is-in`. Unchanged signature.
- `HeroEntrance` → renders `null`; on mount adds `.is-in` to `[data-hero-move]` with per-index `transition-delay`.

- [ ] **Step 1: Keep `useReveal.ts` as-is** (signature and try/catch already correct; the translateY reveal is pure CSS from Task 2). No file change required — verify by reading it once.

- [ ] **Step 2: Create `src/components/HeroEntrance.tsx`**

```tsx
"use client";

import { useEffect } from "react";

/**
 * Adds .is-in to hero entrance targets after mount, with a per-element
 * stagger via inline transition-delay. Transform-only (see globals.css);
 * SSR + no-JS + reduced-motion users see the final state with no gating.
 */
export default function HeroEntrance() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hero-move]")
    );
    const raf = requestAnimationFrame(() => {
      els.forEach((el, i) => {
        el.style.transitionDelay = `${i * 90}ms`;
        el.classList.add("is-in");
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint` — clean; `npx tsc --noEmit` — clean.

- [ ] **Step 4: Commit**

```bash
git add src/lib/useReveal.ts src/components/HeroEntrance.tsx
git commit -m "feat: hero transform-only entrance helper"
```

---

### Task 4: Animation primitives — custom cursor + magnetic wrapper

**Files:**
- Create: `src/components/Cursor.tsx`
- Create: `src/components/Magnetic.tsx`

**Interfaces:**
- `Cursor` → renders fixed dot + label pill; adds `has-cursor` to `<html>` only when tracking; consumed globally in `page.tsx` (Task 12).
- `Magnetic({ children, strength, className })` → wraps CTAs; transform-only pointer-follow.
- Cursor labels: reads `data-cursor-label` attribute first, else auto-detects `a[href^="mailto:"]` → "SEND EMAIL", `a[href*="github.com"]` → "OPEN GITHUB", `[data-term]` → "REPLAY".

- [ ] **Step 1: Create `src/components/Cursor.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

function labelFor(el: Element | null): string | null {
  if (!el) return null;
  const labeled = el.closest<HTMLElement>("[data-cursor-label]");
  if (labeled?.dataset.cursorLabel) return labeled.dataset.cursorLabel;
  if (el.closest('a[href^="mailto:"]')) return "SEND EMAIL";
  if (el.closest('a[href*="github.com"]')) return "OPEN GITHUB";
  if (el.closest("[data-term]")) return "REPLAY";
  return null;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const dot = dotRef.current;
    const pill = pillRef.current;
    if (!dot || !pill) return;

    let raf = 0;
    let tx = 0, ty = 0, px = 0, py = 0;
    let shown = false;

    const track = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        px = tx;
        py = ty;
        try {
          document.documentElement.classList.add("has-cursor");
          setReady(true);
        } catch {
          /* leave the native cursor rather than risk losing it */
        }
      }
      const t = e.target as Element | null;
      setLabel((prev) => (prev === labelFor(t) ? prev : labelFor(t)));
    };

    const loop = () => {
      px += (tx - px) * 0.22;
      py += (ty - py) * 0.22;
      dot.style.transform = `translate3d(${tx - 4}px, ${ty - 4}px, 0)`;
      pill.style.transform = `translate3d(${px + 14}px, ${py + 14}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", track, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", track);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none">
      <div ref={dotRef} className="cursor-dot" hidden={!ready} />
      <div ref={pillRef} className="cursor-pill" hidden={!ready || !label}>
        {label ?? ""}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/Magnetic.tsx`**

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0, cx = 0, cy = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const loop = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint` and `npx tsc --noEmit` — clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cursor.tsx src/components/Magnetic.tsx
git commit -m "feat: custom cursor (labels) + magnetic CTA wrapper"
```

---

### Task 5: Navigation with keyboard contract + no-JS fallback

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- `Nav` → fixed bar + mobile overlay; active section `aria-current`; consumed by `<header>` in `page.tsx` (Task 12).
- Section ids targeted: `work`, `about`, `ai`, `stack`, `contact` (created in Tasks 7–11).

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "ai", label: "AI" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      els.forEach((el) => observer?.observe(el));
    } catch {
      /* leave active empty; nav links still navigate */
    }
    return () => observer?.disconnect();
  }, []);

  // Mobile overlay: Escape closes, focus is contained within the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      const menu = document.getElementById("mobile-menu");
      const target = e.target as Node | null;
      if (menu && target && !menu.contains(target)) {
        (document.getElementById("nav-toggle") as HTMLElement | null)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  // Body scroll lock while open; restore focus to the toggle on close.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        (document.getElementById("nav-toggle") as HTMLElement | null)?.focus();
      };
    }
  }, [open]);

  const close = () => setOpen(false);

  const linkCls = (id: string, large: boolean) =>
    `transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green ${
      active === id ? "text-ink" : "text-ink-muted hover:text-ink"
    } ${large ? "text-2xl" : "font-mono text-xs uppercase tracking-[0.25em]"}`;

  return (
    <nav
      aria-label="Primary"
      className={`nav ${scrolled ? "nav-condensed" : ""}`}
    >
      <div className="nav-inner">
        <a
          href="#top"
          onClick={close}
          className="font-display text-xl font-black tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
        >
          {site.name}
        </a>

        <div className="nav-links">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={linkCls(s.id, false)}
            >
              {s.label}
            </a>
          ))}
        </div>

        <button
          id="nav-toggle"
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`js-mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            className={linkCls(s.id, true)}
            onClick={close}
          >
            {s.label}
          </a>
        ))}
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
          {site.location}
        </p>
      </div>

      <nav aria-label="Mobile fallback" className="no-js-mobile-links">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </nav>
    </nav>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`, `npx tsc --noEmit` — clean. Confirm no em dashes in the file.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: scroll-aware nav with active-section spy, mobile overlay, no-JS fallback"
```

---

### Task 6: Rebuilt Hero + CodeTerminal

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)
- Create: `src/components/CodeTerminal.tsx`

**Interfaces:**
- Hero → renders `#top`; imports `HeroEntrance`, `Magnetic`, `CodeTerminal`. Uses `site.tagline.split(" & ")` and `site.tags`.
- CodeTerminal → SSR-final-state line settle; `data-term` + `data-cursor-label="REPLAY"`; fixed height; `aria-hidden` animated layer + `sr-only` transcript; single `setInterval` paused on `document.hidden`; replay button.

- [ ] **Step 1: Create `src/components/CodeTerminal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const LINES: { cmd: string; out?: string }[] = [
  { cmd: "whoami", out: "josua-uuyuni" },
  { cmd: 'echo "android · web · ai"', out: "android · web · ai" },
  { cmd: "cd MovieRecommendationSystem" },
  { cmd: "git push origin main", out: "→ github.com/Josua-dev" },
];

const transcript = LINES.map((l) => `$ ${l.cmd}${l.out ? `\n${l.out}` : ""}`).join("\n");

export default function CodeTerminal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-term-line]"));
    lines.forEach((l) => l.classList.remove("is-settled"));

    let i = 0;
    timerRef.current = setInterval(() => {
      if (document.hidden) return;
      if (i >= lines.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        return;
      }
      lines[i].classList.add("is-settled");
      i += 1;
    }, 180);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [round]);

  return (
    <div
      data-term
      data-cursor-label="REPLAY"
      onClick={() => setRound((r) => r + 1)}
      className="relative border border-ink bg-paper-deep shadow-[6px_6px_0_0_var(--color-rule)]"
    >
      {/* terminal chrome */}
      <div className="flex items-center justify-between border-b border-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
        <span>josua — ~/session</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full border border-flag-red" />
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full border border-flag-green" />
        </span>
      </div>

      {/* animated lines: aria-hidden; accessible text below */}
      <div ref={rootRef} aria-hidden="true" className="px-5 py-5 font-mono text-[13px] leading-[1.7] text-ink">
        {LINES.map((l) => (
          <p key={l.cmd} data-term-line>
            <span className="select-none text-flag-green">$ </span>
            {l.cmd}
            {l.out ? <span className="block text-ink-muted">{l.out}</span> : null}
          </p>
        ))}
        <p className="block-cursor" aria-hidden="true" />
      </div>

      {/* accessible transcript (sr-only) */}
      <p className="sr-only">{transcript}</p>

      {/* caption + replay */}
      <div className="flex items-center justify-between border-t border-rule px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
        <span>Illustrative session</span>
        <button
          type="button"
          onClick={() => setRound((r) => r + 1)}
          className="border border-ink px-2 py-1 text-ink transition-colors hover:bg-ink hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
        >
          replay
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Hero.tsx`**

```tsx
import { site } from "@/data/site";
import CodeTerminal from "./CodeTerminal";
import HeroEntrance from "./HeroEntrance";
import Magnetic from "./Magnetic";

const [identity1, identity2] = site.tagline.split(" & ");

export default function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-screen flex-col justify-center px-6 pb-24 pt-32 md:px-12"
    >
      {/* masthead top row */}
      <p data-hero-move className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-ink-muted">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-flag-green" />
          Portfolio · 2024&ndash;2026
        </span>
        <span className="hidden sm:inline">{site.location}</span>
      </p>

      <div data-hero-move className="mt-5 border-t-2 border-ink" />
      <div data-hero-move className="mt-1 border-t border-rule" />

      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 data-hero-move className="mt-10 font-display font-black tracking-[-0.01em] text-ink">
            <span className="block text-[clamp(4rem,15vw,11.5rem)] leading-[0.85]">
              JOSUA
            </span>
            <span className="block text-[clamp(1.5rem,5vw,3rem)] font-light italic text-ink-muted">
              {site.fullName.replace("Josua ", "")}
            </span>
          </h1>

          {/* identity line */}
          <p data-hero-move className="mt-8 font-display text-2xl font-semibold text-ink md:text-3xl">
            {identity1} <em className="text-flag-green">{identity2}</em>
          </p>

          {/* LCP element: transform-only, opacity always 1 */}
          <p data-hero-move className="mt-5 max-w-xl text-lg leading-relaxed text-ink">
            I build Android and web software modeled on Namibian systems: from
            a court case tracker to a road-fund dashboard.
          </p>

          <div data-hero-move className="mt-10 flex flex-wrap gap-5">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:bg-paper hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
              >
                View my work <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 border-2 border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-flag-green hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
              >
                Email me <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>

          {/* markers row */}
          <ul data-hero-move className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            {site.tags.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-flag-green" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* right: interactive technical visual */}
        <div data-hero-move>
          <CodeTerminal />
        </div>
      </div>

      <HeroEntrance />
    </section>
  );
}
```

- [ ] **Step 3: Verify**

- `npm run lint`, `npx tsc --noEmit` — clean.
- Grep the built hero for the LCP contract: the tagline `<p>` must have `data-hero-move` and **no** `opacity-0` / `[data-hero-move]` CSS must never set opacity. Confirm in globals.css (`@media (prefers-reduced-motion: no-preference) { .js [data-hero-move] { transform: translateY(18px) } ... }` — transform only).
- Confirm the tagline copy is the "modeled on" rewrite (no "in people's hands" / "government desk").

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/CodeTerminal.tsx
git commit -m "feat: rebuilt hero (split masthead + terminal) with LCP-safe entrance"
```

---

### Task 7: Projects data + showcase (4 varied layouts + compact ledger)

**Files:**
- Modify: `src/data/projects.ts` (add `id`, `featured`)
- Modify: `src/components/ProjectCard.tsx` (add `data-project-id`, cursor label)
- Create: `src/components/ProjectCover.tsx` (CSS/SVG covers: dossier, report, matrix)
- Create: `src/components/ProjectsShowcase.tsx`
- Delete: `src/components/Work.tsx`

**Interfaces:**
- `Project` gains `id: string` and `featured?: boolean`.
- `ProjectsShowcase` renders section `id="work"` + `aria-labelledby`; featured 01/02 cards with `data-project-id`, 03 = `<OmkumohStage />` (Task 8), 04 = snap rail with `data-project-id`, compact rows reuse `ProjectCard` (05/06).
- Card roots carry `data-cursor-label="VIEW PROJECT"` and `data-project-id`.

- [ ] **Step 1: Update `src/data/projects.ts`** — add `id` to the interface and to every entry; add `featured: true` to the first four, `featured: false` (or omit) for ATM + Phonebook. IDs: `moj`, `road-fund`, `omkumoh`, `movie-rec`, `atm`, `phonebook`.

- [ ] **Step 2: Update `src/components/ProjectCard.tsx`**

Add to the `<li>`: `data-project-id={project.id}` and `data-cursor-label="VIEW PROJECT"`. Keep everything else (ledger row, green→red marker, "View on GitHub →"). Update the `View on GitHub` link hover to stay within the cursor contract (it already has focus-visible ring).

- [ ] **Step 3: Create `src/components/ProjectCover.tsx`**

```tsx
/** Non-fabricated CSS/SVG covers. No images, no metrics, no numbers. */

export function DossierCover() {
  return (
    <div aria-hidden="true" className="relative aspect-[4/3] overflow-hidden border border-ink bg-paper-deep p-6">
      <div className="absolute left-6 top-0 h-3 w-24 border border-ink border-t-0 bg-paper" />
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">Case file · 001</p>
      <div className="mt-4 space-y-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-baseline gap-2">
            <span className="h-1.5 w-1.5 shrink-0 bg-flag-green" aria-hidden="true" />
            <span className="h-2 flex-1 border-b border-rule" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 right-0 border-l border-t border-ink bg-flag-green px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
        filed
      </div>
    </div>
  );
}

export function ReportCover() {
  return (
    <div aria-hidden="true" className="relative aspect-[4/3] overflow-hidden border border-ink bg-paper p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">Road maintenance · report</p>
        <span className="inline-block h-2 w-2 bg-flag-green" />
      </div>
      <div className="mt-5 space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-baseline justify-between border-b border-rule pb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              {["Section", "Location", "Severity", "Status"][i]}
            </span>
            <span className="h-2 w-2/3 border-b border-ink/40" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 right-6 -rotate-6 border-2 border-flag-red px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.25em] text-flag-red">
        Stamped
      </div>
    </div>
  );
}

export function MatrixCover() {
  const cells = [
    "9a281e", "0b5d3b", "eae1c8", "0b5d3b", "eae1c8", "eae1c8",
    "eae1c8", "eae1c8", "0b5d3b", "eae1c8", "0b5d3b", "eae1c8",
    "0b5d3b", "eae1c8", "eae1c8", "9a281e", "eae1c8", "0b5d3b",
  ];
  return (
    <div aria-hidden="true" className="aspect-[4/3] overflow-hidden border border-ink bg-paper p-6">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">Recommendation matrix</p>
      <div className="grid grid-cols-6 gap-1">
        {cells.map((c, i) => (
          <div key={i} className="aspect-square border border-ink/30" style={{ backgroundColor: `#${c}` }} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/ProjectsShowcase.tsx`**

```tsx
"use client";

import { projects } from "@/data/projects";
import { useReveal } from "@/lib/useReveal";
import ProjectCard from "./ProjectCard";
import { DossierCover, ReportCover, MatrixCover } from "./ProjectCover";
import OmkumohStage from "./OmkumohStage";

export default function ProjectsShowcase() {
  const root = useReveal("[data-reveal]", 0.15);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const [moj, roadFund] = featured; // 01, 02
  const movieRec = featured[3]; // 04

  return (
    <section ref={root} id="work" aria-labelledby="work-heading" className="px-6 py-28 md:px-12">
      <div className="mb-10 flex items-end justify-between">
        <h2 id="work-heading" className="font-display text-4xl font-black tracking-tight text-ink md:text-6xl">
          Selected work
        </h2>
        <p className="hidden font-mono text-xs uppercase tracking-[0.25em] text-ink-muted md:block">
          {projects.length} cases · 2024&ndash;2026
        </p>
      </div>
      <p data-reveal className="mb-16 max-w-xl text-ink-muted">
        Recent builds, all on GitHub: a case-tracking app modeled on a court
        workflow, a road-fund dashboard modeled on the RFA, a consulting-engineers
        website, and a movie recommender.
      </p>

      {/* 01 — MOJ: text left, cover right */}
      <article
        data-project-id={moj.id}
        data-cursor-label="VIEW PROJECT"
        className="grid items-center gap-10 border-t-2 border-ink py-14 md:grid-cols-2 md:gap-16"
      >
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flag-green">01 — Case tracking</p>
          <h3 className="mt-4 font-display text-3xl font-black text-ink md:text-5xl">{moj.title}</h3>
          <p className="mt-5 max-w-md text-ink-muted">{moj.blurb}</p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
            {moj.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            {moj.year} · {moj.role}
          </p>
          <a
            href={moj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-flag-green underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
          >
            View on GitHub <span aria-hidden="true">→</span>
          </a>
        </div>
        <div data-reveal className="group">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
            <DossierCover />
          </div>
        </div>
      </article>

      {/* 02 — Road Fund: cover left, text right */}
      <article
        data-project-id={roadFund.id}
        data-cursor-label="VIEW PROJECT"
        className="grid items-center gap-10 border-t-2 border-ink py-14 md:grid-cols-2 md:gap-16"
      >
        <div data-reveal className="order-2 md:order-1">
          <div className="group">
            <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
              <ReportCover />
            </div>
          </div>
        </div>
        <div data-reveal className="order-1 md:order-2">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flag-green">02 — Reporting dashboard</p>
          <h3 className="mt-4 font-display text-3xl font-black text-ink md:text-5xl">{roadFund.title}</h3>
          <p className="mt-5 max-w-md text-ink-muted">{roadFund.blurb}</p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
            {roadFund.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
            {roadFund.year} · {roadFund.role}
          </p>
          <a
            href={roadFund.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-flag-green underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
          >
            View on GitHub <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>

      {/* 03 — OM'KUMOH: immersive scroll-linked stage (Task 8) */}
      <OmkumohStage />

      {/* 04 — Movie Recommendation: horizontal snap rail */}
      <article
        data-project-id={movieRec.id}
        data-cursor-label="VIEW PROJECT"
        className="border-t-2 border-ink py-14"
      >
        <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <div data-reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-flag-green">04 — Machine learning</p>
            <h3 className="mt-4 font-display text-3xl font-black text-ink md:text-5xl">{movieRec.title}</h3>
            <p className="mt-5 max-w-md text-ink-muted">{movieRec.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              {movieRec.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a
              href={movieRec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-flag-green underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
            >
              View on GitHub <span aria-hidden="true">→</span>
            </a>
          </div>
          <div data-reveal className="min-w-0">
            <div className="rail flex snap-x gap-5 overflow-x-auto pb-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-64 shrink-0 snap-start sm:w-72">
                  <MatrixCover />
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
              Scroll the matrix ↔
            </p>
          </div>
        </div>
      </article>

      {/* 05 + 06 — compact ledger rows */}
      <ol className="mt-16 border-t border-ink">
        {rest.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i + 4} />
        ))}
      </ol>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
        Full source on GitHub:{" "}
        <a
          href="https://github.com/Josua-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-flag-green underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
        >
          github.com/Josua-dev
        </a>
      </p>
    </section>
  );
}
```

Note: `featured[3]` is `movie-rec` only if `featured` preserves order (it does — filter preserves order). Destructure safely: `const [, , , movieRec] = featured;`.

- [ ] **Step 5: Delete `src/components/Work.tsx`**

`rm src/components/Work.tsx` (page.tsx re-imports in Task 12; build will fail until then — acceptable mid-plan, resolved by Task 12).

- [ ] **Step 6: Verify**

Run `npx tsc --noEmit` — expect only the temporary unused-import/Work error until Task 12. Run `npm run lint`.

- [ ] **Step 7: Commit**

```bash
git add src/data/projects.ts src/components/ProjectCard.tsx src/components/ProjectCover.tsx src/components/ProjectsShowcase.tsx
git rm src/components/Work.tsx
git commit -m "feat: four varied featured project layouts + compact ledger rows"
```

---

### Task 8: OM'KUMOH scroll-linked GSAP stage

**Files:**
- Create: `src/components/OmkumohStage.tsx`

**Interfaces:**
- Renders section with `data-project-id="omkumoh"`, `data-cursor-label="VIEW PROJECT"`.
- Static layout (SSR / no-JS / reduced-motion): blueprint on paper, rects in a row, all 3 info panels visible, GitHub link focusable.
- Pinned layout (GSAP + no-preference + IO near): `.is-pinned` → `h-[100svh]`, rects scattered, panels crossfade by scrub progress, camera dot travels a diagonal, progress rail fills. Inactive panels `inert` + `aria-hidden`.
- Uses dynamic `import("gsap")` / `import("gsap/ScrollTrigger")`; `gsap.matchMedia`; `ScrollTrigger.refresh()` on window load.

- [ ] **Step 1: Create `src/components/OmkumohStage.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const RECTS = [
  { id: "A", x: "10%", y: "28%", w: "20%", h: "30%", label: "A" },
  { id: "B", x: "48%", y: "16%", w: "26%", h: "22%", label: "B" },
  { id: "C", x: "36%", y: "58%", w: "24%", h: "24%", label: "C" },
];

const PANELS = [
  {
    title: "OM'KUMOH Consulting Engineers",
    body: "A Next.js 16 website with a 3D campus scene and a GSAP scroll-driven camera.",
    stack: ["Next.js 16", "TypeScript", "GSAP", "3D"],
    url: "https://github.com/Josua-dev/omkumoh-website",
  },
];

function Panel({ index, active, panel }: { index: number; active: number; panel: (typeof PANELS)[0] }) {
  const isActive = active === index;
  return (
    <div
      data-omkumoh-panel
      className={`omkumoh-panel ${isActive ? "opacity-100" : "opacity-0"}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-flag-green">
        {["Project", "Stack", "Open source"][index]}
      </p>
      <h3 className="mt-3 font-display text-2xl font-black text-ink md:text-4xl">{panel.title}</h3>
      <p className="mt-3 max-w-md text-ink-muted">{panel.body}</p>
      {index === 0 ? (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
          {panel.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : null}
      {index === 2 ? (
        <a
          href={panel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-flag-green underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
        >
          View on GitHub <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </div>
  );
}

export default function OmkumohStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    let io: IntersectionObserver | null = null;
    let ctx: gsap.Context | null = null;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).gsap;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      section.classList.add("is-pinned");

      const cam = section.querySelector<HTMLElement>("[data-omkumoh-cam]");
      const progress = section.querySelector<HTMLElement>("[data-omkumoh-progress]");
      const rects = section.querySelectorAll<HTMLElement>("[data-omkumoh-rect]");
      const rect = section.getBoundingClientRect();

      ctx = gsap.context(() => {
        gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=240%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const idx = self.progress < 0.33 ? 0 : self.progress < 0.66 ? 1 : 2;
                setActive(idx);
                if (progress) progress.style.transform = `scaleX(${self.progress})`;
              },
            },
          });
          if (cam) {
            tl.fromTo(cam, { x: 0, y: 0 }, { x: rect.width * 0.82, y: -rect.height * 0.62, duration: 1, ease: "none" }, 0);
          }
          rects.forEach((r, i) => {
            tl.fromTo(
              r,
              { y: 0, rotate: 0 },
              { y: i % 2 ? -14 : 14, rotate: i % 2 ? 2 : -2, duration: 1, ease: "none" },
              0
            );
          });
          return () => {};
        });
      }, section);

      cleanup = () => {
        ctx?.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            init();
            io?.disconnect();
          }
        });
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(section);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      io?.disconnect();
      cleanup?.();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="OM'KUMOH, scroll-linked"
      data-project-id="omkumoh"
      data-cursor-label="VIEW PROJECT"
      className="omkumoh-stage my-20 border-t-2 border-ink border-b border-ink"
    >
      {/* blueprint field */}
      <div className="omkumoh-blueprint relative h-[70vh] overflow-hidden md:h-[85vh]">
        {/* heading (static in both modes) */}
        <div className="relative z-10 p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flag-green">03 — Scroll the scene</p>
          <h3 className="mt-3 max-w-xl font-display text-3xl font-black text-ink md:text-5xl">
            OM&apos;KUMOH Consulting Engineers
          </h3>
        </div>

        {/* abstract campus schematic — static row collapses to scattered when pinned */}
        <div className="is-pinned:absolute is-pinned:inset-0 relative z-10 flex h-[40%] items-center justify-center gap-6 px-6">
          {RECTS.map((r, i) => (
            <div
              key={r.id}
              data-omkumoh-rect
              className="omkumoh-rect"
              style={i === 0 ? {} : undefined}
            >
              <span>{r.label}</span>
            </div>
          ))}
        </div>

        {/* camera dot on a diagonal (start position set here; GSAP moves it) */}
        <span
          data-omkumoh-cam
          className="absolute left-[8%] top-[80%] hidden h-3 w-3 rounded-full bg-flag-red md:block is-pinned:block"
          aria-hidden="true"
        />

        {/* progress rail */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-rule">
          <div data-omkumoh-progress className="omkumoh-progress h-full w-full" />
        </div>
      </div>

      {/* info panels: static mode stacks them below; pinned mode overlays */}
      <div className="grid gap-6 p-6 md:p-10 is-pinned:absolute is-pinned:inset-0 is-pinned:z-20 is-pinned:grid-cols-3 is-pinned:items-end is-pinned:p-10">
        {PANELS.map((p, i) => (
          <Panel key={i} index={i} active={active} panel={p} />
        ))}
      </div>
    </section>
  );
}
```

Note: `is-pinned:*` are custom Tailwind variants — **not available by default.** Instead, the pinned layout must come from the `.omkumoh-stage.is-pinned` CSS. Add to globals.css (Task 2 already created the base classes; extend in this task):

```css
.omkumoh-stage.is-pinned .omkumoh-rects { position: absolute; inset: 0; align-items: center; justify-content: space-evenly; }
.omkumoh-stage.is-pinned .omkumoh-panels { position: absolute; inset: 0; z-index: 20; display: grid; grid-template-columns: repeat(3, 1fr); align-items: end; gap: 2rem; padding: 2.5rem; }
.omkumoh-stage.is-pinned .omkumoh-cam { display: block; }
```

So restructure the JSX: rects container gets `class="omkumoh-rects flex h-[40%] items-center justify-center gap-6 px-6"`, panels container gets `class="omkumoh-panels grid gap-6 p-6 md:p-10"`, cam gets `class="omkumoh-cam hidden md:block"`. Use these utility classes; drop `is-pinned:*` variants.

- [ ] **Step 2: Verify**

- `npm run lint`, `npx tsc --noEmit` — clean (ignore the pending Work.tsx deletion error if still present until Task 12).
- Manual: `npm run dev`, open `/`, scroll to OM'KUMOH — the blueprint pins for ~2.4 viewport heights, panels crossfade (Project → Stack → Open source), progress rail fills, camera dot travels. With DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`, the section must **not** pin — it stays a static stacked layout.

- [ ] **Step 3: Commit**

```bash
git add src/components/OmkumohStage.tsx src/app/globals.css
git commit -m "feat: OM'KUMOH scroll-linked GSAP stage (matchMedia-gated, IO-lazy-loaded)"
```

---

### Task 9: AI Enthusiast section (honest chips)

**Files:**
- Create: `src/components/AiSection.tsx`

**Interfaces:**
- Section `id="ai"`, `aria-labelledby="ai-heading"`.
- All six chip descriptions rendered **always** in a ruled list (no-JS/reduced-motion safe); hover/focus on a chip highlights its matching description (`.is-desc-lit`) and dims the others. Chips are `<ul><li><button aria-describedby>`; under no-JS they render as `<span>`s (via `mounted` gate). Coarse pointers: all descriptions at full contrast.

- [ ] **Step 1: Create `src/components/AiSection.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/lib/useReveal";

const CHIPS = [
  { id: "llms", label: "LLMs", desc: "Large language models. I'm studying how they're built, from the data up." },
  { id: "ml", label: "Machine Learning", desc: "My first hands-on pass was the movie recommender." },
  { id: "agents", label: "AI Agents", desc: "Models that act on their own. Reading about them, nothing shipped yet." },
  { id: "rag", label: "RAG", desc: "Retrieval-augmented generation: how a model answers using sources it can fetch." },
  { id: "integrations", label: "AI Integrations", desc: "Wiring model calls into software. A goal, not yet a skill." },
  { id: "python", label: "Python", desc: "My main language for the recommender and ATM projects." },
];

export default function AiSection() {
  const root = useReveal("[data-reveal]", 0.15);
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) setCoarse(true);
  }, []);

  const isLit = (id: string) => active === id || coarse;

  return (
    <section ref={root} id="ai" aria-labelledby="ai-heading" className="cv px-6 py-28 md:px-12">
      <p data-reveal className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
        AI Enthusiast
      </p>
      <h2 data-reveal id="ai-heading" className="max-w-3xl font-display text-4xl font-black leading-tight text-ink md:text-6xl">
        Learning how LLMs are built, <em className="text-flag-green">from the ground up</em>.
      </h2>
      <p data-reveal className="mt-6 max-w-2xl text-ink-muted">
        I&apos;m early in this. My movie recommender got me started on turning
        descriptions into features and matching them against preferences.
      </p>

      <ul data-reveal className="mt-12 flex flex-wrap gap-3">
        {CHIPS.map((c) => (
          <li key={c.id}>
            {mounted ? (
              <button
                type="button"
                aria-pressed={isLit(c.id)}
                aria-describedby={`ai-desc-${c.id}`}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green ${
                  isLit(c.id)
                    ? "border-flag-green bg-flag-green text-paper"
                    : "border-ink text-ink hover:border-flag-green"
                }`}
              >
                {c.label}
              </button>
            ) : (
              <span className="inline-block border border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      <ul data-reveal className="mt-10 max-w-2xl border-t border-ink">
        {CHIPS.map((c, i) => (
          <li
            key={c.id}
            id={`ai-desc-${c.id}`}
            className={`border-b border-rule py-4 transition-opacity ${
              isLit(c.id) ? "opacity-100" : "opacity-40"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-flag-green">{c.label}</p>
            <p className="mt-1 text-ink">{c.desc}</p>
          </li>
        ))}
      </ul>

      <a
        data-reveal
        href="https://github.com/Josua-dev/MovieRecommendationSystem"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-flag-green underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green"
      >
        The one that started it: Movie Recommendation System <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

- `npm run lint`, `npx tsc --noEmit` — clean.
- No-JS (DevTools → disable JS): chips render as spans, all six descriptions at full opacity.

- [ ] **Step 3: Commit**

```bash
git add src/components/AiSection.tsx
git commit -m "feat: honest AI Enthusiast section with learning-stance chips"
```

---

### Task 10: Interactive tech ecosystem (replaces Skills)

**Files:**
- Create: `src/components/TechEcosystem.tsx`
- Delete: `src/components/Skills.tsx`

**Interfaces:**
- Section `id="stack"`, `aria-labelledby="stack-heading"`.
- Hover/focus a tech button → `.is-lit` on matching `[data-project-id]` cards, `.is-dimmed` on others. AI "exploring" chips (no targets) dim all + show hint "no public project yet — learning in public". No-JS: items render as `<span>`s. `aria-pressed` on active button.
- Categories strictly from project stacks: WEB (JavaScript→moj, TypeScript→road-fund+omkumoh, Next.js 16→omkumoh, GSAP→omkumoh, Dashboards→road-fund), BACKEND (Python→movie-rec+atm, Java→phonebook, CLI tools→atm+phonebook, Data Modeling→moj), MOBILE (Android→none), AI · EXPLORING (Python·ML→movie-rec; LLMs/RAG/Agents/Integrations→none).

- [ ] **Step 1: Create `src/components/TechEcosystem.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/lib/useReveal";

type Tech = {
  label: string;
  targets: string[];
  exploring?: boolean;
};

const GROUPS: { name: string; items: Tech[] }[] = [
  {
    name: "Web",
    items: [
      { label: "JavaScript", targets: ["moj"] },
      { label: "TypeScript", targets: ["road-fund", "omkumoh"] },
      { label: "Next.js 16", targets: ["omkumoh"] },
      { label: "GSAP", targets: ["omkumoh"] },
      { label: "Dashboards", targets: ["road-fund"] },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Python", targets: ["movie-rec", "atm"] },
      { label: "Java", targets: ["phonebook"] },
      { label: "CLI tools", targets: ["atm", "phonebook"] },
      { label: "Data Modeling", targets: ["moj"] },
    ],
  },
  {
    name: "Mobile",
    items: [{ label: "Android", targets: [] }],
  },
  {
    name: "AI · exploring",
    items: [
      { label: "Python · ML", targets: ["movie-rec"] },
      { label: "LLMs", targets: [], exploring: true },
      { label: "RAG", targets: [], exploring: true },
      { label: "AI Agents", targets: [], exploring: true },
      { label: "AI Integrations", targets: [], exploring: true },
    ],
  },
];

const EXPLORE_HINT = "No public project yet — learning in public.";

export default function TechEcosystem() {
  const root = useReveal("[data-reveal]", 0.15);
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Apply highlight classes to project cards across the page.
  useEffect(() => {
    if (!active) {
      document.querySelectorAll<HTMLElement>("[data-project-id]").forEach((el) => {
        el.classList.remove("is-lit", "is-dimmed");
      });
      return;
    }
    const tech = GROUPS.flatMap((g) => g.items).find((t) => t.label === active);
    const targets = new Set(tech?.targets ?? []);
    document.querySelectorAll<HTMLElement>("[data-project-id]").forEach((el) => {
      const id = el.dataset.projectId ?? "";
      const matched = targets.has(id);
      el.classList.toggle("is-lit", matched);
      el.classList.toggle("is-dimmed", !matched);
    });
  }, [active]);

  const activeIsExploring =
    !!active &&
    !!GROUPS.flatMap((g) => g.items).find((t) => t.label === active)?.exploring;

  return (
    <section ref={root} id="stack" aria-labelledby="stack-heading" className="cv px-6 py-28 md:px-12">
      <p data-reveal className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
        Toolkit
      </p>
      <h2 data-reveal id="stack-heading" className="font-display text-4xl font-black tracking-tight text-ink md:text-6xl">
        The stack I build with
      </h2>
      <p data-reveal className="mt-6 max-w-2xl text-ink-muted">
        Hover or focus a tool to highlight the projects it appears in.
      </p>

      <div data-reveal className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.name} className="border-t-2 border-ink">
            <h3 className="pt-3 font-display text-lg font-semibold text-ink">{g.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li key={t.label}>
                  {mounted ? (
                    <button
                      type="button"
                      aria-pressed={active === t.label}
                      aria-describedby="stack-hint"
                      onMouseEnter={() => setActive(t.label)}
                      onFocus={() => setActive(t.label)}
                      onMouseLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green ${
                        active === t.label
                          ? "border-flag-green bg-flag-green text-paper"
                          : "border-rule text-ink hover:border-ink"
                      }`}
                    >
                      {t.label}
                    </button>
                  ) : (
                    <span className="inline-block border border-rule px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-ink">
                      {t.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* hint line — reserved height, never shifts layout */}
      <p
        id="stack-hint"
        aria-live="polite"
        className="chip-desc mt-8 font-mono text-xs uppercase tracking-[0.25em] text-flag-green"
      >
        {activeIsExploring ? EXPLORE_HINT : " "}
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Delete `src/components/Skills.tsx`**

`rm src/components/Skills.tsx` (page.tsx re-imports in Task 12; temporary build error acceptable).

- [ ] **Step 3: Verify**

- `npm run lint`, `npx tsc --noEmit`.
- No-JS: tech items render as spans (SSR), no `.is-dimmed` (JS-gated CSS). Reduced-motion: no visual penalty (highlight is instant).
- Hover "Python" → Movie Rec + ATM cards light; others dim to 0.6 (never below, per `is-dimmed` floor). Hover "LLMs" → hint "No public project yet — learning in public." appears; all cards dim.

- [ ] **Step 4: Commit**

```bash
git add src/components/TechEcosystem.tsx
git rm src/components/Skills.tsx
git commit -m "feat: interactive tech ecosystem rebuilt from real project stacks with honest AI exploring state"
```

---

### Task 11: Contact upgrade + new Footer

**Files:**
- Modify: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

**Interfaces:**
- Contact → section `id="contact"`, `aria-labelledby="contact-heading"`; h2 "Have something worth building?"; intro "I'm open to Android, web, and AI work. Email is fastest."; `site.tags` row; channel rows Email (mailto, `external=false`) + GitHub; keep the red "OPEN TO WORK" stamp; **© colophon moves to Footer**.
- Footer → real `<footer>` landmark: rule, mono dateline + blinking `.block-cursor`, back-to-top `#top`, colophon, "Built in Windhoek, Namibia". No em dashes.

- [ ] **Step 1: Rewrite `src/components/Contact.tsx`**

```tsx
import { site } from "@/data/site";

const links = [
  { label: "Email", href: `mailto:${site.contact.email}`, external: false },
  { label: "GitHub", href: site.contact.github, external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-6">
          <p className="pt-1 font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
            Contact
          </p>
          <span className="border-2 border-flag-red px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-flag-red">
            Open to work
          </span>
        </div>

        <h2 id="contact-heading" className="mt-10 max-w-3xl font-display text-4xl font-black leading-tight text-ink md:text-7xl">
          Have something <em className="text-flag-green">worth building</em>?
        </h2>
        <p className="mt-6 max-w-md text-ink-muted">
          I&apos;m open to Android, web, and AI work. Email is fastest.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3" aria-label="What I work on">
          {site.tags.map((t) => (
            <li
              key={t}
              className="border border-ink px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-ink"
            >
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-14 border-t-2 border-ink">
          {links.map((l) => (
            <li key={l.label} className="border-b border-rule">
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-6 py-5 font-display text-2xl font-medium text-ink transition-colors hover:text-flag-green focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green md:text-3xl"
              >
                <span>
                  {l.label === "Email" ? "Send me an email" : "View my work"}{" "}
                  <span aria-hidden="true">→</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
                  {l.href.replace("mailto:", "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="px-6 pb-12 pt-6 md:px-12">
      <div className="border-t-2 border-ink pt-8">
        <p className="flex items-center font-mono text-xs uppercase tracking-[0.3em] text-ink-muted">
          Windhoek · Namibia
          <span className="block-cursor" aria-hidden="true" />
        </p>

        <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
          <a href="#top" className="back-to-top underline decoration-1 underline-offset-4 transition-colors hover:text-flag-green focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green">
            Back to top ↑
          </a>
          <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 transition-colors hover:text-flag-green focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green">
            GitHub
          </a>
          <a href={`mailto:${site.contact.email}`} className="underline decoration-1 underline-offset-4 transition-colors hover:text-flag-green focus:outline-none focus-visible:ring-2 focus-visible:ring-flag-green">
            Email
          </a>
        </nav>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted">
          © 2026 · {site.fullName} · Built in Windhoek, Namibia.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify**

- `npm run lint`, `npx tsc --noEmit` — clean.
- No em dashes anywhere in either file.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: contact upgrade + dedicated footer landmark"
```

---

### Task 12: Wire the page — landmarks, sections, cursor

**Files:**
- Modify: `src/app/page.tsx` (rewrite)

**Interfaces:**
- Consumes: Hero, Manifesto (needs visually-hidden h2), ProjectsShowcase, About (add `aria-labelledby`), AiSection, TechEcosystem, Contact, Footer, Nav, Cursor, HeroEntrance.
- Produces: `<header>` + `<main id="main" tabIndex={-1}>` + `<footer>`; skip link first in DOM.

- [ ] **Step 1: Update `src/components/Manifesto.tsx`** — add a visually-hidden h2 inside the blockquote section: `<h2 className="sr-only">Manifesto</h2>`.

- [ ] **Step 2: Update `src/components/About.tsx`** — add `id="about-heading"` to its `<h2>` and `aria-labelledby="about-heading"` to the `<section>`.

- [ ] **Step 3: Rewrite `src/app/page.tsx`**

```tsx
import About from "@/components/About";
import AiSection from "@/components/AiSection";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TechEcosystem from "@/components/TechEcosystem";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header>
        <Nav />
      </header>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Manifesto />
        <ProjectsShowcase />
        <About />
        <AiSection />
        <TechEcosystem />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </>
  );
}
```

- [ ] **Step 4: Verify**

- `npm run lint`, `npx tsc --noEmit` — clean (Work.tsx / Skills.tsx imports gone).
- `npm run build` — clean, all routes static.
- Grep built HTML for the no-JS contract: `document.documentElement.classList.add('js')` present; `[data-reveal]`/`[data-project]` elements present with no inline `opacity: 0` (gate is CSS-only).
- Console: `npm run dev`, check DevTools console for zero errors/warnings from the new components.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/Manifesto.tsx src/components/About.tsx
git commit -m "feat: wire page landmarks, section order, custom cursor"
```

---

### Task 13: QA — lint, build, contracts, Lighthouse, responsive

**Files:**
- None new. Verification pass.

- [ ] **Step 1: Static checks**

- `npm run lint` → 0 errors / 0 warnings.
- `npm run build` → clean, all routes static.
- `npx tsc --noEmit` → clean.
- Grep `src/` for em dashes (U+2014 `—` and `&mdash;`) → zero in rendered copy. En dashes only in `2024&ndash;2026` / `2024–2026`.

- [ ] **Step 2: Reduced-motion contract**

With DevTools → Rendering → `prefers-reduced-motion: reduce`: refresh — no movement anywhere (hero static, reveals final, terminal all lines visible, OM'KUMOH not pinned). Confirm the blanket catch-all + explicit overrides in globals.css hold.

- [ ] **Step 3: No-JS contract**

DevTools → Disable JS → reload: hero fully visible (no opacity gate), all sections visible, nav shows inline fallback links, tech items are spans, AI descriptions all visible, OM'KUMOH static stacked, terminal shows final lines.

- [ ] **Step 4: Print contract**

DevTools → Print preview (or `window.print()`): every section visible (reveals forced final), nav/cursor/back-to-top hidden, Movie Rec rail fully visible.

- [ ] **Step 5: Lighthouse**

Serve the production build locally, run Lighthouse (Desktop): Performance ≥ 90, Accessibility 100, Best-practices ≥ 90, SEO 100. Check CLS ≈ 0 and no console errors (Lighthouse Best-practices BP). If hero entrance or terminal hurts LCP, verify the tagline still uses transform-only and the terminal frame paints immediately.

- [ ] **Step 6: Responsive check**

Manually verify 320 / 375 / 414 / 768 / 1024 / 1440px+: hero stacks, terminal fits, nav mobile overlay opens/traps/escapes, showcase cards collapse, rail scrolls with visible scrollbar, OM'KUMOH pins on desktop and stacks on mobile, footer wraps.

- [ ] **Step 7: Commit** (fix anything found first)

```bash
git add -A
git commit -m "chore: QA pass — lint, build, contracts, Lighthouse, responsive"
```

---

### Task 14: Verification workflow + self-critique

**Files:**
- None new.

- [x] **Step 1: Run the 4-parallel-reviewer verification workflow**

Use the `Workflow` tool (ultracode): 4 parallel reviewers — a11y, performance, visual/design, authenticity — over the full diff vs `ec45319` (or vs HEAD~1). Each returns findings (severity + area + recommendation). Verify every CRITICAL/IMPORTANT finding against the built app; apply or consciously reject each.

Result: 8 confirmed findings (2 CRITICAL, 6 IMPORTANT) + 28 MINOR/NIT, all verified. All 8 confirmed + the accepted MINOR/NIT batch applied in commit `fix: apply verification findings + self-critique polish`. See #44–#51 for the fix tasks.

- [x] **Step 2: Self-critique**

Before the final commit, re-read the redesigned page as a visitor: does the OM'KUMOH scroll read as "built", does the hero scream "actually builds things", does any AI copy overclaim? Fix copy/visual issues found.

Re-read all sections from a visitor's stance. No copy/visual changes warranted: the hero is LCP-safe and builds-things-forward, OM'KUMOH reads as built (scroll scene + facets), and all AI copy is deliberately modest ("early in this", "nothing shipped yet").

### MINOR/NIT apply/reject log

**Applied:**
1. Nav toggle focus ring — added `focus-visible:ring-2 ring-flag-green`.
2. Nav active marker — `[aria-current="true"]` gets a flag-green underline (`::after` in globals.css).
3. Dropped `aria-pressed` from AiSection + TechEcosystem chips; they're highlight controls, not toggle buttons.
4. CodeTerminal — explicit `min-h` reserve on the code block so the settle reveal can't shift the caption row.
5. Kicker middots normalized to spaced `01 · Case tracking` form (ProjectsShowcase ×3, OmkumohStage ×1).
6. `.chip-desc` hint reserve 4.5rem → 2.5rem (one short line on md+, two max on narrow phones; 4.5rem read as dead space).
7. OM'KUMOH rects `flex-wrap: wrap` + `align-content: center` under ~430px so the three blocks never overflow one row.
8. Movie-rec text column got `min-w-0` so long stack words can't blow out the `1fr` grid column.
9. Cursor pill offset +12/+14px below-right of the pointer, clamped inside the viewport (labels up to ~110px).
10. Print rail renders as a 2-column grid (`.rail > * { width: 100% }`) instead of one cut-off scroll row.
11. Magnetic — `getBoundingClientRect` moved inside the rAF so the layout read stays batched with the write (one per frame, never a forced reflow per pointermove). Caching at enter was explicitly rejected: the element's own pull-transform shifts it, so the rect must be current at write time.
12. OM'KUMOH IO `rootMargin` 400px → 1200px — the `.is-pinned` height collapse from static flow height to 100svh must complete well below the fold or a scroll jump is visible at pin-in.

**Consciously rejected:**
- OM'KUMOH pinned-stage GitHub link focusability — the single visible facet is the focusable one; hidden facets are `opacity-0` + `inert` + `aria-hidden`, which is the intended crossfade contract (WCAG 2.4.3 focus order is unaffected by design).
- CodeTerminal clickable root div — a real `<button>` (replay) already satisfies WCAG 2.1.1; the pointer-cursor affordance over the whole terminal is intended.
- HeroEntrance 1.2s stagger — deliberate editorial pacing; not a defect.
- OM'KUMOH duplicate scene title (facets repeat the title) — the scene header is part of the "art"; the facets are data.
- Hero "Android" claim — plan-approved tagline-level, verifiable against the GitHub repos.
- TechEcosystem heading stays "The stack I build with" — the `· exploring` group label delimits the not-yet-built subset honestly.

- [x] **Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: apply verification findings + self-critique polish"
```

---

### Task 15: Commit, push, final report

- [ ] **Step 1: Final commit + push**

```bash
git add -A
git commit -m "feat: interactive Software Developer & AI Enthusiast portfolio redesign"
git push origin main
```

- [ ] **Step 2: Final report**

Write the 6-section report: (1) what changed, (2) skills/tools invoked, (3) animations added, (4) how the AI Enthusiast identity was introduced, (5) which projects got the biggest upgrades, (6) remaining improvements / known risks.
