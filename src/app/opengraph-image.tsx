import { ImageResponse } from "next/og";

export const alt = "Kartheek";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F4ECDD",
          color: "#15120E",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top Header metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: "20px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#6F675B",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#EB5A1F",
              }}
            />
            <span>KARTHEEK</span>
          </div>
          <span>2026</span>
        </div>

        {/* Central Display Typography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1
            style={{
              fontSize: "108px",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#15120E",
            }}
          >
            Kartheek
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontStyle: "italic",
              color: "#6F675B",
              margin: 0,
              maxWidth: "960px",
              lineHeight: 1.35,
            }}
          >
            [HERO STATEMENT]
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #D9CFBB",
            paddingTop: "28px",
            fontSize: "18px",
            fontFamily: "sans-serif",
            color: "#6F675B",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          <span>WORK · ABOUT · SKILLS · EXPERIENCE · LENS</span>
          <span style={{ color: "#EB5A1F" }}>KARTHEEK.DEV</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
