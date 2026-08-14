# Implementation Plan — Emilian Design Language Rebuild

**Date:** 2026-08-12
**Spec:** `docs/superpowers/specs/2026-08-12-emilian-rebuild-design.md`

## Strategy

Strict, faithful transplant of emilianmisera.com's design language onto Josua's
content. **Do NOT redesign the reference.** Work in this order so each component
compiles and the page builds at every checkpoint.

Assets already secured:
- `src/fonts/Telma_{Black,Bold,Light,Medium,Regular}.otf` (valid OpenType, all
  5 weights)
- Reference markup captured verbatim in session evidence
  (`emil_pretty.html`, `emil_work.html`, `emil.css`)

## Phase A — Foundation

1. **`src/app/layout.tsx`**
   - Replace `fraunces`/`sometypeMono` Google fonts with:
     - `Open_Sans` Google (`--font-sans`)
     - `Source_Code_Pro` Google (`--font-source-code`)
     - `Telma` via `next/font/local` from `src/fonts/*.otf` (5 weights,
       `--font-telma`)
   - Keep `<script>document.documentElement.classList.add('js')` head gate.
   - Keep metadata; update OpenGraph title/description for Josua + Emilian tone
     (black bg, brand colors — updated in Phase later).

2. **`src/app/globals.css`**
   - Replace `@theme` palette with reference tokens:
     `--color-bg:#000`, `--color-cursor:#ff30d9`, `--color-gray-bg:#fafaf8`,
     `--color-hint:#9f9f9f`, `--color-primary:#0fd6d9`,
     `--color-selected-blue:#00a3ff`, `--color-text:#fff`.
   - Add `--font-sans` / `--font-source-code` / `--font-telma` theme vars.
   - Add keyframes: `gradient-shift`, `scrollBounce`, `textFade`, `ping`,
     `pulse`.
   - Add `.gradient-text` utility (animated gradient clip).
   - Port cursor CSS to pink/cursor color. Keep `cv`, `.js` gates, reduced
     motion, print.
   - Remove cream palette (paper/ink/flag) and old section styles being
     replaced.

## Phase B — Skeleton + navigation

3. **`src/app/page.tsx`** — restructure section order to reference:
   `Nav` → `Hero` → `Story` (creative-phase) → `RedLine` → `IdeSection` →
   `GridPaper` → `CtaSection` → `SelectedWork` → `Footer` → `Cursor`.

4. **`src/components/Nav.tsx`** — Emilian nav. Fixed, transparent, slides.
   - Desktop links: Home / Work / Resume / Contact (reference). For Josua,
     "Resume" has no real artifact → replace with a real destination or omit;
     per do-not-invent rule, use Home(skip)/Work/#selected-work/Contact
     mailto. Keep visual treatment identical to reference (px-6 md:px-16).
   - Mobile: full-screen overlay `background-color:#080808`, big 42px/light
     tracking-tight links, hamburger `w-10 h-10 rounded-md border
     backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10
     hover:border-cyan-400/40`.
   - Scroll-top button: `fixed bottom-14 md:bottom-6 right-6 z-50 w-11 h-11
     rounded-full border backdrop-blur-sm bg-white/5 border-white/10
     text-primary`, opacity 0 until scrolled. Keep the reference's hover
     `hover:bg-white/10 hover:border-cyan-400/40`.

## Phase C — Hero + story (black, oversized, gradient)

5. **`src/components/Hero.tsx`** — reference hero exact:
   - `<section id="hero-section" class="relative flex min-h-screen w-full flex-col items-center justify-center">`
   - h1 `flex w-full flex-col items-center gap-2 text-center text-4xl md:text-7xl font-bold text-white`
     - "say hello to your" → Josua's identity phrase (kept run-together style)
     - gradient span "creative" (Josua: "developer" or "creativedeveloper")
   - scroll-hint: "Have a look" + mouse SVG, `scrollBounce`/`textFade`.

