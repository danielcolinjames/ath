import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

const NavBar = ({ assetList }) => {
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
    setFilterText(event.target.value);
  };

  let resultCount = 0;

  return (
    <div className="w-full fixed z-30 bg-black">
      <div className="py-4 bg-black flex justify-start items-center w-full max-w-2xl mx-auto px-5">
        <Link href="/">
          <a className="p-0 m-0 -mb-2">
            <div className="block md:hidden">
              <Image
                className="image-override"
                src="/logo/logo_transparent_tight.png"
                width={33.7}
                height={33.9}
                alt="ATH.ooo logo"
              />
            </div>
            <div className="hidden md:block">
              <Image
                className="image-override"
                src="/logo/wordmark_transparent_tight.png"
                width={163.285714286}
                height={38.857142857}
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
                className="p-2 w-full max-w-md border border-solid border-gray-200 focus:border-ath-100 placeholder-opacity-50 focus:outline-none focus:ring ring-ath-100 ring-opacity-50 h-10 text-md"
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
                  if (filterText.length > 1 && asset.symbol === filterText) {
                    resultCount++;
                    return (
                      <div
                        className={`w-full bg-white border border-solid border-gray-200`}
                        key={`result-${index}`}
                      >
                        <div className="flex flex-row items-center justify-start">
                          <Link href={`/${asset.symbol}`}>
                            <a
                              onClick={() => {
                                setFilterText("");
                              }}
                              className={`py-1 px-2 w-full ${
                                resultCount >= 1
                                  ? "bg-ath-100 bg-opacity-25 text-black"
                                  : ""
                              }`}
                              id={`result-${index}`}
                            >
                              {asset.name} ({asset.symbol.toUpperCase()})
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
      <div className="bg-black w-full h-px" />
    </div>
  );
};

export default NavBar;
