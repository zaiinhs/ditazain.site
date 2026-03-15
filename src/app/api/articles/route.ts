import { getAllArticles } from "@/utils/articles";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = getAllArticles();
  
  // Return only required fields for the Latest Articles section
  const articlesData = articles.map((article) => ({
    title: article.title,
    description: article.description,
    date: article.date,
    readTime: article.readTime,
    slug: article.slug,
  }));

  return NextResponse.json(articlesData);
}
