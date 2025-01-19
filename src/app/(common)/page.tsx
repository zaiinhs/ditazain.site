"use client";

import { Navbar, PhotoGallery, Socmed } from "@/components";
import { DESCRIPTION, TITLE } from "@/constants/content";

export default function HomePage() {
  return (
    <div className="text-black h-screen flex flex-col items-center  mt-5">
      <Navbar />
      <div className="flex flex-col mt-20 max-w-screen-md w-full mx-auto">
        <img src="/logo.webp" alt="Logo" className="w-16 h-16 mb-4" />
        <h1 className="text-5xl font-bold mb-2 dark:text-white">{TITLE}</h1>
        <p className="text-lg mb-6 dark:text-white">{DESCRIPTION}</p>
        <Socmed />
      </div>

      {/* Photo Gallery */}
      {/* <style jsx>{`
        @keyframes moveLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .moving-image {
          animation: moveLeft 10s linear infinite;
        }
      `}</style> */}

      <PhotoGallery />
    </div>
  );
}
