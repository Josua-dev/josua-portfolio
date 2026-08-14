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
