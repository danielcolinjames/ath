import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MetaTags from "../components/MetaTags";
import moment from "moment";

const AssetPage = ({ asset, assetid, list, price, market }) => {
  const [showList, setShowList] = useState(false);
  // console.log(price);
  const title = `${asset.name} (${assetid.toUpperCase()}) All Time High`;

  const url = new URL("https://og.ath.ooo");
  url.pathname = `${encodeURIComponent(
    `All-Time High: ${asset.name} (${assetid.toUpperCase()})`
  )}.png`;
  url.searchParams.append("theme", "dark");
  url.searchParams.append("md", true);
  url.searchParams.append("fontSize", "64px");
  url.searchParams.append("images", price[0].image);

  const athTimestamp = moment.utc(price[0].ath_date);
  // console.log(price[0].ath_date);
  // console.log(athTimestamp);
  // console.log(athTimestamp.fromNow());

  // console.log(price[0]);

  const lastUpdated = moment.utc(price[0].last_updated);

  return (
    <>
      <div className="bg-black w-full h-4" />
      <div className="py-4 flex justify-center content-center w-full">
        <Link href="/">
          <a className="p-0 m-0 -mb-2">
            <Image
              className="image-override"
              src="/athwordmark.png"
              width={128}
              height={25}
              alt="ATH.ooo logo"
            />
          </a>
        </Link>
      </div>
      <div className="bg-black w-full h-px" />

      <div className="p-5 mx-auto max-w-2xl">
        <MetaTags
          title={title}
          description={`The all-time high price of ${
            asset.name
          } (${assetid.toUpperCase()}) was ${price[0].ath.toLocaleString(
            undefined,
            { minimumFractionDigits: 2 }
          )} USD, set ${athTimestamp.fromNow()} on ${moment(
            athTimestamp
          ).format("MMMM Do, YYYY")} at ${moment(athTimestamp).format(
            "h:mm:ss A UTC"
          )}`}
          openGraphImageAbsoluteUrl={url}
          url={`https://ath.ooo/${assetid}`}
        />
        <div>
          <div className="flex flex-row py-2">
            <Image src={price[0].image} height={28} width={28} />
            <h1 className="font-sans ml-2 font-bold text-xl">
              {asset.name} ({assetid.toUpperCase()})
            </h1>
          </div>
          <h2 className="text-3xl font-sans font-black">
            All time high price in USD
          </h2>
          <div className="inline-block">
            <div className="h-2 md:h-3 bg-ath-100 w-full -mb-6 md:-mb-7 mt-5" />
            <h3 className="text-6xl md:text-8xl text-black font-sans font-black inline-block mt-4 mb-4">
              {price[0].ath.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
          <p className="font-sans font-light text-2xl text-gray-400">
            Set {athTimestamp.fromNow()}
          </p>
          <p className="font-sans font-light text-xs text-gray-400">
            on {moment(athTimestamp).format("MMMM Do, YYYY")}
          </p>
          <p className="font-sans font-light text-xs text-gray-400">
            at {moment(athTimestamp).format("h:mm:ss A UTC")}
          </p>
        </div>
        {/* <p>{JSON.stringify(price)}</p> */}
        {/* {console.log(price)} */}

        <p className="mt-20">Look at all-time highs of other assets:</p>
        <ul className="text-gray-400">
          {market.map((asset) => (
            <li className="list-disc ml-8 pt-2">
              <Link href={`/${asset.symbol}`}>
                <a>
                  {asset.symbol.toUpperCase()} ({asset.name}):{" "}
                  {asset.ath.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}{" "}
                  USD
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="mt-20 bg-gray-200 p-2 rounded-lg"
          onClick={() => setShowList(!showList)}
        >
          {showList ? "Hide" : "Show"} more assets{" "}
        </button>
        {showList && (
          <ul className="text-gray-400">
            {list.map((asset) => (
              <li className="list-disc ml-8 pt-2">
                {/* <img src={} */}
                {console.log(list)}
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
    </>
  );
};

export async function getStaticPaths() {
  // const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  // const list = await res.json();

  // const paths = list.map((asset) => ({
  //   params: { assetid: asset.symbol },
  // }));

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=25"
  );
  const market = await marketRes.json();

  const paths = market.map((asset) => ({
    params: { assetid: asset.symbol },
  }));

  return {
    paths,
    // paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { assetid } = params;

  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await res.json();

  const asset = list.find((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  const matchingAssets = list.filter((x) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  console.log(matchingAssets);

  let assetCoingeckoId = "";
  if (matchingAssets.length === 1) {
    assetCoingeckoId = asset.id;
  } else {
  }

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=100"
  );
  const market = await marketRes.json();

  // const res2 = await fetch(
  //   `https://api.coingecko.com/api/v3/coins/${assetCoingeckoId}`
  // );
  const res2 = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetCoingeckoId}`
  );
  const price = await res2.json();

  // console.log(list);

  return {
    props: { asset, assetid, list, price, market },
    revalidate: 60,
  };
}

export default AssetPage;
