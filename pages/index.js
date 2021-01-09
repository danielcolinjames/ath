import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

const HomePage = ({ list, market }) => {
  const [showList, setShowList] = useState(false);
  console.log(market);
  console.log(list);

  return (
    <>
      <div className="bg-black w-full h-8" />
      <div className="py-4 flex justify-center content-center w-full">
        <Link href="/">
          <a className="p-0 m-0">
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
      <div className="p-5 mx-auto max-w-xl">
        <Head>
          <title>All Time High</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ul className="flex flex-col max-w-lg">
          <h1 className="text-3xl font-sans font-black">
            All time high prices in USD
          </h1>
          {market.map((asset) => {
            const athTimestamp = moment.utc(asset.ath_date);
            return (
              // <li className="pt-2 pl-2" key={asset.symbol}>
              //   <div className="flex flex-row justify-start">
              //     <span>
              //       <span className="text-gray-400">{asset.market_cap_rank}. </span>
              //       <Link href={`/${asset.symbol}`}>
              //         <a>
              //           {asset.name}{" "}
              //           <span className="text-gray-400">
              //             ({asset.symbol.toUpperCase()})
              //           </span>
              //         </a>
              //       </Link>
              //     </span>
              //     <span className="pl-2 text-gray-400">
              //       —{" "}
              //       <strong className="text-green-600">
              //         {asset.ath.toLocaleString(undefined, {
              //           minimumFractionDigits: 2,
              //         })}
              //       </strong>{" "}
              //       USD
              //     </span>
              //   </div>
              // </li>
              <>
                <div className="pt-12">
                  <Link href={asset.symbol}>
                    <a>
                      <div className="flex flex-row py-2">
                        <Image src={asset.image} height={28} width={28} />
                        <h2 className="font-sans ml-2 font-bold text-xl">
                          {asset.name} ({asset.symbol.toUpperCase()})
                        </h2>
                      </div>
                    </a>
                  </Link>
                  <Link href={asset.symbol}>
                    <a>
                      <div className="inline-block">
                        <div className="h-3 bg-ath-100 w-full -mb-8 md:-mb-8 mt-2" />
                        <h3 className="text-4xl md:text-5xl text-black font-sans font-black inline-block mt-4 mb-4">
                          {asset.ath.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </h3>
                      </div>
                    </a>
                  </Link>
                  <p className="font-sans font-light text-xl text-gray-400">
                    Set {athTimestamp.fromNow()}
                  </p>
                  <p className="font-sans font-light text-sm text-gray-400">
                    on {moment(athTimestamp).format("MMMM Do, YYYY")} at{" "}
                    {moment(athTimestamp).format("h:mm:ss A UTC")}
                  </p>
                </div>
                <div className="mt-5 h-px w-full bg-gray-300" />
              </>
            );
          })}
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
    </>
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
