import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safan - Full-Stack Developer",
    short_name: "Safan",
    description: "Portfolio of Safan, a full-stack developer from Sri Lanka.",
    start_url: "/",
    display: "standalone",
    background_color: "#080a0d",
    theme_color: "#080a0d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
