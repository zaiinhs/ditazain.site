import type { Metadata } from "next";
// import { Dancing_Script, Josefin_Sans } from "next/font/google";
import AIChatWidget from "@/components/AIChatWidget";
import "./globals.css";

// const josefinSans = Josefin_Sans({
//   subsets: ["latin"],
//   variable: "--font-josefin-sans",
//   display: "swap",
// });

// const dancingScript = Dancing_Script({
//   subsets: ["latin"],
//   variable: "--font-dancing-script",
//   display: "swap",
//   weight: ["400"],
// });

export const metadata: Metadata = {
  title: "Zainal | @zaiinhs",
  description: "Personal website of Zainal Abidin - Developer, writer, and creator. Explore my projects, articles, and thoughts on technology.",
  keywords: ["Zainal Abidin", "zaiinhs", "developer", "portfolio", "personal website", "tech blog"],
  authors: [{ name: "Zainal Abidin" }],
  openGraph: {
    title: "Zainal | @zaiinhs",
    description: "Personal website of Zainal Abidin - Developer, writer, and creator.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zainal | @zaiinhs",
    description: "Personal website of Zainal Abidin - Developer, writer, and creator.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 px-4 md:px-0">
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
