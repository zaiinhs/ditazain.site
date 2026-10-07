"use client";

import { Download, FileText, X } from "lucide-react";
import { useState } from "react";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const CV_LINK = "/cv.pdf";

export default function ResumeButton({ locale = "en" }: { locale?: Locale }) {
  const [showCV, setShowCV] = useState(false);
  const text = getMessages(locale).ui;

  return (
    <>
      <button
        onClick={() => setShowCV(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-100"
      >
        <FileText className="h-4 w-4" />
        {text.viewCV}
      </button>

      {showCV && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowCV(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-preview-title"
            className="relative h-[min(88dvh,900px)] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="resume-preview-title" className="sr-only">
              {text.cvPreview}
            </h2>
            <div className="absolute right-3 top-3 z-10 flex gap-2 sm:right-4 sm:top-4">
              <a
                href={CV_LINK}
                download
                className="flex min-h-10 items-center gap-1.5 rounded-lg bg-gray-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Download className="h-4 w-4" />
                {text.downloadCV}
              </a>
              <button
                onClick={() => setShowCV(false)}
                aria-label={text.closeCV}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950 text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={CV_LINK}
              className="h-full w-full"
              title={text.cvPreview}
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}
    </>
  );
}
