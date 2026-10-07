import { ImageResponse } from "next/og";
import { SITE_URL } from "@/constants/site";

export const dynamic = "force-static";
export const alt = "Zainal Abidin — Technical Product Specialist";
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
          background: "#111c2b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, color: "#93c5fd", marginBottom: 16 }}>
          {`${new URL(SITE_URL).hostname} · @zaiinhs`}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          Zainal Abidin
        </div>
        <div style={{ fontSize: 44, color: "#cbd5e1", marginTop: 12 }}>
          Technical Product Specialist
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 28 }}>
          Product Delivery · Data Solutions · Client Implementation
        </div>
      </div>
    ),
    { ...size }
  );
}
