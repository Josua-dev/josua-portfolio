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

