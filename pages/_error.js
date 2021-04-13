import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";

const Error = ({ statusCode }) => {
  return (
    <Layout>
      <div
        className="p-5 mx-auto max-w-4xl"
        style={{ minHeight: "calc(100vh - 113px)" }}
      >
        <MetaTags pageTitle={`ATH.ooo — ${statusCode}`} noIndex />
        <div className="flex flex-col max-w-xl break-words">
          <p className="font-black font-ath text-lg text-red-400 mt-20">
            Error {statusCode}
          </p>
          <h1 className="text-xl md:text-3xl font-ath font-semibold mt-2 mb-2">
            An error occurred.
          </h1>
          <p className="text-md md:text-md font-ath text-gray-500 mt-3">
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
            Otherwise it's probably my fault. Sorry.
          </p>
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
