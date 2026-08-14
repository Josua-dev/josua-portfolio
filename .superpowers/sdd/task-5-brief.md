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

