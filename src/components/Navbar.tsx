"use client";

import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import WhatsNewModal from "./WhatsNewModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuItems] = useState([
    "Home",
    "About",
    "Articles",
    "Projects",
    "ReadList",
    "Uses",
  ]);

  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "Home") {
      return pathname === "/";
    }
    return pathname === `/${path.toLowerCase()}`;
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-full max-w-screen-md w-full relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-black dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-black dark:text-white" />
        )}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
        {menuItems.map((item) => (
          <li key={item.toLowerCase()}>
            <Link
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className={`text-sm relative py-1 cursor-pointer transition-colors duration-200 group ${
                isActive(item)
                  ? "text-black dark:text-white font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {item}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-black dark:bg-white transition-all duration-200 ${
                  isActive(item) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 md:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.toLowerCase()}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className={`block px-4 py-2 text-sm ${
                isActive(item)
                  ? "text-black dark:text-white font-medium bg-gray-100 dark:bg-gray-700"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsWhatsNewOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            What&apos;s New?
          </button>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsWhatsNewOpen(true)}
          className="hidden md:inline-flex text-black text-sm dark:text-white hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer relative py-1 group"
        >
          What&apos;s New?
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-200 group-hover:w-full"></span>
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
