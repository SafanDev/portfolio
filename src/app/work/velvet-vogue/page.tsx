import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Velvet Vogue | Safan",
  description:
    "A full-stack fashion e-commerce website built by Safan using PHP, MySQL, JavaScript, and Bootstrap.",
};

const features = [
  {
    title: "Customer accounts",
    description:
      "Users can create an account, sign in, and manage their shopping activity.",
  },
  {
    title: "Product shopping",
    description:
      "Customers can browse products, view details, filter items, and choose available options.",
  },
  {
    title: "Cart and checkout",
    description:
      "The website includes a working shopping cart, checkout flow, and order records.",
  },
  {
    title: "Admin dashboard",
    description:
      "Admins can manage products, customers, orders, stock, and other store data.",
  },
];

export default function VelvetVoguePage() {
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
          <p className={styles.label}>Full-stack e-commerce project</p>

          <h1>Velvet Vogue</h1>

          <p className={styles.lead}>
            A fashion shopping website with customer accounts, product
            browsing, cart, checkout, orders, and an admin dashboard.
          </p>

          <div className={styles.actions}>
            <a
              href="https://vetvetvogue.gamer.gd/"
              target="_blank"
              rel="noreferrer"
              className={styles.primaryButton}
            >
              View live site
            </a>

            <a
              href="https://github.com/SafanDev/velvetVogue"
              target="_blank"
              rel="noreferrer"
              className={styles.secondaryButton}
            >
              View GitHub
            </a>
          </div>
        </div>

        <div className={styles.cover}>
          <Image
            src="/projects/velvet-vogue/cover.png"
            alt="Velvet Vogue website screens"
            fill
            priority
            sizes="(max-width: 900px) calc(100vw - 24px), 1200px"
          />
        </div>
      </section>

      <section className={styles.details}>
        <div>
          <p>Role</p>
          <strong>Full-stack developer</strong>
        </div>

        <div>
          <p>Tools</p>
          <strong>PHP, MySQL, JavaScript, Bootstrap</strong>
        </div>

        <div>
          <p>Status</p>
          <strong>Completed and deployed</strong>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Overview</p>

        <div className={styles.twoColumns}>
          <h2>A complete online store, not only a landing page.</h2>

          <div className={styles.bodyText}>
            <p>
              Velvet Vogue was built as a complete fashion e-commerce website.
              The aim was to create a clear shopping experience for customers
              and a useful management system for admins.
            </p>

            <p>
              I worked on the user interface, server-side features, database,
              product system, customer accounts, orders, and admin tools.
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
            <h3>Frontend</h3>
            <p>
              Responsive pages, product layouts, forms, navigation, shopping
              flows, and a custom visual style.
            </p>
          </div>

          <div>
            <h3>Backend</h3>
            <p>
              User accounts, product management, cart actions, checkout,
              orders, admin controls, and server-side validation.
            </p>
          </div>

          <div>
            <h3>Database</h3>
            <p>
              Structured data for users, products, product options, carts,
              orders, messages, and stock.
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
        <a href="mailto:safan.dev@gmail.com">safan.dev@gmail.com</a>
      </footer>
    </main>
  );
}