"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const photos = [
  "/images/photo-1.png",
  "/images/photo-2.JPG",
  "/images/photo-3.JPG",
  "/images/photo-4.jpeg",
  "/images/photo-5.jpeg",
];

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-20 w-full max-w-screen-md">
        <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Moments
        </h2>
        {/* Horizontal scroll strip on every screen size (keeps the page from
            overflowing on desktop while staying touch-friendly on mobile). */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:gap-8">
          {photos.map((src, index) => {
            const rotation =
              index % 2 === 0 ? "md:-rotate-3" : "md:rotate-3";
            return (
              <button
                key={src}
                onClick={() => setSelectedImage(src)}
                className={`group relative shrink-0 ${rotation} transition-transform duration-300 hover:rotate-0 hover:scale-105`}
                aria-label={`Open photo ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`Photo ${index + 1}`}
                  width={220}
                  height={220}
                  className="h-40 w-40 rounded-2xl border-2 border-white object-cover shadow-md md:h-56 md:w-56 dark:border-gray-800"
                />
              </button>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            aria-label="Close photo"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={selectedImage}
            alt="Full screen"
            width={1000}
            height={750}
            className="max-h-[90vh] w-auto rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
