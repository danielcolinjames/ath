import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";

const Error = ({ statusCode }) => {
  return (
    <Layout>
      <div className="p-5 mx-auto max-w-2xl">
        <MetaTags pageTitle={`ATH.ooo — ${statusCode}`} noIndex />
        <div className="flex flex-col max-w-xl break-words">
          <p className="font-black font-sans text-lg text-red-400 mt-20">
            Error {statusCode}
          </p>
          <h1 className="text-xl md:text-3xl font-sans font-semibold mt-2 mb-2">
            An error occurred.
          </h1>
          <p className="text-md md:text-md font-sans text-gray-500">
            Sorry about that. Please try again later.
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
