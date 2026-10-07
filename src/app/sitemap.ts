import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { getAllArticles } from "@/utils/articles";
import { LOCALES, languageAlternates, localizedPath } from "@/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/articles",
    "/projects",
    "/data",
    "/readlist",
    "/uses",
  ].flatMap((route) => LOCALES.map((locale) => ({
    url: `${SITE_URL}${localizedPath(locale, route || "/")}`,
    alternates: { languages: Object.fromEntries(
      Object.entries(languageAlternates(route || "/")).map(([lang, path]) => [lang, `${SITE_URL}${path}`])
    ) },
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  })));

  const articleRoutes = getAllArticles().flatMap((article) => LOCALES.map((locale) => ({
    url: `${SITE_URL}${localizedPath(locale, `/articles/${article.slug}`)}`,
    alternates: { languages: Object.fromEntries(
      Object.entries(languageAlternates(`/articles/${article.slug}`)).map(([lang, path]) => [lang, `${SITE_URL}${path}`])
    ) },
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  })));

  return [...staticRoutes, ...articleRoutes];
}
