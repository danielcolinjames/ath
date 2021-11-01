import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import hexToRgba from "hex-to-rgba";

const NavBar = ({ assetList, assetColors, rgb }) => {
  const router = useRouter();

  const [assetPlaceholder, setAssetPlaceholder] = useState("BTC");
  const [assetPlaceholderRandomButton, setAssetPlaceholderRandomButton] =
    useState("HNT");

  useEffect(() => {
    if (assetList) {
      const interval = setInterval(() => {
        const max = Math.floor(assetList?.length);
        const randomNumber = Math.floor(Math.random() * (max - 1));
        setAssetPlaceholder(assetList[randomNumber]?.symbol);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (assetList) {
      const interval = setInterval(() => {
        const max = Math.floor(assetList?.length);
        const randomNumber = Math.floor(Math.random() * (max - 1));
        setAssetPlaceholderRandomButton(assetList[randomNumber]?.symbol);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  const [filterText, setFilterText] = useState("");

  const input = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  let r, g, b;
  if (rgb === undefined) {
    r = 45;
    g = 254;
    b = 193;
  } else {
    [r, g, b] = rgb;
  }

  const handleKeydown = (event) => {
    // Disable the following keyboard shortcuts when the user is typing
    if (document.activeElement.tagName === "INPUT") return;
    if (document.activeElement.tagName === "TEXTAREA") return;

    if (event.key === "/") {
      event.preventDefault();
      focusSearchBar();
    }
  };

  let resultCount = 0;

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && filterText.length > 0 && resultCount !== 0) {
      router.push(`/${filterText}`);
      setFilterText("");
      window.scrollTo(0, 0);
    }
  };

  const focusSearchBar = () => {
    input.current.focus();
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value.toUpperCase());
  };

  const LOGO_WIDTH = 56;

  return (
    <div className="w-full h-14 shadow-smz fixed z-50 bg-[rgba(255,255,255,0.5)] blur-effect">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-full">
          <div className="flex justify-between items-center w-full max-w-4xl mx-auto px-5">
            <Link href="/">
              <div className="flex flex-row align-start justify-start">
                <a className="w-14 p-0 m-0 -mb-2 flex flex-row cursor-pointer">
                  <div className="block">
                    <Image
                      className="image-override logo-pulse"
                      src="/logo/2/ath_0.svg"
                      width={LOGO_WIDTH}
                      height={LOGO_WIDTH}
                      alt="ATH.ooo logo"
                    />
                  </div>
                  <div className={`block`} style={{ marginLeft: -LOGO_WIDTH }}>
                    <Image
                      className="image-override"
                      src="/logo/2/ath_1.svg"
                      width={LOGO_WIDTH}
                      height={LOGO_WIDTH}
                      alt="ATH.ooo logo"
                    />
                  </div>
                  <div
                    className="block"
                    style={{
                      marginLeft: -LOGO_WIDTH,
                      width: LOGO_WIDTH,
                      height: LOGO_WIDTH,
                    }}
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 2778 2778"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 2,
                      }}
                    >
                      <g transform="matrix(2.77778,0,0,2.77778,0,-47111.1)">
                        <g
                          id="ath_final_wordmark_light"
                          transform="matrix(0.260417,0,0,0.462963,0,16960)"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="3840"
                            height="2160"
                            style={{ fill: "none" }}
                          />
                          <g transform="matrix(-3.03494,-2.09066e-16,3.17232e-16,-1.4571,9887.66,2081.78)">
                            <g id="Logomark">
                              <rect
                                x="2353.03"
                                y="1012.95"
                                width="544.81"
                                height="127.661"
                                style={{ fill: `rgb(${r},${g},${b})` }}
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </a>
              </div>
            </Link>
            {/* Search bar */}
            {assetList && (
              <div className="w-full mx-auto max-w-screen-sm flex pl-2 pr-2">
                <div className="flex relative w-full">
                  <input
                    className={`w-full relative px-2 py-1 placeholder-opacity-25 rounded-md bg-[rgba(255,255,255,0.75)] border-solid border-2 focus:outline-none border-opacity-50 focus:border-opacity-100 text-md font-ath font-light`}
                    value={filterText}
                    type="search"
                    ref={input}
                    onChange={handleFilterTextChange}
                    onKeyPress={handleKeyPress}
                    placeholder={`${assetPlaceholder.toUpperCase()}`}
                    id="input"
                  ></input>
                  <div className="hidden sm:flex align-center justify-end absolute right-0 h-full">
                    <div className="bg-gray-50 rounded-md border border-solid border-gray-300 w-5 flex items-center justify-center my-2 mr-2">
                      <p className="text-gray-500 text-xs font-ath font-thin">
                        /
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute max-w-md mt-8 z-10 ml-0.5">
                  <div className="grid grid-cols-1 mt-1">
                    {assetList?.map((asset, index) => {
                      if (
                        asset.symbol.length > 0 &&
                        asset.symbol.toUpperCase() === filterText
                      ) {
                        resultCount++;
                        return (
                          <div className={`w-full`} key={`result-${index}`}>
                            <div className="flex flex-row items-center justify-start">
                              <Link href={`/${asset.symbol}`}>
                                <a
                                  onClick={() => {
                                    setFilterText("");
                                  }}
                                  className={`search-result w-full ${
                                    resultCount >= 1
                                      ? `blur-effect text-xs font-light`
                                      : ""
                                  }`}
                                  id={`result-${index}`}
                                >
                                  <div className="bg-[rgba(255,255,255,0.75)] py-2 px-2.5 w-full">
                                    <span className="font-bold">
                                      {asset.symbol.toUpperCase()}
                                    </span>{" "}
                                    ({asset.name})
                                  </div>
                                </a>
                              </Link>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-row items-center justify-between space-x-4">
              <Link href={`/${assetPlaceholderRandomButton?.toUpperCase()}`}>
                <a className="about-link p-1 rounded-md transition-all duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    style={{
                      color:
                        assetColors !== undefined
                          ? hexToRgba(assetColors.vibrant, 1)
                          : "rgba(0,255,186,1)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </Link>
              <div className="w-auto flex items-center justify-end pr-4 sm:pr-0">
                <Link href="/about">
                  <a className="text-gray-500 font-ath font-light about-link py-1 px-2 rounded-md transition-all">
                    About
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-0 h-2 w-full blur-effect"
        style={{
          backgroundImage: `linear-gradient(${
            assetColors !== undefined
              ? hexToRgba(assetColors.vibrant, 0.1)
              : "rgba(0,255,186,0.1)"
          }, ${
            assetColors !== undefined
              ? hexToRgba(assetColors.vibrant, 0.0)
              : "rgba(255,255,255,0)"
          }`,
        }}
      />
      <style jsx global>{`
        .bg-dynamic {
          background-color: ${assetColors !== undefined
            ? hexToRgba(assetColors?.vibrant, 0.85)
            : "#00FFBA"};
        }
        #input {
          border-color: rgba(${r}, ${g}, ${b}, 0.15);
        }
        #input:focus {
          border-color: rgba(${r}, ${g}, ${b}, 0.5);
        }
        .about-link:hover {
          background-color: rgba(${r}, ${g}, ${b}, 0.15);
        }
        .search-result {
          background-color: rgba(${r}, ${g}, ${b}, 0.85);
        }
      `}</style>
    </div>
  );
};

export default NavBar;
