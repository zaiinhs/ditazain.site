"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface DevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevelopmentModal({
  isOpen,
  onClose,
}: DevelopmentModalProps) {
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
            Development Notice
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            👋 Welcome! Please note that this website is currently in active
            development.
          </p>
        </div>
      </div>
    </div>
  );
}
