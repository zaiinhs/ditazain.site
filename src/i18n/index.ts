export const LOCALES = ["en", "id", "jv"] as const;

export type Locale = (typeof LOCALES)[number];

export type LocalizedCopy = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function copyFor(locale: Locale, copy: LocalizedCopy): string {
  return copy[locale];
}

export function localizedPath(locale: Locale, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const englishPath = normalizedPath.replace(/^\/(id|jv)(?=\/|$)/, "") || "/";

  if (locale === "en") return englishPath;
  return englishPath === "/" ? `/${locale}` : `/${locale}${englishPath}`;
}

export function languageAlternates(path: string) {
  return {
    en: localizedPath("en", path),
    id: localizedPath("id", path),
    jv: localizedPath("jv", path),
  };
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Indonesia",
  jv: "Jawa",
};

export const navigationLabels: Record<Locale, Record<string, string>> = {
  en: {
    Home: "Home",
    About: "About",
    Data: "Data",
    Projects: "Projects",
    Articles: "Articles",
    ReadingList: "Reading List",
    Uses: "Uses",
  },
  id: {
    Home: "Beranda",
    About: "Tentang",
    Data: "Data",
    Projects: "Proyek",
    Articles: "Artikel",
    ReadingList: "Daftar Bacaan",
    Uses: "Peralatan",
  },
  jv: {
    Home: "Ngarep",
    About: "Babagan",
    Data: "Data",
    Projects: "Proyek",
    Articles: "Artikel",
    ReadingList: "Wacan",
    Uses: "Piranti",
  },
};
