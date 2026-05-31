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
  title: "Zainal Abidin | Software & Data Engineer",
  description:
    "Personal website of Zainal Abidin — Software Engineer & Data Engineer from Indonesia. SQL, Python, and data pipelines, plus web products with React & Next.js.",
  keywords: [
    "Zainal Abidin",
    "zaiinhs",
    "Data Engineer",
    "Software Engineer",
    "SQL",
    "Python",
    "ETL",
    "data pipeline",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Zainal Abidin" }],
  openGraph: {
    title: "Zainal Abidin | Software & Data Engineer",
    description:
      "Software Engineer & Data Engineer from Indonesia. SQL, Python, data pipelines, and modern web products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zainal Abidin | Software & Data Engineer",
    description:
      "Software Engineer & Data Engineer from Indonesia. SQL, Python, and data pipelines.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
