import NavBar from "../../components/NavBar";
import { getAssetDataFromTicker } from "../../lib/utils";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { assetid: string } }) {
  const { assetid } = params;
  // from Next.js docs: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
  // Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.
  const { mainAsset } = await getAssetDataFromTicker(assetid)
  const accentColor = mainAsset?.accentColor || "#00FFBA"

  return (
    <div className='w-full flex flex-col grow min-h-screen' style={{ backgroundColor: `${accentColor}20` }}>
      <NavBar accentColor={accentColor} ticker={assetid} />
      <main className='mt-14'>{children}</main>
    </div>
  )
}
