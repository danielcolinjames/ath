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

  return (
    <div className="w-full h-14 zshadow-xl fixed z-50 bg-[rgba(255,255,255,0.5)] blur-effect zborder zborder-solid zborder-[#fefefe]">
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
              </a>
            </Link>
            {/* Search bar */}
            {assetList && (
              <div className="flex flex-grow flex-wrap pl-6">
                <div className="w-full relative">
                  <input
                    className={`p-2 pl-4 w-full max-w-md placeholder-opacity-50 bg-[rgba(255,255,255,0.75)] border border-solid border-1 focus:outline-none border-opacity-0 focus:border-opacity-100 border-gray-200 text-md font-body font-light mr-2`}
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
                                      ? `bg-[rgba(235,238,235,0.95)] blur-effect text-black text-xs font-light`
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
      <div
        className="mt-px h-px w-full"
        style={{
          backgroundColor: assetColorsLoading
            ? "transparent"
            : hexToRgba(assetColors.vibrant, 0.2),
        }}
      />
      <style jsx global>{`
        .bg-dynamic {
          background-color: ${!assetColorsLoading &&
          assetColors !== undefined &&
          !assetColorsError
            ? hexToRgba(assetColors?.vibrant, 0.85)
            : "#00FFBA"};
        }
      `}</style>
    </div>
  );
};

export default NavBar;
