"use server";
import Image from "next/image";
import { Metadata } from "next";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { formatNumber } from "../../../../packages/utils/numbers";
import { getAssetDetails } from "../../lib/db";
import { OtherAssetsSection } from "../../components/OtherAssetsSection";
import classNames from "classnames";
import { getPercentChangeColorClassName } from "../../lib/colors";
import { AssetStats } from "../../components/AssetStats";

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

  // console.log(response);

  if (!response) {
    return notFound();
  }

  const { assets, stale } = response;

  if (!assets || assets.length === 0) {
    return notFound();
  }

  const asset = assets[0];
  const otherAssets = assets.slice(1);

  // should be negative
  const percentLowerThanATHNumber = -(
    ((asset.ath - asset.current_price) / asset.ath) *
    100
  );

  const percentLowerThanATHFormatted = formatNumber(percentLowerThanATHNumber);

  const colorClassName = getPercentChangeColorClassName(
    percentLowerThanATHNumber,
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-center gap-10 pt-20">
        <div
          className="relative bg-black/40 backdrop-blur-md pl-2 md:pl-4 py-2 md:py-4 pr-8 rounded-full overflow-hidden shadow-sm border-2"
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
          <div className="relative flex flex-row items-center justify-center gap-2 md:gap-4">
            {asset.image && asset.image !== fallbackImageUrl ? (
              <Image
                src={asset.image}
                alt={asset.name}
                width={72}
                height={72}
                className="rounded-full md:w-[96px] md:h-[96px]"
              />
            ) : (
              <div className="w-[72px] md:w-[96px] h-[72px] md:h-[96px] bg-gray-800 border border-gray-700 rounded-full" />
            )}
            <p className="text-3xl md:text-6xl font-light">{asset.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 font-medium text-base">
              All-time high price
            </p>
            <p
              className="text-4xl md:text-7xl font-bold flex items-start justify-start"
              style={{ color: asset.accent }}
            >
              <span className="text-2xl pr-2 pt-1">$</span>
              {formatNumber(asset.ath)}
            </p>
            <p className="text-base text-gray-500 font-medium">
              {format(new Date(asset.ath_date), "'at' h:mma 'on' MMM do, yyyy")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 font-medium text-base">Current price</p>
            <p className="text-4xl md:text-7xl font-bold flex items-start justify-start text-white">
              <span className="text-2xl pr-2 pt-1">$</span>
              {formatNumber(asset.current_price)}
            </p>
            <p className={classNames("text-base font-medium", colorClassName)}>
              {/* % lower than ATH current price is */}
              {percentLowerThanATHFormatted}%
            </p>
            <AssetStats asset={asset} />
          </div>
        </div>
      </div>
      {otherAssets?.length !== 0 && (
        <OtherAssetsSection otherAssets={otherAssets} />
      )}
    </div>
  );
}
