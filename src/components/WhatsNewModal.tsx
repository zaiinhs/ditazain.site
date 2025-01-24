"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const updates = [
  {
    date: "2025-01-01",
    items: ["Start Development"],
  },
  {
    date: "2025-01-04",
    items: ["Create Route Homepage"],
  },
  {
    date: "2025-01-19",
    items: ["Improve UI, Navbar, and add dark mode"],
  },
  {
    date: "2025-01-20",
    items: [
      "Add Photo Gallery and Improve View Photo",
      "Bugfix display and failed build",
    ],
  },
  {
    date: "2025-01-22",
    items: ["Create About Page", "Add Display About Page", "Improve navbar"],
  },
  {
    date: "2025-01-24",
    items: ["Create Articles Page", "Add Display Articles Page"],
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
                  <li key={index} className="text-black dark:text-white">
                    {item}
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
