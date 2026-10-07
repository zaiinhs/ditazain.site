import { Footer, Navbar, Projects } from "@/components";
import { Metadata } from "next";
import { Locale, languageAlternates } from "@/i18n";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected enterprise product, data solutions and client implementation work by Zainal Abidin.",
  alternates: { canonical: "/projects", languages: languageAlternates("/projects") },
  openGraph: {
    title: "Projects | Zainal Abidin",
    description:
      "Selected enterprise product, data solutions and client implementation work by Zainal Abidin.",
    type: "website",
    url: "/projects",
  },
};

export default function ProjectsPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="min-h-screen px-4 sm:px-6">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <Navbar locale={locale} />
      <main id="main-content" className="mt-10 flex-1 py-5 sm:mt-14 sm:py-8">
        <Projects locale={locale} />
      </main>
       <Footer locale={locale} />
    </div>
    </div>
  );
}
