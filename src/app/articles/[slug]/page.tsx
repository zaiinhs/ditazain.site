"use client";

import { Footer, Navbar } from "@/components";
import { articles } from "../data";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    return (
      <div className="text-black min-h-screen flex flex-col items-center mt-5">
        <Navbar />
        <main className="flex flex-col mt-20 max-w-screen-md w-full mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              Article not found
            </h1>
            <Link
              href="/articles"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="text-black min-h-screen flex flex-col items-center mt-5">
      <Navbar />
      <main className="flex flex-col mt-20 max-w-screen-md w-full mx-auto px-4">
        <Link
          href="/articles"
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        <article className="prose dark:prose-invert max-w-none">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {article.date}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {article.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              {article.title}
            </h1>
            <div className="flex items-center space-x-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              {article.description}
            </p>
          </div>

          {/* This is where the actual article content would go */}
          <div className="text-gray-600 dark:text-gray-400">
            <p>
              This is a placeholder for the article content. In a real
              application, you would fetch the full article content from your
              backend or CMS and display it here.
            </p>
            <p className="mt-4">
              The content could include rich text, images, code snippets, and
              other media that would make up the full article.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
