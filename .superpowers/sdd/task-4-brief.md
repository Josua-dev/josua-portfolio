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

