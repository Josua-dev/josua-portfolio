# Josua Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a single-page, cinematic personal-brand portfolio for Josua — Android & software developer in Windhoek, Namibia — as a Next.js 16 + Tailwind v4 site.

**Architecture:** A statically-rendered Next.js App Router site. All content (projects, contact, skills) lives in typed data files (`src/data/`). Sections are React client components using GSAP + lenis for scroll-driven reveal/parallax/marquee. No runtime fetch — everything is build-time static. A single dark theme with an aurora (violet→magenta→amber) gradient accent.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/postcss`), GSAP 3.15 (scroll-telling), lenis 1.3 (smooth scroll), next/font (Space Grotesk display + JetBrains Mono). Versions mirror the user's existing `omkumoh-website` project so the toolchain is already proven on this machine.

## Global Constraints

- **Framer:** `framer-motion@^12`, **gsap** `^3.15.0`, **lenis** `^1.3.25`.
- **Next.js:** `16.2.11`, **react/react-dom** `19.2.4`, **tailwindcss** `^4`, **@tailwindcss/postcss** `^4`, **typescript** `^5`, **eslint-config-next** `16.2.11`.
- **Dark theme only** — single intentional dark palette, no dark/light toggle.
- **Accent gradient:** violet → magenta → amber (Namibian sunset). Define once as a CSS custom property / Tailwind token.
- **No runtime fetch.** No CMS, no contact-form backend. Static export-friendly.
- **Contact channels:** GitHub `https://github.com/Josua-dev`, Email `joshua7919859@gmail.com`, LinkedIn + WhatsApp = placeholders in `src/data/site.ts`.
- **Avatar:** `https://avatars.githubusercontent.com/u/183984329?v=4`.
- **External links:** `target="_blank" rel="noopener noreferrer"`.
- **Reduced motion:** respect `prefers-reduced-motion` (degrade scroll anims to simple reveals).
- **Quality bar:** `next build` and `next lint` pass clean; Lighthouse ≥ 90; WCAG AA contrast; keyboard-navigable.

---

## File Structure

```
josua-portfolio/
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata, Lenis provider
│   │   ├── globals.css         # Tailwind import, theme tokens, base styles
│   │   └── page.tsx            # Composes all section components
│   ├── components/
│   │   ├── providers/
│   │   │   └── SmoothScroll.tsx    # Lenis smooth-scroll provider (client)
│   │   ├── Hero.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Work.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   └── Marquee.tsx
│   └── data/
│       ├── projects.ts         # Typed project data (curated 6)
│       └── site.ts             # Name, tagline, contact channels, avatar
├── public/
│   └── noise.svg               # subtle film-grain texture
└── docs/
    └── superpowers/
        ├── specs/2026-08-06-portfolio-design.md
        └── plans/2026-08-06-portfolio-implementation.md
```

**Decomposition rationale:**
- `src/data/` holds all content — projects and site config — so copy and contact live in one obvious place and can be edited without touching components.
- One component per section (`Hero`, `Manifesto`, `Work`, `About`, `Skills`, `Contact`), each self-contained and independently testable.
- `SmoothScroll` is a client-only provider wrapping children in Lenis; kept separate so the root layout can be a server component.
- `ProjectCard` is a pure presentational component consuming a `Project` object — reused by `Work`.
- `Marquee` is a tiny reusable text-streak used by Hero/Manifesto.
- `globals.css` centralizes the aurora gradient + all theme tokens as CSS custom properties consumed by Tailwind v4 `@theme`.

---
### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/` (dir)
- Modify: `docs/superpowers/specs/2026-08-06-portfolio-design.md` (no change)

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a runnable `next dev` shell with Tailwind wired, fonts set up, and `src/app/layout.tsx` exposing `<SmoothScroll>`-ready structure. Later tasks add section components to `src/components/`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "josua-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "gsap": "^3.15.0",
    "lenis": "^1.3.25",
    "next": "16.2.11",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.11",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is not required (deploy target = Vercel), but output is
  // fully static anyway since no runtime data fetch exists.
};

