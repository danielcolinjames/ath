import { rgbToHex, shouldBeWhiteText } from 'utils/colors'

export const generateMetaTagUrl = (assetData: any, assetid: string, palette: any): URL => {
  const [r, g, b] = palette.Vibrant.rgb

  const url = new URL('https://ath.ooo/api/og')
  // url.pathname = `${encodeURIComponent(`${assetData.symbol}`)}.png`;

  // name
  url.searchParams.append('n', assetData.name)
  // ticker
  url.searchParams.append('t', assetid.toUpperCase())
  // image
  url.searchParams.append('i', assetData.image)
  // r
  url.searchParams.append('r', r)
  // g
  url.searchParams.append('g', g)
  // b
  url.searchParams.append('b', b)
  const white = shouldBeWhiteText(rgbToHex(r, g, b))
  // 1 if white text passes contrast, 0 if not
  url.searchParams.append('w', white ? '1' : '0')

  // useful for Open Graph debugging
  // console.log(
  //   `http://localhost:3001${url.pathname}${decodeURIComponent(url.search)}`
  // );

  return url
}

export const generateSocialLinks = (la: any) => {
  const links = []

  if (la.subreddit_url) {
    links.push(la.subreddit_url)
  }

  if (la.twitter_screen_name) links.push(`https://twitter.com/${la.twitter_screen_name}`)

  return links
}

export const generateOtherLinks = (la: any) => {
  const links: any = []

  if (la.homepage.length !== 0) {
    la.homepage.map((l: any) => {
      if (l) links.push({ url: l, icon: 'web' })
    })
  }
  if (la.blockchain_site.length !== 0) {
    la.blockchain_site.map((l: any) => {
      if (l)
        links.push({
          url: l,
          icon: l.includes('explorer') ? 'explorer' : 'block',
        })
    })
  }
  return links
}
