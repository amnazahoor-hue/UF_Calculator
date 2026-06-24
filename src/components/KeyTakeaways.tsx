import type { ReactNode } from "react";

type KeyTakeawaysProps = {
  children: ReactNode;
  speakable?: boolean;
};

export function KeyTakeaways({ children, speakable = true }: KeyTakeawaysProps) {
  return (
    <aside
      className="key-takeaways mt-4 rounded-2xl border border-[color-mix(in_oklab,var(--accent)_22%,var(--border))] bg-[color-mix(in_oklab,var(--bg-warm-2)_80%,var(--surface))] px-4 py-3 text-left sm:px-5 sm:py-4"
      aria-label="Resumen clave"
      {...(speakable ? { itemProp: "speakable" } : {})}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Resumen</p>
      <p className="key-takeaways-text mt-2 text-sm leading-relaxed text-ink sm:text-[0.95rem]">{children}</p>
    </aside>
  );
}
