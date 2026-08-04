"use client";

import { useEffect } from "react";

type SkillsGridIlluminationProps = {
  containerId: string;
};

const MOBILE_ILLUMINATION_DURATION = 1200;

export default function SkillsGridIllumination({
  containerId,
}: SkillsGridIlluminationProps) {
  useEffect(() => {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    const supportsHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (
      supportsHover.matches ||
      prefersReducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".skill-card"),
    );

    if (cards.length === 0) {
      return;
    }

    const removalTimers = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const card = entry.target as HTMLElement;

          observer.unobserve(card);
          card.classList.add("is-illuminated");

          const existingTimer = removalTimers.get(card);

          if (existingTimer !== undefined) {
            window.clearTimeout(existingTimer);
          }

          const removalTimer = window.setTimeout(() => {
            card.classList.remove("is-illuminated");
            removalTimers.delete(card);
          }, MOBILE_ILLUMINATION_DURATION);

          removalTimers.set(card, removalTimer);
        });
      },
      {
        rootMargin: "-22% 0px -22% 0px",
        threshold: 0.45,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();

      removalTimers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      removalTimers.clear();

      cards.forEach((card) => {
        card.classList.remove("is-illuminated");
      });
    };
  }, [containerId]);

  return null;
}
