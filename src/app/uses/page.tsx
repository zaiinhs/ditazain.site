"use client";

import { Footer, Navbar, Uses } from "@/components";

export default function UsesPage() {
  return (
    <div className="text-black min-h-screen flex flex-col items-center mt-5">
      <Navbar />
      <main className="flex flex-col mt-20 max-w-screen-md w-full mx-auto px-4">
        <Uses />
      </main>
      <Footer />
    </div>
  );
}
