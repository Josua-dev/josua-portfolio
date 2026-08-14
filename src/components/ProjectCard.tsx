import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <li
      data-project
      data-project-id={project.id}
      data-cursor-label="VIEW PROJECT"
      className="group grid border-b border-hairline py-8 transition-colors last:border-0 md:grid-cols-12 md:items-start md:gap-6"
    >
      {/* catalog number */}
      <p className="flex items-center gap-3 font-mono text-sm tracking-[0.1em] text-ink-soft-2 md:col-span-1">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
        {String(index + 1).padStart(2, "0")}
      </p>

      {/* title + facts */}
      <div className="md:col-span-7">
        <h3 className="h-display text-2xl leading-snug text-ink md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-ink-soft">{project.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs uppercase tracking-[0.15em] text-ink-soft-2">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      {/* year · role + link */}
      <div className="mt-4 flex flex-row items-baseline justify-between gap-4 md:col-span-4 md:mt-0 md:flex-col md:items-end md:gap-6">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-soft-2">
          {project.year} · {project.role}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="u-link font-mono text-sm text-ink"
        >
          View on GitHub <span aria-hidden="true">→</span>
        </a>
      </div>
    </li>
  );
}