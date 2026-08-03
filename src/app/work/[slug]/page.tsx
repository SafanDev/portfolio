import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site-header";
import CaseStudyNav, { type CaseSectionLink } from "@/components/case-study-nav";
import MediaGallery from "@/components/media-gallery";
import ImageComparison from "@/components/image-comparison";
import EmailLink from "@/components/email-link";

import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, PlayIcon } from "@/components/icons";

import { getNextProject, projectBySlug, projects, type Decision, type Project } from "@/data/projects";
import { mediaMeta } from "@/data/media-meta";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${project.title} project showcase` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Safan`,
      description: project.overview,
      images: [ogImageUrl],
    },
  };
}

function DecisionCards({ decisions, compact = false }: { decisions: Decision[]; compact?: boolean }) {
  return (
    <div className={`decision-list${compact ? " decision-list--compact" : ""}`}>
      {decisions.map((decision) => (
        <article key={decision.title}>
          <h3>{decision.title}</h3>
          <div className="decision-details">
            <p><span>Challenge</span>{decision.tension}</p>
            <p><span>Decision</span>{decision.decision}</p>
          </div>
          <p className="decision-reason"><span>Why it matters</span>{decision.why}</p>
        </article>
      ))}
    </div>
  );
}

function FeatureGrid({ project }: { project: Project }) {
  return (
    <div className="feature-grid">
      {project.solution.features.slice(0, 4).map((feature) => (
        <article key={feature.title}>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </div>
  );
}

function Workflow({ project }: { project: Project }) {
  return (
    <ol className="workflow" aria-label={`${project.title} main workflow`}>
      {project.solution.workflow.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  );
}

function Outcome({ project, includeReflection = true }: { project: Project; includeReflection?: boolean }) {
  return (
    <section id="outcome" className="case-section" data-reveal>
      <p className="case-section__label">Outcome</p>
      <h2>{project.validation.headline}</h2>
      <p className="case-lead case-lead--small">{project.validation.intro}</p>

      <div className="outcome-list">
        {project.validation.evidence.slice(0, 4).map((item) => <p key={item}>{item}</p>)}
      </div>

      {includeReflection && (
        <div className="reflection-card">
          <div>
            <span>Reflection</span>
            <h3>{project.reflection.headline}</h3>
            <p>{project.reflection.wentWell}</p>
          </div>
          <ul>
            {project.reflection.learned.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
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
        <h2>Project overview.</h2>
        <p className="case-lead">{project.overview}</p>
        <div className="proof-grid">
          {project.proof.slice(0, 3).map((item) => (
            <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
          ))}
        </div>
      </section>

      <section id="problem" className="case-section" data-reveal>
        <p className="case-section__label">Problem</p>
        <h2>{project.problem.headline}</h2>
        <div className="case-text-columns">
          {project.problem.paragraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside className="goal-callout"><span>The goal</span><p>{project.problem.goal}</p></aside>
      </section>

      <section id="discovery" className="case-section" data-reveal>
        <p className="case-section__label">Discovery</p>
        <h2>{project.discovery.headline}</h2>
        <div className="method-row">
          {project.discovery.methods.map((method) => <span key={method}>{method}</span>)}
        </div>
        <p className="case-lead case-lead--small">{project.discovery.paragraphs[0]}</p>
        <MediaGallery items={project.discovery.media} label={`${project.title} discovery visuals`} />
      </section>

      <section id="decisions" className="case-section" data-reveal>
        <p className="case-section__label">Key decisions</p>
        <h2>{project.process.headline}</h2>
        <p className="case-lead case-lead--small">{project.process.intro}</p>
        <DecisionCards decisions={project.process.decisions.slice(0, 3)} />
        <aside className="feedback-callout"><span>Changed after feedback</span><p>{project.process.feedback}</p></aside>
        {project.process.comparison && <ImageComparison {...project.process.comparison} />}
        <MediaGallery items={project.process.media} label={`${project.title} process visuals`} />
      </section>

      <section id="solution" className="case-section" data-reveal>
        <p className="case-section__label">Final solution</p>
        <h2>{project.solution.headline}</h2>
        <p className="case-lead case-lead--small">{project.solution.intro}</p>
        <FeatureGrid project={project} />
        <Workflow project={project} />

        {project.solution.videoReady && (
          <div className="project-video-placeholder" role="group" aria-label={`${project.title} project walkthrough video placeholder`}>
            <div className="project-video-placeholder__content">
              <p className="project-video-placeholder__label">Project walkthrough</p>
              <h3>Video walkthrough coming soon</h3>
              <p>A concise tour of the customer journey, admin dashboard and inventory workflow will appear here.</p>
            </div>
            <span className="project-video-placeholder__icon" aria-hidden="true"><PlayIcon /></span>
          </div>
        )}

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
        <h2>System at a glance.</h2>
        <p className="case-lead">{project.overview}</p>
        <div className="proof-grid">
          {project.proof.slice(0, 3).map((item) => (
            <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
          ))}
        </div>
      </section>

      <section id="system" className="case-section" data-reveal>
        <p className="case-section__label">System design</p>
        <h2>{project.problem.headline}</h2>
        <p className="case-lead case-lead--small">{project.problem.paragraphs[0]}</p>
        <DecisionCards decisions={project.process.decisions.slice(0, 2)} compact />
        <aside className="feedback-callout"><span>Improved after feedback</span><p>{project.process.feedback}</p></aside>
        <MediaGallery items={project.process.media} label={`${project.title} improvement evidence`} />
      </section>

      <section id="solution" className="case-section" data-reveal>
        <p className="case-section__label">System highlights</p>
        <h2>{project.solution.headline}</h2>
        <FeatureGrid project={project} />
        <MediaGallery items={project.solution.media} label={`${project.title} system screens`} />
      </section>

      <Outcome project={project} />
    </>
  );
}

function VisualShowcase({ project }: { project: Project }) {
  const showcaseMedia = [...project.discovery.media, ...project.process.media, ...project.solution.media]
    .filter((item, index, items) => items.findIndex((candidate) => candidate.src === item.src) === index);

  const screenGroups = [
    {
      title: "Public experience and account overview",
      text: "The public homepage introduces the service, while the account dashboard brings balances, activity and next actions into one hierarchy.",
      items: showcaseMedia.slice(0, 2),
    },
    {
      title: "Investment quote journey",
      text: "Input and result states stay connected so rates, fees, projections and continuation actions remain understandable.",
      items: showcaseMedia.slice(2, 4),
    },
    {
      title: "Saved activity and administration",
      text: "History and operational views increase information density without abandoning the shared component system.",
      items: showcaseMedia.slice(4, 6),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <section id="overview" className="case-section case-overview" data-reveal>
        <p className="case-section__label">Overview</p>
        <h2>Design overview.</h2>
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
          {project.discovery.methods.map((method) => <span key={method}>{method}</span>)}
        </div>
      </section>

      <section id="screens" className="case-section" data-reveal>
        <p className="case-section__label">Key screens</p>
        <h2>{project.solution.headline}</h2>
        <p className="case-lead case-lead--small">{project.solution.intro}</p>
        <div className="screen-groups">
          {screenGroups.map((group) => (
            <div className="screen-group" key={group.title}>
              <div className="screen-group__heading">
                <h3>{group.title}</h3>
                <p>{group.text}</p>
              </div>
              <MediaGallery items={group.items} label={`${project.title}: ${group.title}`} />
            </div>
          ))}
        </div>
      </section>

      <Outcome project={project} />
    </>
  );
}

const modeMap = {
  "kickblast-judo": "technical",
  "enomy-finance": "visual",
} as const;

const SectionConfig = {
  technical: [
    { id: "overview", label: "Overview" },
    { id: "system", label: "System design" },
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

const TemplateConfig = { technical: TechnicalBreakdown, visual: VisualShowcase, detailed: DetailedCaseStudy };

type CasePageStyle = CSSProperties & { "--project-accent": string };

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug as Project["slug"]];

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);
  const coverDimensions = mediaMeta[project.cover] ?? { width: 1448, height: 1086 };
  const mode = modeMap[project.slug as keyof typeof modeMap] || "detailed";
  const sections: CaseSectionLink[] = SectionConfig[mode];
  const Template = TemplateConfig[mode];
  const siteUrl = getSiteUrl();
  const pageStyle: CasePageStyle = { "--project-accent": project.accent };

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
    <div className="case-page" style={pageStyle}>
      <SiteHeader compact />

      <main id="main-content">
        <section className="case-hero section-shell">
          <div className="case-hero__copy" data-reveal>
            <Link href="/#work" className="back-link"><ArrowLeftIcon /> Back to projects</Link>
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
                  className={index === 0 ? "button button--primary icon-link" : "button button--secondary icon-link"}
                >
                  {link.label}<ExternalLinkIcon />
                </a>
              ))}
            </div>
          </div>

          <div className="case-hero__cover" data-reveal>
            <Image
              src={project.cover}
              alt={`${project.title} project showcase`}
              width={coverDimensions.width}
              height={coverDimensions.height}
              preload
              quality={90}
              sizes="(max-width: 960px) calc(100vw - 32px), 1160px"
              className="case-hero__image"
            />
          </div>

          <div className="case-meta" data-reveal>
            <div><span>Role</span><strong>{project.role}</strong></div>
            <div><span>Period</span><strong>{project.period}</strong></div>
            <div><span>Status</span><strong>{project.status}</strong></div>
          </div>
        </section>

        <div className="case-layout section-shell">
          <article className="case-content">
            <Template project={project} />
            <Link href={`/work/${nextProject.slug}`} className="next-project" data-reveal>
              <span>Next project</span>
              <div><h2>{nextProject.title}</h2><ArrowRightIcon /></div>
              <p>{nextProject.cardSummary}</p>
            </Link>
          </article>
          <CaseStudyNav key={project.slug} sections={sections} />
        </div>
      </main>

      <footer className="case-footer section-shell">
        <p>Safan · Full-Stack Developer</p>
        <EmailLink className="case-footer__email" aria-label={`Email Safan at ${siteConfig.email}`}>{siteConfig.email}</EmailLink>
        <Link href="/">Back home</Link>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
