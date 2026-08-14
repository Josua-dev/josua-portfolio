"use client";

import { useState, useSyncExternalStore } from "react";
import { useReveal } from "@/lib/useReveal";

/**
 * AI Enthusiast — honest learning-stance chips.
 *
 * Every chip description is rendered in a ruled list (safe with no-JS and
 * reduced-motion). Hover/focus on a chip lights its description and dims the
 * others; on coarse pointers everything stays at full contrast. The copy is
 * deliberately modest — someone early in the subject, not claiming shipped AI.
 */
const CHIPS = [
  {
    id: "llms",
    label: "LLMs",
    desc: "Large language models. I&apos;m studying how they're built, from the data up.",
  },
  {
    id: "ml",
    label: "Machine Learning",
    desc: "My first hands-on pass was the movie recommender.",
  },
  {
    id: "agents",
    label: "AI Agents",
    desc: "Models that act on their own. Reading about them, nothing shipped yet.",
  },
  {
    id: "rag",
    label: "RAG",
    desc: "Retrieval-augmented generation: how a model answers using sources it can fetch.",
  },
  {
    id: "integrations",
    label: "AI Integrations",
    desc: "Wiring model calls into software. A goal, not yet a skill.",
  },
  {
    id: "python",
    label: "Python",
    desc: "My main language for the recommender and ATM projects.",
  },
];

/** Hydration detector: false on the server, true once mounted on the client. */
function subscribeEmpty(): () => void {
  return () => {};
}

/** Live (hover: none) media-query subscription via useSyncExternalStore. */
function subscribeCoarse(callback: () => void): () => void {
  const mq = window.matchMedia("(hover: none)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getCoarse(): boolean {
  return window.matchMedia("(hover: none)").matches;
}

export default function AiSection() {
  const root = useReveal("[data-reveal]", 0.15);
  const [active, setActive] = useState<string | null>(null);
  const mounted = useSyncExternalStore(subscribeEmpty, () => true, () => false);
  const coarse = useSyncExternalStore(subscribeCoarse, getCoarse, () => false);

  const descClass = (id: string) => {
    if (coarse || active === id) return "text-ink";
    return "text-ink-soft";
  };

  return (
    <section ref={root} id="ai" aria-labelledby="ai-heading" className="px-6 py-24 md:px-16">
      <p data-reveal className="kicker mb-8">
        AI Enthusiast
      </p>
      <h2
        data-reveal
        id="ai-heading"
        className="max-w-3xl h-display text-[clamp(2rem,5vw,3.4rem)]"
      >
        Learning how LLMs are built,{" "}
        <span className="accent-serif">from the ground up</span>.
      </h2>
      <p data-reveal className="mt-6 max-w-2xl text-ink-soft">
        I&apos;m early in this. My movie recommender got me started on turning
        descriptions into features and matching them against preferences.
      </p>

      <ul data-reveal className="mt-12 flex flex-wrap gap-3">
        {CHIPS.map((c) => (
          <li key={c.id}>
            {mounted ? (
              <button
                type="button"
                aria-describedby={`ai-desc-${c.id}`}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                className={`chip focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  coarse || active === c.id ? "is-active" : ""
                }`}
              >
                {c.label}
              </button>
            ) : (
              <span className="tag inline-block border border-hairline px-4 py-2 text-ink-soft">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      <ul data-reveal className="mt-10 max-w-2xl border-t border-hairline">
        {CHIPS.map((c) => (
          <li key={c.id} id={`ai-desc-${c.id}`} className="border-b border-hairline py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">{c.label}</p>
            <p className={`mt-1 transition-colors ${descClass(c.id)}`}>{c.desc}</p>
          </li>
        ))}
      </ul>

      <a
        data-reveal
        href="https://github.com/Josua-dev/MovieRecommendationSystem"
        target="_blank"
        rel="noopener noreferrer"
        className="u-link mt-10 font-mono text-sm text-accent"
      >
        The one that started it: Movie Recommendation System <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}