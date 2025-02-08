"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const updates = [
  {
    date: "2024-02-09",
    items: [
      "Added Development Notice modal",
      "Enhanced mobile responsiveness across the website",
      "Added hamburger menu for mobile navigation",
      "Improved footer layout for mobile devices",
      "Optimized PhotoGallery visibility for different screen sizes",
      "Added smooth transitions for mobile menu interactions",
      "Improved touch targets for better mobile usability",
    ],
  },
  {
    date: "2024-02-08",
    items: [
      "Added Projects page with showcase of development work",
      "Added Reading List page with book recommendations",
      "Added Uses page showing development setup",
      "Improved dark mode persistence across page navigation",
      "Fixed key prop warnings in component mappings",
      "Added What's New modal with update history",
      "Enhanced navigation menu with active state",
      "Improved footer navigation links",
    ],
  },
  {
    date: "2024-01-24",
    items: [
      "Created Articles page with rich content display",
      "Added article cards with tags and read time",
      "Implemented responsive article layout",
    ],
  },
  {
    date: "2024-01-22",
    items: [
      "Created About page with personal information",
      "Added professional background section",
      "Enhanced navigation with active state indicators",
    ],
  },
  {
    date: "2024-01-20",
    items: [
      "Added Photo Gallery with interactive viewer",
      "Implemented image rotation effects",
      "Added loading states for image viewing",
      "Fixed display issues and build errors",
    ],
  },
  {
    date: "2024-01-19",
    items: [
      "Improved UI with consistent styling",
      "Added Navbar with smooth transitions",
      "Implemented dark mode toggle",
      "Added social media links with hover effects",
    ],
  },
  {
    date: "2024-01-04",
    items: [
      "Created Homepage with modern design",
      "Added responsive layout support",
      "Implemented base routing structure",
    ],
  },
  {
    date: "2024-01-01",
    items: [
      "Initial project setup with Next.js",
      "Added TypeScript configuration",
      "Set up Tailwind CSS for styling",
    ],
  },
];

export default function WhatsNewModal({ isOpen, onClose }: WhatsNewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 relative">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            What&apos;s New?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {updates.map((update) => (
            <div key={update.date} className="mb-6 last:mb-0">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {update.date}
              </h3>
              <ul className="space-y-2">
                {update.items.map((item, index) => (
                  <li
                    key={`${update.date}-${index}`}
                    className="text-black dark:text-white"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
