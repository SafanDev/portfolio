import Image from "next/image";

import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import SkillsGrid from "@/components/skills-grid";
import EmailLink from "@/components/email-link";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";

import {
  ArrowUpIcon,
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
                  <span>Get in Touch</span>
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
                  width={2048}
                  height={2048}
                  preload
                  quality={90}
                  sizes="(max-width: 520px) 340px, (max-width: 960px) 390px, 560px"
                  className="hero__portrait-image"
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

        <AboutSection />

        <ContactSection />

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
