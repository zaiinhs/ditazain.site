import { Footer, Navbar } from "@/components";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getAllArticles } from "@/utils/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Zainal | @zaiinhs",
  description: "Thoughts on software development, programming, and technology.",
};

export default async function ArticlesPage() {
  const allArticles = getAllArticles();

  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Articles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thoughts on software development, programming, and technology.
          </p>
        </div>
        {allArticles.map((article) => (
          <Link href={`/articles/${article.slug}`} key={article.slug}>
            <article className="group rounded-lg p-4 transition-all duration-200 hover:bg-gray-50 sm:p-6 dark:hover:bg-gray-800">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.date}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-black group-hover:text-blue-600 sm:text-xl dark:text-white dark:group-hover:text-blue-400">
                    {article.title}
                  </h2>
                  <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={`${article.slug}-${tag}`}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-600 dark:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
            </article>
          </Link>
        ))}
      </main>
      <Footer />
    </div>
  );
}
