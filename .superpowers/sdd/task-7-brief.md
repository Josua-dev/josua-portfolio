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

