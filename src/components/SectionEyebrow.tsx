type SectionEyebrowProps = {
  children: React.ReactNode;
  variant?: "light" | "dark";
};

export function SectionEyebrow({ children, variant = "light" }: SectionEyebrowProps) {
  if (variant === "dark") {
    return (
      <span className="inline-flex rounded-full border border-[color-mix(in_oklab,var(--accent)_50%,transparent)] bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-2">
        {children}
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-[color-mix(in_oklab,var(--accent)_30%,var(--border))] bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
      {children}
    </span>
  );
}
