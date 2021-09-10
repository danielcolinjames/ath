import Link from "next/link";
import Image from "next/image";
import { formatNumber } from "../utils/numbers";
import { parseISO } from "date-fns";
import TimeAgo from "./TimeAgo";

const AssetCard = ({ asset, index, showGreenLine, showTimeSince }) => {
  const athTimestamp = parseISO(asset.ath_date);

  return (
    <Link href={`/${asset.symbol.toUpperCase()}`} key={`${asset.id}-${index}`}>
      <a
        className={`p-5 group text-lg sm:text-lg text-gray-700 font-semibold flex flex-col items-start sm:items-center sm:justify-between font-ath border border-gray-200 shadow-md rounded-md`}
      >
        <span className="flex flex-row items-center justify-center">
          <Image
            src={asset.image}
            height={20}
            width={20}
            alt={`${asset.name} logo`}
            className=""
          />{" "}
          <span className="pl-2 font-bold text-right">
            {asset.symbol.toUpperCase()}
            <span className="pl-2 text-gray-400 font-medium">{asset.name}</span>
          </span>
        </span>
        <span className="flex flex-col items-start sm:items-end">
          <span className="inline-block">
            {showGreenLine && (
              <div className="h-1 transform bg-transparent transition-all ease-in-out duration-200 group-hover:-translate-y-2 group-hover:bg-ath-100 group-hover:scale-110 w-full -mb-1 mt-3 sm:mt-0 sm:-mb-1" />
            )}
            <span className="font-bold text-black text-xl pt-2 sm:pt-0 sm:text-lg">
              {formatNumber(asset.ath)} USD
            </span>
          </span>
          {showTimeSince && (
            <span className="text-gray-400 font-normal">
              <TimeAgo date={athTimestamp} />
            </span>
          )}
        </span>
      </a>
    </Link>
  );
};
export default AssetCard;
