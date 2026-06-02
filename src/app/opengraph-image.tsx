import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

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
          padding: "70px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0ea5e9 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>UF Calculator Chile</div>
        <div style={{ marginTop: 20, fontSize: 36, fontWeight: 500 }}>
          Real-time UF ↔ CLP converter with reliable public data.
        </div>
      </div>
    ),
    size,
  );
}
