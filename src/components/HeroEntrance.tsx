"use client";

import { useEffect } from "react";

/**
 * Orchestrates the hero's entrance animation. Every [data-hero-move] element
 * inside the hero section (#top) is a TRANSFORM-ONLY reveal (see globals.css):
 * no opacity change, so the LCP element (the hero tagline) paints immediately
 * at full visibility. A 70ms stagger between siblings gives a fast editorial
 * cascade on load.
 *
 * Reduced-motion: globals.css never applies the initial offset in that case,
 * so this component only adds .is-in (a no-op transform) and returns.
 */
export function HeroEntrance() {
  useEffect(() => {
    // Scope to the hero section; this component is rendered inside it.
    const root = document.getElementById("hero-section");
    const els = Array.from(
      root?.querySelectorAll<HTMLElement>("[data-hero-move]") ?? []
    );

    // Fallback: if the browser won't take the animation (no rAF), reveal all.
    if (typeof requestAnimationFrame === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    // Fast stagger, transform-only. Triggered as soon as the layout paints.
    const frame = requestAnimationFrame(() => {
      els.forEach((el, i) => {
        el.style.transitionDelay = `${i * 70}ms`;
        el.classList.add("is-in");
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div aria-hidden="true" />;
}
