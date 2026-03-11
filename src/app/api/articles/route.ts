import { getAllArticles } from "@/utils/articles";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = getAllArticles();
  return NextResponse.json(articles);
}
