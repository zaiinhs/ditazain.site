import Link from "next/link";
import { Locale, localizedPath, navigationLabels } from "@/i18n";

const menuItems = [
  { key: "About", path: "/about" },
  { key: "Data", path: "/data" },
  { key: "Projects", path: "/projects" },
  { key: "Articles", path: "/articles" },
  { key: "ReadingList", path: "/readlist" },
  { key: "Uses", path: "/uses" },
];

const copyright: Record<Locale, string> = {
  en: "All rights reserved.",
  id: "Hak cipta dilindungi.",
  jv: "Hak cipta dilindhungi.",
};

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 py-6 dark:border-gray-800">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <nav>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start sm:gap-x-5">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={localizedPath(locale, item.path)}
                  className="group relative cursor-pointer py-1 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  {navigationLabels[locale][item.key]}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-200 group-hover:w-full dark:bg-blue-400" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} @zaiinhs. {copyright[locale]}
        </p>
      </div>
    </footer>
  );
}
