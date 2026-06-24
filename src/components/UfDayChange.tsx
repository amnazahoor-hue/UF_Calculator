import { formatUfDayChangeLabel, type UfDayChange } from "@/lib/ufRate";

type UfDayChangeProps = {
  change: UfDayChange;
  referenceDate: string;
  compact?: boolean;
};

export function UfDayChangeNotice({ change, referenceDate, compact = false }: UfDayChangeProps) {
  const arrow = change.direction === "up" ? "▲" : change.direction === "down" ? "▼" : "●";

  return (
    <div
      className={`uf-day-change uf-day-change--${change.direction} ${compact ? "uf-day-change--compact" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="uf-day-change-arrow" aria-hidden>
        {arrow}
      </span>
      <span className="uf-day-change-text">{formatUfDayChangeLabel(change, referenceDate)}</span>
    </div>
  );
}
