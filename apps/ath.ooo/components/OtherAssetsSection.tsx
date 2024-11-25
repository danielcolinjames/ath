"use client";

import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";

const fallbackImageUrl = "missing_large.png";

interface OtherAssetsSectionProps {
  otherAssets: any[];
}

export const OtherAssetsSection = ({
  otherAssets,
}: OtherAssetsSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  if (!otherAssets?.length) return null;

  return (
    <div className="mt-20 w-full max-w-4xl flex flex-col items-center">
      <div className="group w-full flex flex-col items-center">
        <div
          className="flex items-center gap-4 p-5 cursor-pointer justify-center"
          onClick={() => setShowAll(!showAll)}
        >
          <p className="text-2xl font-light text-gray-400 text-center opacity-40">
            Other assets with the same ticker
          </p>
          <div
            className={`transform transition-transform duration-200 ${
              showAll ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Preview (shown when collapsed) */}
        {!showAll && otherAssets.length > 0 && (
          <div className="px-5 flex flex-col items-center justify-center w-full gap-2 opacity-40">
            {otherAssets.slice(0, 3).map((asset, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl"
                style={{
                  boxShadow: `0 0 20px -12px ${asset.accent}`,
                }}
              >
                {asset.image && asset.image !== fallbackImageUrl ? (
                  <Image
                    src={asset.image}
                    alt={asset.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-800 border border-gray-700 rounded-full" />
                )}
                <span className="text-sm font-medium text-white">
                  {asset.name}
                </span>
              </div>
            ))}
            {otherAssets.length > 3 && (
              <span className="text-sm text-gray-400">
                and {otherAssets.length - 3} more...
              </span>
            )}
          </div>
        )}

        {/* Expanded view */}
        {showAll && (
          <div className="px-5 grid w-full grid-cols-1 gap-5">
            {otherAssets.map((asset, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-black/30 backdrop-blur-sm p-3 rounded-full"
                style={{
                  boxShadow: `0 0 20px -12px ${asset.accent}`,
                }}
              >
                {asset.image && asset.image !== fallbackImageUrl ? (
                  <Image
                    src={asset.image}
                    alt={asset.name}
                    width={64}
                    height={64}
                    className="rounded-full max-w-[64px] max-h-[64px] object-contain"
                  />
                ) : (
                  <div className="w-[64px] h-[64px] bg-gray-800 border border-gray-700 rounded-full" />
                )}
                <div>
                  <p
                    className="text-base font-medium whitespace-nowrap"
                    style={{ color: asset.accent }}
                  >
                    {asset.name}
                  </p>
                  {asset.ath ? (
                    <p className="text-xl font-bold text-white">
                      ${asset.ath.toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">No ATH</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {format(new Date(asset.ath_date), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
