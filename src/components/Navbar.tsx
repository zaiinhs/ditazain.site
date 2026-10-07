"use client";

import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import WhatsNewModal from "./WhatsNewModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale, localizedPath, navigationLabels } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const MENU_ITEMS = [
  { key: "Home", path: "/" },
  { key: "About", path: "/about" },
  { key: "Data", path: "/data" },
  { key: "Projects", path: "/projects" },
  { key: "Articles", path: "/articles" },
  { key: "ReadingList", path: "/readlist" },
  { key: "Uses", path: "/uses" },
] as const;

const accessibilityLabels: Record<Locale, { navigation: string; menu: string }> = {
  en: { navigation: "Main navigation", menu: "Toggle menu" },
  id: { navigation: "Navigasi utama", menu: "Buka atau tutup menu" },
  jv: { navigation: "Navigasi utama", menu: "Bukak utawa tutup menu" },
};

export default function Navbar({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const labels = navigationLabels[locale];
  const isActive = (path: string) => {
    const target = localizedPath(locale, path);
    return pathname === target || (path !== "/" && pathname.startsWith(`${target}/`));
  };

  return (
    <nav
      aria-label={accessibilityLabels[locale].navigation}
      className="sticky top-0 z-50 -mx-4 flex min-h-[4.25rem] items-center justify-between border-b border-gray-200/80 bg-white/90 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 dark:border-gray-800/80 dark:bg-gray-950/90"
    >
      <Link
        href={localizedPath(locale, "/")}
        className="shrink-0 text-sm font-semibold tracking-tight text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:text-white"
      >
        Zainal Abidin
        <span className="ml-1.5 hidden font-mono text-xs font-normal text-gray-500 sm:inline dark:text-gray-400">
          / zaiinhs
        </span>
      </Link>

      <ul className="ml-8 hidden items-center gap-0.5 lg:flex">
        {MENU_ITEMS.map((item) => (
          <li key={item.key}>
            <Link
              href={localizedPath(locale, item.path)}
              className={`rounded-lg px-2.5 py-2 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isActive(item.path)
                  ? "font-semibold text-gray-950 dark:text-white"
                  : "text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-300"
              }`}
            >
              {labels[item.key]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden dark:text-gray-200 dark:hover:bg-gray-800"
          aria-label={accessibilityLabels[locale].menu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        <button
          onClick={() => setIsWhatsNewOpen(true)}
          className="hidden min-h-10 items-center gap-1.5 rounded-lg px-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 xl:inline-flex dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {getMessages(locale).ui.whatsNew}
        </button>
        <LanguageSwitcher locale={locale} />
        <DarkModeToggle locale={locale} />
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white px-4 py-3 shadow-lg lg:hidden dark:border-gray-800 dark:bg-gray-950"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={localizedPath(locale, item.path)}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-lg px-3 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isActive(item.path)
                  ? "font-semibold text-gray-950 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
              }`}
            >
              {labels[item.key]}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsWhatsNewOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm text-gray-600 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-400 dark:hover:bg-gray-900 xl:hidden"
          >
            <Sparkles className="h-4 w-4" />
             {getMessages(locale).ui.whatsNew}
          </button>
        </div>
      )}

      <WhatsNewModal
        isOpen={isWhatsNewOpen}
        onClose={() => setIsWhatsNewOpen(false)}
        locale={locale}
      />
    </nav>
  );
}
