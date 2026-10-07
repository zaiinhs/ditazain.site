import { Footer, Navbar } from "@/components";
import { getAllArticles } from "@/utils/articles";
import { Metadata } from "next";
import ArticlesFilter from "@/components/Articles/ArticlesFilter";
import { Locale, languageAlternates } from "@/i18n";
import { getMessages } from "@/i18n/messages";

export const metadata: Metadata = {
  title: "Articles",
  description: "Thoughts on software development, programming, and technology.",
  alternates: { canonical: "/articles", languages: languageAlternates("/articles") },
  openGraph: {
    title: "Articles | Zainal Abidin",
    description: "Thoughts on software development, programming, and technology.",
    type: "website",
    url: "/articles",
  },
};

export default async function ArticlesPage({ locale = "en" }: { locale?: Locale }) {
  const allArticles = getAllArticles(locale);
  const text = getMessages(locale).articles;

  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
          <Navbar locale={locale} />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">{text.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
              {text.intro}
          </p>
        </div>
          <ArticlesFilter articles={allArticles} locale={locale} />
      </main>
        <Footer locale={locale} />
    </div>
  );
}
