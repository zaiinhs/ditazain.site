import type { Metadata } from "next";
// import { Dancing_Script, Josefin_Sans } from "next/font/google";
import AIChatWidget from "@/components/AIChatWidget";
import JsonLd from "@/components/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import DocumentLanguage from "@/components/DocumentLanguage";
import { AUTHOR, DEFAULT_OG_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";
import { languageAlternates } from "@/i18n";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zainal Abidin (zaiinhs) — Technical Product Specialist",
    template: "%s | Zainal Abidin",
  },
  description:
    "Zainal Abidin (zaiinhs) is a Technical Product Specialist at Indivara Group, connecting product delivery, data solutions and enterprise implementation.",
  keywords: [
    "Zainal Abidin",
    "zaiinhs",
    "Technical Product Specialist",
    "Product delivery",
    "Data solutions",
    "Enterprise implementation",
    "SQL",
    "Python",
    "ETL",
    "data pipeline",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
  openGraph: {
    title: "Zainal Abidin (zaiinhs) — Technical Product Specialist",
    description: DEFAULT_OG_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zainal Abidin (zaiinhs) — Technical Product Specialist",
    description: DEFAULT_OG_DESCRIPTION,
    creator: "@zaiinhs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // TODO: paste the token from Google Search Console → Settings → Ownership verification
  // verification: { google: "your-google-site-verification-token" },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
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
            __html: `(function(){var p=location.pathname;document.documentElement.lang=p==='/id'||p.startsWith('/id/')?'id':p==='/jv'||p.startsWith('/jv/')?'jv':'en';try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: AUTHOR.name,
            url: SITE_URL,
            image: `${SITE_URL}/avatar.jpeg`,
            jobTitle: AUTHOR.jobTitle,
            email: `mailto:${AUTHOR.email}`,
            worksFor: { "@type": "Organization", name: "Indivara Group" },
            address: {
              "@type": "PostalAddress",
              addressCountry: "ID",
            },
            sameAs: AUTHOR.sameAs,
            knowsAbout: [
              "Technical Product Management",
              "Enterprise Product Delivery",
              "Client Implementation",
              "Data Solutions",
              "Data Engineering",
              "Software Engineering",
              "SQL",
              "Python",
              "ETL",
              "React",
              "Next.js",
            ],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          }}
        />
        {children}
        <DocumentLanguage />
        <ScrollToTop />
        <AIChatWidget />
      </body>
    </html>
  );
}
