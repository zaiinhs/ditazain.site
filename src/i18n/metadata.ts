import type { Metadata } from "next";
import { SITE_URL } from "@/constants/site";
import { languageAlternates, Locale, localizedPath } from "./index";
import { getMessages } from "./messages";

const descriptions = {
  en: "Zainal Abidin is a Technical Product Specialist at Indivara Group, working across product delivery, data solutions and client implementation.",
  id: "Zainal Abidin adalah Technical Product Specialist di Indivara Group, bekerja di pengiriman produk, solusi data, dan implementasi klien.",
  jv: "Zainal Abidin minangka Technical Product Specialist ing Indivara Group, nggarap pangiriman produk, solusi data, lan implementasi klien.",
};

export function localizedMetadata(
  locale: Locale,
  path: string,
  title: string,
  description = descriptions[locale],
): Metadata {
  const canonical = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title: `${title} | Zainal Abidin`,
      description,
      url: `${SITE_URL}${canonical}`,
      type: "website",
      locale: locale === "id" ? "id_ID" : locale === "jv" ? "jv_ID" : "en_US",
    },
  };
}

export function pageMetadata(locale: Locale, page: "home" | "about" | "data" | "projects" | "articles" | "readlist" | "uses") {
  const text = getMessages(locale);
  const titles = {
    home: "Zainal Abidin (zaiinhs) — Technical Product Specialist",
    about: text.about.label,
    data: text.data.label,
    projects: text.projects.label,
    articles: text.articles.title,
    readlist: text.readlist.title,
    uses: text.uses.title,
  };
  const paths = { home: "/", about: "/about", data: "/data", projects: "/projects", articles: "/articles", readlist: "/readlist", uses: "/uses" };
  const intros = {
    home: text.home.description,
    about: text.about.intro,
    data: text.data.intro,
    projects: text.projects.intro,
    articles: text.articles.intro,
    readlist: text.readlist.intro,
    uses: text.uses.intro,
  };
  const metadata = localizedMetadata(locale, paths[page], titles[page], intros[page]);
  if (page === "home") metadata.title = { absolute: titles.home };
  return metadata;
}
