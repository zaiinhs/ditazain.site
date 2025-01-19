import type { Metadata } from "next";
// import { Dancing_Script, Josefin_Sans } from "next/font/google";
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
  title: "Zainal.io",
  description: "Personal Website Zainal Abidin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
