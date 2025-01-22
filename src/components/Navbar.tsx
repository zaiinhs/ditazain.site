"use client";

import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import WhatsNewModal from "./WhatsNewModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuItems] = useState([
    "Home",
    "About",
    "Articles",
    "Projects",
    "ReadList",
    "Uses",
    "Keybinds",
  ]);

  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "Home") {
      return pathname === "/";
    }
    return pathname === `/${path.toLowerCase()}`;
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-full max-w-screen-md w-full">
      <ul className="flex space-x-4">
        {menuItems.map((item, index) => (
          <li key={index}>
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
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsWhatsNewOpen(true)}
          className="text-black text-sm dark:text-white hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer relative py-1 group"
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
