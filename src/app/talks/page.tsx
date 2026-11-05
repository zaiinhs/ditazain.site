import { Footer, Navbar } from "@/components";
import Talks from "@/components/Talks";
import { getMessages } from "@/i18n/messages";
import { Metadata } from "next";
import { Locale, languageAlternates } from "@/i18n";

export const metadata: Metadata = {
  title: "Talks",
  description: "Talks and community sessions by Zainal Abidin.",
  alternates: { canonical: "/talks", languages: languageAlternates("/talks") },
  openGraph: {
    title: "Talks | Zainal Abidin",
    description: "Talks and community sessions by Zainal Abidin.",
    type: "website",
    url: "/talks",
  },
};

export default function TalksPage({ locale = "en" }: { locale?: Locale }) {
  const text = getMessages(locale).talks;

  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar locale={locale} />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold dark:text-white">{text.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{text.intro}</p>
        </div>
        <Talks locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
