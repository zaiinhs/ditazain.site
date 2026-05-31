import { getAllArticles } from "@/utils/articles";
import ArticlesList from "./ArticlesList";

export default function Articles() {
  const latestArticles = getAllArticles().slice(0, 3);
  return <ArticlesList articles={latestArticles} />;
}
