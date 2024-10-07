"use client";

import { BottomNav, HeroCover } from "@/components";
import { photoGallery } from "@/constants/gallery";
import AudioProvider from "@/contexts/audioContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

const Homelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <LayoutPage>{children}</LayoutPage>
    </Suspense>
  );
};

export default Homelayout;

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  const randomImage =
    photoGallery[Math.floor(Math.random() * photoGallery.length)];

  return (
    <>
      {searchParams?.size > 0 ? (
        <AudioProvider>
          <div className="relative max-w-[480px] mx-auto">
            <HeroCover />
            {children}
            <BottomNav />
          </div>
        </AudioProvider>
      ) : (
        <div className="relative h-screen">
          <Image
            src={randomImage.photo}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="relative h-full flex items-center justify-center">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-center mb-6">
                Pilih Undangan Pernikahan untuk Suami atau Istri
              </h1>
              <div className="flex justify-center gap-4">
                <Link href="?p=husband">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300">
                    Suami
                  </button>
                </Link>
                <Link href="?p=wife">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition duration-300">
                    Istri
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
