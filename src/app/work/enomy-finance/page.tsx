import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Enomy Finance | Safan",
  description:
    "A Figma website design for currency conversion, investment quotes, saved history, and account management.",
};

const features = [
  {
    title: "Currency converter",
    description:
      "A clear conversion form with currency choices, exchange values, fees, and final results.",
  },
  {
    title: "User dashboard",
    description:
      "A dashboard that gives users quick access to balances, recent activity, and finance tools.",
  },
  {
    title: "Saved quotes",
    description:
      "Users can review saved conversion and investment quotes from one place.",
  },
  {
    title: "History",
    description:
      "The design includes a simple history view for checking previous activity.",
  },
];

export default function EnomyFinancePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.name}>
          Safan
        </Link>

        <Link href="/#work" className={styles.backLink}>
          Back to work
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.label}>Finance website UI/UX design</p>

          <h1>Enomy Finance</h1>

          <p className={styles.lead}>
            A finance website design for currency conversion, investment
            quotes, account activity, and saved history.
          </p>

          <div className={styles.actions}>
            <a
              href="https://www.figma.com/design/IUAmQxfeTqMFcCiA4XFfwd/Enomy-Finance?t=tn6axTtPhgn2IXt5-0"
              target="_blank"
              rel="noreferrer"
              className={styles.primaryButton}
            >
              View Figma design
            </a>
          </div>
        </div>

        <div className={styles.cover}>
          <Image
            src="/projects/enomy-finance/cover.png"
            alt="Enomy Finance website design screens"
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 24px), 1200px"
          />
        </div>
      </section>

      <section className={styles.details}>
        <div>
          <p>Role</p>
          <strong>UI/UX designer</strong>
        </div>

        <div>
          <p>Tool</p>
          <strong>Figma</strong>
        </div>

        <div>
          <p>Status</p>
          <strong>Completed design prototype</strong>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Overview</p>

        <div className={styles.twoColumns}>
          <h2>A simple finance experience for everyday users.</h2>

          <div className={styles.bodyText}>
            <p>
              Enomy Finance was designed to make finance tools easier to
              understand and use.
            </p>

            <p>
              I worked on the page structure, user flow, forms, dashboard,
              saved quotes, history screens, colours, spacing, and reusable
              interface parts.
            </p>

            <p>
              This project is a Figma design only. It does not have a working
              frontend, backend, or live finance data.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Main features</p>

        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <article className={styles.featureCard} key={feature.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>What this project shows</p>

        <div className={styles.proofGrid}>
          <div>
            <h3>UI design</h3>

            <p>
              Clear page layouts, form design, dashboards, cards, tables, and
              visual balance.
            </p>
          </div>

          <div>
            <h3>User flow</h3>

            <p>
              Simple steps for converting currency, viewing results, and
              checking saved activity.
            </p>
          </div>

          <div>
            <h3>Figma work</h3>

            <p>
              Reusable parts, screen layouts, spacing, colours, and a
              consistent design system.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.nextSection}>
        <div>
          <p>More work</p>
          <h2>Explore the other projects.</h2>
        </div>

        <Link href="/#work">View all projects</Link>
      </section>

      <footer className={styles.footer}>
        <p>Safan</p>

        <a href="mailto:safan.dev@gmail.com">
          safan.dev@gmail.com
        </a>
      </footer>
    </main>
  );
}