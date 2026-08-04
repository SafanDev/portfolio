"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
    vaq?: unknown[][];
  }
}

export default function PortfolioAnalyticsClient() {
  useEffect(() => {
    if (window.va) {
      return;
    }

    window.va = (...args: unknown[]) => {
      window.vaq = window.vaq ?? [];
      window.vaq.push(args);
    };
  }, []);

  return (
    <Script
      id="vercel-web-analytics"
      src="/_vercel/insights/script.js"
      strategy="afterInteractive"
    />
  );
}
