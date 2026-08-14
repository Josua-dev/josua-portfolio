import { site } from "@/data/site";

export default function Footer() {
  const year = 2026; // fixed to the real build year, not invented
  return (
    <footer className="px-6 pb-14 pt-8 md:px-16">
      <div className="border-t border-hairline pt-8">
        <p className="flex items-center font-mono text-xs uppercase tracking-[0.3em] text-ink-soft-2">
          Windhoek · Namibia
        </p>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
          <a href="#hero-section" className="u-link text-ink">
            Back to top <span aria-hidden="true">↑</span>
          </a>
          <a href={site.contact.github} target="_blank" rel="noopener noreferrer" className="u-link text-ink">
            GitHub
          </a>
          <a href={`mailto:${site.contact.email}`} className="u-link text-ink">
            Email
          </a>
        </div>

        <p className="mt-8 text-sm text-ink-soft-2">
          © {year} · {site.fullName} · Built in Windhoek, Namibia.
        </p>
      </div>
    </footer>
  );
}