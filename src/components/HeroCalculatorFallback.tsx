import { UfRatePanelSkeleton } from "./UfRatePanelSkeleton";

export function HeroCalculatorFallback() {
  return (
    <div id="tool" className="hero-calculator w-full">
      <div className="calculator-card hero-calculator-card rounded-[20px] p-4 text-left sm:rounded-[24px] sm:p-6">
        <div className="uf-rate-panel" aria-hidden>
          <UfRatePanelSkeleton />
        </div>
        <div className="mt-4 grid min-w-0 gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-4">
          <div className="calc-panel min-w-0 space-y-3" aria-hidden>
            <span className="uf-skeleton uf-skeleton--line block h-4 w-24" />
            <span className="uf-skeleton block h-12 w-full rounded-2xl" />
            <span className="uf-skeleton block h-12 w-full rounded-2xl" />
          </div>
          <div className="hidden lg:block" aria-hidden>
            <span className="uf-skeleton mx-auto block h-12 w-12 rounded-full" />
          </div>
          <div className="calc-panel min-w-0 space-y-3" aria-hidden>
            <span className="uf-skeleton uf-skeleton--line block h-4 w-20" />
            <span className="uf-skeleton block h-24 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
