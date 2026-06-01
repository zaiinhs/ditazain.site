import { Footer, Navbar, Readlist } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading List",
  description: "Books and resources that shaped how Zainal Abidin builds.",
  alternates: { canonical: "/readlist" },
  openGraph: {
    title: "Reading List | Zainal Abidin",
    description: "Books and resources that shaped how Zainal Abidin builds.",
    type: "website",
    url: "/readlist",
  },
};

export default function ReadlistPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-screen-md">
        <Navbar />
      </div>
      <main className="mt-16 flex w-full max-w-screen-md flex-col">
        <Readlist />
      </main>
      <Footer />
    </div>
  );
}
