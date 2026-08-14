"use client";

import { useEffect, useRef } from "react";

/**
 * Watches elements matching `selector` inside the returned ref and adds
 * `.is-in` to each one as it enters the viewport, then stops watching it.
 * Pairs with the CSS reveal gate in globals.css: targets are hidden only
 * under `.js`, and `prefers-reduced-motion` forces them visible, so no-JS
 * and reduced-motion users never depend on this hook.
 */
export function useReveal(selector = "[data-reveal]", threshold = 0.15) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );
      root.current
        ?.querySelectorAll(selector)
        .forEach((el) => observer?.observe(el));
    } catch {
      // If the observer can't be created, reveal everything so no content
      // strands hidden at opacity 0 under the .js CSS gate.
      root.current
        ?.querySelectorAll(selector)
        .forEach((el) => el.classList.add("is-in"));
    }
    return () => observer?.disconnect();
  }, [selector, threshold]);

  return root;
}
