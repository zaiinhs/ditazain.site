import { Footer, Navbar, Uses } from "@/components";
import { Metadata } from "next";
import { Locale, languageAlternates } from "@/i18n";

export const metadata: Metadata = {
  title: "Uses",
  description: "The hardware and tools Zainal Abidin uses day to day.",
  alternates: { canonical: "/uses", languages: languageAlternates("/uses") },
  openGraph: {
    title: "Uses | Zainal Abidin",
    description: "The hardware and tools Zainal Abidin uses day to day.",
    type: "website",
    url: "/uses",
  },
};

export default function UsesPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
          <Navbar locale={locale} />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
          <Uses locale={locale} />
      </main>
        <Footer locale={locale} />
    </div>
  );
}
