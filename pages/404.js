import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AssetListItem from "../components/AssetListItem";

const NotFoundPage = ({ assetid, market, list }) => {
  const [showList, setShowList] = useState(false);

  return (
    <Layout assetList={list}>
      <div className="p-5 mx-auto max-w-2xl">
        <MetaTags
          title={"ATH.ooo — 404: Not Found"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={`https://ath.ooo/images/og/404.png`}
          url={`https://ath.ooo/404`}
          noIndex
        />
        <div className="flex flex-col max-w-xl break-words">
          <p className="font-black font-sans text-lg text-red-400 mt-20">
            404 — Not Found
          </p>
          <h1 className="text-xl md:text-3xl font-sans font-semibold mt-2 mb-2">
            There doesn't appear to be an asset called "{assetid?.toUpperCase()}
            " in CoinGecko's database
          </h1>
          <p className="text-md md:text-md font-sans text-gray-500 pb-5">
            Try visiting the home page:
          </p>
        </div>
        <div>
          <Link href="/">
            <a className="mt-20 bg-gray-200 p-2 rounded-lg">Go home</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
