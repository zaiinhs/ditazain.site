import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Zainal Abidin — Software & Data Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #030712 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, color: "#93c5fd", marginBottom: 16 }}>
          zainal-abidin.my.id · @zaiinhs
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          Zainal Abidin
        </div>
        <div style={{ fontSize: 44, color: "#cbd5e1", marginTop: 12 }}>
          Software &amp; Data Engineer
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 28 }}>
          SQL · Python · Data Pipelines · React · Next.js
        </div>
      </div>
    ),
    { ...size }
  );
}
