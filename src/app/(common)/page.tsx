"use client";

import { Articles, Footer, Navbar, PhotoGallery, Socmed } from "@/components";
import { DESCRIPTION, TITLE } from "@/constants/content";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-black min-h-screen flex flex-col items-center mt-5">
      <Navbar />
      <div className="flex flex-col mt-20 max-w-screen-md w-full mx-auto">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={64}
            height={64}
            className="mb-4"
          />
        </Link>
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
      <Articles />
      <Footer />
    </div>
  );
}
