"use client";

import { useState } from "react";

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="mt-20 flex space-x-12 overflow-hidden">
        {[
          "/images/photo-1.png",
          "/images/photo-2.JPG",
          "/images/photo-3.JPG",
          "/images/photo-4.jpeg",
          "/images/photo-5.jpeg",
        ].map((src, index) => {
          const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`;
          const rotation = index % 2 === 0 ? "rotate(-5deg)" : "rotate(5deg)";
          return (
            <img
              key={index}
              src={src}
              alt={`Description ${index + 1}`}
              style={{
                backgroundColor: randomColor,
                transform: rotation,
                objectFit: "cover",
              }}
              className="w-60 h-60 rounded-lg moving-image"
              onClick={() => openImage(src)}
            />
          );
        })}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          onClick={closeImage}
        >
          <img
            src={selectedImage}
            alt="Full screen"
            className="max-w-full max-h-[90vh]"
          />
        </div>
      )}
    </>
  );
}
