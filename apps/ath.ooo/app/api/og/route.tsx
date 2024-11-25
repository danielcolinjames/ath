import { ImageResponse } from "next/og";
import { loadLocalFont } from "./fonts";

export const runtime = "edge";

// ATH Logo SVG
const AthLogo = ({ accent }: { accent: string }) => (
  <svg width="80" height="80" viewBox="0 0 2778 2778" fill="none">
    <g transform="matrix(2.4,0,0,2.4,111,-45518.5)">
      <g transform="matrix(0.260417,0,0,0.462963,0,19050.6)">
        <g transform="matrix(2.92328,0,0,2.92328,-3684.32,-2949.28)">
          <g transform="matrix(1.18054e-16,-1.08448,2.05793,7.08818e-17,226.624,4299.46)">
            <rect
              x="2353.03"
              y="1012.95"
              width="544.81"
              height="127.661"
              fill="white"
            />
          </g>
          <g transform="matrix(8.78563e-17,-0.807076,2.05793,7.08818e-17,-298.812,3646.72)">
            <rect
              x="2353.03"
              y="1012.95"
              width="544.81"
              height="127.661"
              fill="white"
            />
          </g>
          <g transform="matrix(5.75469e-17,-0.528644,2.05793,7.08818e-17,-824.249,2991.56)">
            <rect
              x="2353.03"
              y="1012.95"
              width="544.81"
              height="127.661"
              fill="white"
            />
          </g>
          <g transform="matrix(-2.4111,-1.66092e-16,2.52024e-16,-1.15759,8247.31,2329.39)">
            <rect
              x="2353.03"
              y="1012.95"
              width="544.81"
              height="127.661"
              fill={accent}
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.toUpperCase();
  const ath = searchParams.get("ath");
  const accent = searchParams.get("accent") || "#00FFBA";
  const logo = searchParams.get("logo");

  console.log("OG Image params:", { symbol, ath, accent, logo });

  // Load font
  const satoshiBold = fetch(
    new URL("../../../assets/fonts/Satoshi-Black.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  // Calculate font size based on number length
  const athValue = Number(ath || 0);
  const athString = athValue.toLocaleString();
  const fontSize = Math.min(180, 1800 / athString.length);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          background: "black",
          fontFamily: "Satoshi",
          padding: "40px",
          backgroundImage: `
            radial-gradient(circle at 0% 0%, ${accent}11 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, ${accent}11 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, ${accent}11 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, ${accent}11 0%, transparent 50%),
            linear-gradient(45deg, transparent 0%, ${accent}05 25%, transparent 50%),
            linear-gradient(-45deg, transparent 0%, ${accent}05 25%, transparent 50%)
          `,
          boxShadow: `0 0 150px ${accent}11 inset`,
        }}
      >
        {/* ATH Logo */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "40px",
            right: "40px",
            opacity: 0.8,
          }}
        >
          <AthLogo accent={accent} />
        </div>

        {/* Asset Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "60px",
          }}
        >
          {logo && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "40px",
                background: "rgba(255,255,255,0.05)",
                boxShadow: `0 0 30px ${accent}22`,
                padding: "4px",
              }}
            >
              <img
                src={logo}
                width="80"
                height="80"
                style={{
                  borderRadius: "40px",
                }}
              />
            </div>
          )}
          <div
            style={{
              fontSize: 96,
              color: "white",
              lineHeight: 1,
            }}
          >
            {symbol}
          </div>
        </div>

        {/* ATH Value Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "40px 64px",
            border: `3px solid ${accent}`,
            borderRadius: "20px",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(40px)",
            boxShadow: `
              0 0 30px ${accent}22,
              0 0 100px ${accent}11 inset
            `,
          }}
        >
          <div
            style={{
              fontSize: 42,
              color: "white",
              opacity: 0.9,
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            ALL-TIME HIGH
          </div>

          <div
            style={{
              display: "flex",
              fontSize: fontSize,
              color: accent,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            ${athString}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(satoshiBold && {
        fonts: [
          {
            name: "Satoshi",
            data: await satoshiBold,
            style: "normal",
            weight: 700,
          },
        ],
      }),
    },
  );
}
