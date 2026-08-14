"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useReveal } from "@/lib/useReveal";
import { skillGroups, exploringSkills } from "@/data/skills";

/**
 * The Stack — categorized tools, no fabricated proficiency percentages.
 * Hover/focus a tool and the project cards on the page light up if the tool
 * appears in that build's real stack, dimming the rest.
 *
 * Everything here is derived from the actual project stacks (see data/skills).
 * The highlight is JS-gated (`.js .is-dimmed`), so no-JS and reduced-motion see
 * an un-dimmed static list; items render as <span>s before hydration.
 */
const ALL_TECH = skillGroups.flatMap((g) => g.items);
const EXPLORE_HINT = "No public project yet. Learning in public.";

/** Hydration detector: false on the server, true once mounted on the client. */
function subscribeEmpty(): () => void {
  return () => {};
}

function targetProject(labels: string[]): string[] {
  // Map a skill label back to project ids where it actually shows. This mirrors
  // the real stacks so hovering never claims a project that doesn't use it.
  const map: Record<string, string[]> = {
    JavaScript: ["moj", "road-fund"],
    TypeScript: ["road-fund", "omkumoh"],
    "Next.js 16": ["omkumoh"],
    GSAP: ["omkumoh"],
    "3D / WebGL": ["omkumoh"],
    Dashboards: ["road-fund"],
    Python: ["movie-rec", "atm"],
    Java: ["phonebook"],
    "CLI tools": ["atm", "phonebook"],
    "Data modeling": ["moj"],
    Recommendation: ["movie-rec"],
    "Python · ML": ["movie-rec"],
  };
  const out = new Set<string>();
  labels.forEach((l) => map[l]?.forEach((id) => out.add(id)));
  return [...out];
}

export default function TechEcosystem() {
  const root = useReveal("[data-reveal]", 0.15);
  const [active, setActive] = useState<string | null>(null);
  const mounted = useSyncExternalStore(subscribeEmpty, () => true, () => false);

  useEffect(() => {
    const label = active;
    document.querySelectorAll<HTMLElement>("[data-project-id]").forEach((el) => {
      el.classList.remove("is-lit", "is-dimmed");
    });
    if (!label) return;
    const tech = ALL_TECH.find((t) => t.label === label);
    const targets = new Set(targetProject(tech ? [tech.label] : []));
    document.querySelectorAll<HTMLElement>("[data-project-id]").forEach((el) => {
      const id = el.dataset.projectId ?? "";
      el.classList.toggle("is-lit", targets.has(id));
      el.classList.toggle("is-dimmed", !targets.has(id));
    });
  }, [active]);

  const activeIsExploring = exploringSkills.includes(active ?? "");

  return (
    <section ref={root} id="stack" aria-labelledby="stack-heading" className="px-6 py-24 md:px-16">
      <div className="max-w-6xl">
        <p data-reveal className="kicker mb-8">Stack</p>
        <h2 id="stack-heading" className="h-display text-[clamp(2rem,5vw,3.4rem)]">
          The stack I build with
        </h2>
        <p data-reveal className="mt-5 max-w-2xl text-ink-soft">
          Grouped by where each tool actually shows up. No invented proficiency
          bars — hover or focus a tool to see the real projects it appears in.
        </p>

        <div data-reveal className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.name} className="border-t border-hairline">
              <h3 className="pt-4 font-medium text-ink">{g.name}</h3>
              {g.note ? <p className="mt-1 text-sm text-ink-soft-2">{g.note}</p> : null}
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li key={t.label}>
                    {mounted ? (
                      <button
                        type="button"
                        aria-describedby="stack-hint"
                        onMouseEnter={() => setActive(t.label)}
                        onFocus={() => setActive(t.label)}
                        onMouseLeave={() => setActive(null)}
                        onBlur={() => setActive(null)}
                        className={`tag border px-3 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          active === t.label
                            ? "border-ink bg-ink text-surface"
                            : "border-hairline text-ink-soft hover:border-accent-line hover:text-accent"
                        }`}
                        title={t.where}
                      >
                        {t.label}
                        {t.where ? <span className="sr-only"> — used in {t.where}</span> : null}
                      </button>
                    ) : (
                      <span className="tag inline-block border border-hairline px-3 py-1.5 text-ink-soft">
                        {t.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Exploring / AI row */}
        <div data-reveal className="mt-12 border-t border-hairline pt-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <h3 className="min-w-[10rem] font-medium text-ink">Exploring · AI</h3>
            <ul className="flex flex-wrap gap-2">
              {exploringSkills.map((s) => (
                <li key={s} className="tag border border-accent-line bg-accent-wash px-3 py-1.5 text-accent">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          id="stack-hint"
          aria-live="polite"
          className="mt-8 text-xs uppercase tracking-[0.25em] text-accent"
        >
          {activeIsExploring ? EXPLORE_HINT : " "}
        </p>
      </div>
    </section>
  );
}