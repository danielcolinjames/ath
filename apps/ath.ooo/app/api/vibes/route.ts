import { NextRequest, NextResponse } from "next/server";
import { getImg } from "../../../lib/colors";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("image");
  const asset = searchParams.get("asset");

  if (imageUrl) {
    const colors = await getImg(imageUrl);
    return NextResponse.json(colors);
  }

  if (asset) {
    try {
      const assetRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset}`,
      );
      const [{ image: derivedImageUrl }] = await assetRes.json();
      const derivedColors = await getImg(derivedImageUrl);
      return NextResponse.json(derivedColors);
    } catch (e) {
      return NextResponse.json(
        {
          error: `Asset not found. Try the full unique asset name, e.g. 'Bitcoin' instead of 'BTC'.`,
        },
        { status: 404 },
      );
    }
  }

  return NextResponse.json(
    { error: "No image or asset provided" },
    { status: 404 },
  );
}
