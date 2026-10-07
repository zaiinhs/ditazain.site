"use client";

import { Moon, Sun } from "lucide-react";
import { Locale } from "@/i18n";

const labels: Record<Locale, string> = {
  en: "Toggle dark mode",
  id: "Ganti mode gelap",
  jv: "Ganti mode peteng",
};

export default function DarkModeToggle({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label={labels[locale]}
    >
      {/* Both icons render identically on server & client; CSS (the .dark class
          set before paint) decides which is visible — avoids hydration mismatch. */}
      <Sun className="block h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