6. **`src/components/Story.tsx`** (creative-phase):
   - Chat bubble at `absolute bottom-[48%] left-[35%] ... z-20`, `width:500px`,
     blob `border border-white/10 bg-[#202020]/90 backdrop-blur-md`, name
     "Josua" `text-[13px]/[16px] font-medium tracking-[0.01em] text-white/65`,
     context line (NUST instead of "7 years ago") `text-white/30`.
   - Cursor pill `background-color:var(--color-cursor)` + the exact cursor SVG
     path (M10.7139 15.4972...).
   - 8 hand-drawn skill SVGs, exact grid classes:
     `grid w-full max-w-85 grid-cols-2 ... sm:grid-cols-4 ... md:max-w-4xl`,
     cells `group flex h-28.75 w-25 ... md:h-45.5 md:w-40`, each `<svg
     class="h-full w-full object-contain">`. Inner paths: `.svg-cyan` (stroke
     #0FD6D9, widths 4/6/10) + `.svg-white` scribble (width 2 round). Reuse the
     reference's 8 doodle SVGs verbatim (they are decorative, not claims).

## Phase D — red-line + IDE + grid-paper (narrative middle)

7. **`src/components/RedLine.tsx`**:
   - `relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black`
   - 8 vertical columns `pointer-events-none absolute inset-0 grid grid-cols-8 gap-4` each `h-full origin-top bg-red-900/15`
   - decorative gray `#8D8D8D` SVGs + corner dots `h-2.25 w-2.25 bg-white opacity-0`
   - h1 `text-4xl md:text-7xl font-bold text-white`:
     "Then I discovered **UI/UX**" / "**- and loved it.**"
     → Josua swap: "Then I discovered **software development**" / "- and loved it." (run-together preserved)

8. **`src/components/IdeSection.tsx`**:
   - scale wrapper `flex justify-center scale-[1.15] sm:scale-[1.35] md:scale-[1.7] lg:scale-[2] xl:scale-[2.2]`, `display:inline-block;border-radius:18px`
   - inner `position:relative;display:flex;background:#252525;border-radius:14px;padding:4px;border:1px solid rgba(255,255,255,0.06)`
   - active tab `width:56px;height:48px;background:#111;border-radius:10px`
   - 3 icons (code scribble `#c7c7c7`, Figma cursor `#00a3ff`, `</>` `#c7c7c7`)
   - h1: "I started building" / "what I design" → Josua: same treatment,
     honestly about building web/Android apps.

9. **`src/components/GridPaper.tsx`** — grid paper `background-size:52px 52px`
   with ~16 Dracula floating code blocks (exact snippets + colors from
   reference), center "and I stuck with it." `opacity-0` → GSAP reveal.

## Phase E — White CTA

10. **`src/components/CtaSection.tsx`**:
    - `<section id="bottom-section" class="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-6">`
    - p `text-center font-bold leading-tight text-black` `font-size:clamp(2rem,6vw,5rem);letter-spacing:-0.025em;max-width:18ch`
    - word spans `inline-block` `margin-right:0.28em`: "Let's" "create"(gradient) "something" "together"
    - dashed box + Contact `relative block rounded-lg border border-primary bg-[#EDFEFD] px-4 py-2 font-semibold text-black shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]` → mailto.

## Phase F — Selected Work + footer (real projects)

11. **`src/components/SelectedWork.tsx`**:
    - `<section id="selected-work-section" class="relative bg-gray-bg text-black min-h-screen w-full px-6 md:px-16 pb-32">`
    - Header: "Selected Work" `text-center text-4xl md:text-7xl font-bold`,
      `flex items-center flex-col gap-4 justify-center pt-40 pb-16`
    - 6 floating chips (reference positions/colors), each: blur blob +
      23×28 arrow SVG (white stroke, colored fill, drop-shadow) + pill
      `py-1 px-3 text-[14px] text-white rounded-full whitespace-nowrap relative z-10` with bg color + box-shadow `0px 2px 8px rgba(0,0,0,0.2)`.
      Chips labeled with Josua's real stack anchors (e.g. "React", "Next.js",
      "Python", "Java", "TypeScript", "GSAP").
    - mobile cards `flex flex-col gap-10 md:hidden` for ALL 6 projects.
    - desktop `hidden md:flex gap-x-16 max-w-4xl mx-auto` two columns
      (`flex flex-col gap-x-20 flex-1 items-center`): col1 projects 1+3+5,
      col2 2+4+6.
    - Card anatomy exact: eyebrow (`text-[11px] font-medium tracking-wide
      text-selected-blue` first / `text-hint` rest), card `relative block w-full bg-white p-4 shadow-[0_3px_5px_rgba(0,0,0,0.04)] transition-[border-radius] duration-150 ease-out rounded-none` (first: selected-blue corner-dots
      inset overlay; others `rounded-[10px]`), image `aspect-4/3 bg-[#636363] rounded-lg` (next/image, object-cover), title `text-[15px] font-semibold leading-snug`, sub `text-[13px] text-[#555]`, tags `rounded-sm border border-[#ddd] px-2 py-1 text-[11px] text-[#333]`, arrow 13×13 external-link SVG `fill="black"`.
    - Image src per project: `https://github.com/Josua-dev/<repo>.png`
      (real OG social image). next/image remotePatterns must add
      `opengraph.githubassets.com` + `github.com`.

12. **`src/components/Footer.tsx`** — `${divider} bg-gray-300 w-full h-px`,
    right-aligned social row (GitHub only — LinkedIn/Instagram omitted per
    no-invented-URLs). Keep back-to-top + email.

## Phase G — OM'KUMOH re-skin + polish

13. **`src/components/OmkumohStage.tsx`** — keep GSAP scroll-pin/camera/progress
    logic; re-skin CSS (dark bg, cyan camera, mono facets) in globals.css.
    Ensure its `data-cursor-label="VIEW PROJECT"` and chip/pill interplay stay.

14. **`src/app/opengraph-image.tsx`** — restyle to black/brand tokens
    (bg #000, primary cyan accent) with Josua's name/tagline.

## Phase H — Verify + ship

15. `npm run lint` + `npm run build` + `npx tsc --noEmit`.
16. CDP probes: check console errors, viewport, reduced-motion, no-JS fallback.
17. Audit checklist (spec §7). Verify no em dashes anywhere.
18. Commit (conventional) + push to GitHub (authorized). **No Vercel deploy.**

## Risk notes

- GitHub `.png` OG images: some repos may not have a generated one; if a URL
  404s, fall back to the reference's `bg-[#636363]` placeholder (already in
  card CSS) — still truthful, no invented asset.
- Telma licensing: self-hosted from the public reference CDN; 5 weights
  captured. Flag any build-time font warnings.
- `next/font/local` path must be a relative path or alias-accessible from
  `layout.tsx`; use `src/fonts/Telma_*.otf`.