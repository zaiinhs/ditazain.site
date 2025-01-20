"use client";

import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import WhatsNewModal from "./WhatsNewModal";

export default function Navbar() {
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

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-full max-w-screen-md w-full">
      <ul className="flex space-x-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={`/${item.toLowerCase()}`}
              className="text-black text-sm dark:text-white hover:text-gray-600 dark:hover:text-gray-300 relative py-1 cursor-pointer transition-colors duration-200 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-200 group-hover:w-full"></span>
            </a>
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
