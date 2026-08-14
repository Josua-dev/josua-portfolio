import { site } from "@/data/site";

export default function Manifesto() {
  return (
    <section className="px-6 py-20 md:px-16" aria-labelledby="manifesto-heading">
      <h2 id="manifesto-heading" className="sr-only">
        Manifesto
      </h2>
      <div className="mx-auto max-w-5xl">
        <div className="hairline-t" />
        <div className="mt-12 flex items-start gap-6 md:gap-10">
          <span aria-hidden="true" className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
          <blockquote className="h-display text-[clamp(1.6rem,4.2vw,3rem)] text-ink">
            Software in Namibia has to{" "}
            <span className="accent-serif">work for everyone</span>: government
            desks, small businesses, and people on the ground.
          </blockquote>
        </div>
        <p className="mt-7 pl-8 text-sm tracking-wide text-ink-soft md:pl-16">
          {site.fullName} · <span className="tag">{site.location}</span>
        </p>
        <div className="mt-12 hairline-b" />
      </div>
    </section>
  );
}