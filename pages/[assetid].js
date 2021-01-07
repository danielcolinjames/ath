import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const AssetPage = ({ asset, assetid, list, price }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="p-5">
      <Head>
        <title>
          All Time High — {assetid.toUpperCase()} ({asset.name})
        </title>
      </Head>
      <div>
        <h1 className="text-4xl">
          {assetid.toUpperCase()} ({asset.name}) – All Time High
        </h1>
        <p>{`${assetid.toUpperCase()}'s all-time high price in USD is:`}</p>
        <h2 className="font-bold text-4xl text-green-400 rounded-lg bg-gray-900 inline-block p-3 mt-4 mb-4 mr-4">
          {price[0].ath.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}{" "}
          {/* {console.log(price)} */}
          USD
        </h2>
      </div>
      {/* <p>{JSON.stringify(price)}</p> */}
      {/* {console.log(price)} */}
      <button
        className="mt-20 bg-gray-200 p-2 rounded-lg"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Hide" : "Show"} list of other assets{" "}
      </button>
      {showList && (
        <ul className="text-gray-400">
          {list.map((asset) => (
            <li className="list-disc ml-8 pt-2">
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
  );
};

export async function getStaticPaths() {
  // const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  // const list = await res.json();

  // const paths = list.map((asset) => ({
  //   params: { assetid: asset.symbol },
  // }));

  return {
    // paths,
    paths: [],
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

  const assetCoingeckoId = asset.id;

  // const res2 = await fetch(
  //   `https://api.coingecko.com/api/v3/coins/${assetCoingeckoId}`
  // );
  const res2 = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetCoingeckoId}`
  );
  const price = await res2.json();

  // console.log(list);

  return {
    props: { asset, assetid, list, price },
    revalidate: 30,
  };
}

export default AssetPage;
