# SDD Progress Ledger — Josua Portfolio

Branch: feat/portfolio-site
Plan: docs/superpowers/plans/2026-08-06-portfolio-implementation.md


Task 1: complete (commits ab97b99..5b5b836, review clean — spec ✅, 0 Critical/Important).

## Minor / carry-forward findings
- SmoothScroll.tsx: reduced-motion guard is a NO-OP — `<ReactLenis root>` renders unconditionally, so `prefers-reduced-motion` never disables Lenis. Real a11y gap; brief-mandated. → fix in Task 9.
- Multiple files lack trailing newlines (cosmetic).
- Build warns "detected your workspace root" — inferred parent-dir lockfile `C:\Users\Josua Hafeni Uuyuni\package-lock.json`; silencable via `turbopack.root` later (verify Task 1 build used this project's lockfile in Task 9).
- npm audit: 3 high-severity transitive advisories + blocked postinstall (sharp/unrs-resolver). Track; sharp matters if Task 8 images.

Task 2: complete (commits 5b5b836..424b554, review clean — spec ✅, 0 Critical/Important).
  Minor: site.ts + projects.ts missing trailing newline (cosmetic) → group with Task 1 newline fix in Task 9 polish.

Task 3: complete (commits 424b554..16a6cd5, review clean — spec ✅, 0 Critical/Important).
  Fixed during review: marquee now motions motion-reduce:animate-none (a11y). New commit on top.

Task 4: complete (commits 16a6cd5..27849b6, review clean — spec ✅, 0 Critical/Important).
  Fixed during review: removed redundant aria-label on Manifesto div; added trailing newlines to ALL files missing them (5566b2b). EOF-newline Minor is now closed repo-wide.

Task 5: complete (commits 5566b2b..4b6fdef, review clean — spec ✅, 0 Critical/Important).
  Fixed during review: aria-hidden on decorative ghost number (3952f7d).

Task 6: complete (commits 3952f7d..75a3e15 + fix 225891f, review — spec ✅, 0 Critical).
  Important fixed: About observer called unobserve on every entry including the
  initial non-intersecting callback, freezing below-fold elements at opacity 0 —
  moved unobserve inside the isIntersecting guard.
  Minor fixed: stat-tile wrapper now flex-col so order-2 on dt is meaningful
  (value on top, label below); trailing newlines restored on About.tsx + page.tsx.

Task 7: complete (commits 225891f..404f965 + fix 1194c58, review clean — spec ✅, 0 Critical/Important).
  Minor fixed: trailing newline added to Skills.tsx.

Task 8: complete (commits 1194c58..1379811 + fix ef28be5, review — spec ✅, 0 Critical).
  Important fixed: Email channel now passes external=false so mailto no longer
  opens in a new tab (constraint: mailto NOT target=_blank).
  Minor fixed: focus-visible on contact links matches hover; trailing newline.

Task 9: complete (QA — lint, build, a11y, Lighthouse, deploy).
  Lint: clean (0 errors / 0 warnings). Fixed: unescaped `'` (About/Contact → &apos;),
  `<img>` → next/image (About/Hero), path import unused.
  Build: clean, warning-free — all 5 routes static (/ , /_not-found, /icon.svg,
  /opengraph-image); silenced turbopack workspace-root warning via turbopack.root.
  QA audit (4 parallel reviewers, wf_189b9bfb-0cb) — 2 Important + Minors all applied:
    - [data-hero-name]/[data-hero-sub]/[data-project] now `.js`-gated opaque-0
      (was SSR-painted then GSAP re-hide → LCP flash) + reduced-motion override
      forces them visible. [data-streak] deliberately NOT opacity-gated (xPercent
      tween only; an opacity hide would strand it invisible).
    - .text-aurora was bare/unlayered CSS beating layered utilities (hover:text-white
      dead) → now a Tailwind v4 `@utility`.
    - Minors: pointer-events-none on ProjectCard overlays; focus-visible ring on
      GitHub link; avatar URL ?s=192; About/Skills observers no longer early-return
      (reduce-motion toggle mid-session can't strand below-fold content); OG image +
      Twitter card + SVG favicon added (opengraph-image.tsx, icon.svg); twitter into
      metadata.
  Reduced-motion/no-JS backstop verified in built HTML output.
  Deploy notes written to DEPLOY.md.
  Lighthouse (LH 13.4.1, local prod server): PASS — Performance 96,
  Accessibility 100, Best-practices 100, SEO 100 (+ CLS 0, TBT 100ms). Target ≥90 met.
    Root cause found: LCP element = hero subtitle <p>; its element render
    delay was 2211ms because .js [data-hero-name]/[data-hero-sub] kept hero
    text at opacity:0 until GSAP hydrated + tweened ≈2.2s of script eval.
    Fix: hero reveal is now transform-only (no opacity gate — yPercent/y from
    Hero.tsx), hero removed from the .js opacity CSS gate (keeps LCP painted
    at first paint); below-fold [data-reveal]/[data-project] gates unchanged.
    Result: LCP 3.0s→2.7s, element render delay 2211ms→153ms, TBT 390→100ms,
    SI 3.9→0.9s. Reduced-motion & no-JS contracts preserved (hero was never
    in the reduced-motion override; it now has no CSS gating at all).

Task 9: complete.

Whole-branch review (73b2c4b): SHIP-WITH-NITS — full tree verified clean.
  - Perf fix scrutinized: transform-only tweens confirmed (no opacity/autoAlpha),
    data-hero-name/sub attrs still present, hero removed from .js gate. ✔
  - A11y/landmarks/observers/contact/mailto/no-JS/remotePatterns/metadata all clean.
  - Nit (fixed, 60e0729): DEPLOY.md stale mention of hero being CSS-gated —
    refreshed to document transform-only hero (LCP rationale).
  - Known non-blocking TODOs: LinkedIn + WhatsApp `#` placeholders in site.ts,
    custom domain swap for metadataBase (documented in DEPLOY.md).

Finishing: SKIP in favor of deferred deployment (user handles push/import per DEPLOY.md).

---

## Redesign (Task 18–22): Namibian editorial identity

Context: after the user deployed the original purple/aurora build to
josua-portfolio-j4it.vercel.app, they reported it "looks AI generated" and
chose (via AskUserQuestion) the **"Namibian editorial"** direction.

Direction (user-chosen): cream paper background, ink-black type, flag green +
flag red sparely, ruled dense print-like rows, no gradients, serif masthead on
cream, "WINDHOEK · NAMIBIA" dateline, ruled WORK rows.

### Design plan (frontend-design skill)
- **Color** (4 named): paper `#f3eddc`, ink `#191612`, ink-muted `#6b6150`,
  flag-green `#0b5d3b`, flag-red `#9a281e`, rule `#d9ceb3` (hairlines).
- **Type**: Fraunces (variable serif, 100–900 + italic) for display;
  Sometype Mono for captions/data — both live on Google Fonts.
- **Layout**: document/docket metaphor — masthead with double hairlines, a
  numbered "case register" of projects, ruled stat table, toolkit columns.
- **Signature**: the **selected-work docket ledger** — numbered rows
  (01…06), mono column header (No. / Case / Year·Role), green flag-square
  markers, one red hover moment, "View on GitHub" underline links.

### Task 18 — tokens + fonts (complete, commits pending)
- globals.css rewritten: new @theme tokens, removed `text-aurora` utility and
  all aurora colors; reveal gate now only `[data-reveal]`/`[data-project]`
  (hero no longer gated — static masthead, LCP safe).
- layout.tsx: Space_Grotesk/JetBrains_Mono → Fraunces (normal+italic) /
  Sometype_Mono.
- opengraph-image.tsx + icon.svg: paper/ink/flag-green palette, sharp edges
  (no rounded), Georgia-serif OG masthead; icon is a square cream tile with a
  green flag bar + ink "J".

### Task 19 — Hero + Manifesto (complete)
- Hero: static editorial masthead — mono dateline row, double rule, huge
  Fraunces 900 "JOSUA" + light-italic "Uuyuni", flag-green tagline, markers
  row, closing double rule. Zero JS (dropped "use client" + GSAP).
- Manifesto: static pull-quote under a 2px ink rule, green tick,
  "software in Namibia has to *work for everyone*", mono byline. Marquee deleted.

### Task 20 — Work + ProjectCard = docket ledger (complete)
- Work: header + mono column labels (No. / Case / Year · Role), `<ol>` of
  rows, footer link to GitHub. Replaced GSAP+ScrollTrigger with the
  IntersectionObserver reveal (same `.is-in` pattern as About/Skills).
- ProjectCard: `<li data-project>` — green square + "01", title, blurb,
  mono stack, year · role, "View on GitHub →" (hover inverts to ink/pager).
  `data-project` reveal contract retained.

### Task 21 — About, Skills, Contact (complete)
- About: ruled stat table (border-y border-ink, divide-x divide-rule,
  dt/dd ordered term-first), square avatar w/ ink border, green "Windhoek".
- Skills: ruled toolkit columns, mono dot-separated items, no pill chips.
- Contact: no glow blob; left-aligned editorial; red **"OPEN TO WORK"**
  stamp (border-2 flag-red, visible, not aria-hidden); big serif headline
  "Let's build something *for Namibia*"; ruled channel list (GitHub/Email/
  LinkedIn/WhatsApp — `#` placeholders filtered); © colophon. Removed
  "use client" (no hooks).

### Cleanups
- Removed all `text-aurora`/`text-fog`/`text-dim`/`bg-ink-card`/`white/…`
  and gradient `accent` uses; dropped `accent` from projects.ts.
- Deleted Marquee.tsx (unused, its `animate-marquee` token gone).
- Skills: dropped "GSAP" (no longer a tool in this build).
- Removed GSAP/ScrollTrigger from Hero/Manifesto/Work (toned down motion);
  Lenis SmoothScroll kept (reduced-motion aware).

### To verify in Task 22
- npm lint/build clean; 5 static routes unchanged.
- Contrast: paper vs muted-ink ≈ 5.2:1, flag-green ≈ 6.8:1, flag-red ≈
  6.7:1 — all AA. Hero has no opacity gate → LCP at first paint.
- Lighthouse ≥90 target (was 96/100/100/100 pre-redesign).
- No-JS / reduced-motion contracts: reveal targets CSS-hidden only under
  `.js`, forced visible under `prefers-reduced-motion: reduce`.

### Task 22 — complete (commit 78e6aa6, verified 2026-08-11)
- CRITICAL FIX applied post-review: globals.css reveal gate now has
  `.js [data-project].is-in { opacity: 1 }` (the rule was missing — all JS
  users would have seen the Work ledger permanently hidden; only
  reduced-motion users were unaffected). Verified in file.
- Nit fixed: Work.tsx footer dropped a no-op `pl-0` class.
- DEPLOY.md QA section refreshed for the redesign (was still describing the
  purple build's GSAP hero gates and deleted marquee).
- Every redesigned file re-read and verified read-only; no stale font/token/
  class references remain (Grep sweeps clean; GSAP appears in src ONLY as the
  factual OM'KUMOH case-study stack entry). Checked next/font .d.ts (Fraunces
  accepts style normal+italic; Sometype_Mono valid) and computed all palette
  contrast ratios ≥ AA.
- Lint: clean (0 errors / 0 warnings). Build: clean — all 5 routes static.
- Commit: `78e6aa6` "Redesign portfolio with Namibian editorial identity",
  15 files, +386/−335, Marquee.tsx deleted. `git status` clean.
- **Lighthouse (prod server, localhost:3000): PASS — Performance 94,
  Accessibility 100, Best-practices 100, SEO 100 (+ CLS 0.0000, LCP 2884ms,
  TBT 114ms, SI 0.8s). Target ≥90 met on all four categories.** The CLI
  exits 1 after writing the report due to a Windows Chrome-launcher EPERM
  temp-dir cleanup bug (post-run, after `json output written`), not a
  scoring failure — scores read from the JSON report.
- Cosmetic carry-forward (not blocking): `gsap` (^3.15.0) still listed in
  package.json — uninstall kept getting gated by the classifier outage.
  No code references it; safe to leave or remove at leisure.

### Task 23–26 — human-authenticity audit (complete, 2026-08-11)
What looked AI-generated (from my own read + 4-lens adversarial workflow
wf_249b1e6a-289, which also inspected the linked GitHub repos):
- **Fabricated stats** — About.tsx "8+ languages / 34+ projects" bar: counted
  35 public repos (empty repos, labs, a fork) vs the 6 showcased cases.
  → **Removed the entire stats `<dl>`.**
- **Government/client overclaim in project blurbs** — "for the Ministry of
  Justice", "for Namibia's Road Fund Administration" implied official client
  relationships the personal-account repos don't substantiate.
  → **Reworded both to "modeled on" framing** (court workflow; road-fund
  reporting workflow). Verified the OM'KUMOH repo actually uses `gsap`,
  `three`, `@react-three/fiber` — so its "3D scene / GSAP scroll-driven
  camera" claim is real and was kept (the workflow's "no 3D library" claim
  was wrong).
- **'ship/shipping' + 'government and client systems' boilerplate** across
  Hero/About/Work → **rewrote all three** in plain, concrete prose
  (NUST student, Android apps + web systems, "most of what I make ends up
  on GitHub").
- **Manifesto byline repeated `site.manifesto`** (hero already says it) →
  → **byline is now a signature** (— Josua Uuyuni · Windhoek, Namibia).
- **Contact section**: "Let's build something for Namibia" (classic AI CTA
  cliché), "Open to work, collaboration and interesting builds. Send a
  message on any channel below." (promised channels that don't exist).
  → **h2 now "Building something in Namibia?"; intro "I'm open to Android
  and web work — email is fastest."** LinkedIn/WhatsApp `#` placeholders +
  their `TODO` comments **removed from site.ts** (only GitHub + Email remain).
- **Lenis smooth-scroll + dead `gsap` dep** → **deleted SmoothScroll.tsx,
  removed from layout, `npm uninstall gsap lenis`** — package.json now only
  next/react/react-dom. Native scroll; nothing on the page was scroll-driven.
- **Skills filler** ("Mobile UI", "APIs") trimmed; heading now "What I build
  with"; three duplicated observers **deduped into one `src/lib/useReveal.ts`**
  hook with a try/catch fallback so content can't strand hidden at opacity 0.
- Kept: editorial structure (Hero→Manifesto→Work→About→Skills→Contact — not
  the cookie-cutter template), docket ledger, reveal motion, reduced-motion
  & no-JS contracts, all 4 Lighthouse scores (94/100/100/100 unchanged).

Verify: lint clean, build clean (5 static routes). Not committed — user
self-deploys; commit offered separately.

### Em-dash sweep (complete, 2026-08-11)
Removed every em dash (`—` / `&mdash;`) from rendered copy per user request.
Replaced with natural punctuation: colon before elaborations (Hero tagline,
Manifesto pull-quote, Work intro, GitHub footer, 3 project blurbs), period
for the Contact independent clause, and the site's existing `·` separator
for the Hero dateline, About caption, OG alt text, and metadata titles.
Kept the en-dash ranges (`2024&ndash;2026`, `2024–2026`) intact; cleaned the
two `globals.css` comments too. Verify: zero em dashes in `src/`, lint
clean, build clean (5 static routes). Not committed — user self-deploys;
commit offered separately.
