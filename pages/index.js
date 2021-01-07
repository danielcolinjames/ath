import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const HomePage = ({ list, market }) => {
  console.log(market);

  return (
    <div className={styles.container}>
      <Head>
        <title>All Time High</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Top 10 assets and their All-Time Highs:</h2>
      <ul className="flex flex-col max-w-lg">
        {market.map((asset) => (
          <li key={asset.symbol}>
            <span>{asset.market_cap_rank}. </span>
            <Link href={`/${asset.symbol}`}>
              <a>
                {asset.symbol.toUpperCase()} ({asset.name})
              </a>
            </Link>
            <span>
              {" "}
              —{" "}
              <strong className="">
                {asset.ath.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </strong>{" "}
              USD
            </span>
          </li>
        ))}
      </ul>
      <ul>
        {list.map((asset) => (
          <li key={asset.symbol}>
            <Link href={`/${asset.symbol}`}>
              <a>
                {asset.symbol.toUpperCase()} ({asset.name})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await listRes.json();

  const marketRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?order_string=market_cap_desc&vs_currency=usd&per_page=10"
  );
  const market = await marketRes.json();
  // console.log(market);
  return { props: { list, market }, revalidate: 86400 };
}

export default HomePage;
