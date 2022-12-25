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
