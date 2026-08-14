import { ImageResponse } from "next/og";

export const alt = "Josua Uuyuni · Software Developer & AI Enthusiast · Windhoek, Namibia";
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
          backgroundColor: "#f3eddc",
          color: "#191612",
          padding: "0 96px",
        }}
      >
        {/* masthead rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6b6150",
          }}
        >
          Windhoek · Namibia
        </div>
        <div
          style={{
            width: 96,
            height: 6,
            margin: "28px 0 40px",
            backgroundColor: "#0b5d3b",
          }}
        />
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 128,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          JOSUA
        </div>
        <div style={{ fontSize: 42, marginTop: 32, fontWeight: 500 }}>
          Software Developer &amp; AI Enthusiast
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            color: "#0b5d3b",
            fontWeight: 700,
          }}
        >
          Building for the Namibian market
        </div>
      </div>
    ),
    { ...size }
  );
}