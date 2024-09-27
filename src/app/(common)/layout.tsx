"use client";

import { BottomNav, HeroCover } from "@/components";
import AudioProvider from "@/contexts/audioContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Homelayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  return (
    <>
      {searchParams?.size > 0 ? (
        <AudioProvider>
          <div className="relative max-w-[480px] mx-auto">
            <Suspense>
              <HeroCover />
              {children}
              <BottomNav />
            </Suspense>
          </div>
        </AudioProvider>
      ) : (
        <div className="relative max-w-[480px] mx-auto">
          <Suspense>
            <div className="flex flex-col items-center justify-center h-screen px-4">
              <h1 className="text-2xl font-bold text-center text-primary">
                Pilih Undangan Pernikahan untuk Suami atau Istri
              </h1>
              <div className="flex gap-4">
                <Link href="?p=husband">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Suami
                  </button>
                </Link>
                <Link href="?p=wife">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Istri
                  </button>
                </Link>
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Homelayout;
