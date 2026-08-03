import Image from "next/image";

import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import SkillsGrid from "@/components/skills-grid";
import CopyEmailButton from "@/components/copy-email-button";
import EmailLink from "@/components/email-link";

import {
  ArrowUpIcon,
  DownloadIcon,
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";

import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

const projectOrder = [
  "velvet-vogue",
  "etcp",
  "kickblast-judo",
  "enomy-finance",
];

const homepageProjects = projectOrder
  .map((slug) =>
    projects.find(
      (project) => project.slug === slug,
    ),
  )
  .filter(
    (
      project,
    ): project is (typeof projects)[number] =>
      Boolean(project),
  );

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section
          id="home"
          className="hero section-shell"
          aria-labelledby="hero-title"
        >
          <div
            className="hero__inner"
            data-reveal
          >
            <div className="hero__content">
              <h1 id="hero-title">
                Hi, I&apos;m
                <br />

                <span className="hero__name">
                  Mohamed Safan
                </span>
              </h1>

              <p className="hero__lead">
                Full-Stack Developer based in Sri
                Lanka.
              </p>

              <div className="hero__actions">
                <a
                  href="#contact"
                  className="button button--primary hero__cta"
                >
                  Get in Touch
                </a>
              </div>

              <a
                href="#work"
                className="hero__scroll"
              >
                <span
                  className="mouse"
                  aria-hidden="true"
                >
                  <span className="wheel" />
                </span>

                Scroll to explore
              </a>
            </div>

            <div className="hero__visual">
              <div
                className="hero__glow"
                aria-hidden="true"
              />

              <div className="hero__rings">
                <div className="orbit-node orbit-node--1">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="orbit-icon"
                    aria-label="Visit Safan's GitHub profile"
                  >
                    <GitHubIcon />
                  </a>
                </div>

                <div className="orbit-node orbit-node--2">
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="orbit-icon"
                    aria-label="Visit Safan's LinkedIn profile"
                  >
                    <LinkedInIcon />
                  </a>
                </div>

                <div className="orbit-node orbit-node--3">
                  <EmailLink
                    className="orbit-icon"
                    aria-label={`Email Safan at ${siteConfig.email}`}
                  >
                    <MailIcon />
                  </EmailLink>
                </div>
              </div>

              <div className="hero__portrait">
                <Image
                  src="/media/profile/safan.webp"
                  alt="Portrait of Mohamed Safan"
                  fill
                  preload
                  quality={90}
                  sizes="(max-width: 520px) 340px, (max-width: 960px) 390px, 560px"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="section-shell content-section"
          aria-labelledby="work-title"
        >
          <div
            className="section-heading"
            data-reveal
          >
            <p>Projects</p>

            <h2 id="work-title">
              What I&apos;ve Built
            </h2>
          </div>

          <div className="project-grid">
            {homepageProjects.map(
              (project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  featured={index < 2}
                />
              ),
            )}
          </div>
        </section>

        <section
          id="skills"
          className="section-shell content-section"
          aria-labelledby="skills-title"
        >
          <div
            className="section-heading"
            data-reveal
          >
            <p>Skills</p>

            <h2 id="skills-title">
              Technical Skills
            </h2>
          </div>

          <SkillsGrid />
        </section>

        <section
          id="about"
          className="section-shell content-section about-section"
          aria-labelledby="about-title"
        >
          <div
            className="section-heading"
            data-reveal
          >
            <p>About</p>

            <h2 id="about-title">
              A developer who cares about both
              sides of the product.
            </h2>
          </div>

          <div
            className="about-grid"
            data-reveal
          >
            <div className="about-copy">
              <p>
                I enjoy taking an idea through
                interface design, database
                structure, development, testing,
                and refinement. My recent BTEC HND
                in Software Engineering gave me a
                solid grounding in the full stack,
                from PHP and MySQL backends to C#
                desktop applications and React
                frontends.
              </p>
            </div>

            <div className="about-facts">
              <article>
                <span>Education</span>

                <strong>
                  BTEC HND in Computing (Software
                  Engineering)
                </strong>

                <p>
                  ESOFT Metro Campus · 2025–2026
                </p>
              </article>

              <article>
                <span>Looking for</span>

                <strong>
                  Junior full-stack roles
                </strong>

                <p>
                  Software development internships
                </p>
              </article>

              <article>
                <span>Work preference</span>

                <strong>Sri Lanka</strong>

                <p>Remote worldwide</p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div
            className="contact-section__inner section-shell"
            data-reveal
          >
            <div className="contact-copy">
              <p className="contact-label">
                Contact
              </p>

              <h2 id="contact-title">
                Let&apos;s Connect
              </h2>

              <p>
                I&apos;m open to junior full-stack
                roles, software development
                internships, and remote
                opportunities. Feel free to reach
                out about a role, project, or
                conversation.
              </p>
            </div>

            <div className="contact-actions">
              <EmailLink
                className="contact-email icon-link"
                aria-label={`Email Safan at ${siteConfig.email}`}
              >
                <span>{siteConfig.email}</span>
                <ExternalLinkIcon />
              </EmailLink>

              <CopyEmailButton />

              <div className="contact-links">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  aria-label="Open Safan's GitHub profile in a new tab"
                >
                  GitHub
                  <ExternalLinkIcon />
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link"
                  aria-label="Open Safan's LinkedIn profile in a new tab"
                >
                  LinkedIn
                  <ExternalLinkIcon />
                </a>

                <a
                  href={siteConfig.cv}
                  download
                  className="icon-link"
                  aria-label="Download Mohamed Safan's resume"
                >
                  Resume
                  <DownloadIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer section-shell">
          <p>
            © {new Date().getFullYear()} Safan ·
            Batticaloa, Sri Lanka
          </p>

          <div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <EmailLink
              aria-label={`Email Safan at ${siteConfig.email}`}
            >
              Email
            </EmailLink>

            <a
              href="#home"
              className="icon-link"
            >
              Back to top
              <ArrowUpIcon />
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
