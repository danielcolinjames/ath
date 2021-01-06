import Head from "next/head";

const AssetPage = ({ asset }) => {
  return (
    <>
      <Head>
        <title>All Time High — {asset.toUpperCase()}</title>
      </Head>
      {asset.toUpperCase()}
    </>
  );
};

// This gets called on every request
export async function getServerSideProps({ params }) {
  const { asset } = params;

  return { props: { asset } };
}

export default AssetPage;
