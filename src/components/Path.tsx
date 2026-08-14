"use client";

import { useReveal } from "@/lib/useReveal";
import { exploringSkills } from "@/data/skills";

/**
 * Path — the honest version of a "resume". No invented jobs, schools beyond
 * NUST, or start dates. Education is what's real; the rest is a short list of
 * where things are heading. This is deliberately modest, because that's true.
 */

const EDUCATION = [
  {
    when: "Present",
    place: "NUST · Windhoek, Namibia",
    label: "Studying for a software development qualification",
    body: "Web, Android, software systems and coursework that started the CLI tools and the case-tracker projects in this portfolio.",
  },
];

const CURRENT_FOCUS = [
  {
    title: "Building for the Namibian market",
    body: "Software here has to work for government desks, small businesses and people on the ground — that's the bar I aim at.",
  },
  {
    title: "Learning LLMs from the ground up",
    body: "How they're trained, how they're built, and what it takes to wire one into a real product. Sharing the journey on GitHub.",
  },
];

export default function Path() {
  const root = useReveal("[data-reveal]", 0.15);

  return (
    <section ref={root} id="path" aria-labelledby="path-heading" className="px-6 py-24 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.35fr]">
        <div data-reveal>
          <p className="kicker mb-8">Path</p>
          <h2 id="path-heading" className="h-display text-[clamp(1.8rem,4vw,2.8rem)]">
            Studying in Windhoek, building for{" "}
            <span className="accent-serif">Namibia</span>.
          </h2>
          <p className="mt-6 max-w-sm text-ink-soft">
            A short, truthful version of the record so far — the studying is
            real, the focus is provided honestly, and nothing is padded.
          </p>
        </div>

        <div data-reveal className="space-y-14">
          {/* Education timeline */}
          <div>
            <h3 className="tag mb-6">Education</h3>
            <ol className="space-y-8">
              {EDUCATION.map((e) => (
                <li key={e.label} className="timeline-item pl-10">
                  <span aria-hidden="true" className="timeline-marker" />
                  <p className="tag">{e.when}</p>
                  <p className="mt-1 font-medium text-ink">{e.place}</p>
                  <p className="mt-2 max-w-md text-ink-soft">{e.body}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Current focus */}
          <div>
            <h3 className="tag mb-6">Current focus</h3>
            <ul className="divide-y divide-hairline border-y border-hairline">
              {CURRENT_FOCUS.map((c) => (
                <li key={c.title} className="py-5">
                  <p className="font-medium text-ink">{c.title}</p>
                  <p className="mt-1.5 max-w-md text-ink-soft">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Exploring */}
          <div>
            <h3 className="tag mb-4">Exploring</h3>
            <p className="mb-4 max-w-md text-sm text-ink-soft">
              No public project yet — learning in public, nothing claimed until
              there&apos;s something to point at.
            </p>
            <ul className="flex flex-wrap gap-2">
              {exploringSkills.map((s) => (
                <li key={s} className="tag border border-hairline px-3 py-1.5">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}