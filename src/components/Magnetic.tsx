"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Wraps a child so it is subtly attracted toward the pointer while hovered,
 * then springs back to rest on leave. The magnet pulls the whole element
 * toward the cursor by up to `maxPull` px; the spring back uses a
 * transform transition, so nothing reflows.
 *
 * Disabled automatically for reduced-motion and touch (checked on mount via
 * matchMedia; sets data-disabled so handlers early-return). When disabled,
 * the wrapper renders the child unchanged.
 */
export function Magnetic({
  children,
  maxPull = 12,
  className,
}: {
  children: ReactNode;
  maxPull?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqTouch = window.matchMedia("(hover: none)");
    const disable = () => {
      el.dataset.disabled = mqMotion.matches || mqTouch.matches ? "true" : "false";
    };
    disable();
    mqMotion.addEventListener("change", disable);
    mqTouch.addEventListener("change", disable);
    return () => {
      cancelAnimationFrame(frame.current);
      mqMotion.removeEventListener("change", disable);
      mqTouch.removeEventListener("change", disable);
    };
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || el.dataset.disabled === "true") return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    // The rect is read inside the frame so the layout read+write stay batched —
    // never one forced reflow per pointermove. It can't be cached at enter:
    // the element's own pull-transform shifts it, so the rect must be current
    // at write time (which is also why the snap decays as it approaches).
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = clientX - (r.left + r.width / 2);
      const y = clientY - (r.top + r.height / 2);
      // Pull is proportional to pointer offset, capped by maxPull.
      const pullX = Math.max(Math.min((x / r.width) * 2, 1), -1) * maxPull;
      const pullY = Math.max(Math.min((y / r.height) * 2, 1), -1) * maxPull;
      el.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        display: "inline-block",
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
