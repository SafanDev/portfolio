import type { Metadata, Viewport } from "next";
import ScrollReveal from "@/components/scroll-reveal";
import PortfolioAnalytics from "@/components/portfolio-analytics";
import { siteConfig } from "@/data/site";
import { serializePersonSchema } from "@/data/person-schema";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";
import "./section-refinements.css";

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
  verification: {
  google: "g5m9ph9iur3_xoNRtc9fQSxa8Y_rA9bXlgtGGPbdK5w",
},
  
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0d",
  colorScheme: "dark",
};

const personSchemaJson = serializePersonSchema(siteUrl);

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
            __html: personSchemaJson,
          }}
        />

        <PortfolioAnalytics />
      </body>
    </html>
  );
}
