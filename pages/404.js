import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import Link from "next/link";

const NotFoundPage = ({ assetid }) => {
  return (
    <Layout>
      <div className="p-5 mx-auto max-w-4xl">
        <MetaTags
          title={"ATH.ooo — 404: Not Found"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={`https://ath.ooo/images/og/404.png`}
          url={`https://ath.ooo/404`}
          noIndex
        />
        <div className="flex flex-col max-w-xl break-words">
          <p className="font-black font-ath text-lg text-red-400 mt-20">
            404 — Not Found
          </p>
          <h1 className="text-xl md:text-3xl font-ath font-semibold mt-2 mb-2">
            {assetid
              ? `There doesn't appear to be an asset called "{assetid?.toUpperCase()}
            " in CoinGecko's database`
              : `That page doesn't appear to exist.`}
          </h1>
          <p className="text-md md:text-md font-ath text-gray-500 pb-5">
            Try visiting the home page:
          </p>
        </div>
        <div>
          <Link href="/">
            <a className="mt-20 bg-gray-200 p-2 rounded-lg font-ath">Go home</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
