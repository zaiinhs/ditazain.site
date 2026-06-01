import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/constants/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Software & Data Engineer`,
    short_name: SITE_NAME,
    description:
      "Personal website of Zainal Abidin — Software & Data Engineer from Indonesia.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#030712",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
