import { formatNumber } from "../../../packages/utils/numbers";

export function AssetStats({ asset }: { asset: any }) {
  const stats = [
    {
      label: "Market Cap",
      value: `$${formatNumber(asset.market_cap)}`,
    },
    {
      label: "Market Cap Rank",
      value: `#${asset.market_cap_rank}`,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10"
          >
            <p className="text-white/60 text-sm">{stat.label}</p>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
