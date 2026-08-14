/**
 * Non-fabricated CSS/SVG covers. No images, no metrics, no numbers — just
 * abstract paper-and-ink stand-ins so a build reads as a real artifact
 * without inventing a screenshot that doesn't exist.
 */

function coverBase() {
  return "work-figure relative aspect-[4/3] overflow-hidden p-7";
}

export function DossierCover() {
  return (
    <div aria-hidden="true" className={coverBase()}>
      <div className="absolute left-7 top-0 h-3 w-24 border border-accent-line border-t-0" />
      <p className="tag">Case file · 001</p>
      <div className="mt-4 space-y-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-baseline gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span className="h-2 flex-1 border-b border-hairline" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-5 rounded-sm border border-accent-line bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-surface">
        filed
      </div>
    </div>
  );
}

export function ReportCover() {
  return (
    <div aria-hidden="true" className={coverBase()}>
      <div className="flex items-center justify-between">
        <p className="tag">Road maintenance · report</p>
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="mt-5 space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-1.5">
            <span className="tag">{["Section", "Location", "Severity", "Status"][i]}</span>
            <span className="h-2 w-2/3 border-b border-hairline" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 right-7 -rotate-6 border-2 border-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        Stamped
      </div>
    </div>
  );
}

export function MatrixCover() {
  const cells = [
    "1e7a68", "0e3f36", "efe9dd", "0e3f36", "efe9dd", "efe9dd",
    "efe9dd", "efe9dd", "0e3f36", "efe9dd", "0e3f36", "efe9dd",
    "0e3f36", "efe9dd", "efe9dd", "1e7a68", "efe9dd", "0e3f36",
  ];
  return (
    <div aria-hidden="true" className={coverBase()}>
      <p className="mb-4 tag">Recommendation matrix</p>
      <div className="grid grid-cols-6 gap-1.5">
        {cells.map((c, i) => (
          <div key={i} className="aspect-square rounded-[2px] border border-hairline" style={{ backgroundColor: `#${c}` }} />
        ))}
      </div>
    </div>
  );
}