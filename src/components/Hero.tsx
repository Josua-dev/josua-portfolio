import { site } from "@/data/site";
import { HeroEntrance } from "./HeroEntrance";
import GlassMonogram from "./three/GlassMonogram";

/**
 * Hero — light-editorial opener. The sodium-screen copy is gone; instead a
 * quiet, human statement with the single glass monogram as the focal mark.
 *
 * Layout reads top-to-bottom like a masthead: eyebrow → serif-led display →
 * one line of honest positioning → two real actions. The mark sits beside the
 * headline on wide screens, above it on small ones, and recedes so the type
 * stays the first thing a recruiter or a reader actually notices.
 */
export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative flex min-h-svh w-full items-center overflow-hidden px-6 pt-28 pb-20 md:px-16"
    >
      <HeroEntrance />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.35fr_1fr] md:gap-12">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <p data-hero-move className="kicker mb-6">
            Windhoek, Namibia
          </p>
          <h1 className="h-display text-[clamp(2.6rem,8.5vw,6.5rem)]">
            Software that has to{" "}
            <span className="accent-serif">work for everyone</span> — that&apos;s
            the only way it works here.
          </h1>
          <p data-hero-move className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            I&apos;m {site.fullName} — a software developer and AI enthusiast. I build
            web and Android things, study how LLMs are built from the ground up,
            and keep every line on GitHub.
          </p>
          <div data-hero-move className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#work" className="btn-ink">
              See the work <span aria-hidden="true">↓</span>
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="btn-ghost"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Mark */}
        <div data-hero-move className="order-1 flex items-center justify-center md:order-2">
          <GlassMonogram large />
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2">
        <span className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-ink-soft-2">
            Scroll
          </span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="11" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.2" className="text-hairline" />
            <rect x="5.5" y="5" width="3" height="5" rx="1.5" fill="var(--color-accent)" />
          </svg>
        </span>
      </div>
    </section>
  );
}