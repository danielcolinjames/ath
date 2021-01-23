import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NotFoundPage = ({ assetid, market, list }) => {
  const [showList, setShowList] = useState(false);

  const url = new URL("https://og.ath.ooo");
  url.pathname = `${encodeURIComponent(
    `ATH.ooo – All Time Highs of Crypto Assets.png`
  )}`;
  url.searchParams.append("theme", "dark");
  url.searchParams.append("md", true);
  url.searchParams.append("fontSize", "64px");
  url.searchParams.append("images", "https://ath.ooo/athwordmarkwhite.png");
  url.searchParams.append("cornerLogo", "false");
  url.searchParams.append("centered", "true");

  return (
    <Layout assetList={list}>
      <div className="p-5 mx-auto max-w-2xl">
        <MetaTags
          title={"ATH.ooo — 404: Not Found"}
          description={`See the all time highs of crypto assets`}
          openGraphImageAbsoluteUrl={url}
          url={`https://ath.ooo/`}
          noIndex
        />
        <div className="flex flex-col max-w-xl break-words">
          <p className="font-black font-sans text-lg text-red-400 mt-20">
            404 — Not Found
          </p>
          <h1 className="text-xl md:text-3xl font-sans font-semibold mt-2 mb-2">
            There doesn't appear to be an asset called "{assetid.toUpperCase()}"
            in CoinGecko's database
          </h1>
          <p className="text-md md:text-md font-sans text-gray-500">
            Take a look at the assets below, or try searching a ticker symbol in
            the search bar above.
          </p>
        </div>
        <p className="font-sans text-base md:text-xl font-bold mt-20 mb-2 text-gray-400">
          All time highs of other assets
        </p>
        {market.map((asset, index) => (
          <div className="pt-2" key={`${asset.id}-${index}`}>
            <Link href={`/${asset.symbol}`}>
              <a className="font-sans text-sm md:text-lg text-gray-400 flex flex-row items-center justify-between">
                <span className="flex flex-row items-center justify-center">
                  <Image
                    src={asset.image}
                    height={15}
                    width={15}
                    alt={`${asset.name} logo`}
                  />{" "}
                  <span className="pl-2">
                    {asset.name} ({asset.symbol.toUpperCase()})
                  </span>
                </span>
                <span className="flex-grow mx-3 h-px bg-gray-200" />
                <span className="font-bold text-black">
                  {asset.ath.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  USD
                </span>
              </a>
            </Link>
          </div>
        ))}
        <button
          className="mt-20 bg-gray-200 p-2 rounded-lg"
          onClick={() => setShowList(!showList)}
        >
          {showList ? "Hide" : "Show"} more assets{" "}
        </button>
        {showList && (
          <ul className="text-gray-400">
            {list.map((asset, index) => (
              <li
                className="list-disc ml-8 pt-2"
                key={`${asset.symbol}-${index}`}
              >
                <Link href={`/${asset.symbol}`}>
                  <a>
                    {asset.symbol.toUpperCase()} ({asset.name})
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default NotFoundPage;
