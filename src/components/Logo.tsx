type LogoProps = {
  variant?: "default" | "light";
  compact?: boolean;
  width?: number;
  height?: number;
};

export function Logo({ variant = "default", compact = false, width, height }: LogoProps) {
  const textColor = variant === "light" ? "var(--surface)" : "var(--ink)";
  const iconFill = "var(--accent)";
  const w = width ?? (compact ? 120 : 140);
  const h = height ?? (compact ? 36 : 40);

  if (compact) {
    return (
      <svg width={w} height={h} viewBox="0 0 120 36" role="img" aria-label="UF Calculator Chile" className="shrink-0">
        <rect x="0" y="2" width="32" height="32" rx="10" fill={iconFill} />
        <path d="M8 22L14 16L19 19L25 13" stroke="var(--surface)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="25" cy="13" r="2.5" fill="var(--surface)" />
        <text x="40" y="23" fill={textColor} fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
          UF Calc
        </text>
      </svg>
    );
  }

  return (
    <svg width={w} height={h} viewBox="0 0 140 40" role="img" aria-label="UF Calculator Chile" className="shrink-0">
      <rect x="1" y="1" width="38" height="38" rx="12" fill={iconFill} />
      <path d="M10 24L17 17L24 22L30 14" stroke="var(--accent-2)" strokeWidth="3" fill="none" />
      <circle cx="30" cy="14" r="3" fill="var(--surface)" />
      <text x="48" y="22" fill={textColor} fontSize="15" fontWeight="700" fontFamily="Inter, sans-serif">
        UF Calculator
      </text>
      <text x="48" y="33" fill={textColor} fontSize="9" fontWeight="500" fontFamily="Inter, sans-serif">
        Chile
      </text>
    </svg>
  );
}
