import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.NODE_ENV === "production" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.toUpperCase();
  const ath = searchParams.get("ath");
  const accent = searchParams.get("accent");
  const logo = searchParams.get("logo");

  // Load font
  const satoshiBold = fetch(
    new URL("../../../assets/fonts/Satoshi-Black.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  // Attempt to load the logo image, with fallback
  let logoImg;
  if (logo) {
    try {
      const response = await fetch(logo);
      if (response.ok) {
        logoImg = logo;
      } else {
        console.warn(
          `Failed to load logo from ${logo}, status: ${response.status}`,
        );
        logoImg = null;
      }
    } catch (error) {
      console.error(`Error loading logo from ${logo}:`, error);
      logoImg = null;
    }
  }

  // Format number to handle small decimals
  const athValue = Number(ath || 0);
  let athString = athValue.toString();

  // If it's a small number, use scientific notation for display
  if (athValue < 0.001) {
    athString = athValue.toFixed(8);
  } else if (athValue < 1) {
    athString = athValue.toFixed(6);
  } else {
    athString = athValue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Calculate font size based on number length
  const fontSize = Math.min(180, 1200 / athString.length);

  // Ensure we have a good accent color
  const accentColor = accent && accent !== "#555" ? accent : "#00FFBA";

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
            radial-gradient(circle at 0% 0%, ${accentColor}11 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, ${accentColor}11 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, ${accentColor}11 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, ${accentColor}11 0%, transparent 50%),
            linear-gradient(45deg, transparent 0%, ${accentColor}05 25%, transparent 50%),
            linear-gradient(-45deg, transparent 0%, ${accentColor}05 25%, transparent 50%)
          `,
          boxShadow: `0 0 150px ${accentColor}11 inset`,
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
          <AthLogo accent={accentColor} />
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
          {logoImg && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "40px",
                background: "rgba(255,255,255,0.05)",
                boxShadow: `0 0 30px ${accentColor}22`,
                padding: "4px",
              }}
            >
              <img
                src={logoImg}
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
            border: `3px solid ${accentColor}`,
            borderRadius: "20px",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(40px)",
            boxShadow: `
              0 0 30px ${accentColor}22,
              0 0 100px ${accentColor}11 inset
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
              color: accentColor,
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