export default nextConfig;
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Create `eslint.config.mjs`**

```js
import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
]);
```

- [ ] **Step 6: Create `.gitignore`**

```
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
.DS_Store
.env*
```

- [ ] **Step 7: Create `src/app/globals.css`** (Tailwind v4 + theme tokens)

```css
@import "tailwindcss";

@theme {
  --font-display: var(--font-display-family), sans-serif;
  --font-mono: var(--font-mono-family), monospace;

  --color-ink: #0b0b0f;
  --color-ink-soft: #14141b;
  --color-ink-card: #181822;
  --color-fog: #c8c8d2;
  --color-dim: #8b8b9c;

  --color-aurora-violet: #8b5cf6;
  --color-aurora-magenta: #ec4899;
  --color-aurora-amber: #f59e0b;

  --animate-marquee: marquee 28s linear infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
}

:root {
  --font-display-family: var(--font-space-grotesk);
  --font-mono-family: var(--font-jetbrains-mono);
}

html {
  scroll-behavior: auto;
  background: var(--color-ink);
  color: var(--color-fog);
}

body {
  margin: 0;
  font-family: var(--font-mono);
  background: var(--color-ink);
  color: var(--color-fog);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-aurora-magenta);
  color: #fff;
}

/* Aurora gradient text helper */
.text-aurora {
  background: linear-gradient(90deg, var(--color-aurora-violet), var(--color-aurora-magenta), var(--color-aurora-amber));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* No-JS fallback: reveal targets are only hidden when JS is running. */
.js [data-reveal] { opacity: 0; }
.js [data-reveal].is-in { opacity: 1; }
[data-reveal] { transition: opacity 0.7s ease; }

@media (prefers-reduced-motion: reduce) {
  .js [data-reveal] { opacity: 1 !important; }
}
```

