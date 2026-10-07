"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { Locale } from "@/i18n";
import { getMessages } from "@/i18n/messages";

const WebGLArtwork = dynamic(() => import("./WebGLArtwork"), {
  ssr: false,
  loading: () => null,
});

export default function HeroExperience3D({ locale = "en" }: { locale?: Locale }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    setTilt({ x: pointerY * -0.12, y: pointerX * 0.16 });
  };

  return (
    <figure className="mx-auto w-full max-w-[10.5rem] sm:max-w-[12rem] lg:max-w-[23rem]">
      <div
        className="relative isolate aspect-[4/4.5] w-full"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <WebGLArtwork rotationX={tilt.x} rotationY={tilt.y} />

        <div
          className="absolute left-[15%] top-[11%] z-10 h-[78%] w-[70%] overflow-hidden rounded-[1.45rem] bg-gray-100 shadow-[0_18px_48px_rgba(25,42,68,0.18)] ring-1 ring-white/80 dark:bg-gray-800 dark:ring-white/20"
          style={{
            transform: `perspective(900px) rotateX(${tilt.x * 26}deg) rotateY(${tilt.y * 26}deg)`,
          }}
        >
          <Image
            src="/avatar.jpeg"
            alt={locale === "en" ? "Zainal Abidin in East Java, Indonesia" : locale === "id" ? "Zainal Abidin di Jawa Timur, Indonesia" : "Zainal Abidin ing Jawa Timur, Indonesia"}
            fill
            priority
            sizes="(max-width: 1023px) 160px, 280px"
            className="object-cover object-[center_30%]"
          />
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span>{getMessages(locale).home.portraitCaption}</span>
        <span className="font-mono tabular-nums">ID / 01</span>
      </figcaption>
    </figure>
  );
}
