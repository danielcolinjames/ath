"use server";
import Image from "next/image";
import { Metadata } from "next";
import { formatNumber } from "@repo/utils/numbers";
// import { getAssetDataFromTicker } from "../../lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import AssetChart from "../../components/AssetChart";
import { supabaseClient } from "../../lib/utils";
import { createClient } from "../../lib/supabase/client";
import { getList, updateAssetDetails } from "../../lib/coingecko/data";
import { notFound } from "next/navigation";

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

export default async function CryptoAssetPage({
  params,
}: {
  params: { assetid: string };
}) {
  const { assetid } = params;
  console.log("assetid", assetid);

  const lowercaseAssetid = assetid.toLowerCase();
  const {
    data: assets,
    error,
    count,
  } = await createClient()
    .from("crypto_assets")
    .select("*")
    .eq("symbol", lowercaseAssetid)
    .order("market_cap", { ascending: false, nullsFirst: false })
    .order("name", { ascending: true });

  console.log(`Query result:`, { assets, error, count });

  if (assets?.length === 0) {
    return <div>No assets found</div>;
  }

  console.log("HELLO!!!!");
  const asset = assets?.[0];

  console.log(asset);

  if (!asset?.coingecko_id) {
    return notFound();
  }

  const updatedAsset = await updateAssetDetails(asset?.coingecko_id);

  console.log(updatedAsset);

  const mainAsset = updatedAsset;

  // if (1 > 2) {
  //   return (
  //     <div
  //       className="h-10 w-full"
  //       style={{ backgroundColor: updatedAsset.accent }}
  //     >
  //       <p>{asset.name}</p>
  //       <p>{updatedAsset.accent}</p>
  //       <pre>{JSON.stringify(asset, null, 2)}</pre>
  //       <pre>{JSON.stringify(updatedAsset, null, 2)}</pre>
  //       {/* <pre>{JSON.stringify(list, null, 2)}</pre>
  //       <pre>{JSON.stringify(mainAssets, null, 2)}</pre> */}
  //     </div>
  //   );
  // }

  // const { mainAsset, otherAssets } = await getAssetDataFromTicker(assetid);

  // if (!mainAsset) {
  //   return (
  //     <div>
  //       <h1>404: No assets match the ticker {assetid.toUpperCase()}</h1>
  //     </div>
  //   );
  // }

  // const timeSinceAth = formatDistanceToNow(new Date(mainAsset.ath_date), {
  //   addSuffix: true,
  // });
  // const formattedAthDate = format(
  //   new Date(mainAsset.ath_date),
  //   "MMMM do, yyyy",
  // );

  // const mainAsset = mainAssets?.find((asset: any) => asset.ticker === assetid);
  console.log(asset);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-row items-center justify-center gap-2">
          <Image
            src={asset.image}
            alt={asset.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="text-5xl font-light">{mainAsset.name}</p>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="text-gray-400 font-light text-lg">All-time high</p>
            <p
              className="text-7xl font-bold flex items-start justify-start"
              style={{ color: mainAsset.accent }}
            >
              <span className="text-2xl pr-2 pt-1">$</span>
              {asset.ath}
            </p>
            <p className="text-xl text-gray-400">
              {/* set {timeSinceAth}, on {formattedAthDate} */}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-400 font-light text-lg">Current price</p>
            <p className="text-7xl font-bold flex items-start justify-start text-white">
              <span className="text-2xl pr-2 pt-1">$</span>
              {formatNumber(mainAsset.current_price)}
            </p>
          </div>
        </div>
        {/* <AssetChart
          accentColor={mainAsset.accent}
          assetData={mainAsset}
          className="z-10"
          wrapperClassName="max-h-[30vh] w-full"
        /> */}
      </div>
      {/* {otherAssets?.length !== 0 && (
        <div className='mt-10'>
          <p className='text-2xl font-light text-gray-400 p-5'>Other assets with the same ticker</p>
          <div className="grid grid-cols-3">
            {otherAssets?.map((asset: any, index: any) => {
              return (
                <div className='flex flex-col px-5 py-2' key={index}>
                  <p className='text-2xl font-bold' style={{ color: asset.accentColor }}>{asset.name}</p>
                  <p className='text-5xl font-bold'>${formatNumber(asset.ath)}</p>
                  <p className='text-sm font-light'>on {format(new Date(asset.ath_date), 'MMMM do, yyyy')}</p>
                </div>
              )
            })}
          </div>
        </div>
      )} */}
    </div>
  );
}
