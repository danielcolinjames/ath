import { Fragment } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import MetaTags from "../components/MetaTags";
import Layout from "../components/Layout";
import AssetListItem from "../components/AssetListItem";

const AboutPage = ({ list }) => {
  const NameOfCrypto = ({ name, bracketText }) => {
    return (
      <Link href={`/${name}`}>
        <a className="sm:col-span-3 text-md md:text-md font-sans font-semibold text-gray-800 inline-block sm:p-2 mt-5 sm:mt-0">
          {name}{" "}
          {bracketText && (
            <span className="text-gray-400 text-xs">({bracketText})</span>
          )}
        </a>
      </Link>
    );
  };

  const Address = ({ children }) => {
    return (
      <div className="sm:col-span-9 flex items-center justify-start">
        <p className="sm:text-sm font-sans font-semibold text-gray-200 break-all bg-gray-800 border border-solid border-ath-100 rounded-md w-full px-2 py-1.5 ">
          {children}
        </p>
      </div>
    );
  };

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
            About 🚀
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
        <div className="pt-5 pb-10 max-w-2xl">
          <h2 className="text-lg md:text-2xl font-sans font-black mb-3">
            Tips ⚡️
          </h2>
          <p className="text-md md:text-md font-sans text-gray-500 py-3">
            If you want to support the site, you can send tips to the following
            addresses:
          </p>
          <div className="grid sm:grid-cols-12 gap-2 sm:bg-gray-100 sm:rounded-lg sm:px-2 sm:py-2 sm:shadow-md sm:border border-solid border-gray-200">
            <NameOfCrypto name="ETH" bracketText="or ERC-20" />
            <Address>0x2D6e622339E35a51E00E5EEdb5CE1231316F81e2</Address>
            <NameOfCrypto name="BTC" />
            <Address>bc1q9tdna9zajgty84xux35fxwkqxqpd9yk5x0gy60</Address>
            <NameOfCrypto name="DOGE" />
            <Address>DFBJCwpSeAZRn9zyWmr2EmdvxhNrxdyWBB</Address>
            <NameOfCrypto name="HNT" />
            <Address>
              12yzdqwv6VyaqHGe737jsCidKQsJEHdiCPGTiyAcrCnCVwYcD8g
            </Address>
          </div>
          <p className="text-md md:text-md font-sans text-gray-500 pt-10">
            Your tips make my appreciation hit new all-time highs!
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
