"use client";

import Image from "next/image";
import { site } from "@/data/site";
import { useReveal } from "@/lib/useReveal";

/**
 * About — real, human, and deliberately un-styled for effect. Only facts that
 * are true appear here: a student at NUST in Windhoek, learning LLMs from the
 * ground up, shipping work to GitHub. No invented jobs, titles or stats.
 */
export default function About() {
  const root = useReveal("[data-reveal]", 0.2);

  return (
    <section id="about" aria-labelledby="about-heading" ref={root} className="px-6 py-28 md:px-16">
      <p data-reveal className="kicker mb-8">About</p>
      <div className="max-w-3xl">
        <h2
          id="about-heading"
          className="h-display text-[clamp(2rem,5vw,3.6rem)]"
        >
          Android and web, built in Windhoek —{" "}
          <span className="accent-serif">for Namibia</span>.
        </h2>
      </div>

      <div data-reveal className="mt-8 max-w-2xl">
        <p className="text-lg leading-relaxed text-ink-soft">
          I&apos;m a software developer studying at NUST in Windhoek. Lately
          I&apos;ve been learning how LLMs are built from the ground up, and
          most of what I make ends up on GitHub.
        </p>
      </div>

      <div data-reveal className="mt-14 flex flex-wrap items-center gap-6">
        <Image
          src={site.avatarUrl}
          alt={`Portrait of ${site.name}`}
          width={112}
          height={112}
          className="h-28 w-28 rounded-full border border-hairline object-cover"
        />
        <div>
          <p className="text-lg font-medium text-ink">{site.fullName}</p>
          <p className="mt-1 text-sm uppercase tracking-[0.2em] text-ink-soft-2">
            {site.location}
          </p>
        </div>
      </div>
    </section>
  );
}