import MetaTags from "../components/MetaTags";
import { Layout } from "../components/Layout";
import { format, parseISO } from "date-fns";
import { formatNumber } from "../utils/numbers";
import {
  getAssetColorsFromVibrantObj,
  rgbaStringFromRGBObj,
} from "../utils/colors";
import { getImg } from "./api/vibes";
import cache from "../utils/cache";
import { formatInTimeZone } from "../utils/timestamps";
import { fetchList } from "../utils/coingecko";
import AssetChart from "../components/AssetChart";
import { getAssetData } from "utils/common";
import { AssetChartHeader } from "components/AssetChartHeader";
import { AssetDetailSection } from "components/AssetDetailSection";
import { OtherAssetATHList } from "components/OtherAssetATHList";
import { AssetAboutSection } from "components/AssetAboutSection";
import { generateMetaTagUrl } from "utils/links";

const AssetPage = ({
  assetid,
  assetInfoExtended,
  list,
  assetInfo,
  singleAssetMatch,
  palette,
  paletteExtended,
}: {
  asset: any;
  assetid: string;
  assetInfoExtended: any;
  list: any[];
  assetInfo: any;
  singleAssetMatch: boolean;
  palette: any;
  paletteExtended: any;
}) => {
  const assetData = getAssetData(assetInfo);
  const hasAth = !!assetData && !!assetData.ath_date;
  const rank = assetData?.market_cap_rank;
  const ath = hasAth ? formatNumber(assetData.ath) : "unknown";

  const title = `${assetData.name} (${assetid.toUpperCase()}) ATH: $${ath} | ath.ooo`;

  const [r, g, b] = palette.Vibrant.rgb;

  const url = generateMetaTagUrl(assetData, assetid, palette);

  const athTimestamp = hasAth ? parseISO(assetData?.ath_date) : null;
  const athTimestampFormatted = hasAth
    ? formatInTimeZone(athTimestamp, "h:mm:ss a", "UTC")
    : "an unknown date";

  const athDate = hasAth
    ? format(athTimestamp as Date, "MMMM do, yyyy")
    : "an unknown date";

  const descriptionText = hasAth
    ? `The all-time high price of ${assetData.name} (${assetid.toUpperCase()}) was $${formatNumber(
        assetData?.ath,
      )}, set on ${athDate} at ${athTimestampFormatted} (UTC)`
    : `The all-time high price of ${assetData.name} (${assetid.toUpperCase()}) is unknown.`;

  const assetColors =
    palette !== undefined
      ? getAssetColorsFromVibrantObj(palette)
      : {
          vibrant: "#00FFBA",
          darkVibrant: "#00FFBA",
          muted: "#00FFBA",
          darkMuted: "#00FFBA",
          lightMuted: "#00FFBA",
        };

  let assetColorsExtended: any = [];
  if (!singleAssetMatch) {
    paletteExtended.map((p: any) => {
      const pf = getAssetColorsFromVibrantObj(p);
      assetColorsExtended.push(pf);
    });
  }

  return (
    <Layout assetColors={assetColors} assetList={list} rgb={[r, g, b]}>
      <MetaTags
        description={descriptionText}
        openGraphImageAbsoluteUrl={url.toString()}
        rgb={[r, g, b]}
        title={title}
        url={`https://ath.ooo/${assetid}`}
      />
      <AssetChartHeader
        assetData={assetData}
        assetid={assetid}
        palette={palette}
        rank={rank}
      />
      <AssetChart
        assetColors={assetColors}
        assetData={assetData}
        assetInfo={assetInfo}
        className="z-10"
        palette={palette}
        wrapperClassName="max-h-[30vh]"
      />
      <AssetDetailSection
        assetColors={assetColors}
        assetData={assetData}
        assetid={assetid}
        ath={ath}
        athDate={athDate}
        athTimestamp={athTimestamp}
        athTimestampFormatted={athTimestampFormatted}
        hasAth={hasAth}
        palette={palette}
      />
      <AssetAboutSection
        assetColors={assetColors}
        assetColorsExtended={assetColorsExtended}
        assetData={assetData}
        assetInfo={assetInfo}
        assetInfoExtended={assetInfoExtended}
        assetid={assetid}
        palette={palette}
        singleAssetMatch={singleAssetMatch}
      />

      {/* TODO: find a better way to display these (maybe a ticker tape across the top) */}
      {/* <OtherAssetATHList market={market} marketLoading={marketLoading} palette={palette} /> */}

      {/* TODO: find a better way to make these styles update with dynamic asset color */}
      <style global jsx>{`
        ::-moz-selection {
          color: black !important;
          background: ${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            0.85,
          )} !important;
        }
        ::selection {
          color: black !important;
          background: ${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            0.85,
          )} !important;
        }
        #nprogress .bar {
          height: 5px;
          background: ${rgbaStringFromRGBObj(
            palette.Vibrant.rgb,
            1,
          )} !important;
        }

        #nprogress .peg {
          box-shadow:
            0 0 10px ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)},
            0 0 5px ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)};
        }
        #nprogress .spinner-icon {
          border-top-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)};
          border-left-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 1)};
        }
        .coingecko-link:hover {
          background-color: ${rgbaStringFromRGBObj(palette.Vibrant.rgb, 0.075)};
        }
        .desc-p {
          @apply text-gray-500 py-0.5 font-ath font-light;
        }
        .desc-a {
          color: ${rgbaStringFromRGBObj(palette.DarkVibrant.rgb, 0.85)};
        }
      `}</style>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  // TODO: clean up this section into utils and tidier logic
  // TODO: cache palette with key of assetid
  // TODO: convert all CoinGecko API calls to use CoinGecko library instead of raw strings
  const { params } = context;
  const { assetid } = params;

  let props: any = {};

  // add `assetid` to props
  props.assetid = assetid;

  const list = await cache.fetch("ath:full-list", fetchList, 60 * 60 * 12);
  // add `list` to props
  props.list = list;

  const asset = list.find((x: any) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  const matchingAssets = list.filter((x: any) => {
    return x.symbol.toLowerCase() === assetid.toLowerCase();
  });

  const numberOfSlashes = context?.req?.url?.split("/")?.length - 1;

  if (
    matchingAssets.length === 0 ||
    // for when a token with the ticker API inevitably gets listed on coingecko
    (assetid?.toLowerCase() === "api" && !(numberOfSlashes > 1))
  ) {
    return {
      // return 404 error
      notFound: true,
    };
  } else {
    try {
      // add `asset` to props
      props.asset = asset;

      const singleAssetMatch = matchingAssets.length === 1;

      // add `singleAssetMatch` to props
      props.singleAssetMatch = singleAssetMatch;

      let assetCoingeckoId = "";

      if (singleAssetMatch) {
        assetCoingeckoId = asset.id;
      } else {
        // multiple found with same ticker symbol
        const multipleAssetsArray: any = [];
        matchingAssets.map((matchingAssetObject: any) => {
          multipleAssetsArray.push(matchingAssetObject.id);
        });
        assetCoingeckoId = multipleAssetsArray.join(",");
      }

      const assetsResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetCoingeckoId}`,
      );

      const assetInfo = await assetsResponse.json();
      props.assetInfo = assetInfo;

      const assetInfoExtended =
        await fetch(`https://api.coingecko.com/api/v3/coins/${assetInfo[0].id}?localization=en&tickers=true&market_data=false&community_data=true&developer_data=true&sparkline=false
      `);
      // add `assetInfoExtended` to props
      props.assetInfoExtended = await assetInfoExtended.json();

      let palette: any;
      if (singleAssetMatch) {
        palette = await getImg(assetInfo[0].image);
      } else {
        palette = await getImg(assetInfo[0].image);
        const paletteExtended = await Promise.all(
          assetInfo.map(async (a: any, i: any) => {
            const p = await getImg(a.image);
            return JSON.parse(JSON.stringify(p));
          }),
        );
        // add `paletteExtended` to props
        props.paletteExtended = paletteExtended;
      }

      if (palette.Vibrant === null) palette.Vibrant = { rgb: [125, 125, 125] };
      if (palette.DarkVibrant === null)
        palette.DarkVibrant = { rgb: [125, 125, 125] };
      if (palette.LightVibrant === null)
        palette.LightVibrant = { rgb: [125, 125, 125] };
      if (palette.Muted === null) palette.Muted = { rgb: [125, 125, 125] };
      if (palette.DarkMuted === null)
        palette.DarkMuted = { rgb: [125, 125, 125] };
      if (palette.LightMuted === null)
        palette.LightMuted = { rgb: [125, 125, 125] };

      // add `palette` to props
      props.palette = JSON.parse(JSON.stringify(palette));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return {
        props: {},
      };
    }
  }

  return {
    props,
  };
}

export default AssetPage;
