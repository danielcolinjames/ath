export const generateSocialLinks = (la) => {
  const links = []

  if (la.subreddit_url) {
    links.push(la.subreddit_url)
  }

  if (la.twitter_screen_name) links.push(`https://twitter.com/${la.twitter_screen_name}`)

  return links
}

export const generateOtherLinks = (la) => {
  const links = []

  if (la.homepage.length !== 0) {
    la.homepage.map((l) => {
      if (l) links.push({ url: l, icon: 'web' })
    })
  }
  if (la.blockchain_site.length !== 0) {
    la.blockchain_site.map((l) => {
      if (l)
        links.push({
          url: l,
          icon: l.includes('explorer') ? 'explorer' : 'block',
        })
    })
  }
  return links
}
