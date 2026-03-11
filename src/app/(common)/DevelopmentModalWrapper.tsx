"use client";

import { useEffect, useState } from "react";
import DevelopmentModal from "@/components/DevelopmentModal";

export default function DevelopmentModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DevelopmentModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
