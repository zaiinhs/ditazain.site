"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { getMessages } from "@/i18n/messages";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const locale = pathname.startsWith("/id/") || pathname === "/id" ? "id" : pathname.startsWith("/jv/") || pathname === "/jv" ? "jv" : "en";

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-4 z-50 rounded-full border border-gray-200 bg-white/90 p-2.5 shadow-md backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900/90 sm:bottom-28 sm:right-6"
       aria-label={getMessages(locale).ui.scrollTop}
    >
      <ArrowUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    </button>
  );
}
