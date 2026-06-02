type SectionWaveProps = {
  /** CSS variable name for fill, e.g. "--ink" */
  fill?: string;
  className?: string;
  flip?: boolean;
};

export function SectionWave({ fill = "--ink", className = "", flip = false }: SectionWaveProps) {
  return (
    <div className={`relative w-full leading-[0] ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14"
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
      >
        <path
          fill={`var(${fill})`}
          d="M0,40 C240,8 480,56 720,32 C960,8 1200,48 1440,24 L1440,56 L0,56 Z"
        />
      </svg>
    </div>
  );
}
