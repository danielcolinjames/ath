export const getAssetData = (assetInfo: any) => {
  if (assetInfo?.length === 0 || assetInfo[0] === null) {
    return null
  }
  return assetInfo[0]
}

export const hasAth = (assetInfo: any) => {
  assetInfo[0].ath !== null
}
