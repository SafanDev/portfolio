import CopyEmailButton from "@/components/copy-email-button";
import EmailLink from "@/components/email-link";
import {
  ExternalLinkIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";
import { siteConfig } from "@/data/site";

import styles from "./contact-section.module.css";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div
        className={`section-shell ${styles.inner}`}
        data-reveal
      >
        <div className={styles.copy}>
          <div className={styles.availability}>
            <span aria-hidden="true" />
            Available for junior roles and internships
          </div>

          <p className={styles.label}>Contact</p>

          <h2 id="contact-title">Let&apos;s Connect</h2>

          <p className={styles.description}>
            I&apos;m open to junior full-stack roles, software development
            internships, and remote opportunities. Reach out about a role,
            project, or conversation.
          </p>
        </div>

        <div className={styles.actions}>
          <div className={styles.emailGroup}>
            <p className={styles.actionLabel}>Best way to reach me</p>

            <EmailLink
              className={styles.email}
              aria-label={`Email Safan at ${siteConfig.email}`}
            >
              <span className={styles.emailIcon} aria-hidden="true">
                <MailIcon />
              </span>

              <span className={styles.emailText}>
                <span>Email</span>
                <strong>{siteConfig.email}</strong>
              </span>

              <ExternalLinkIcon className={styles.trailingIcon} />
            </EmailLink>

            <div className={styles.copyButton}>
              <CopyEmailButton />
            </div>
          </div>

          <nav className={styles.links} aria-label="More ways to connect">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkPrimary}`}
              aria-label="Open Safan's LinkedIn profile in a new tab"
            >
              <span className={styles.linkIcon} aria-hidden="true">
                <LinkedInIcon />
              </span>
              <span>LinkedIn</span>
              <ExternalLinkIcon className={styles.linkArrow} />
            </a>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Open Safan's GitHub profile in a new tab"
            >
              <span className={styles.linkIcon} aria-hidden="true">
                <GitHubIcon />
              </span>
              <span>GitHub</span>
              <ExternalLinkIcon className={styles.linkArrow} />
            </a>

          </nav>
        </div>
      </div>
    </section>
  );
}
