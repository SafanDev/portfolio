"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = "[data-reveal]";
const readyClass = "reveal-ready";
const initializingClass = "reveal-initializing";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    let observer: IntersectionObserver | null = null;
    let setupFrame = 0;
    let readyFrame = 0;
    let hashScrollFrame = 0;
    let hashScrollTimer = 0;
    let isCurrent = true;

    root.classList.remove(
      readyClass,
      initializingClass,
    );

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-visible");
      observer?.unobserve(element);
    };

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>(
          revealSelector,
        )
        .forEach(reveal);

      root.classList.remove(
        readyClass,
        initializingClass,
      );
    };

    const revealHashTarget = (restoreScroll = false) => {
      const hash = window.location.hash.slice(1);

      if (!hash) {
        return;
      }

      let id = hash;

      try {
        id = decodeURIComponent(hash);
      } catch {
        id = hash;
      }

      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      if (target.matches(revealSelector)) {
        reveal(target);
      }

      target
        .querySelectorAll<HTMLElement>(
          revealSelector,
        )
        .forEach(reveal);

      if (!restoreScroll) {
        return;
      }

      const scrollTargetIntoView = () => {
        const rect = target.getBoundingClientRect();
        const headerOffset = 112;
        const isInViewport =
          rect.bottom > headerOffset &&
          rect.top < window.innerHeight;

        if (!isInViewport) {
          const scrollMarginTop =
            Number.parseFloat(
              window.getComputedStyle(target).scrollMarginTop,
            ) || headerOffset;
          const targetTop =
            window.scrollY + rect.top - scrollMarginTop;

          window.scrollTo(0, Math.max(0, targetTop));
        }
      };

      cancelAnimationFrame(hashScrollFrame);
      window.clearTimeout(hashScrollTimer);

      hashScrollFrame = requestAnimationFrame(() => {
        hashScrollFrame = requestAnimationFrame(
          scrollTargetIntoView,
        );
      });

      // Images and deferred layout can settle after the first paint. This
      // second guarded check keeps direct hash URLs reliable without
      // moving a target that is already visible.
      hashScrollTimer = window.setTimeout(
        scrollTargetIntoView,
        140,
      );
    };

    const handleHashChange = () => {
      revealHashTarget(true);
    };

    const setup = () => {
      if (!isCurrent) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const supportsObserver =
        "IntersectionObserver" in window;

      if (reducedMotion || !supportsObserver) {
        revealAll();
        revealHashTarget(true);
        return;
      }

      try {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                reveal(
                  entry.target as HTMLElement,
                );
              }
            });
          },
          {
            rootMargin: "0px 0px -7%",
            threshold: 0.06,
          },
        );

        const register = (element: HTMLElement) => {
          if (element.classList.contains("is-visible")) {
            return;
          }

          const isInsideDeferredSection = Boolean(
            element.closest(
              ".content-section, .contact-section, .case-section",
            ),
          );

          if (!isInsideDeferredSection) {
            const rect = element.getBoundingClientRect();
            const isNearViewport =
              rect.top <= window.innerHeight * 1.05 &&
              rect.bottom >= -80;

            if (isNearViewport) {
              reveal(element);
              return;
            }
          }

          observer?.observe(element);
        };

        document
          .querySelectorAll<HTMLElement>(
            revealSelector,
          )
          .forEach(register);

        revealHashTarget(true);

        root.classList.add(
          readyClass,
          initializingClass,
        );

        readyFrame = requestAnimationFrame(() => {
          root.classList.remove(initializingClass);
        });

        window.addEventListener(
          "hashchange",
          handleHashChange,
        );
      } catch {
        revealAll();
      }
    };

    setupFrame = requestAnimationFrame(setup);

    return () => {
      isCurrent = false;

      cancelAnimationFrame(setupFrame);
      cancelAnimationFrame(readyFrame);
      cancelAnimationFrame(hashScrollFrame);
      window.clearTimeout(hashScrollTimer);

      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );

      observer?.disconnect();

      root.classList.remove(
        readyClass,
        initializingClass,
      );
    };
  }, [pathname]);

  return null;
}
