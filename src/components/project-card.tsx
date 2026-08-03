import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@/components/icons";
import { mediaMeta } from "@/data/media-meta";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const coverDimensions = mediaMeta[project.cover] ?? {
    width: 1448,
    height: 1086,
  };

  return (
    <article
      className={`project-card${
        featured ? " project-card--featured" : ""
      }`}
      style={
        {
          "--card-accent": project.accent,
        } as CSSProperties
      }
      data-reveal
    >
      <Link
        href={`/work/${project.slug}`}
        className="project-card__media"
        aria-label={`View the ${project.title} project page`}
      >
        <Image
          src={project.cover}
          alt={`${project.title} project interface showcase`}
          width={coverDimensions.width}
          height={coverDimensions.height}
          quality={90}
          sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 50vw, 620px"
          className="project-card__image"
        />

        <div
          className="project-card__glow"
          aria-hidden="true"
        />

        <span
          className="project-card__media-action"
          aria-hidden="true"
        >
          View project
          <ArrowRightIcon />
        </span>
      </Link>

      <div className="project-card__body">
        <div className="project-card__title-row">
          <h3>
            <Link href={`/work/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <span className="project-card__type">
            {project.type}
          </span>
        </div>

        <p className="project-card__summary">
          {project.cardSummary}
        </p>

        <div
          className="tag-row"
          aria-label={`${project.title} technology stack`}
        >
          {project.tools.slice(0, 5).map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>

        <div className="project-card__links">
          <Link
            href={`/work/${project.slug}`}
            className="project-card__view icon-link"
          >
            Case study
            <ArrowRightIcon />
          </Link>

          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              aria-label={`Open ${project.title} ${link.label} in a new tab`}
            >
              {link.label}
              <ExternalLinkIcon />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
