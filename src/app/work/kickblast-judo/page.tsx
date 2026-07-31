import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "KickBlast Judo | Safan",
  description:
    "A C# desktop management system for athletes, coaches, training plans, competitions, fees, and payments.",
};

const features = [
  {
    title: "User management",
    description:
      "The system allows staff to create and manage user accounts and access.",
  },
  {
    title: "Athlete records",
    description:
      "Athlete details can be added, viewed, updated, searched, and removed.",
  },
  {
    title: "Training and competitions",
    description:
      "The app helps manage training plans and competition information.",
  },
  {
    title: "Fees and payments",
    description:
      "Staff can manage fees, payment records, and related member details.",
  },
];

export default function KickBlastJudoPage() {
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
          <p className={styles.label}>C# desktop management system</p>

          <h1>KickBlast Judo</h1>

          <p className={styles.lead}>
            A desktop app for managing athletes, coaches, training plans,
            competitions, fees, and payments in one place.
          </p>

          <div className={styles.actions}>
            <a
              href="https://github.com/SafanDev/kick-blast-judo-system"
              target="_blank"
              rel="noreferrer"
              className={styles.primaryButton}
            >
              View GitHub
            </a>
          </div>
        </div>

        <div className={styles.cover}>
          <Image
            src="/projects/kickblast-judo/cover.png"
            alt="KickBlast Judo desktop application screens"
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 24px), 1200px"
          />
        </div>
      </section>

      <section className={styles.details}>
        <div>
          <p>Role</p>
          <strong>Desktop app developer</strong>
        </div>

        <div>
          <p>Tools</p>
          <strong>C#, Windows Forms, SQL Server</strong>
        </div>

        <div>
          <p>Status</p>
          <strong>Completed and available on GitHub</strong>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Overview</p>

        <div className={styles.twoColumns}>
          <h2>A desktop system for managing daily judo club work.</h2>

          <div className={styles.bodyText}>
            <p>
              KickBlast Judo was built to keep athlete, coach, training,
              competition, fee, and payment information in one system.
            </p>

            <p>
              I worked on the desktop interface, application logic, database
              connection, forms, validation, searching, and record management.
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
            <h3>Desktop UI</h3>

            <p>
              Windows Forms screens for login, dashboards, forms, tables,
              searching, and record management.
            </p>
          </div>

          <div>
            <h3>Application logic</h3>

            <p>
              C# code for handling user actions, calculations, validation, and
              data changes.
            </p>
          </div>

          <div>
            <h3>Database work</h3>

            <p>
              SQL Server storage for users, athletes, coaches, training,
              competitions, fees, and payments.
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