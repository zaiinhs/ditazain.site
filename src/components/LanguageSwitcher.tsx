"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { Locale, localeNames, localizedPath } from "@/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
}

const subscribeToHydration = () => () => {};
const hydrated = () => true;
const serverRendered = () => false;

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const ready = useSyncExternalStore(subscribeToHydration, hydrated, serverRendered);

  return (
    <label className="relative flex h-9 items-center gap-1 rounded-xl border border-gray-200 px-1.5 text-gray-600 sm:px-2 dark:border-gray-700 dark:text-gray-300">
      <Languages className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only">Choose language / Pilih bahasa / Pilih basa</span>
      <select
        aria-label={
          locale === "en"
            ? "Choose language"
            : locale === "id"
              ? "Pilih bahasa"
              : "Pilih basa"
        }
        value={locale}
        disabled={!ready}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          // Static HTML navigation is much faster than fetching and rendering
          // the large MDX payload during a client-side route transition.
          window.location.assign(localizedPath(nextLocale, pathname));
        }}
        className="h-full w-[2.7rem] cursor-pointer appearance-none bg-transparent pr-3 text-xs font-medium text-gray-800 outline-none disabled:cursor-wait dark:text-gray-100"
      >
        {(Object.keys(localeNames) as Locale[]).map((language) => (
          <option key={language} value={language} aria-label={localeNames[language]}>
            {language.toUpperCase()}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px]"
      >
        ▾
      </span>
    </label>
  );
}
