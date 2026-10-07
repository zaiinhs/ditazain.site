import { getAllArticles } from "@/utils/articles";
import ArticlesList from "./ArticlesList";
import { Locale } from "@/i18n";

export default function Articles({ locale = "en" }: { locale?: Locale }) {
  const latestArticles = getAllArticles(locale).slice(0, 3);
  return <ArticlesList articles={latestArticles} locale={locale} />;
}
