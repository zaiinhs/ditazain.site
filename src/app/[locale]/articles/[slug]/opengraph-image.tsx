import { getAllArticles, getArticleBySlug } from "@/utils/articles";
import { isLocale } from "@/i18n";
import { renderArticleOgImage } from "../../../articles/[slug]/opengraph-image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const alt = "Article by Zainal Abidin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ["id", "jv"].flatMap((locale) =>
    getAllArticles().map(({ slug }) => ({ locale, slug }))
  );
}

export default async function ArticleOgImage({ params }: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  const article = getArticleBySlug(slug, locale);
  if (!article) notFound();
  return renderArticleOgImage(article.title, "artikel");
}
