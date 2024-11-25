import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "../../../packages/utils/numbers";
import { format } from "date-fns";

export function AssetCard({ asset }: { asset: any }) {
  return (
    <Link
      href={`/${asset.symbol}`}
      className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-white/20"
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"
        style={{ backgroundColor: asset.accent || "#FFF" }}
      />

      {/* Content container */}
      <div className="relative p-6 flex flex-col gap-4">
        {/* Header with icon and name */}
        <div className="flex items-center gap-4">
          <Image
            src={asset.image}
            alt={asset.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <h3 className="text-xl font-bold text-white">{asset.name}</h3>
        </div>

        {/* Price information */}
        <div className="flex flex-col gap-2">
          <p className="text-white/60 text-sm">All-time high</p>
          <div>
            <p
              className="text-3xl font-bold"
              style={{ color: asset.accent || "#00FFBA" }}
            >
              ${formatNumber(asset.ath)}
            </p>
            <p className="text-white/60 text-sm mt-1">
              {format(new Date(asset.ath_date), "'at' h:mma 'on' MMM do, yyyy")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
