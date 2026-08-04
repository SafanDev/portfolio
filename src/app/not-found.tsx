import Link from "next/link";

import SiteHeader from "@/components/site-header";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <SiteHeader compact />

      <main id="main-content" className="not-found section-shell">
        <div className="not-found__backdrop" aria-hidden="true" />

        <div className="not-found__panel">
          <p className="not-found__eyebrow">Page not found</p>

          <h1 className="not-found__title">
            <span
              className="not-found__code"
              data-code="404"
              aria-hidden="true"
            >
              404
            </span>

            <span className="sr-only">404 page not found</span>
          </h1>

          <p className="not-found__message">
            Looks like this page took a wrong turn.
          </p>

          <div className="not-found__actions">
            <Link href="/" className="button button--primary">
              <ArrowLeftIcon />
              <span>Back home</span>
            </Link>

            <Link href="/#work" className="button button--secondary">
              <span>View projects</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
