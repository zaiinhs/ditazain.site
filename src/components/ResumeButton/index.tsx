"use client";

import { Download, FileText, X } from "lucide-react";
import { useState } from "react";

const CV_LINK = "/cv.pdf";

export default function ResumeButton() {
  const [showCV, setShowCV] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowCV(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-blue-500 dark:hover:text-white"
      >
        <FileText className="h-4 w-4" />
        View Resume
      </button>

      {showCV && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowCV(false)}
        >
          <div
            className="relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute right-4 top-4 z-10 flex gap-2">
              <a
                href={CV_LINK}
                download
                className="flex items-center gap-1.5 rounded-full bg-gray-900/80 px-3 py-2 text-xs text-white transition hover:bg-gray-700"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
              <button
                onClick={() => setShowCV(false)}
                aria-label="Close resume preview"
                className="rounded-full bg-gray-900/80 p-2 text-white transition hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={CV_LINK}
              className="h-full w-full"
              title="Resume Preview"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}
    </>
  );
}