- [ ] **Step 8: Create `src/app/layout.tsx`** (root layout, fonts, metadata)

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Josua — Android & Software Developer · Windhoek",
  description:
    "Josua is an Android & software developer in Windhoek, Namibia, building for the Namibian market. Explore selected work, projects and skills.",
  metadataBase: new URL("https://josua.dev"),
  openGraph: {
    title: "Josua — Android & Software Developer",
    description:
      "Android & software developer building for the Namibian market.",
    url: "https://josua.dev",
    siteName: "Josua",
    locale: "en_NA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Marks the page as JS-enabled so reveal targets are hidden only when
            JS runs; without this, content stays visible with no JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Create `src/app/page.tsx`** (placeholder composition; sections added later)

```tsx
export default function Home() {
  return (
    <main>
      {/* Sections added in Tasks 3-8 */}
    </main>
  );
}
```

- [ ] **Step 10: Create `src/components/providers/SmoothScroll.tsx`**

```tsx
"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced-motion: disable Lenis entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  }, []);

  return (
    <ReactLenis root options={{ duration: 1.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 11: Create `public/noise.svg`** (subtle grain texture)

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
  </filter>
  <rect width="140" height="140" filter="url(#n)" opacity="0.35"/>
</svg>
```

- [ ] **Step 12: Install dependencies**

Run: `cd "C:\Users\Josua Hafeni Uuyuni\josua-portfolio" && npm install`
Expected: `npm install` completes without errors; `node_modules/` created.

- [ ] **Step 13: Verify it compiles**

Run: `npm run build`
Expected: `✓ Compiled successfully` and the `.next` output is produced.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 + Tailwind v4 portfolio shell"
```

---
### Task 2: Typed data files (projects + site config)

**Files:**
- Create: `src/data/site.ts`, `src/data/projects.ts`

**Interfaces:**
- Consumes: nothing (pure data; imports only types)
- Produces:
  - `site.name: string`, `site.tagline: string`, `site.location: string`, `site.avatarUrl: string`, `site.contact: { email: string; github: string; linkedin: string; whatsapp: string }`, `site.manifesto: string`
  - `projects: Project[]` where `Project = { year: string; title: string; blurb: string; stack: string[]; url: string; accent: string; role?: string }`
  - Later tasks import `{ site }` from `@/data/site` and `{ projects }` from `@/data/projects`.

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const site = {
  name: "Josua",
  fullName: "Josua Uuyuni",
  tagline: "Android & software developer",
  location: "Windhoek, Namibia",
  manifesto: "Building for the Namibian market.",
  avatarUrl: "https://avatars.githubusercontent.com/u/183984329?v=4",
  contact: {
    email: "joshua7919859@gmail.com",
    github: "https://github.com/Josua-dev",
    linkedin: "#", // TODO: replace with your LinkedIn URL
    whatsapp: "#", // TODO: replace with wa.me/264XXXXXXXXX
  },
};
```

- [ ] **Step 2: Create `src/data/projects.ts`**

```ts
export interface Project {
  year: string;
  title: string;
  blurb: string;
  stack: string[];
  url: string;
  accent: string; // tailwind gradient classes, e.g. "from-violet-500 to-fuchsia-500"
  role?: string;
}

export const projects: Project[] = [
  {
    year: "2026",
    title: "MOJ Case Management System V2",
    blurb:
      "A production-structured case-tracking web app for the Ministry of Justice — a full lifecycle system for legal cases.",
    stack: ["JavaScript", "Web App", "Data Modeling"],
    url: "https://github.com/Josua-dev/MOJ-CASE-TRACKING-SYSTEM-V2",
    accent: "from-violet-500 to-fuchsia-500",
    role: "Developer",
  },
  {
    year: "2026",
    title: "Road Fund Administration",
    blurb:
      "A TypeScript platform for Namibia's Road Fund Administration — managing road-fund data and workflows.",
    stack: ["TypeScript", "Web App", "Dashboard"],
    url: "https://github.com/Josua-dev/roadfundnamibia",
    accent: "from-sky-500 to-indigo-500",
    role: "Developer",
  },
  {
    year: "2026",
    title: "OM'KUMOH Consulting Engineers",
    blurb:
      "Premium Next.js 16 website with cinematic 3D campus scene and GSAP scroll-driven camera for OM'KUMOH.",
    stack: ["Next.js 16", "TypeScript", "GSAP", "3D"],
    url: "https://github.com/Josua-dev/omkumoh-website",
    accent: "from-amber-500 to-orange-600",
    role: "Front-end developer",
  },
  {
    year: "2025",
    title: "Movie Recommendation System",
    blurb:
      "A Python recommendation engine suggesting movies based on user preferences and content analysis.",
    stack: ["Python", "ML", "Recommendation"],
    url: "https://github.com/Josua-dev/MovieRecommendationSystem",
    accent: "from-emerald-500 to-teal-500",
    role: "Developer",
  },
  {
    year: "2025",
    title: "Namibian Express Bank ATM System",
    blurb:
      "A Python implementation of an ATM system — session, PIN, and transaction logic in the Namibian context.",
    stack: ["Python", "CLI", "Banking"],
    url: "https://github.com/Josua-dev/NAMIBIAN-EXPRESS-BANK-ATM-SYSTEM-PYTHON",
    accent: "from-rose-500 to-pink-500",
    role: "Developer",
  },
  {
    year: "2024",
    title: "Phonebook Project",
    blurb:
      "A Java phonebook application managing contacts with add, search, edit and delete flows.",
    stack: ["Java", "OOP", "CLI"],
    url: "https://github.com/Josua-dev/PHONEBOOKPROJECT",
    accent: "from-cyan-500 to-blue-500",
    role: "Developer",
  },
];
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: exit 0, no output (no type errors).

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add typed site + project data"
```

---

### Task 3: Marquee + Hero section

**Files:**
- Create: `src/components/Marquee.tsx`, `src/components/Hero.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `{ site }` from `@/data/site`
- Produces:
  - `<Marquee items: string[] className?: string>` — a looping text streak.
  - `<Hero />` — full-viewport hero with oversized "JOSUA" gradient reveal, avatar, subtitle, scroll cue.

- [ ] **Step 1: Create `src/components/Marquee.tsx`**

```tsx
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const row = items.join("  ·  ");
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((i) => (
          <span key={i} className="pr-8 font-mono text-sm uppercase tracking-[0.3em] text-dim">
            {row}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/Hero.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/data/site";
import Marquee from "./Marquee";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-name]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.08 }
      );
      gsap.fromTo(
        "[data-hero-sub]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.5 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12">
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-aurora-violet/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-aurora-magenta/20 blur-[100px]" />

      <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-dim">
        {site.tagline} · {site.location}
      </p>

      <h1
        data-hero-name
        className="font-display text-[clamp(4rem,16vw,13rem)] leading-[0.9] font-bold tracking-tight text-fog"
      >
        JOSUA
      </h1>
      <div data-hero-name className="text-aurora font-display text-[clamp(1.25rem,4vw,2.5rem)] font-semibold">
        {site.manifesto}
      </div>

      <div data-hero-sub className="mt-10 flex flex-wrap items-center gap-6">
        <img
          src={site.avatarUrl}
          alt={`Portrait of ${site.name}`}
          width={72}
          height={72}
          className="h-18 w-18 rounded-full border border-white/15 object-cover"
        />
        <p className="max-w-md font-mono text-sm text-dim">
          Android & software developer based in Windhoek — shipping apps and
          systems that serve Namibian people and institutions.
        </p>
      </div>

      {/* marquee divider */}
      <Marquee
        items={["Android", "Web", "Data", "Namibia"]}
        className="absolute bottom-8 left-0 right-0 border-t border-white/10 py-4"
      />
    </section>
  );
}
```

- [ ] **Step 3: Wire Hero into `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: compiles clean. Open `http://localhost:3000` with `npm run dev` — hero renders with "JOSUA", gradient manifesto line, avatar.

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: add hero with GSAP reveal and marquee"
```

---
### Task 4: Manifesto scroll line

**Files:**
- Create: `src/components/Manifesto.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `{ site }` from `@/data/site`
- Produces: `<Manifesto />` — a full-viewport pinned line ("Building for the Namibian market.") with a gradient streak sweeping across on scroll.
- Later tasks read no new info from Manifesto.

