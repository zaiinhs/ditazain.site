"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedImage) {
      setLoading(true);
    }
  }, [selectedImage]);

  const openImage = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div className="mt-20 hidden md:flex space-x-12 h-60">
        {[
          "/images/photo-1.png",
          "/images/photo-2.JPG",
          "/images/photo-3.JPG",
          "/images/photo-4.jpeg",
          "/images/photo-5.jpeg",
        ].map((src) => {
          const rotation =
            src.includes("photo-2") || src.includes("photo-4")
              ? "rotate(3deg)"
              : "rotate(-3deg)";
          return (
            <Image
              key={src}
              src={src}
              alt={`Photo ${src.split("/").pop()?.split(".")[0]}`}
              style={{
                transform: rotation,
                objectFit: "cover",
                border: "2px solid white",
                transition: "transform 0.3s ease-in-out",
                marginTop: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              width={250}
              height={250}
              className="rounded-lg"
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
          {loading && <div className="loader">Loading...</div>}
          <Image
            src={selectedImage}
            alt="Full screen"
            className="max-w-full max-h-[90vh]"
            layout="intrinsic"
            width={800}
            height={600}
            onLoad={handleImageLoad}
          />
        </div>
      )}
    </>
  );
}
