"use server";
import Image from "next/image";
import { Metadata } from "next";
import { format, formatDistanceToNow } from "date-fns";
import AssetChart from "../../components/AssetChart";
import { notFound } from "next/navigation";
import { formatNumber } from "../../../../packages/utils/numbers";
import { getAssetDetails } from "../../lib/db";
import { OtherAssetsSection } from "../../components/OtherAssetsSection";

const fallbackImageUrl = "missing_large.png";

type Props = {
  params: { assetid: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const assetid = params.assetid;

  const rootUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://ath.ooo";
  const ogUrl = `${rootUrl}/api/og?assetid=${assetid}`;

  return {
    openGraph: {
      title: `${assetid} - ath.ooo`,
      description: `${assetid} – ath.ooo`,
      url: `https://ath.ooo/${assetid}`,
      siteName: "ath.ooo",
      images: ogUrl,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "ath.ooo",
      description: `${assetid} – ath.ooo`,
      title: `${assetid} - ath.ooo`,
      images: [ogUrl],
    },
  };
}

export default async function AssetPage({ params: { assetid } }: Props) {
  const response = await getAssetDetails(assetid);

  console.log(response);

  if (!response) {
    return notFound();
  }

  const { assets, stale } = response;

  if (!assets || assets.length === 0) {
    return notFound();
  }

  const asset = assets[0];
  const otherAssets = assets.slice(1);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-center gap-10">
        <div
          className="relative bg-black/40 backdrop-blur-md pl-4 py-4 pr-8 rounded-full overflow-hidden shadow-sm border-2"
          style={{
            boxShadow: `0 0 100px -10px ${asset.accent}33`,
            borderColor: `${asset.accent}22`,
          }}
        >
          {/* Animated glowing circle */}
          <div
            className="absolute top-1/2 left-1/2 w-[250px] h-[100px] rounded-full blur-2xl opacity-20 animate-drift"
            style={{
              backgroundColor: asset.accent,
            }}
          />
          {/* Content container */}
          <div className="relative flex flex-row items-center justify-center gap-5">
            {asset.image && asset.image !== fallbackImageUrl ? (
              <Image
                src={asset.image}
                alt={asset.name}
                width={96}
                height={96}
                className="rounded-full"
              />
            ) : (
              <div className="w-[96px] h-[96px] bg-gray-800 border border-gray-700 rounded-full" />
            )}
            <p className="text-6xl font-light">{asset.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 font-medium text-base">
              All-time high price
            </p>
            <p
              className="text-7xl font-bold flex items-start justify-start"
              style={{ color: asset.accent }}
            >
              <span className="text-2xl pr-2 pt-1">$</span>
              {formatNumber(asset.ath)}
            </p>
            <p className="text-base text-gray-500 font-medium">
              on {format(new Date(asset.ath_date), "MMMM do, yyyy")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 font-medium text-base">Current price</p>
            <p className="text-7xl font-bold flex items-start justify-start text-white">
              <span className="text-2xl pr-2 pt-1">$</span>
              {formatNumber(asset.current_price)}
            </p>
          </div>
        </div>
        {/* <AssetChart
          accentColor={asset.accent}
          assetData={asset}
          className="z-10"
          wrapperClassName="max-h-[30vh] w-full"
        /> */}
      </div>
      {otherAssets?.length !== 0 && (
        <OtherAssetsSection otherAssets={otherAssets} />
      )}
    </div>
  );
}
