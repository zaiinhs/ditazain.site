"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X } from "lucide-react";

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Update = {
  date: string;
  title: string;
  tag?: string;
  items: string[];
};

const updates: Update[] = [
  {
    date: "1 Jun 2026",
    title: "Major overhaul — fokus Data Engineering",
    tag: "Latest",
    items: [
      "Reposisi seluruh situs sebagai Software Engineer & Data Engineer, dengan fokus utama ke Data Engineering (SQL, Python, transform data).",
      "Halaman baru /data: showcase Data Engineering berisi contoh query SQL, snippet Python ETL, diagram pipeline (Mermaid), dan studi kasus transformasi data.",
      "Update pengalaman kerja: Technical Product Specialist di Indivara Group (sejak Jan 2026); peran di Delman dikoreksi menjadi Sept 2024 – Des 2025.",
      "Upgrade seluruh stack ke versi terbaru: Next.js 16, React 19, Tailwind CSS v4, dan ESLint 9.",
      "Tampilan dirombak: navbar sticky modern, hero dengan badge peran, kartu yang lebih rapi, dan galeri foto yang ramah mobile.",
      "Dark mode tanpa flash + perbaikan bug: section Latest Articles kini muncul di static export.",
      "Tambah Playwright end-to-end test untuk semua halaman (desktop & mobile).",
    ],
  },
  {
    date: "Jan 2024",
    title: "Website diluncurkan",
    items: [
      "Rilis pertama personal website dengan Next.js, TypeScript, dan Tailwind CSS — homepage, About, Articles (MDX), Projects, Reading List, dan Uses.",
    ],
  },
];

export default function WhatsNewModal({ isOpen, onClose }: WhatsNewModalProps) {
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
                What&apos;s New?
              </h2>
              <p className="mt-0.5 text-sm text-blue-100">
                Catatan rilis &amp; perubahan terbaru dari website ini.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Timeline */}
        <div className="overflow-y-auto p-5">
          <ol className="relative space-y-7 border-l border-gray-200 pl-6 dark:border-gray-700">
            {updates.map((update) => (
              <li key={update.date} className="relative">
                <span className="absolute -left-[31px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-blue-500 dark:border-gray-900" />
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {update.title}
                  </h3>
                  {update.tag && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                      {update.tag}
                    </span>
                  )}
                </div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {update.date}
                </p>
                <ul className="space-y-2">
                  {update.items.map((item, index) => (
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
