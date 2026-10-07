"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname === "/id" || pathname.startsWith("/id/")
      ? "id"
      : pathname === "/jv" || pathname.startsWith("/jv/")
        ? "jv"
        : "en";
  }, [pathname]);

  return null;
}
