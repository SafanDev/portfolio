import { siteConfig } from "./site";

export function createPersonSchema(siteUrl: string) {
  return {
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
}

export function serializePersonSchema(siteUrl: string) {
  return JSON.stringify(createPersonSchema(siteUrl)).replace(/</g, "\\u003c");
}
