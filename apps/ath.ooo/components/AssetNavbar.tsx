"use client";
import Image from "next/image";
import Link from "next/link";
import athLogoWithoutBar from "../public/images/ath-logo-without-bar.svg";
import athSquareWithoutBar from "../public/images/ath-square-without-bar.svg";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface AssetNavbarProps {
  asset?: {
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    ath: number;
    ath_date: string;
    accent?: string;
  };
  is404?: boolean;
}

function Bar({ color }: { color: string }) {
  return (
    <svg
      width="auto"
      height="auto"
      viewBox="0 0 250 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_44_32)">
        <path
          d="M73.9741 22.4507L186.285 22.4507V-8.2016e-05L73.9741 -8.2016e-05V22.4507Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_44_32">
          <rect width="250" height="159.77" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function AssetNavbar({ asset, is404 }: AssetNavbarProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [ticker, setTicker] = useState(
    is404 ? "" : asset?.symbol.toUpperCase() || "",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (ticker.trim()) {
      router.push(`/${ticker.trim().toLowerCase()}`);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Only reset the ticker if we're not on 404 page
    if (!is404) {
      setTicker(asset?.symbol.toUpperCase() || "");
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Auto-focus the input on 404 page
  useEffect(() => {
    if (is404) {
      setIsEditing(true);
    }
  }, [is404]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center ml-[72px]">
            <Link
              href="/"
              className="flex relative w-10 justify-center items-center"
            >
              <Image
                src={athLogoWithoutBar}
                className="absolute inset-0 w-10 h-full animate-opacityPulse"
                alt="Logo"
              />
              <Image
                src={athSquareWithoutBar}
                className="absolute inset-0 w-10 h-full"
                alt="Square"
              />
              <Bar color={is404 ? "#FF0000" : asset?.accent || "#00FFBA"} />
            </Link>
            <div className="flex flex-row items-center gap-2 mt-1.5 ml-4">
              <h1 className="text-xl font-bold text-white/60">/</h1>
              {!is404 && asset?.image && (
                <Image
                  src={asset.image}
                  alt={asset.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <div className="relative w-24 h-[28px] flex items-center">
                <div className="absolute inset-0 flex items-center">
                  {isEditing ? (
                    <form
                      onSubmit={handleSubmit}
                      className="w-full flex items-center"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        onBlur={handleBlur}
                        placeholder={is404 ? "Search..." : ""}
                        className="w-full px-0 py-0 text-lg font-bold bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-white/20"
                        style={{
                          caretColor: is404
                            ? "#FF0000"
                            : asset?.accent || "#00FFBA",
                        }}
                      />
                    </form>
                  ) : (
                    <p
                      className="text-lg font-bold cursor-pointer hover:text-white/80 transition-colors w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      {ticker || "404"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
