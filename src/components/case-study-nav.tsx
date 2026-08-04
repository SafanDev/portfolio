"use client";

import { useEffect, useRef, useState } from "react";

export type CaseSectionLink = {
  id: string;
  label: string;
};

type CaseStudyNavProps = {
  sections: CaseSectionLink[];
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export default function CaseStudyNav({
  sections,
}: CaseStudyNavProps) {
  const [active, setActive] = useState(
    () => sections[0]?.id ?? "overview",
  );
  const [progress, setProgress] = useState(0);

  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let updateFrame = 0;
    let setupFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let sectionMetrics: Array<{ id: string; top: number }> = [];
    let articleTop = 0;
    let articleHeight = 0;
    let activationLine = Math.min(
      window.innerHeight * 0.3,
      260,
    );

    const article = document.querySelector<HTMLElement>(
      ".case-content",
    );

    const measureLayout = () => {
      activationLine = Math.min(
        window.innerHeight * 0.3,
        260,
      );

      sectionMetrics = sections
        .map((section) => {
          const element = document.getElementById(section.id);

          if (!element) {
            return null;
          }

          return {
            id: section.id,
            top:
              window.scrollY +
              element.getBoundingClientRect().top,
          };
        })
        .filter(
          (
            section,
          ): section is {
            id: string;
            top: number;
          } => section !== null,
        );

      if (article) {
        const articleRect = article.getBoundingClientRect();

        articleTop = window.scrollY + articleRect.top;
        articleHeight = article.offsetHeight;
      }
    };

    const updateNavigation = () => {
      cancelAnimationFrame(updateFrame);

      updateFrame = requestAnimationFrame(() => {
        if (sectionMetrics.length === 0) {
          return;
        }

        const activationPosition =
          window.scrollY + activationLine;
        let nextActive = sectionMetrics[0].id;

        for (const section of sectionMetrics) {
          if (section.top <= activationPosition) {
            nextActive = section.id;
          }
        }

        const reachedPageBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4;

        if (reachedPageBottom) {
          nextActive =
            sectionMetrics[sectionMetrics.length - 1].id;
        }

        setActive((currentActive) =>
          currentActive === nextActive
            ? currentActive
            : nextActive,
        );

        const progressStart =
          articleTop - window.innerHeight * 0.24;
        const progressEnd =
          articleTop +
          articleHeight -
          window.innerHeight * 0.72;
        const progressRange = progressEnd - progressStart;

        const nextProgress =
          progressRange > 0
            ? clamp(
                ((window.scrollY - progressStart) /
                  progressRange) *
                  100,
                0,
                100,
              )
            : 0;

        setProgress((currentProgress) =>
          Math.abs(currentProgress - nextProgress) < 0.1
            ? currentProgress
            : nextProgress,
        );
      });
    };

    const handleLayoutChange = () => {
      measureLayout();
      updateNavigation();
    };

    setupFrame = requestAnimationFrame(() => {
      measureLayout();
      updateNavigation();

      window.addEventListener("scroll", updateNavigation, {
        passive: true,
      });
      window.addEventListener("resize", handleLayoutChange);
      window.addEventListener("hashchange", updateNavigation);

      if (article && "ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(handleLayoutChange);
        resizeObserver.observe(article);
      }
    });

    return () => {
      cancelAnimationFrame(setupFrame);
      cancelAnimationFrame(updateFrame);
      resizeObserver?.disconnect();

      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("hashchange", updateNavigation);
    };
  }, [sections]);

  useEffect(() => {
    const list = listRef.current;

    if (
      !list ||
      !window.matchMedia("(max-width: 900px)")
        .matches
    ) {
      return;
    }

    const activeLink =
      list.querySelector<HTMLElement>(
        `[data-section="${active}"]`,
      );

    if (!activeLink) {
      return;
    }

    const linkStart = activeLink.offsetLeft;
    const linkEnd =
      linkStart + activeLink.offsetWidth;
    const visibleStart = list.scrollLeft;
    const visibleEnd =
      visibleStart + list.clientWidth;

    if (
      linkStart >= visibleStart + 8 &&
      linkEnd <= visibleEnd - 8
    ) {
      return;
    }

    const targetScrollLeft =
      linkStart -
      (list.clientWidth - activeLink.offsetWidth) /
        2;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    list.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [active]);

  const roundedProgress = Math.round(progress);

  return (
    <aside
      className="case-nav"
      aria-label="Project page navigation"
    >
      <div className="case-nav__heading">
        <span>On this page</span>
        <strong>{roundedProgress}%</strong>
      </div>

      <div
        className="case-nav__progress"
        role="progressbar"
        aria-label="Project page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedProgress}
      >
        <i
          style={{
            transform: `scaleX(${progress / 100})`,
          }}
        />
      </div>

      <nav
        ref={listRef}
        className="case-nav__list"
        aria-label="Case-study sections"
      >
        {sections.map((section) => {
          const isActive = active === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-section={section.id}
              className={
                isActive ? "is-active" : undefined
              }
              aria-current={
                isActive ? "location" : undefined
              }
              onClick={() => {
                setActive(section.id);
              }}
            >
              <span>{section.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
