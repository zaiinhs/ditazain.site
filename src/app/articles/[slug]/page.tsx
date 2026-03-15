import { Footer, Navbar } from "@/components";
import { getArticleBySlug, getAllArticles } from "@/utils/articles";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Mermaid } from "@/components/Mermaid";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Zainal | @zaiinhs`,
    description: article.description,
    keywords: article.tags,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return notFound();
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

        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:dark:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-gray-800 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-table:my-6 prose-thead:bg-gray-50 dark:prose-thead:bg-gray-800 prose-tr:border prose-tr:border-gray-200 dark:prose-tr:border-gray-700">
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

          <div className="markdown-content">
            <MDXRemote
              source={article.content}
              options={
                {
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                } as any
              }
              components={{
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const isMermaid = match && match[1] === "mermaid";

                  if (isMermaid) {
                    const chart = String(children).replace(/\n$/, "");
                    return <Mermaid chart={chart} />;
                  }

                  return (
                    <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm`} {...props}>
                      {children}
                    </code>
                  );
                },
                table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => {
                  return (
                    <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                        {children}
                      </table>
                    </div>
                  );
                },
                thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
                  return (
                    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
                      {children}
                    </thead>
                  );
                },
                tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
                  return (
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props}>
                      {children}
                    </tbody>
                  );
                },
                tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
                  return (
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" {...props}>
                      {children}
                    </tr>
                  );
                },
                th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => {
                  return (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider bg-gray-50 dark:bg-gray-800" {...props}>
                      {children}
                    </th>
                  );
                },
                td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {
                  return (
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props}>
                      {children}
                    </td>
                  );
                },
                p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => {
                  return (
                    <p className="mb-4 leading-relaxed">{children}</p>
                  );
                },
              }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
