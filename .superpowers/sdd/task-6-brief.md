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

