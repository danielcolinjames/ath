import Head from "next/head";
import Link from "next/link";

const AssetPage = ({ asset, list, price }) => {
  return (
    <>
      <Head>
        <title>All Time High — {asset.toUpperCase()}</title>
      </Head>
      <h1>{asset.toUpperCase()} – All Time High</h1>
      <p>{`${asset.toUpperCase()}'s all-time high price in USD is:`}</p>
      <h2>
        {price.market_data.ath.usd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}{" "}
        USD
      </h2>
      {/* <p>{JSON.stringify(price)}</p> */}
      {console.log(price)}
      <p style={{ paddingTop: 20 }}>Check other assets: </p>
      <ul>
        {list.map((asset) => (
          <li>
            <Link href={`/${asset.symbol}`}>
              <a>
                {asset.symbol.toUpperCase()} ({asset.name})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

// This gets called on every request
export async function getStaticPaths() {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await res.json();

  const paths = list.map((asset) => ({
    params: { id: asset.symbol, asset: asset.symbol },
  }));

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { asset } = params;

  const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await res.json();

  const assetId = list.find((x) => {
    // console.log(x.id);
    // console.log(asset);
    return x.symbol.toLowerCase() === asset.toLowerCase();
  });
  // console.log("FOUND!");
  // console.log(assetId);

  const assetCoingeckoId = assetId.id;

  const res2 = await fetch(
    `https://api.coingecko.com/api/v3/coins/${assetCoingeckoId}`
  );
  const price = await res2.json();

  // console.log(list);

  return { props: { asset, list, price }, revalidate: 30 };
}

export default AssetPage;
