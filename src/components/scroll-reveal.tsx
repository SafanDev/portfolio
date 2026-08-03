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
    let mutationObserver: MutationObserver | null =
      null;
    let setupFrame = 0;
    let readyFrame = 0;
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

    const revealHashTarget = () => {
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
          if (
            element.classList.contains(
              "is-visible",
            )
          ) {
            return;
          }

          const rect =
            element.getBoundingClientRect();

          const isNearViewport =
            rect.top <= window.innerHeight * 1.05 &&
            rect.bottom >= -80;

          if (isNearViewport) {
            reveal(element);
            return;
          }

          observer?.observe(element);
        };

        document
          .querySelectorAll<HTMLElement>(
            revealSelector,
          )
          .forEach(register);

        revealHashTarget();

        root.classList.add(
          readyClass,
          initializingClass,
        );

        readyFrame = requestAnimationFrame(() => {
          root.classList.remove(initializingClass);
        });

        mutationObserver = new MutationObserver(
          (mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) {
                  return;
                }

                if (node.matches(revealSelector)) {
                  register(node);
                }

                node
                  .querySelectorAll<HTMLElement>(
                    revealSelector,
                  )
                  .forEach(register);
              });
            });
          },
        );

        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true,
        });

        window.addEventListener(
          "hashchange",
          revealHashTarget,
        );

        window.addEventListener(
          "pageshow",
          revealHashTarget,
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

      window.removeEventListener(
        "hashchange",
        revealHashTarget,
      );

      window.removeEventListener(
        "pageshow",
        revealHashTarget,
      );

      mutationObserver?.disconnect();
      observer?.disconnect();

      root.classList.remove(
        readyClass,
        initializingClass,
      );
    };
  }, [pathname]);

  return null;
}
