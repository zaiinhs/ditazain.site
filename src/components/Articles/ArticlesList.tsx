"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Article } from "@/utils/articles";
import { Locale, localizedPath } from "@/i18n";
import { getMessages } from "@/i18n/messages";

interface ArticlesListProps {
  articles: Article[];
  locale?: Locale;
}

export default function ArticlesList({ articles, locale = "en" }: ArticlesListProps) {
  const text = getMessages(locale).home;
  return (
    <section
      className="mx-auto w-full max-w-6xl py-10 sm:py-14 lg:py-16"
      aria-labelledby="latest-articles-heading"
    >
      <header className="mb-5 flex flex-col items-start gap-2 sm:mb-7 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h2
          id="latest-articles-heading"
          className="text-balance text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl dark:text-white"
        >
          {text.latest}
        </h2>
        <Link
          href={localizedPath(locale, "/articles")}
          className="inline-flex min-h-11 w-fit items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-blue-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:bg-blue-950/50 dark:hover:text-blue-200"
        >
          {text.viewAll}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </header>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={localizedPath(locale, `/articles/${article.slug}`)}
            className="group block h-full min-w-0 rounded-xl border border-gray-200 bg-white transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900 dark:hover:bg-gray-900"
          >
            <article className="flex h-full min-w-0 flex-col p-4 sm:p-5">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <h3 className="min-w-0 text-pretty text-base font-semibold leading-snug tracking-tight text-gray-950 transition-colors duration-200 group-hover:text-blue-700 sm:text-lg dark:text-white dark:group-hover:text-blue-300">
                  {article.title}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-blue-700 dark:group-hover:bg-blue-950 dark:group-hover:text-blue-300">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 sm:text-[15px] dark:text-gray-400">
                {article.description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                <time dateTime={article.date}>{article.date}</time>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
