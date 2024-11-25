import Image from "next/image";
import { createClient } from "../lib/supabase/server";
import athLogoWithoutBar from "../public/images/ath-logo-without-bar.svg";
import athSquareWithoutBar from "../public/images/ath-square-without-bar.svg";
import { differenceInMinutes, parseISO } from "date-fns";
import { AssetCard } from "../components/AssetCard";

function Bar({ color }: { color: string }) {
  return (
    <svg
      width="auto"
      height="auto"
      viewBox="0 0 250 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_44_32)">
        <path
          d="M73.9741 22.4507L186.285 22.4507V-8.2016e-05L73.9741 -8.2016e-05V22.4507Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_44_32">
          <rect width="250" height="159.77" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

async function getRecentATHs() {
  const supabase = createClient();
  const { data } = await supabase
    .from("asset_details")
    .select("*")
    .order("ath_date", { ascending: false })
    .limit(1000);

  // Filter and sort ATHs
  const recentATHs =
    data
      ?.filter((asset) => {
        const athDate = parseISO(asset.ath_date);
        const recencyInMinutes = Math.abs(
          differenceInMinutes(athDate, new Date()),
        );
        return recencyInMinutes <= 1440;
      })
      .sort((a, b) => {
        // Sort purely by recency (most recent first)
        const aDate = parseISO(a.ath_date);
        const bDate = parseISO(b.ath_date);
        return bDate.getTime() - aDate.getTime();
      }) || [];

  return recentATHs.slice(0, 50);
}

export default async function Page() {
  const recentATHs = await getRecentATHs();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
      {/* Ticker Tape - at the very top
      <div className="w-full overflow-hidden bg-black/40 backdrop-blur-sm border-y border-white/10">
        <div className="animate-tickerTape whitespace-nowrap py-2"></div>
      </div> */}

      <div className="flex flex-col items-center justify-center gap-16 p-8 max-w-7xl w-full">
        {/* Hero Logo */}
        <div className="relative w-48 h-48">
          <Image
            src={athLogoWithoutBar}
            className="absolute inset-0 w-full h-full animate-opacityPulse"
            alt="Logo"
          />
          <Image
            src={athSquareWithoutBar}
            className="absolute inset-0 w-full h-full"
            alt="Square"
          />
          <Bar color="#00FFBA" />
        </div>

        {/* Main Tagline Options */}
        <div className="text-center flex flex-col items-center justify-center gap-0">
          <h1 className="text-3xl md:text-7xl font-bold text-white mb-4">
            Welcome to the club
          </h1>
          <p className="text-xl md:text-2xl text-[#00FFBA] font-medium max-w-3xl mx-auto">
            You may not like it, but this is what peak performance looks like.
          </p>
        </div>

        {/* Recent ATHs - "Club Members" */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Today's Club Members
          </h2>
          <p className="text-white/60 mb-6 text-center">
            Assets that blasted through their last all-time high in the last 24
            hours
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentATHs.map((asset) => (
              <AssetCard key={asset.coingecko_id} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