- [ ] **Step 1: Create `src/components/Manifesto.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import Marquee from "./Marquee";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-streak]",
        { xPercent: -120 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex h-screen items-center overflow-hidden px-6 md:px-12"
    >
      <div
        data-streak
        className="text-aurora font-display text-[clamp(2.5rem,9vw,7rem)] font-bold uppercase leading-none"
        aria-label={site.manifesto}
      >
        {site.manifesto}
      </div>

      <Marquee
        items={["building", "for", "the", "Namibian", "market"]}
        className="absolute bottom-8 left-0 right-0 border-t border-white/10 py-4"
      />
    </section>
  );
}
```

- [ ] **Step 2: Wire Manifesto into `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: compiles clean. Scroll: gradient text sweeps across the line.

- [ ] **Step 4: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: add manifesto scroll line"
```

> **Note:** The Manifesto text renders `{site.manifesto}` from `src/data/site.ts`, keeping copy DRY. The hero also uses the same `site.manifesto` string for its gradient line.

---

### Task 5: Selected Work + ProjectCard

**Files:**
- Create: `src/components/ProjectCard.tsx`, `src/components/Work.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `projects: Project[]` from `@/data/projects` (`Project = { year; title; blurb; stack; url; accent; role? }`)
- Produces:
  - `<ProjectCard project: Project index: number />` — one editorial card.
  - `<Work />` — the selected-work section rendering all six cards with alternating layout, GSAP reveal/parallax, hover glow.

- [ ] **Step 1: Create `src/components/ProjectCard.tsx`**

```tsx
"use client";

