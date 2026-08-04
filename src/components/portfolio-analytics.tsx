import PortfolioAnalyticsClient from "@/components/portfolio-analytics-client";

const analyticsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

export default function PortfolioAnalytics() {
  if (!analyticsEnabled) {
    return null;
  }

  return <PortfolioAnalyticsClient />;
}
