import { ImageResponse } from "next/og";

export const alt = "Nebiyou Daniel — Backend Engineer & AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 55%, #0a0a0a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#262626",
            }}
          />
          <div style={{ fontSize: 24, color: "#a3a3a3", fontWeight: 600 }}>
            Backend Engineer &amp; AI Developer — Addis Ababa
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: "-2px" }}>
          Nebiyou Daniel
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "rgba(255,255,255,0.7)", marginTop: 24 }}>
          &gt; Learn More. Build Better.
        </div>
      </div>
    ),
    size
  );
}
