"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { useReveal } from "@/lib/useReveal";
import ProjectCard from "./ProjectCard";
import { DossierCover, ReportCover, MatrixCover } from "./ProjectCover";
import OmkumohStage from "./OmkumohStage";
import type { ComponentType } from "react";

/** Cinematic intro/exit shared by project rows when filtering. */
const rowMotion = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function Covers({ cover }: { cover: ComponentType }) {
  const Cover = cover;
  return (
    <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">
      <Cover />
    </div>
  );
}

function FeaturedRow({
  project,
  index,
  cover,
}: {
  project: Project;
  index: number;
  cover: ComponentType;
}) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      layout
      {...rowMotion}
      data-project-id={project.id}
      data-cursor-label="VIEW PROJECT"
      className="group grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16"
    >
      <div className={flip ? "order-1 md:order-2" : "order-1"}>
        <p className="tag mb-4">{String(index + 1).padStart(2, "0")} · {project.category}</p>
        <h3 className="h-display text-3xl text-ink md:text-[2.75rem]">{project.title}</h3>
        <p className="mt-4 max-w-md text-ink-soft">{project.blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-xs uppercase tracking-[0.15em] text-ink-soft-2">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-ink-soft-2">
          {project.year} · {project.role}
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="u-link mt-6 font-mono text-sm text-ink"
        >
          View source on GitHub <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={flip ? "order-2 mt-8 md:order-1 md:mt-0" : "order-2 mt-8 md:mt-0"}>
        <Covers cover={cover} />
      </div>
    </motion.article>
  );
}

export default function ProjectsShowcase() {
  const root = useReveal("[data-reveal]", 0.15);
  const [filter, setFilter] = useState<ProjectCategory>("All");

  // Covers keyed by id for the four featured builds.
  const COVER: Record<string, ComponentType> = {
    moj: DossierCover,
    "road-fund": ReportCover,
    "movie-rec": MatrixCover,
  };

  const matches = (c: Project["category"]) => filter === "All" || c === filter;

  const featured = useMemo(
    () => projects.filter((p) => p.featured && matches(p.category)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );
  const rest = useMemo(
    () => projects.filter((p) => !p.featured && matches(p.category)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  // OM'KUMOH is a featured Web build presented as its own scroll scene; keep it
  // out of the card grid so it isn't double-rendered, but still filter it.
  const showOmkumoh = matches("Web");
  const featuredCards = featured.filter((p) => p.id !== "omkumoh");

  return (
    <section
      ref={root}
      id="work"
      aria-labelledby="work-heading"
      className="px-6 py-24 md:px-16"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p data-reveal className="kicker mb-8">Selected work</p>
          <h2 id="work-heading" className="h-display text-[clamp(2rem,5vw,3.6rem)]">
            Built in the open, on GitHub.
          </h2>
        </div>
        <p className="hidden text-xs uppercase tracking-[0.25em] text-ink-soft-2 md:block">
          {projects.length} builds · 2024–2026
        </p>
      </div>

      {/* Filter chips */}
      <div data-reveal className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {projectCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`chip ${filter === c ? "is-active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="mb-12 max-w-xl text-ink-soft" data-reveal>
        Real builds, all on GitHub: a court-workflow case tracker, a road-fund
        dashboard, a consulting-engineers site, a movie recommender, and CLI
        tools from my first years coding.
      </p>

      {/* Featured rows + OM'KUMOH scroll scene, animated on filter change */}
      <div className="border-t border-hairline">
        <AnimatePresence mode="popLayout" initial={false}>
          {showOmkumoh && (
            <motion.div layout key="omkumoh-scene" {...rowMotion}>
              <div className="mb-10 pt-12">
                <OmkumohStage />
              </div>
            </motion.div>
          )}
          {featuredCards.map((p, i) => (
            <FeaturedRow key={p.id} project={p} index={i + 1} cover={COVER[p.id] ?? MatrixCover} />
          ))}
        </AnimatePresence>
      </div>

      {/* Ledger of the remaining builds */}
      {rest.length > 0 && (
        <ol className="mt-8 border-t border-hairline">
          <AnimatePresence initial={false}>
            {rest.map((p, i) => (
              <motion.div layout key={p.id} {...rowMotion} transition={{ ...rowMotion.transition, duration: 0.35 }}>
                <ProjectCard project={p} index={projects.findIndex((x) => x.id === p.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ol>
      )}

      <p className="mt-10 text-xs uppercase tracking-[0.25em] text-ink-soft-2">
        Full source on GitHub:{" "}
        <a href="https://github.com/Josua-dev" target="_blank" rel="noopener noreferrer" className="u-link text-accent">
          github.com/Josua-dev
        </a>
      </p>
    </section>
  );
}