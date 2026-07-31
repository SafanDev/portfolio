import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ETCP | Safan",
  description:
    "A React mobile-style prototype for finding eco-friendly travel experiences in Sri Lanka.",
};

const features = [
  {
    title: "Destination discovery",
    description:
      "Users can explore travel locations and view useful details about each destination.",
  },
  {
    title: "Search and filters",
    description:
      "The interface helps users search for places and narrow down travel options.",
  },
  {
    title: "Booking flow",
    description:
      "Users can move through a clear booking process using prototype data.",
  },
  {
    title: "Profiles and reviews",
    description:
      "The app includes user profiles, saved activity, ratings, and review screens.",
  },
];

export default function EtcpPage() {
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
          <p className={styles.label}>React mobile-style prototype</p>

          <h1>ETCP</h1>

          <p className={styles.lead}>
            A travel app prototype that helps users explore eco-friendly
            destinations, plan trips, and move through a simple booking flow.
          </p>

          <div className={styles.actions}>
            <a
              href="https://github.com/SafanDev/eco-traveler-cloud-platform"
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
            src="/projects/etcp/cover.png"
            alt="ETCP mobile travel app screens"
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 24px), 1200px"
          />
        </div>
      </section>

      <section className={styles.details}>
        <div>
          <p>Role</p>
          <strong>Frontend developer and UI designer</strong>
        </div>

        <div>
          <p>Tools</p>
          <strong>React, JavaScript, CSS</strong>
        </div>

        <div>
          <p>Status</p>
          <strong>Working frontend prototype</strong>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Overview</p>

        <div className={styles.twoColumns}>
          <h2>A mobile-style travel experience built in React.</h2>

          <div className={styles.bodyText}>
            <p>
              ETCP was designed to help travellers find eco-friendly places
              and plan trips through a clear and simple interface.
            </p>

            <p>
              I worked on the React screens, page flow, responsive layout,
              reusable parts, navigation, forms, and visual design.
            </p>

            <p>
              This project is a frontend prototype. Bookings, reviews, and
              payments use sample data and are not connected to a real backend.
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
            <h3>React</h3>

            <p>
              Reusable interface parts, page navigation, interactive screens,
              and state-based user flows.
            </p>
          </div>

          <div>
            <h3>UI and UX</h3>

            <p>
              Mobile-first layouts, clear actions, readable content, travel
              cards, forms, and booking steps.
            </p>
          </div>

          <div>
            <h3>Responsive design</h3>

            <p>
              A mobile-app-style experience that also works inside a normal
              web browser.
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