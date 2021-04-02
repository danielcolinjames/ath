import { Fragment } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";

const AboutPage = ({ list }) => {
  return (
    <Layout assetList={list}>
      <div
        className="p-5 mx-auto max-w-4xl"
        style={{ minHeight: "calc(100vh - 113px)" }}
      >
        <MetaTags
          title={"ATH.ooo — About"}
          description={`See the all-time highs of crypto assets`}
          openGraphImageAbsoluteUrl={`https://ath.ooo/logo/2/og.png`}
          url={`https://ath.ooo/about`}
        />
        <div className="pt-5 pb-10 max-w-md">
          <h1 className="text-xl md:text-3xl font-sans font-black mb-3">
            About
          </h1>
          <p className="text-md md:text-md font-sans text-gray-500 pt-3">
            Thanks for checking out the site! I built this as a side project to
            play with some frontend tools I wanted to learn.
          </p>
          <p className="text-md md:text-md font-sans text-gray-500 pt-3">
            Check out{" "}
            <a
              href="https://github.com/danielcolinjames/ath"
              target="_blank"
              className="text-green-500"
            >
              the site's code on GitHub
            </a>
            ! And if you're feeling particularly ambitious,{" "}
            <a
              href="https://github.com/danielcolinjames/ath/issues"
              target="_blank"
              className="text-green-500"
            >
              take on an issue or two!
            </a>
          </p>
          <p className="text-md md:text-md font-sans text-gray-500 pt-3">
            Feel free to{" "}
            <a
              href="mailto:hey@ath.ooo?subject=Hey!"
              target="_blank"
              className="text-green-500"
            >
              reach out{" "}
            </a>
            at <span className="text-purple-300">hey@ath.ooo</span>.
          </p>
          <p className="text-md md:text-md font-sans text-gray-500 pt-3">
            Or{" "}
            <a
              href="https://twitter.com/dcwj"
              target="_blank"
              className="text-blue-500"
            >
              follow me{" "}
            </a>
            on Twitter!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const listRes = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const list = await listRes.json();
  return {
    props: { list },
  };
}

export default AboutPage;
