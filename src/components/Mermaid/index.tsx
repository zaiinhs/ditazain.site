"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !chart) return;

    let cancelled = false;
    const renderChart = async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        if (cancelled) return;
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        const isDark = document.documentElement.classList.contains("dark");

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
        });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(svg);
      } catch (error) {
        if (!cancelled) console.error("Mermaid rendering error:", error);
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      void renderChart();
      return () => { cancelled = true; };
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      void renderChart();
    }, { rootMargin: "360px" });
    observer.observe(container);
    return () => { cancelled = true; observer.disconnect(); };
  }, [chart]);

  return (
    <div ref={containerRef} data-mermaid className="my-6 flex justify-center overflow-x-auto">
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="h-48 w-full max-w-md animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  );
}
