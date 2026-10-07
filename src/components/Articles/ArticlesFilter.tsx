"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Tag } from "lucide-react";
import { Article } from "@/utils/articles";
import { Locale, localizedPath } from "@/i18n";
import { getMessages } from "@/i18n/messages";

interface ArticlesFilterProps {
  articles: Article[];
  locale?: Locale;
}

export default function ArticlesFilter({ articles, locale = "en" }: ArticlesFilterProps) {
  const text = getMessages(locale).articles;
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique tags from all articles
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [articles]);

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles;

  return (
    <>
      {/* Tag filter strip */}
      {allTags.length > 0 && (
        <div
          role="group"
           aria-label={text.filterLabel}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <span className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Tag className="h-3.5 w-3.5" />
             {text.filter}
          </span>
          <button
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={`rounded-full px-3 py-1 text-sm transition-colors duration-150 ${
              activeTag === null
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
             {text.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-full px-3 py-1 text-sm transition-colors duration-150 ${
                activeTag === tag
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Article count */}
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
         {filtered.length} {filtered.length === 1 ? text.singular : text.plural}
         {activeTag ? ` ${text.tagged} "${activeTag}"` : ""}
      </p>

      {/* Articles list */}
      <div>
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-gray-400 dark:text-gray-500">
             {text.empty}
          </p>
        ) : (
          filtered.map((article) => (
             <Link href={localizedPath(locale, `/articles/${article.slug}`)} key={article.slug}>
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
                        <button
                          key={`${article.slug}-${tag}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTag(activeTag === tag ? null : tag);
                          }}
                          className={`rounded-full px-3 py-1 text-sm transition-colors ${
                            activeTag === tag
                              ? "bg-blue-600 text-white dark:bg-blue-500"
                              : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-600 dark:text-white dark:hover:bg-blue-900 dark:hover:text-blue-300"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
