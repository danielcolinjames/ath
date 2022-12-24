import Vibrant from 'node-vibrant'

export default async function handler(req: any, res: any) {
  const imageUrl = req?.query?.image
  const asset = req?.query?.asset

  if (imageUrl) {
    const colors = await getImg(imageUrl)

    res.statusCode = 200
    res.json(colors)
  } else if (asset) {
    try {
      const assetRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset}`
      )
      const [{ image: derivedImageUrl }] = await assetRes.json()

      const derivedColors = await getImg(derivedImageUrl)
      res.statusCode = 200
      res.json(derivedColors)
    } catch (e) {
      res.statusCode = 404
      res.json({
        error: `Asset not found. Try the full unique asset name, e.g. 'Bitcoin' instead of 'BTC'.`,
      })
    }
  } else {
    res.statusCode = 404
  }
}

export async function getImg(url: string) {
  try {
    const img = new Vibrant(url)
    const colors = await img.getPalette()
    return colors
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
