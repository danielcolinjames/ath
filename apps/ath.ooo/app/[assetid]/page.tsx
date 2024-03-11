import { getProjectsByTicker } from '../../lib/mongodb'
import { getImg } from "../../lib/colors";
import Image from "next/image";
import { Metadata } from 'next';
import { fetchFromCoingecko } from '../../lib/coingecko';
import { formatNumber } from '@repo/utils/numbers'
import NavBar from '../../components/NavBar';
import RootLayout from '../layout';
import page from "next/app";
import { getAssetDataFromTicker } from '../../lib/utils';
import TimeAgo from '../../components/TimeAgo';
import { format, formatDate, formatDistanceToNow } from 'date-fns'

// import { AccentColorProvider } from '../../contexts/AssetColorContext';
// import { AssetProvider } from '../../contexts/AssetColorContext';

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

  const { mainAsset, otherAssets } = await getAssetDataFromTicker(assetid)

  if (!mainAsset) {
    return (
      <div>
        <h1>404: No assets match the ticker {assetid.toUpperCase()}</h1>
      </div>
    )
  }

  const timeSinceAth = formatDistanceToNow(new Date(mainAsset.ath_date), { addSuffix: true });
  const formattedAthDate = format(new Date(mainAsset.ath_date), 'MMMM do, yyyy');

  return (
    // <AccentColorProvider value={{ accentColor: mainAsset.accentColor }}>

    <div className='flex flex-col w-full px-4 mt-20'>
      {/* <NavBar accentColor={mainAsset.accentColor} /> */}
      <div className='flex flex-col items-start justify-center p-5'>
        <div className='flex flex-row items-center justify-center'>
          <Image src={mainAsset.image} alt={mainAsset.name} width={75} height={75} className="rounded-full" />
          {/* <h1 className='text-5xl font-bold'>{assetid.toUpperCase()}</h1> */}
          <p className='text-5xl font-light text-white'>{mainAsset.name}</p>
        </div>
        <p className='text-gray-400 font-light text-lg'>All-time high</p>
        <p className='text-7xl font-bold flex items-start justify-start' style={{ color: mainAsset.accentColor }}>
          <span className='text-2xl pr-2 pt-1'>$</span>
          {formatNumber(mainAsset.ath)}
        </p>
        <p className='text-xl text-gray-400'>
          {/* <TimeAgo date= */}
          set {timeSinceAth}, on {formattedAthDate}
          {/* //  /> */}
        </p>
        <p className='text-gray-400 font-light text-lg'>Current price</p>
        <p className='text-7xl font-bold flex items-start justify-start text-white'>
          <span className='text-2xl pr-2 pt-1'>$</span>
          {formatNumber(mainAsset.current_price)}
        </p>
      </div>
      {otherAssets?.length !== 0 && (
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
      )}
    </div>
    // </AccentColorProvider>
  )
}
