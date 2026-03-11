"use client";

import { Footer, Navbar, PhotoGallery, Socmed } from "@/components";
import { DESCRIPTION, TITLE } from "@/constants/content";
import Image from "next/image";
import Link from "next/link";
import DevelopmentModalWrapper from "./DevelopmentModalWrapper";
import { FileText, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const Articles = dynamic(() => import("@/components/Articles"), { ssr: false });

const CV_LINK = "/cv.pdf";

export default function HomePage() {
  const [showCV, setShowCV] = useState(false);

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
        
        <button
          onClick={() => setShowCV(true)}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors w-fit"
        >
          <FileText className="w-5 h-5" />
          View Resume
        </button>
      </div>

      {showCV && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-4xl h-[80vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setShowCV(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={CV_LINK}
              className="w-full h-full"
              title="Resume Preview"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}

      <PhotoGallery />
      <Articles />
      <Footer />

      <DevelopmentModalWrapper />
    </div>
  );
}
