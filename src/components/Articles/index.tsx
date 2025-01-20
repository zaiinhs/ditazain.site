"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "Building a Modern Web Application",
    description:
      "Learn how to build a modern web application using Next.js, TypeScript, and Tailwind CSS.",
    date: "2024-01-20",
    readTime: "5 min read",
    link: "/articles/building-modern-web-app",
  },
  {
    title: "Understanding TypeScript Generics",
    description:
      "A comprehensive guide to understanding and using TypeScript generics effectively.",
    date: "2024-01-15",
    readTime: "8 min read",
    link: "/articles/typescript-generics",
  },
  {
    title: "Mastering React Hooks",
    description:
      "Deep dive into React Hooks and how to use them effectively in your applications.",
    date: "2024-01-10",
    readTime: "6 min read",
    link: "/articles/mastering-react-hooks",
  },
];

export default function Articles() {
  return (
    <section className="w-full max-w-screen-md mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold dark:text-white">Latest Articles</h2>
        <Link
          href="/articles"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          View all
        </Link>
      </div>
      <div className="space-y-8">
        {articles.map((article, index) => (
          <Link key={index} href={article.link} className="block group">
            <article className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
