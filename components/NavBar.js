import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import hexToRgba from "hex-to-rgba";

const NavBar = ({
  assetList,
  assetColors,
  assetColorsLoading,
  assetColorsError,
}) => {
  const router = useRouter();

  const [filterText, setFilterText] = useState("");

  const input = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleKeydown = (event) => {
    // Disable the following keyboard shortcuts when the user is typing
    if (document.activeElement.tagName === "INPUT") return;
    if (document.activeElement.tagName === "TEXTAREA") return;

    if (event.key === "/") {
      event.preventDefault();
      focusSearchBar();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && filterText.length > 0) {
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

  let resultCount = 0;

  const ringString = `ring-[${assetColors.vibrant}]`;

  return (
    <div className="w-full h-14 shadow-xl fixed z-50 bg-[rgba(255,255,255,0.5)] blur-effect zborder zborder-solid zborder-[#fefefe]">
      <div className="max-w-2xl mx-auto zmt-3">
        <div className="rounded-full">
          <div className="flex justify-start items-center w-full max-w-2xl mx-auto px-5">
            <Link href="/">
              <a className="p-0 m-0 -mb-2 flex flex-row">
                <div className="block">
                  <Image
                    className="image-override"
                    src="/images/ath-tp-2.png"
                    width={56}
                    height={56}
                    alt="ATH.ooo logo"
                  />
                </div>
                <div className="block -ml-14 logo-pulse">
                  <Image
                    className="image-override"
                    src="/images/ath-tp.png"
                    width={56}
                    height={56}
                    alt="ATH.ooo logo"
                  />
                </div>
                {/* <div className="hidden md:block">
              <Image
                className="image-override"
                src="/logo/wordmark_transparent_tight.png"
                width={163.285714286}
                height={38.857142857}
                alt="ATH.ooo logo"
              />
            </div> */}
              </a>
            </Link>
            {/* Search bar */}
            {assetList && (
              <div className="flex flex-grow flex-wrap pl-6">
                <div className="w-full relative">
                  <input
                    // ${
                    //   assetColorsLoading ? "ring-ath-100" : "ring-[#fc4c04]"
                    //   // "ring-[#000fff]"
                    //   // `ring-[${assetColors.vibrant}]`
                    //   }
                    //   className={`p-2 pl-4 w-full max-w-md rounded-3xlz
                    //  placeholder-opacity-50 bg-[rgba(255,255,255,0.5)] border-px border-transparent focus:outline-none ring-opacity-25 zring border-opacity-0 focus:border-opacity-100 focus:border border-px border-gray-200 border-solid ring-ath-100z zfocus:ring-opacity-100 text-md font-body font-light transition-all`}
                    className={`p-2 pl-4 w-full max-w-md placeholder-opacity-50 bg-[rgba(255,255,255,0.75)] border border-solid border-1 focus:outline-none border-opacity-0 focus:border-opacity-100 border-gray-200 text-md font-body font-light`}
                    value={filterText}
                    type="search"
                    ref={input}
                    onChange={handleFilterTextChange}
                    onKeyPress={handleKeyPress}
                    placeholder={`Enter a ticker symbol`}
                    id="input"
                  />
                </div>
                <div className="absolute max-w-md mt-10">
                  <div className="grid grid-cols-1">
                    {assetList?.map((asset, index) => {
                      if (
                        filterText.length > 1 &&
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
                                  className={`py-2 px-5 w-full ${
                                    resultCount >= 1
                                      ? ` bg-dynamicz bg-ath-100 blur-effect text-black text-xs font-light`
                                      : ""
                                  }`}
                                  id={`result-${index}`}
                                >
                                  <span className="font-bold">
                                    {asset.symbol.toUpperCase()}
                                  </span>{" "}
                                  ({asset.name})
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
          </div>
        </div>
        {/* <div className="bg-black w-full h-px" /> */}
      </div>
      <style jsx global>{`
          :root {
            --tw-ring-color: ${hexToRgba(
              assetColorsLoading ? "#00FFBA" : assetColors.vibrant
            ).slice(0, -4)}, var(--tw-ring-opacity));
          }

          .bg-dynamic {
            background-color: ${
              assetColorsLoading
                ? "#00FFBA"
                : hexToRgba(assetColors.vibrant, 0.85)
            };
          }
        `}</style>
    </div>
  );
};

export default NavBar;
