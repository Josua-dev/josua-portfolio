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
