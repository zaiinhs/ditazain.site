"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X } from "lucide-react";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: Locale;
}

type Update = {
  date: string;
  title: string;
  tag?: string;
  items: string[];
};

const updates: Update[] = [
  {
    date: "7 Oct 2026",
    title: "WebGL portrait scene",
    tag: "Latest",
    items: [
      "A procedural 3D orbit now frames the existing profile photo, representing work across product, data, and implementation.",
      "The scene loads as a client-only bundle, reacts to pointer movement, and renders on demand; the portrait remains visible without WebGL.",
    ],
  },
  {
    date: "1 Sep 2026",
    title: "UX improvements — motion, filters & reading tools",
    items: [
      "Hero animation highlights the current Technical Product Specialist role alongside software and data engineering experience.",
      "Reading Progress Bar tracks how far you have read on article pages.",
      "A scroll-to-top button appears after you scroll down the page.",
      "Article tags can filter the list by topic.",
      "Release notes are available in docs/CHANGELOG.md.",
    ],
  },
  {
    date: "1 Jun 2026",
    title: "Profile refresh — product delivery, data & implementation",
    items: [
      "Updated the profile around the current Technical Product Specialist role at Indivara Group, connecting product delivery, data solutions, and client implementation.",
      "The /data page presents illustrative SQL/Python examples, a representative workflow, and a data transformation case study.",
      "Updated work history: Technical Product Specialist at Indivara Group since January 2026 and Delman from September 2024 to December 2025.",
      "Upgraded to Next.js 16, React 19, Tailwind CSS v4 and ESLint 9.",
      "Refined the sticky navigation, role-led hero, cards and mobile-friendly gallery.",
      "Improved dark-mode startup and fixed Latest Articles in the static export.",
      "Added desktop and mobile Playwright end-to-end tests.",
    ],
  },
  {
    date: "Jan 2024",
    title: "Website launched",
    items: [
      "The first version launched with Next.js, TypeScript and Tailwind CSS, including Home, About, Articles (MDX), Projects, Reading List and Uses.",
    ],
  },
];

const translatedUpdates: Record<Exclude<Locale, "en">, Pick<Update, "title" | "items">[]> = {
  id: [
    { title: "Potret dengan scene WebGL", items: ["Orbit 3D prosedural mengelilingi foto profil asli, mewakili pekerjaan di produk, data, dan implementasi.", "Scene dimuat khusus di browser, merespons gerakan pointer, dan hanya dirender saat diperlukan; foto tetap terlihat tanpa WebGL."] },
    { title: "Peningkatan UX — animasi, filter, dan alat baca", items: ["Animasi hero menonjolkan peran Technical Product Specialist serta pengalaman software dan data engineering.", "Reading Progress Bar menunjukkan kemajuan membaca artikel.", "Tombol kembali ke atas muncul setelah halaman digulir.", "Filter tag interaktif membantu menyaring artikel menurut topik.", "Catatan perubahan tersedia di docs/CHANGELOG.md."] },
    { title: "Pembaruan profil — produk, data, dan implementasi", items: ["Profil diperbarui sesuai peran Technical Product Specialist di Indivara Group, menghubungkan pengiriman produk, solusi data, dan implementasi klien.", "Halaman Data menampilkan contoh SQL/Python ilustratif, alur kerja representatif, dan contoh transformasi data.", "Riwayat kerja diperbarui: Indivara sejak Januari 2026 dan Delman September 2024–Desember 2025.", "Stack diperbarui ke Next.js 16, React 19, Tailwind CSS v4, dan ESLint 9.", "Tampilan diperbarui dengan navbar sticky, hero baru, kartu rapi, dan galeri yang nyaman di mobile.", "Mode gelap tanpa kilatan dan perbaikan Latest Articles di static export.", "Test E2E Playwright ditambahkan untuk desktop dan mobile."] },
    { title: "Situs diluncurkan", items: ["Rilis pertama situs pribadi dengan Next.js, TypeScript, dan Tailwind CSS: beranda, Tentang, Artikel (MDX), Proyek, Daftar Bacaan, dan Peralatan."] },
  ],
  jv: [
    { title: "Foto profil nganggo scene WebGL", items: ["Orbit 3D prosedural ngubengi foto profil asli, nggambarake pekerjaan ing produk, data, lan implementasi.", "Scene dimuat ing browser, nanggapi gerakan pointer, lan mung dirender yen dibutuhake; foto tetep katon tanpa WebGL."] },
    { title: "Perbaikan UX — animasi, filter, lan piranti maca", items: ["Animasi hero nuduhake peran Technical Product Specialist lan pengalaman software lan data engineering.", "Reading Progress Bar nuduhake sepira adoh artikel wis diwaca.", "Tombol bali menyang ndhuwur katon sawisé kaca digeser.", "Filter tag interaktif mbantu nyaring artikel miturut topik.", "Cathetan owah-owahan ana ing docs/CHANGELOG.md."] },
    { title: "Profil anyar — produk, data, lan implementasi", items: ["Profil dianyari miturut peran Technical Product Specialist ing Indivara Group, nyambungake pangiriman produk, solusi data, lan implementasi klien.", "Kaca Data nduwe tuladha SQL/Python ilustratif, alur kerja, lan tuladha transformasi data.", "Riwayat kerja dianyari: Indivara wiwit Januari 2026 lan Delman September 2024–Desember 2025.", "Stack dianyari dadi Next.js 16, React 19, Tailwind CSS v4, lan ESLint 9.", "Tampilan dianyari nganggo navbar sticky, hero anyar, kartu luwih rapi, lan galeri sing penak ing mobile.", "Mode peteng tanpa kilatan lan perbaikan Latest Articles ing static export.", "Test E2E Playwright ditambahake kanggo desktop lan mobile."] },
    { title: "Situs diluncurake", items: ["Rilis pisanan situs pribadi nganggo Next.js, TypeScript, lan Tailwind CSS: kaca ngarep, Babagan, Artikel (MDX), Proyek, Wacan, lan Piranti."] },
  ],
};

export default function WhatsNewModal({ isOpen, onClose, locale = "en" }: WhatsNewModalProps) {
  const text = getMessages(locale).ui;
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  // Portal to <body> so the overlay isn't trapped by the navbar's
  // backdrop-filter containing block (which would break `fixed` positioning).
  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whats-new-title"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-white/20 p-2 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2 id="whats-new-title" className="text-lg font-semibold">
                 {text.whatsNew}
              </h2>
              <p className="mt-0.5 text-sm text-blue-100">
                 {text.updatesIntro}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
             aria-label={text.close}
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="overflow-y-auto p-5">
          <ol className="relative space-y-7 border-l border-gray-200 pl-6 dark:border-gray-700">
             {updates.map((update, updateIndex) => (
              <li key={update.date} className="relative">
                <span className="absolute -left-[31px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-blue-500 dark:border-gray-900" />
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                     {locale === "en" ? update.title : translatedUpdates[locale][updateIndex].title}
                  </h3>
                  {update.tag && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                       {text.latest}
                    </span>
                  )}
                </div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                   {locale === "en" ? update.date : update.date.replace("Oct", "Okt")}
                </p>
                <ul className="space-y-2">
                   {(locale === "en" ? update.items : translatedUpdates[locale][updateIndex].items).map((item, index) => (
                    <li
                      key={`${update.date}-${index}`}
                      className="flex gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>,
    document.body
  );
}
