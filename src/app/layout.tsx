import type { Metadata, Viewport } from "next";

import ScrollReveal from "@/components/scroll-reveal";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Safan | Full-Stack Developer",
    template: "%s | Safan",
  },
  description:
    "Safan is a full-stack developer from Sri Lanka who designs and builds complete web and desktop products.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "PHP Developer",
    "C# Developer",
    "Sri Lanka",
    "Software Developer Portfolio",
  ],
  authors: [{ name: siteConfig.fullName, url: siteUrl }],
  creator: siteConfig.fullName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Safan | Full-Stack Developer",
    description:
      "Full-stack web, desktop and product work from Sri Lanka. Explore four projects and the decisions behind them.",
    siteName: "Safan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Safan full-stack developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safan | Full-Stack Developer",
    description:
      "Full-stack web, desktop and product work from Sri Lanka.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0d",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Batticaloa",
    addressCountry: "Sri Lanka",
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
  url: siteUrl,
  knowsAbout: [
    "React",
    "JavaScript",
    "PHP",
    "MySQL",
    "C#",
    "SQL Server",
    "Figma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>

        <ScrollReveal />
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
