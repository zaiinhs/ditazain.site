"use client";

import { useEffect, useState } from "react";

interface TypewriterRoleProps {
  roles: string[];
  className?: string;
}

export default function TypewriterRole({
  roles,
  className = "",
}: TypewriterRoleProps) {
  const initialRole = roles[0] ?? "";
  const [displayText, setDisplayText] = useState(initialRole);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(initialRole.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (roles.length === 0 || prefersReducedMotion) return;

    const currentRole = roles[roleIndex];

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting) {
      // Typing
      if (charIndex < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Done typing — pause before deleting
        const timeout = setTimeout(() => setIsPaused(true), 0);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, 45);
        return () => clearTimeout(timeout);
      } else {
        // Done deleting — move to next role
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }, 0);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isDeleting, isPaused, prefersReducedMotion, roleIndex, roles]);

  return (
    <span className={className}>
      {displayText}
      {!prefersReducedMotion && (
        <span aria-hidden="true" className="motion-safe:animate-pulse">
          |
        </span>
      )}
    </span>
  );
}
