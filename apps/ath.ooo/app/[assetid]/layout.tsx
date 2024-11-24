// import { getAssetDataFromTicker } from "../../lib/utils";

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { assetid: string };
}) {
  const { assetid } = params;
  // from Next.js docs: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
  // Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.
  // const { mainAsset } = await getAssetDataFromTicker(assetid);
  // const accentColor = mainAsset?.accentColor || "#00FFBA";

  return (
    <div
      className="w-full flex flex-col min-h-screen items-center justify-center"
      // style={{ backgroundColor: `${accentColor}00` }}
    >
      {/* <NavBar accentColor={accentColor} ticker={assetid} /> */}
      <main className="flex flex-col grow mt-14 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
