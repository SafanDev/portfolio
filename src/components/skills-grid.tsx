"use client";

import {
  type CSSProperties,
  type ElementType,
  useEffect,
  useRef,
} from "react";

import { skills, type Skill } from "@/data/site";

import {
  SiBootstrap,
  SiCss,
  SiDotnet,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

import {
  FaDatabase,
  FaServer,
  FaWindows,
} from "react-icons/fa6";

import { TbBrandCSharp } from "react-icons/tb";

const IconMap: Record<string, ElementType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  php: SiPhp,
  node: SiNodedotjs,
  mysql: SiMysql,
  sqlserver: FaServer,
  csharp: TbBrandCSharp,
  dotnet: SiDotnet,
  windows: FaWindows,
  database: FaDatabase,
  figma: SiFigma,
  git: SiGit,
  github: SiGithub,
  vite: SiVite,
};

const categories: Skill["category"][] = [
  "Frontend",
  "Backend",
  "Database",
  "Desktop",
  "Tools",
];

const MOBILE_ILLUMINATION_DURATION = 1200;

function createHeadingId(category: Skill["category"]) {
  return `skill-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
}

export default function SkillsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

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
      container.querySelectorAll<HTMLElement>(
        ".skill-card",
      ),
    );

    if (cards.length === 0) {
      return;
    }

    const removalTimers = new Map<
      HTMLElement,
      number
    >();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const card = entry.target as HTMLElement;

          /*
           * Each card illuminates once. Unobserving it here
           * prevents repeated intersections from creating
           * overlapping timers and visible flicker.
           */
          observer.unobserve(card);

          card.classList.add("is-illuminated");

          const existingTimer =
            removalTimers.get(card);

          if (existingTimer !== undefined) {
            window.clearTimeout(existingTimer);
          }

          const removalTimer = window.setTimeout(
            () => {
              card.classList.remove(
                "is-illuminated",
              );

              removalTimers.delete(card);
            },
            MOBILE_ILLUMINATION_DURATION,
          );

          removalTimers.set(card, removalTimer);
        });
      },
      {
        rootMargin: "-22% 0px -22% 0px",
        threshold: 0.45,
      },
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

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
  }, []);

  return (
    <div
      ref={containerRef}
      className="skills-groups"
      data-reveal
    >
      {categories.map((category) => {
        const items = skills.filter(
          (skill) =>
            skill.category === category,
        );

        const headingId =
          createHeadingId(category);

        return (
          <section
            key={category}
            className="skill-group"
            aria-labelledby={headingId}
          >
            <h3 id={headingId}>{category}</h3>

            <div className="skill-grid">
              {items.map((skill) => {
                const Icon =
                  IconMap[skill.icon] ??
                  FaDatabase;

                return (
                  <div
                    key={skill.name}
                    className="skill-card"
                    style={
                      {
                        "--skill-color":
                          skill.color,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="skill-icon"
                      aria-hidden="true"
                    >
                      <Icon />
                    </span>

                    <span className="skill-name">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
