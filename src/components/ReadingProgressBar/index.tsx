"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n";

const labels: Record<Locale, string> = {
  en: "Reading progress",
  id: "Kemajuan membaca",
  jv: "Sepira adoh wis maca",
};

export default function ReadingProgressBar({ locale = "en" }: { locale?: Locale }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-75"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label={labels[locale]}
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
