"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const photos = [
  "/images/photo-1.webp",
  "/images/photo-2.webp",
  "/images/photo-3.webp",
  "/images/photo-4.webp",
  "/images/photo-5.webp",
];

export default function PhotoGallery({ locale = "en" }: { locale?: Locale }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const text = getMessages(locale).ui;

  return (
    <>
      <section className="w-full py-10 sm:py-12" aria-labelledby="moments-heading">
        <h2
          id="moments-heading"
          className="mb-5 text-lg font-semibold tracking-tight text-gray-950 dark:text-white"
        >
           {text.moments}
        </h2>
        {/* Horizontal scroll strip on every screen size (keeps the page from
            overflowing on desktop while staying touch-friendly on mobile). */}
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-4 md:gap-5">
          {photos.map((src, index) => {
            const rotation =
              index % 2 === 0 ? "md:-rotate-3" : "md:rotate-3";
            return (
              <button
                key={src}
                onClick={() => setSelectedImage(src)}
                className={`group relative shrink-0 snap-start ${rotation} transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600`}
                 aria-label={`${text.openPhoto} ${index + 1}`}
              >
                <Image
                  src={src}
                   alt={`${text.openPhoto} ${index + 1}`}
                  width={220}
                  height={220}
                  className="h-36 w-48 rounded-xl border border-gray-200 object-cover shadow-sm sm:h-44 sm:w-60 md:h-52 md:w-72 dark:border-gray-700"
                />
              </button>
            );
          })}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
             aria-label={text.closePhoto}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={selectedImage}
             alt={text.fullScreen}
            width={1000}
            height={750}
            className="max-h-[90vh] w-auto rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
