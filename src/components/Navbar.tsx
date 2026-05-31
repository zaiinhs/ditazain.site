"use client";

import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import WhatsNewModal from "./WhatsNewModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";

const MENU_ITEMS = [
  "Home",
  "About",
  "Data",
  "Projects",
  "Articles",
  "ReadList",
  "Uses",
] as const;

const hrefFor = (item: string) =>
  item === "Home" ? "/" : `/${item.toLowerCase()}`;

export default function Navbar() {
  const pathname = usePathname();
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (item: string) => pathname === hrefFor(item);

  return (
    <nav className="sticky top-3 z-50 mt-3 flex items-center justify-between rounded-2xl border border-gray-200/70 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-md dark:border-gray-700/70 dark:bg-gray-900/80">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
        )}
      </button>

      {/* Desktop menu */}
      <ul className="hidden items-center gap-1 md:flex">
        {MENU_ITEMS.map((item) => (
          <li key={item}>
            <Link
              href={hrefFor(item)}
              className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-200 ${
                isActive(item)
                  ? "bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900 md:hidden">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item}
              href={hrefFor(item)}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 text-sm ${
                isActive(item)
                  ? "bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              {item}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsWhatsNewOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <Sparkles className="h-4 w-4" />
            What&apos;s New?
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsWhatsNewOpen(true)}
          className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white md:inline-flex"
        >
          <Sparkles className="h-4 w-4" />
          What&apos;s New?
        </button>
        <DarkModeToggle />
      </div>

      <WhatsNewModal
        isOpen={isWhatsNewOpen}
        onClose={() => setIsWhatsNewOpen(false)}
      />
    </nav>
  );
}
