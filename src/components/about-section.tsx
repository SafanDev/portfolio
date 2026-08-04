import type { SVGProps } from "react";

import styles from "./about-section.module.css";

type IconProps = SVGProps<SVGSVGElement>;

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

function EducationIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12.5V17c2.8 2 7.2 2 10 0v-4.5" />
      <path d="M21 9v6" />
    </svg>
  );
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12.5c5.2 2 12.8 2 18 0" />
      <path d="M10 12h4" />
    </svg>
  );
}

function LocationIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className={`section-shell content-section ${styles.section}`}
      aria-labelledby="about-title"
    >
      <div
        className={`section-heading ${styles.heading}`}
        data-reveal
      >
        <p className={styles.eyebrow}>About</p>

        <h2 id="about-title">
          A developer who cares about both sides of the product.
        </h2>
      </div>

      <div className={styles.grid} data-reveal>
        <div className={styles.copy}>
          

          <p className={styles.description}>
            I enjoy taking an idea through interface design, database
            structure, development, testing, and refinement. My recent BTEC
            HND in Software Engineering gave me a solid grounding in the full
            stack, from PHP and MySQL backends to C# desktop applications and
            React frontends.
          </p>
        </div>

        <div className={styles.facts}>
          <article className={styles.fact}>
            <span className={styles.factIcon}>
              <EducationIcon />
            </span>

            <div className={styles.factBody}>
              <span className={styles.factLabel}>Education</span>

              <strong>
                BTEC HND in Computing (Software Engineering)
              </strong>

              <p>ESOFT Metro Campus · 2025–2026</p>
            </div>
          </article>

          <article className={styles.fact}>
            <span className={styles.factIcon}>
              <BriefcaseIcon />
            </span>

            <div className={styles.factBody}>
              <span className={styles.factLabel}>Looking for</span>

              <strong>Junior full-stack roles</strong>

              <p>Software development internships</p>
            </div>
          </article>

          <article className={styles.fact}>
            <span className={styles.factIcon}>
              <LocationIcon />
            </span>

            <div className={styles.factBody}>
              <span className={styles.factLabel}>Work preference</span>

              <strong>Sri Lanka</strong>

              <p>Remote worldwide</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
