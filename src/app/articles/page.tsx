"use client";

import { Footer, Navbar } from "@/components";
import { ArrowUpRight } from "lucide-react";
import { articles } from "./data";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <div className="text-black min-h-screen flex flex-col items-center mt-5">
      <Navbar />
      <main className="flex flex-col mt-20 max-w-screen-md w-full mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Articles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thoughts on software development, programming, and technology.
          </p>
        </div>
        {/* Articles Grid */}
        {articles.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.slug}>
            <article className="group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-6 transition-all duration-200">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.date}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {article.tags.map((tag) => (
                      <span
                        key={`${article.slug}-${tag}`}
                        className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </article>
          </Link>
        ))}
      </main>
      <Footer />
    </div>
  );
}
