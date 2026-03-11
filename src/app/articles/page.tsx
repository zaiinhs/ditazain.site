import { Footer, Navbar } from "@/components";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getAllArticles } from "@/utils/articles";
import { Metadata } from "next";

const ARTICLES_PER_PAGE = 5;

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  
  if (currentPage > 1) {
    return {
      title: `Articles - Page ${currentPage} | Zainal | @zaiinhs`,
      description: `Page ${currentPage} of articles about software development, programming, and technology.`,
    };
  }
  
  return {
    title: "Articles | Zainal | @zaiinhs",
    description: "Thoughts on software development, programming, and technology.",
  };
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const allArticles = getAllArticles();
  
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

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
        {paginatedArticles.map((article) => (
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
                        className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white rounded-full"
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

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            {currentPage > 1 ? (
              <Link
                href={`/articles?page=${currentPage - 1}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </span>
            )}

            <span className="text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/articles?page=${currentPage + 1}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
                Next
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
