"use client";

import { useEffect, useState } from "react";

type UseDeferClientOptions = {
  idleTimeout?: number;
  interactionSelector?: string;
  rootMargin?: string;
};

export function useDeferClient({
  idleTimeout = 3000,
  interactionSelector,
  rootMargin,
}: UseDeferClientOptions = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) {
        setReady(true);
      }
    };

    const onInteraction = (event: Event) => {
      if (!interactionSelector) {
        enable();
        return;
      }

      const target = event.target;
      if (target instanceof Element && target.closest(interactionSelector)) {
        enable();
      }
    };

    window.addEventListener("pointerdown", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction);

    let idleId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: idleTimeout });
    } else {
      idleId = window.setTimeout(enable, idleTimeout);
    }

    let observer: IntersectionObserver | undefined;
    if (rootMargin) {
      const node = document.querySelector("[data-defer-root]");
      if (node) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              enable();
            }
          },
          { rootMargin },
        );
        observer.observe(node);
      }
    }

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      if (typeof window.cancelIdleCallback === "function" && idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      } else if (idleId !== undefined) {
        window.clearTimeout(idleId);
      }
      observer?.disconnect();
    };
  }, [ready, idleTimeout, interactionSelector, rootMargin]);

  return ready;
}
