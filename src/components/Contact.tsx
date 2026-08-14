import { site } from "@/data/site";

const links = [
  { label: "Email", href: `mailto:${site.contact.email}`, external: false },
  { label: "GitHub", href: site.contact.github, external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 py-32 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <p className="kicker pt-1">Contact</p>
          <span className="rounded-full border border-accent-line bg-accent-wash px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Open to work
          </span>
        </div>

        <h2
          id="contact-heading"
          className="mt-12 max-w-3xl h-display text-[clamp(2.2rem,6vw,4.6rem)]"
        >
          Have something{" "}
          <span className="accent-serif">worth building</span>?
        </h2>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          I&apos;m open to Android, web, and AI work. Email is fastest.
        </p>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="What I work on">
          {site.tags.map((t) => (
            <li key={t} className="tag border border-hairline px-3 py-1.5">
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-14 border-t border-hairline">
          {links.map((l) => (
            <li key={l.label} className="border-b border-hairline">
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group flex flex-wrap items-center justify-between gap-6 py-6 h-display text-2xl text-ink transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:text-[2rem]"
              >
                <span>
                  {l.label === "Email" ? "Send me an email" : "View my work"}{" "}
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="min-w-0 break-all font-mono text-xs uppercase tracking-[0.2em] text-ink-soft-2">
                  {l.href.replace("mailto:", "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}