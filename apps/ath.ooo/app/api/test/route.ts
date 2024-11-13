import { NextRequest } from "next/server";
import { getMarketData } from "../../../lib/coingecko/data";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isLocalhost = request.headers.get('host')?.includes('localhost') || request.headers.get('host')?.includes('127.0.0.1');

  if (!isLocalhost && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const marketData = await getMarketData(["bitcoin", "helium", "ethereum"]);
    console.log(marketData)
    // return Response.json({ success: true, message: 'Fetched successfully', marketData });
  } catch (error) {
    console.error('Error updating crypto assets:', error);
    return Response.json({ success: false, message: 'Error fetching market data' }, { status: 500 });
  }
}
