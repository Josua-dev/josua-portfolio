"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

/**
 * OM'KUMOH ·scroll-linked GSAP scene.
 *
 * The static layout is the no-JS / reduced-motion fallback: a blueprinted
 * campus schematic on paper, then all three info facets (Project / Stack /
 * Open source) stacked in normal flow, fully visible.
 *
 * When the visitor has JS + motion, an IntersectionObserver lazy-loads GSAP
 * and ScrollTrigger; the section pins for ~2.4 viewport heights while the
 * camera dot travels a diagonal, the building blocks bob, the progress rail
 * fills, and the facets crossfade. Inactive panels are inert + aria-hidden so
 * only the visible one is focusable. Re-themed to the light blueprint on ivory.
 */
const RECTS = [
  { id: "A", w: "18%" },
  { id: "B", w: "26%" },
  { id: "C", w: "22%" },
];

const omkumoh = projects.find((p) => p.id === "omkumoh")!;

type Facet = {
  kicker: string;
  title: string;
  body?: string;
  stack?: string[];
  url?: string;
  variant: "project" | "stack" | "open";
};

const FACETS: Facet[] = [
  {
    kicker: "Project",
    title: omkumoh.title,
    body: omkumoh.blurb,
    stack: omkumoh.stack,
    variant: "project",
  },
  { kicker: "Stack", title: "Built with", stack: omkumoh.stack, variant: "stack" },
  {
    kicker: "Open source",
    title: "On GitHub",
    body: "Full source on GitHub.",
    url: omkumoh.url,
    variant: "open",
  },
];

function FacetPanel({
  facet,
  index,
  active,
  pinned,
}: {
  facet: Facet;
  index: number;
  active: number;
  pinned: boolean;
}) {
  // In static mode every facet is visible; once pinned, only the active one.
  const isActive = !pinned || active === index;
  return (
    <div
      data-omkumoh-panel
      className={`omkumoh-panel ${isActive ? "opacity-100" : "opacity-0"}`}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <p className="kicker">{facet.kicker}</p>
      <h3 className="mt-3 h-display text-2xl text-ink md:text-4xl">{facet.title}</h3>
      {facet.body ? <p className="mt-3 max-w-md text-ink-soft">{facet.body}</p> : null}
      {facet.variant === "stack" ? (
        <ul className="mt-4 divide-y divide-hairline-soft border-y border-hairline">
          {facet.stack!.map((t) => (
            <li key={t} className="flex items-center justify-between gap-4 py-2 text-sm text-ink-soft">
              <span>{t}</span>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      ) : facet.variant === "project" ? (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs uppercase tracking-[0.15em] text-ink-soft-2">
          {facet.stack!.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : null}
      {facet.url ? (
        <a
          href={facet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="u-link mt-4 font-mono text-sm text-ink"
        >
          View on GitHub <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </div>
  );
}

export default function OmkumohStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    let io: IntersectionObserver | null = null;
    let ctx: { revert: () => void } | null = null;
    let stRefresh: (() => void) | null = null;
    let cancelled = false;

    const init = async () => {
      try {
        const gsap = (await import("gsap")).gsap;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        stRefresh = () => ScrollTrigger.refresh();

        section.classList.add("is-pinned");
        setPinned(true);

        const cam = section.querySelector<HTMLElement>("[data-omkumoh-cam]");
        const progress = section.querySelector<HTMLElement>("[data-omkumoh-progress]");
        const rects = section.querySelectorAll<HTMLElement>("[data-omkumoh-rect]");
        const rect = section.getBoundingClientRect();

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=240%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                const idx = self.progress < 0.33 ? 0 : self.progress < 0.66 ? 1 : 2;
                setActive(idx);
                if (progress) progress.style.transform = `scaleX(${self.progress})`;
              },
            },
          });
          if (cam) {
            tl.fromTo(
              cam,
              { x: 0, y: 0 },
              { x: rect.width * 0.82, y: -rect.height * 0.62, duration: 1, ease: "none" },
              0
            );
          }
          rects.forEach((r, i) => {
            tl.fromTo(
              r,
              { y: 0, rotate: 0 },
              { y: i % 2 ? -14 : 14, rotate: i % 2 ? 2 : -2, duration: 1, ease: "none" },
              0
            );
          });
        }, section);
      } catch {
        if (!cancelled) {
          section.classList.remove("is-pinned");
          setPinned(false);
        }
      }
    };

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            void init();
            io?.disconnect();
          }
        });
      },
      { rootMargin: "1200px 0px" }
    );
    io.observe(section);

    const onLoad = () => stRefresh?.();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
      section.classList.remove("is-pinned");
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="OM'KUMOH scroll scene"
      data-project-id="omkumoh"
      data-cursor-label="VIEW PROJECT"
      className="omkumoh-stage"
    >
      <div className="omkumoh-blueprint relative h-[70vh] md:h-[85vh]">
        <div className="relative z-10 p-6 md:p-10">
          <p className="kicker">03 · Scroll the scene</p>
          <h3 className="mt-3 max-w-xl h-display text-3xl text-ink md:text-5xl">
            {omkumoh.title}
          </h3>
        </div>

        {/* abstract campus schematic */}
        <div className="omkumoh-rects">
          {RECTS.map((r) => (
            <div key={r.id} data-omkumoh-rect className="omkumoh-rect" style={{ width: r.w }}>
              <span>{r.id}</span>
            </div>
          ))}
        </div>

        {/* camera dot on a diagonal (start position here; GSAP moves it) */}
        <span data-omkumoh-cam className="omkumoh-cam" aria-hidden="true" />

        {/* progress rail */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-hairline">
          <div data-omkumoh-progress className="omkumoh-progress h-full w-full" />
        </div>
      </div>

      {/* info facets */}
      <div className="omkumoh-panels grid md:grid-cols-3">
        {FACETS.map((f, i) => (
          <FacetPanel key={f.kicker} facet={f} index={i} active={active} pinned={pinned} />
        ))}
      </div>
    </section>
  );
}