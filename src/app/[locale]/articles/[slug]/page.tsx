import { getAllArticles } from "@/utils/articles";
import { isLocale } from "@/i18n";
import { getArticleMetadata, LocalizedArticleDetail } from "../../../articles/[slug]/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["id", "jv"].flatMap((locale) =>
    getAllArticles().map(({ slug }) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return getArticleMetadata(slug, locale);
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <LocalizedArticleDetail slug={slug} locale={locale} />;
}
