import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

const HomePage = ({ list, market }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div className="p-5">
      <Head>
        <title>All Time High</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-4xl">Top 100 assets and their All-Time Highs:</h2>
      <ul className="flex flex-col max-w-lg">
        {market.map((asset) => (
          <li className="pt-2 pl-2" key={asset.symbol}>
            <div className="flex flex-row justify-start">
              <span>
                <span className="text-gray-400">{asset.market_cap_rank}. </span>
                <Link href={`/${asset.symbol}`}>
                  <a>
                    {asset.name}{" "}
                    <span className="text-gray-400">
                      ({asset.symbol.toUpperCase()})
                    </span>
                  </a>
                </Link>
              </span>
              <span className="pl-2 text-gray-400">
                —{" "}
                <strong className="text-green-600">
                  {asset.ath.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </strong>{" "}
                USD
              </span>
            </div>
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
              {/* {console.log(list)} */}
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

export async function getStaticProps() {
  const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await listRes.json();

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=100"
  );

  const market = await marketRes.json();
  // console.log(market);
  return { props: { list, market }, revalidate: 86400 };
}

export default HomePage;
