import MetaTags from "../components/MetaTags";
import Link from "next/link";
import Layout from "../components/Layout";

const Error = () => {
  return (
    <Layout>
      <div
        className="p-5 mx-auto max-w-4xl"
        style={{ minHeight: "calc(100vh - 113px)" }}
      >
        <MetaTags pageTitle={`ath.ooo — Error`} noIndex />
        <div className="flex flex-col max-w-xl break-words">
          <p className="font-black font-ath text-lg text-red-400 mt-20">
            500 — Internal Server Error
          </p>
          <h1 className="text-xl md:text-3xl font-ath font-semibold mt-2 mb-2">
            An error occurred.
          </h1>
          <p className="text-md md:text-md font-ath text-gray-500 mt-3 mb-3">
            Sorry about that. Please try again later.
          </p>
          <a
            href="https://status.coingecko.com/"
            target="_blank"
            className="font-ath text-gray-500 mt-3"
          >
            Try checking CoinGecko's status page to see if there might be an
            outage right now.
          </a>
          <p className="text-md md:text-md font-ath text-gray-500 mt-3">
            Feel free to follow the GitHub link in the footer to file an issue.
          </p>
          <span className="flex">
            <Link href="/">
              <a className="text-gray-500 p-4 bg-gray-100 mt-8 hover:bg-gray-200 transition-all duration-75 rounded-lg text-sm">
                Go back to the home page
              </a>
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Error;
