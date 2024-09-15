import type { Metadata } from "next";
import { Dancing_Script, Josefin_Sans } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Zainal & Dita",
  description: "Wedding invitation of Zainal & Dita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} ${dancingScript.variable} bg-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
