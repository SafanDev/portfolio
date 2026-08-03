import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <SiteHeader compact />
      <main id="main-content" className="not-found section-shell">
        <p className="section-kicker">404</p>
        <h1>That page does not exist.</h1>
        <p>The link may be old, or the page may have moved.</p>
        <Link href="/" className="button button--primary"><ArrowLeftIcon /> Return home</Link>
      </main>
    </>
  );
}
