import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";



function cleanText(value: string | null, fallback: string, maximumLength: number) {
  const cleaned = (value || fallback).replace(/\s+/g, " ").trim();
  return cleaned.slice(0, maximumLength) || fallback;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = cleanText(
    searchParams.get("title"),
    "Safan | Full-Stack Developer",
    90,
  );

  const type = cleanText(searchParams.get("type"), "Portfolio", 48);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "76px 80px",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#080a0d",
          color: "#f4f6f8",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "44px",
              height: "44px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "13px",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            S
          </div>

          <div
            style={{
              color: "#949ca7",
              fontSize: "25px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {type}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: "1000px",
            marginTop: "56px",
            color: "#f4f6f8",
            fontSize: title.length > 55 ? "68px" : "82px",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "auto",
            paddingTop: "26px",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.1)",
            color: "#d6dae0",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          <span>Safan Portfolio</span>
          <span style={{ color: "#68717d" }}>Full-Stack Developer</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
