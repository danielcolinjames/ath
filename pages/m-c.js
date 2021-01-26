import { Fragment } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";

const HomePage = ({ list, market, totalMarketCap }) => {
  const [showList, setShowList] = useState(false);

  const url = new URL("https://og.ath.ooo");
  url.pathname = `${encodeURIComponent(`All-Time Highs of Crypto Assets.png`)}`;
  url.searchParams.append("theme", "dark");
  url.searchParams.append("md", true);
  url.searchParams.append("fontSize", "64px");
  url.searchParams.append(
    "images",
    "https://ath.ooo/logo/wordmark_transparent_tight.png"
  );
  url.searchParams.append("cornerLogo", "false");
  url.searchParams.append("centered", "true");
  url.searchParams.append("hideHeader", "true");

  console.log(totalMarketCap);

  const [marketCapTotal, setMarketCapTotal] = useState(BigInt(0));

  // const updateMarketCapTotal = (list) => {

  //   if (false)
  //     setMarketCapTotal(
  //       (prevMarketCapTotal) => BigInt(prevMarketCapTotal) + BigInt(marketCap)
  //     );
  // };

  return (
    <Layout assetList={list}>
      <div className="p-5 mx-auto max-w-2xl">
        {/* <MetaTags
          title={"ATH.ooo — All-Time Highs"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={url}
          url={`https://ath.ooo/`}
        />
        <div className="pt-5 pb-10">
          <h1 className="text-xl md:text-3xl font-sans font-black mb-3">
            ATH.ooo — All-time high prices in USD
          </h1>
          <p className="text-md md:text-md font-sans text-gray-500">
            This website displays the highest ever recorded price in US Dollars
            that someone has paid for any given crypto asset. This website is
            powered by CoinGecko's API.
          </p>
        </div> */}
        <ul className="flex flex-col">
          {market.map((asset, i) => {
            // const imageUrl = asset.image
            // listOfMarketCaps.push(asset.image)
            // updateMarketCapTotal(asset.market_cap);
            // console.log(marketCapTotal);
            const imageSize = (asset.market_cap / totalMarketCap) * 500 + 5;

            const athTimestamp = moment.utc(asset.ath_date);
            return (
              <Fragment key={i}>
                <div className="pt-2">
                  <Link href={`/${asset.symbol}`}>
                    <a>
                      <div className="flex flex-row items-center py-2 pr-3">
                        <Image
                          src={asset.image}
                          className="max-h-6"
                          height={imageSize}
                          width={imageSize}
                          alt={`${asset.name} logo`}
                        />
                        {/* <h2 className="font-sans ml-2 font-bold text-md">
                          {asset.name} ({asset.symbol.toUpperCase()})
                        </h2> */}
                      </div>
                    </a>
                  </Link>
                </div>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await listRes.json();

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=100"
  );
  const market = await marketRes.json();

  const statsRes = await fetch("https://api.coingecko.com/api/v3/global");
  const stats = await statsRes.json();
  // console.log(stats.data.total_market_cap.usd);
  let totalMarketCap = stats.data.total_market_cap.usd;

  // console.log(market);
  return { props: { list, market, totalMarketCap }, revalidate: 86400 };
}

export default HomePage;
