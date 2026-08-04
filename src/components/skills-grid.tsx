import type { CSSProperties, ElementType } from "react";

import SkillsGridIllumination from "@/components/skills-grid-illumination";
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
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";

import { FaDatabase, FaServer, FaWindows } from "react-icons/fa6";
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
  python: SiPython,
  node: SiNodedotjs,
  pdo: FaDatabase,
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

const primaryCategory: Skill["category"] = "Frontend";
const supportingCategories: Skill["category"][] = [
  "Backend",
  "Database",
  "Desktop",
  "Tools",
];

const SKILLS_GRID_ID = "skills-grid";

function createHeadingId(category: Skill["category"]) {
  return `skill-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function SkillCategory({
  category,
  featured = false,
}: {
  category: Skill["category"];
  featured?: boolean;
}) {
  const items = skills.filter((skill) => skill.category === category);
  const headingId = createHeadingId(category);

  return (
    <section
      className={`skill-category${featured ? " skill-category--featured" : ""}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId}>{category}</h3>

      <ul className="skill-grid" role="list">
        {items.map((skill) => {
          const Icon = IconMap[skill.icon] ?? FaDatabase;

          return (
            <li
              key={skill.name}
              className="skill-card"
              style={
                {
                  "--skill-color": skill.color,
                } as CSSProperties
              }
            >
              <span className="skill-icon" aria-hidden="true">
                <Icon />
              </span>

              <span className="skill-name">{skill.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function SkillsGrid() {
  return (
    <div id={SKILLS_GRID_ID} className="skills-board" data-reveal>
      <SkillCategory category={primaryCategory} featured />

      <div className="skills-board__supporting">
        {supportingCategories.map((category) => (
          <SkillCategory key={category} category={category} />
        ))}
      </div>

      <SkillsGridIllumination containerId={SKILLS_GRID_ID} />
    </div>
  );
}
