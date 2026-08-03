import { normalizeSiteUrl } from "./site-url-core.mjs";

const LOCAL_SITE_URL = "http://localhost:3000";

function getPlatformSiteUrl() {
  return (
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    process.env.CF_PAGES_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    ""
  ).trim();
}

function isHostedProduction() {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.CONTEXT === "production" ||
    process.env.CF_PAGES_BRANCH === "main"
  );
}

export function getSiteUrl() {
  const configuredUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || getPlatformSiteUrl()
  ).trim();

  const siteUrl = configuredUrl
    ? normalizeSiteUrl(configuredUrl)
    : LOCAL_SITE_URL;

  if (
    isHostedProduction() &&
    new URL(siteUrl).hostname === "localhost"
  ) {
    throw new Error(
      "A production portfolio URL is required. Set NEXT_PUBLIC_SITE_URL to the deployed HTTPS address.",
    );
  }

  return siteUrl;
}

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
}
