import ArticlesPage from "../../articles/page";
import { isLocale } from "@/i18n";
import { pageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return pageMetadata(locale, "articles");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();
  return <ArticlesPage locale={locale} />;
}
