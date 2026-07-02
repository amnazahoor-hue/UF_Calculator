"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyOnViewProps = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
};

export function LazyOnView({ children, rootMargin = "280px 0px", minHeight = "1px" }: LazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className="lazy-on-view-slot" style={{ minHeight }}>
      {visible ? children : null}
    </div>
  );
}
