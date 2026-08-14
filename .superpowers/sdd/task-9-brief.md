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
