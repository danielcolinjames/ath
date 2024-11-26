import { NextRequest, NextResponse } from "next/server";
import { getAssetDetails } from "../../../lib/db";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const theme = searchParams.get("theme") || "dark";

  if (!symbol) {
    return new NextResponse("Symbol required", { status: 400 });
  }

  const assetData = await getAssetDetails(symbol);
  const asset = assetData?.assets[0];

  if (!asset) {
    return new NextResponse("Asset not found", { status: 404 });
  }

  const barColor = theme === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)";

  // Generate SVG with dynamic color based on asset performance
  const svg = `<svg width="100%" height="100%" viewBox="0 0 3200 3200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(2.4,0,0,2.4,211,-45518.5)">
      <g id="ath" transform="matrix(0.260417,0,0,0.462963,0,19050.6)">
        <g id="Logomark" transform="matrix(2.92328,0,0,2.92328,-3684.32,-2949.28)">
          <g transform="matrix(1.18054e-16,-1.08448,2.05793,7.08818e-17,226.624,4299.46)">
            <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${barColor}"/>
          </g>
          <g transform="matrix(8.78563e-17,-0.807076,2.05793,7.08818e-17,-298.812,3646.72)">
            <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${barColor}"/>
          </g>
          <g transform="matrix(5.75469e-17,-0.528644,2.05793,7.08818e-17,-824.249,2991.56)">
            <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${barColor}"/>
          </g>
          <g transform="matrix(-2.4111,-1.66092e-16,2.52024e-16,-1.15759,8247.31,2329.39)">
            <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${asset.accent}"/>
          </g>
        </g>
      </g>
    </g>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
