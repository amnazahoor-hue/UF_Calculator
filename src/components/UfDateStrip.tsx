"use client";

import { useCallback, useEffect, useRef } from "react";
import { formatClpRate, formatUfStripLabel, prepareStripHistory, type UfRateDay } from "@/lib/ufRate";

type UfDateStripProps = {
  history: UfRateDay[];
  selectedDate: string;
  onSelect: (dateKey: string) => void;
};

function scrollItemIntoHorizontalStrip(
  scroller: HTMLElement,
  item: HTMLElement,
  behavior: ScrollBehavior,
) {
  const itemLeft = item.offsetLeft;
  const itemWidth = item.offsetWidth;
  const scrollerWidth = scroller.clientWidth;
  const targetLeft = itemLeft - (scrollerWidth - itemWidth) / 2;

  scroller.scrollTo({
    left: Math.max(0, targetLeft),
    behavior,
  });
}

export function UfDateStrip({ history, selectedDate, onSelect }: UfDateStripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const stripDays = prepareStripHistory(history);

  const scrollByAmount = useCallback((direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 220, behavior: "smooth" });
  }, []);

  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const item = selectedRef.current;
    if (!scroller || !item) return;

    const behavior = hasScrolledRef.current ? "smooth" : "instant";
    hasScrolledRef.current = true;

    const frame = requestAnimationFrame(() => {
      scrollItemIntoHorizontalStrip(scroller, item, behavior);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedDate, stripDays.length]);

  if (!stripDays.length) return null;

  return (
    <div className="uf-date-strip">
      <button
        type="button"
        className="uf-date-strip-arrow"
        onClick={() => scrollByAmount(-1)}
      >
        <span aria-hidden>‹</span>
        <span className="sr-only">Ver días anteriores del historial de valor UF</span>
      </button>

      <div ref={scrollerRef} className="uf-date-strip-scroll" role="tablist" aria-label="Seleccionar fecha UF">
        {stripDays.map((day) => {
          const isSelected = day.date === selectedDate;

          return (
            <button
              key={day.date}
              ref={isSelected ? selectedRef : undefined}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(day.date)}
              className={`uf-date-strip-item ${isSelected ? "uf-date-strip-item--active" : ""} ${day.projected ? "uf-date-strip-item--projected" : ""}`}
            >
              <span className="uf-date-strip-item-label">{formatUfStripLabel(day.date)}</span>
              <span className="uf-date-strip-item-rate">{formatClpRate(day.rate)}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="uf-date-strip-arrow"
        onClick={() => scrollByAmount(1)}
      >
        <span aria-hidden>›</span>
        <span className="sr-only">Ver días siguientes del historial de valor UF</span>
      </button>
    </div>
  );
}
