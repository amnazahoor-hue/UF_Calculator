"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-L4WP8HW7L4";
const LOAD_DELAY_MS = 12_000;

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) return;

    const enable = () => setEnabled(true);
    const interactionEvents = ["pointerdown", "keydown", "touchstart"] as const;

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, enable, { once: true, passive: true });
    });

    const timeout = window.setTimeout(enable, LOAD_DELAY_MS);

    return () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, enable);
      });
      window.clearTimeout(timeout);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
