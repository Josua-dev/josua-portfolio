"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small cyan (#0fd6d9) dot that trails the pointer, plus an
 * uppercase pill that replaces the dot over interactive targets.
 * The pill's label is read from [data-cursor] on the hovered element:
 *   data-cursor="VIEW PROJECT"  ->  "VIEW PROJECT"
 * Falls back to the target's aria-label when no data-cursor is set, and to a
 * default "OPEN" for bare links/buttons.
 *
 * Enabled only when ALL of these hold (checked on mount):
 *   - fine pointer (hover-capable), not a touch screen
 *   - no reduced-motion preference (the cursor is itself an animation)
 *   - no JS-driven `force-disable` (data-no-cursor="true" on <html>)
 * The native cursor is restored if any of these change mid-session.
 *
 * The dot is inert for assistive tech (aria-hidden) and pointer-events: none.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forceOff = document.documentElement.dataset.noCursor === "true";

    const enabled = () => mqFine.matches && !mqMotion.matches && !forceOff;

    if (!enabled()) return;

    const dot = dotRef.current!;
    const pill = pillRef.current!;

    // Cursor position lives on transform so we never touch layout.
    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let pillX = dotX;
    let pillY = dotY;
    let raf = 0;
    // `.has-cursor` (cursor:none) is added only once the first frame has
    // rendered, and removed on any error, so the native cursor is never
    // hidden until the custom dot is proven to track.
    let armed = false;

    const arm = () => {
      if (armed) return;
      armed = true;
      document.documentElement.classList.add("has-cursor");
    };

    const render = () => {
      raf = 0;
      arm();
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      // Pill sits just below-right of the pointer — never under it — and is
      // clamped so it can't run off the viewport. Longest label "VIEW PROJECT"
      // ≈ 110px wide, hence the 130px right/left margins.
      const px = Math.min(Math.max(12, pillX + 12), window.innerWidth - 130);
      const py = Math.min(Math.max(12, pillY + 14), window.innerHeight - 40);
      pill.style.transform = `translate(${px}px, ${py}px)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Dot follows instantly; pill eases toward the target for a light lag.
      dotX = e.clientX;
      dotY = e.clientY;
      pillX += (e.clientX - pillX) * 0.18;
      pillY += (e.clientY - pillY) * 0.18;
      try {
        if (!raf) raf = requestAnimationFrame(render);
      } catch {
        document.documentElement.classList.remove("has-cursor");
      }
    };

    const HIDE = "hidden";
    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element).closest<HTMLElement>(
        "[data-cursor], [data-cursor-label]"
      );
      if (t) {
        pill.textContent =
          t.dataset.cursor ??
          t.dataset.cursorLabel ??
          t.getAttribute("aria-label") ??
          "OPEN";
        pill.removeAttribute(HIDE);
        dot.setAttribute(HIDE, "");
      } else {
        pill.setAttribute(HIDE, "");
        dot.removeAttribute(HIDE);
      }
    };

    const onLeave = () => {
      dot.setAttribute(HIDE, "");
      pill.setAttribute(HIDE, "");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" hidden />
      <div ref={pillRef} className="cursor-pill" aria-hidden="true" hidden />
    </>
  );
}
