export function UfRatePanelSkeleton() {
  return (
    <div className="uf-rate-panel-skeleton" aria-hidden>
      <div className="uf-rate-panel-skeleton-head">
        <div className="uf-rate-panel-skeleton-copy">
          <span className="uf-skeleton uf-skeleton--line uf-skeleton--eyebrow" />
          <span className="uf-skeleton uf-skeleton--line uf-skeleton--date" />
        </div>
        <span className="uf-skeleton uf-skeleton--button" />
      </div>
      <span className="uf-skeleton uf-skeleton--value" />
      <span className="uf-skeleton uf-skeleton--change" />
      <div className="uf-rate-panel-skeleton-strip">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className="uf-skeleton uf-skeleton--strip-item" />
        ))}
      </div>
    </div>
  );
}

export function UfRateValueSkeleton({ className = "" }: { className?: string }) {
  return (
    <span
      className={["uf-skeleton uf-skeleton--inline-rate", className].filter(Boolean).join(" ")}
      aria-hidden
    />
  );
}
