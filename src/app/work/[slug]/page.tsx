import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site-header";
import CaseStudyNav, { type CaseSectionLink } from "@/components/case-study-nav";
import MediaGallery from "@/components/media-gallery";
import ImageComparison from "@/components/image-comparison";
import EmailLink from "@/components/email-link";

import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";

import { getNextProject, projectBySlug, projects, type Project } from "@/data/projects";

import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug as Project["slug"]];

  if (!project) return {};

  const siteUrl = getSiteUrl();
  const ogImageUrl = new URL(
    `/api/og?title=${encodeURIComponent(project.title)}&type=${encodeURIComponent(project.type)}`,
    `${siteUrl}/`,
  ).toString();

  return {
    title: project.title,
    description: project.overview,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | Safan`,
      description: project.overview,
      url: `/work/${project.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} project showcase`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Safan`,
      description: project.overview,
      images: [ogImageUrl],
    },
  };
}

function Outcome({ project, includeReflection = true }: { project: Project; includeReflection?: boolean }) {
  return (
    <section id="outcome" className="case-section" data-reveal>
      <p className="case-section__label">Outcome</p>
      <h2>{project.validation.headline}</h2>
      <p className="case-lead case-lead--small">{project.validation.intro}</p>

      <div className="outcome-list">
        {project.validation.evidence.slice(0, 4).map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      {includeReflection && (
        <div className="reflection-card">
          <div>
            <span>Reflection</span>
            <h3>{project.reflection.headline}</h3>
            <p>{project.reflection.wentWell}</p>
          </div>
          <ul>
            {project.reflection.learned.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function DetailedCaseStudy({ project }: { project: Project }) {
  return (
    <>
      <section id="overview" className="case-section case-overview" data-reveal>
        <p className="case-section__label">Overview</p>
        <h2>The project in one minute.</h2>
        <p className="case-lead">{project.overview}</p>
        <div className="proof-grid">
          {project.proof.slice(0, 3).map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="problem" className="case-section" data-reveal>
        <p className="case-section__label">Problem</p>
        <h2>{project.problem.headline}</h2>
        <div className="case-text-columns">
          {project.problem.paragraphs.slice(0, 2).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="goal-callout">
          <span>The goal</span>
          <p>{project.problem.goal}</p>
        </aside>
      </section>

      <section id="discovery" className="case-section" data-reveal>
        <p className="case-section__label">Discovery</p>
        <h2>{project.discovery.headline}</h2>
        <div className="method-row">
          {project.discovery.methods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </div>
        <p className="case-lead case-lead--small">{project.discovery.paragraphs[0]}</p>
        <MediaGallery items={project.discovery.media} label={`${project.title} discovery visuals`} />
      </section>

      <section id="decisions" className="case-section" data-reveal>
        <p className="case-section__label">Key decisions</p>
        <h2>{project.process.headline}</h2>
        <p className="case-lead case-lead--small">{project.process.intro}</p>

        <div className="decision-list">
          {project.process.decisions.slice(0, 3).map((decision) => (
            <article key={decision.title}>
              <h3>{decision.title}</h3>
              <p><strong>Challenge:</strong> {decision.tension}</p>
              <p><strong>Decision:</strong> {decision.decision}</p>
              <p className="decision-reason">{decision.why}</p>
            </article>
          ))}
        </div>

        <aside className="feedback-callout">
          <span>Changed after feedback</span>
          <p>{project.process.feedback}</p>
        </aside>

        {project.process.comparison && <ImageComparison {...project.process.comparison} />}
        <MediaGallery items={project.process.media} label={`${project.title} process visuals`} />
      </section>

      <section id="solution" className="case-section" data-reveal>
        <p className="case-section__label">Final solution</p>
        <h2>{project.solution.headline}</h2>
        <p className="case-lead case-lead--small">{project.solution.intro}</p>

        <div className="feature-grid">
          {project.solution.features.slice(0, 4).map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>

        <div className="workflow" aria-label={`${project.title} main workflow`}>
          {project.solution.workflow.map((step, index) => (
            <div key={step}>
              <span>{step}</span>
              {index < project.solution.workflow.length - 1 && <ArrowRightIcon />}
            </div>
          ))}
        </div>

        <MediaGallery items={project.solution.media} label={`${project.title} final solution visuals`} />
      </section>

      <Outcome project={project} />
    </>
  );
}

function TechnicalBreakdown({ project }: { project: Project }) {
  return (
    <>
      <section id="overview" className="case-section case-overview" data-reveal>
        <p className="case-section__label">Overview</p>
        <h2>A compact technical breakdown.</h2>
        <p className="case-lead">{project.overview}</p>
        <div className="proof-grid">
          {project.proof.slice(0, 3).map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="build" className="case-section" data-reveal>
        <p className="case-section__label">The build</p>
        <h2>{project.problem.headline}</h2>
        <p className="case-lead case-lead--small">{project.problem.paragraphs[0]}</p>

        <div className="decision-list decision-list--compact">
          {project.process.decisions.slice(0, 2).map((decision) => (
            <article key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.decision}</p>
              <p className="decision-reason">{decision.why}</p>
            </article>
          ))}
        </div>

        <aside className="feedback-callout">
          <span>Improved after feedback</span>
          <p>{project.process.feedback}</p>
        </aside>
      </section>

      <section id="solution" className="case-section" data-reveal>
        <p className="case-section__label">System highlights</p>
        <h2>{project.solution.headline}</h2>

        <div className="feature-grid">
          {project.solution.features.slice(0, 4).map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>

        <MediaGallery items={project.solution.media} label={`${project.title} system screens`} />
      </section>

      <Outcome project={project} />
    </>
  );
}

function VisualShowcase({ project }: { project: Project }) {
  const showcaseMedia = [...project.discovery.media, ...project.process.media, ...project.solution.media];

  return (
    <>
      <section id="overview" className="case-section case-overview" data-reveal>
        <p className="case-section__label">Overview</p>
        <h2>A visual product-design showcase.</h2>
        <p className="case-lead">{project.overview}</p>
      </section>

      <section id="design" className="case-section" data-reveal>
        <p className="case-section__label">Design direction</p>
        <h2>{project.problem.headline}</h2>

        <div className="case-text-columns">
          <p>{project.problem.paragraphs[0]}</p>
          <p>{project.discovery.paragraphs[0]}</p>
        </div>

        <div className="method-row">
          {project.discovery.methods.map((method) => (
            <span key={method}>{method}</span>
          ))}
        </div>
      </section>

      <section id="screens" className="case-section" data-reveal>
        <p className="case-section__label">Key screens</p>
        <h2>{project.solution.headline}</h2>
        <p className="case-lead case-lead--small">{project.solution.intro}</p>
        <MediaGallery items={showcaseMedia.slice(0, 7)} label={`${project.title} interface showcase`} />
      </section>

      <Outcome project={project} />
    </>
  );
}

// Map configuration for cleaner rendering logic
const modeMap = {
  "kickblast-judo": "technical",
  "enomy-finance": "visual",
} as const;

const SectionConfig = {
  technical: [
    { id: "overview", label: "Overview" },
    { id: "build", label: "The build" },
    { id: "solution", label: "Highlights" },
    { id: "outcome", label: "Outcome" },
  ],
  visual: [
    { id: "overview", label: "Overview" },
    { id: "design", label: "Design" },
    { id: "screens", label: "Screens" },
    { id: "outcome", label: "Outcome" },
  ],
  detailed: [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "discovery", label: "Discovery" },
    { id: "decisions", label: "Decisions" },
    { id: "solution", label: "Solution" },
    { id: "outcome", label: "Outcome" },
  ],
};

const TemplateConfig = {
  technical: TechnicalBreakdown,
  visual: VisualShowcase,
  detailed: DetailedCaseStudy,
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug as Project["slug"]];

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);

  // Derive mode and extract proper configurations via our maps
  const mode = modeMap[project.slug as keyof typeof modeMap] || "detailed";
  const sections: CaseSectionLink[] = SectionConfig[mode];
  const Template = TemplateConfig[mode];

  const siteUrl = getSiteUrl();

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    creator: { "@type": "Person", name: siteConfig.fullName },
    url: `${siteUrl}/work/${project.slug}`,
    image: new URL(project.cover, `${siteUrl}/`).toString(),
    keywords: project.tools.join(", "),
  };

  return (
    <div className="case-page">
      <SiteHeader compact />

      <main id="main-content">
        <section className="case-hero section-shell">
          <div className="case-hero__copy" data-reveal>
            <Link href="/#work" className="back-link">
              <ArrowLeftIcon /> Back to projects
            </Link>
            <p className="case-label">{project.type}</p>
            <h1>{project.title}</h1>
            <p className="case-hook">{project.hook}</p>
            <div className="case-actions">
              {project.links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    index === 0
                      ? "button button--primary icon-link"
                      : "button button--secondary icon-link"
                  }
                >
                  {link.label}
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>
          </div>

          <div className="case-hero__cover" data-reveal>
            <Image
              src={project.cover}
              alt={`${project.title} project showcase`}
              fill
              preload
              quality={90}
              sizes="(max-width: 960px) calc(100vw - 32px), 1160px"
            />
          </div>

          <div className="case-meta" data-reveal>
            <div>
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Period</span>
              <strong>{project.period}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>
          </div>
        </section>

        <div className="case-layout section-shell">
          <article className="case-content">
            {/* Template handles rendering the specific case study type */}
            <Template project={project} />

            <Link href={`/work/${nextProject.slug}`} className="next-project" data-reveal>
              <span>Next project</span>
              <div>
                <h2>{nextProject.title}</h2>
                <ArrowRightIcon />
              </div>
              <p>{nextProject.cardSummary}</p>
            </Link>
          </article>

          <CaseStudyNav key={project.slug} sections={sections} />
        </div>
      </main>

      <footer className="case-footer section-shell">
        <p>Safan · Full-Stack Developer</p>
        <EmailLink
          className="case-footer__email"
          aria-label={`Email Safan at ${siteConfig.email}`}
        >
          {siteConfig.email}
        </EmailLink>
        <Link href="/">Back home</Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}