import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <article
      data-project
      className={`group relative grid gap-8 md:grid-cols-2 md:items-center ${
        isEven ? "" : "md:[direction:rtl]"
      }`}
    >
      {/* ghost number */}
      <span className="pointer-events-none absolute -top-10 left-0 font-display text-[8rem] leading-none font-bold text-white/5 md:text-[12rem]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* visual / gradient panel */}
      <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-ink-card md:h-72 md:[direction:ltr]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30 transition-opacity duration-500 group-hover:opacity-60`}
        />
        <div className="absolute inset-0 bg-ink/40" />
        <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.2em] text-fog/80">
          {project.role}
        </span>
      </div>

      {/* text */}
      <div className="md:[direction:ltr]">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-dim">
          {project.year}
        </p>
        <h3 className="font-display text-3xl font-bold text-fog md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-md text-fog/70">{project.blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-dim"
            >
              {t}
            </li>
          ))}
        </ul>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-aurora underline decoration-1 underline-offset-4 transition-colors hover:text-white"
        >
          View on GitHub <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `src/components/Work.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
        gsap.to(card, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="px-6 py-28 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-display text-5xl font-bold text-fog md:text-6xl">
          Selected <span className="text-aurora">Work</span>
        </h2>
        <p className="hidden font-mono text-sm text-dim md:block">
          {projects.length} curated projects
        </p>
      </div>

      <div className="flex flex-col gap-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire Work into `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: compiles. On scroll, six cards reveal and parallax; alternating left/right layout; gradient hover glow.

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: add selected work section with project cards"
```

---

### Task 6: About section

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `{ site }` from `@/data/site`
- Produces: `<About />` — brand paragraph + background + stat tiles + avatar.
- Later tasks read no new info from About.

- [ ] **Step 1: Create `src/components/About.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const stats = [
  { label: "Languages", value: "8+" },
  { label: "Projects", value: "34+" },
  { label: "Built for", value: "Namibia" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
          observer.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );
    root.current?.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={root} className="px-6 py-28 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-dim">
        About
      </p>
      <div data-reveal className="max-w-3xl">
        <h2 className="font-display text-4xl font-bold leading-tight text-fog md:text-6xl">
          I build software that serves{" "}
          <span className="text-aurora">{site.location.split(",")[0]}</span> — from
          Android apps to full government and client systems.
        </h2>
      </div>

      <div data-reveal className="mt-8 max-w-2xl">
        <p className="text-fog/70">
          I'm an Android & software developer in Windhoek focused on the Namibian
          market — shipping apps and platforms for institutions, businesses and
          everyday people. My work spans mobile, web, data and a growing interest
          in LLMs from scratch.
        </p>
      </div>

      <dl data-reveal className="mt-12 grid grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-ink-card p-6 text-center">
            <dt className="order-2 mt-2 font-mono text-xs uppercase tracking-[0.2em] text-dim">
              {s.label}
            </dt>
            <dd className="text-aurora font-display text-4xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>

      <img
        src={site.avatarUrl}
        alt={`Portrait of ${site.name}`}
        width={96}
        height={96}
        className="mt-12 h-24 w-24 rounded-full border border-white/15 object-cover"
      />
    </section>
  );
}
```

- [ ] **Step 2: Wire About into `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import About from "@/components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: compiles clean. About section reveals stat tiles on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: add about section with stats"
```

---

### Task 7: Skills section

**Files:**
- Create: `src/components/Skills.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: nothing external (skill list defined inline, aligned to the user's GitHub languages)
- Produces: `<Skills />` — grouped chip grid (Mobile, Web, Data, Languages).
- Later components read nothing new from Skills.

- [ ] **Step 1: Create `src/components/Skills.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

const skills = [
  {
    group: "Mobile",
    items: ["Android", "Kotlin", "Java", "Mobile UI"],
  },
  {
    group: "Web",
    items: ["Next.js", "TypeScript", "Tailwind", "GSAP", "React"],
  },
  {
    group: "Data & Backend",
    items: ["Python", "Node", "PostgreSQL", "APIs", "ML basics"],
  },
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "Ballerina"],
  },
];

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    root.current?.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={root} className="px-6 py-28 md:px-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-dim">
        Toolkit
      </p>
      <h2 className="font-display text-5xl font-bold text-fog md:text-6xl">
        Skills & <span className="text-aurora">tools</span>
      </h2>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {skills.map((group) => (
          <div
            key={group.group}
            data-reveal
            className="rounded-3xl border border-white/10 bg-ink-card p-7"
          >
            <h3 className="mb-4 font-mono text-sm uppercase tracking-[0.25em] text-dim">
              {group.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-sm text-fog"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Skills into `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
      <About />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: compiles clean. Four groups reveal as you scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: add skills section"
```

---

### Task 8: Contact section

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `{ site }` from `@/data/site`
- Produces: `<Contact />` — "Let's build something for Namibia" CTA + email, WhatsApp, LinkedIn, GitHub links.

- [ ] **Step 1: Create `src/components/Contact.tsx`**

```tsx
"use client";

import { site } from "@/data/site";

const channel = (
  label: string,
  href: string,
  external = true
) => ({
  label,
  href,
  external,
});

const links = [
  channel("GitHub", site.contact.github),
  channel("Email", `mailto:${site.contact.email}`),
  channel("LinkedIn", site.contact.linkedin),
  channel("WhatsApp", site.contact.whatsapp),
].filter((l) => l.href && l.href !== "#");

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-12">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-aurora-amber/20 blur-[120px]" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-dim">
          Contact
        </p>
        <h2 className="font-display text-5xl font-bold leading-tight text-fog md:text-7xl">
          Let's build something <span className="text-aurora">for Namibia</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-fog/70">
          Open to work, collaboration and interesting builds. Send a message on
          any channel below.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-sm text-fog transition-colors hover:border-aurora-magenta hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

> **Note:** Because LinkedIn and WhatsApp are currently `"#"` placeholders, `channel(...)` filters them out, so the contact row safely shows Email + GitHub until the user fills `site.ts`. After they do, the rows appear automatically.

- [ ] **Step 2: Wire Contact into `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Work />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: compiles clean. Contact shows Email + GitHub (LinkedIn/WhatsApp hidden until filled).

- [ ] **Step 4: Commit**

```bash
git add src/components/ src/app/page.tsx
git commit -m "feat: add contact section"
```

---

### Task 9: QA — lint, build, accessibility, Lighthouse, deploy

**Files:**
- Maybe: `README.md` (optional)
- Verify: all components wired in `src/app/page.tsx`

**Interfaces:**
- Consumes: every component from Tasks 1-8.
- Produces: a verified, deployed portfolio and a project checklist.

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors. If `react-hooks/exhaustive-deps` warns on `gsap.context` in Effects, silence only the specific line with `// eslint-disable-next-line react-hooks/exhaustive-deps` (do not disable the whole rule).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, no type errors, pages statically generated.

- [ ] **Step 3: Reduced-motion & no-JS check**

The no-JS/reduced-motion fallback is already in `globals.css` (`.js` gating + `@media (prefers-reduced-motion: reduce)` override) and layout (the `js` class script). Confirm:
- With JS disabled, `[data-reveal]` content is visible (it's hidden only when `.js` is present and never hidden under reduced motion).
- With OS reduced-motion on, hero/manifesto GSAP animations read as simple reveals (or are skipped) and text is never stuck at `opacity: 0`.
- The scrolling works via native scroll when Lenis is disabled under reduced motion.

- [ ] **Step 4: Lighthouse**

Run an audit (Chrome DevTools or `npx lighthouse http://localhost:3000` after `npm run start`).
Expected: ≥ 90 performance, accessibility, best-practices.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: qa fixes for accessibility and reduced motion"
```

- [ ] **Step 6: Deploy notes (user action)**

- Push to GitHub: `git remote add origin https://github.com/Josua-dev/josua-portfolio.git && git branch -M main && git push -u origin main`
- Import to Vercel, or deploy as static to a host of choice.
- After deploy, set your chosen domain (e.g. `josua.dev`) in Vercel + update the `metadataBase`/`openGraph` URLs in `src/app/layout.tsx`.

---

## Open items for the user

- **LinkedIn + WhatsApp:** fill the two `TODO`s in `src/data/site.ts`. The contact section auto-shows them once filled.
- **Domain:** the site ships on a Vercel default URL unless a custom domain is added; update `layout.tsx` metadata URL accordingly.