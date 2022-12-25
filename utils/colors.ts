import rgbHex from 'rgb-hex'
import { hex } from 'wcag-contrast'

interface VibrantColor {
  r?: number
  g?: number
  b?: number
  hex?: string
}

export const getVibrantColor = (palette: any) => {
  const vibrantColor: VibrantColor = {}

  // TODO: write method

  return vibrantColor
}

export const getPercentChangeColorClassName = (pc: number) => {
  return pc < -95
    ? 'text-red-900'
    : pc < -75
    ? 'text-red-800'
    : pc < -60
    ? 'text-red-700'
    : pc < -45
    ? 'text-yellow-800'
    : pc < -30
    ? 'text-yellow-700'
    : pc < -15
    ? 'text-yellow-600'
    : pc < -10
    ? 'text-yellow-500'
    : pc < -5
    ? 'text-gray-500'
    : pc > 0
    ? 'text-green-500'
    : 'text-gray-400'
}

export const getHexFromRGB = (rgbObject: any) => {
  const [r, g, b] = rgbObject
  const hex = rgbHex(r, g, b)
  return `#${hex}`
}

export const rgbToHex = (r: number, g: number, b: number) => {
  const hex = rgbHex(r, g, b)
  return `${hex}`
}

export const rgbaStringFromRGBObj = (rgbObject: any, a?: number) => {
  const [r, g, b] = rgbObject
  return `rgba(${r},${g},${b},${a})`
}

export const getAssetColorsFromVibrantObj = (obj: any) => {
  const vibrant = getHexFromRGB(obj.Vibrant.rgb)
  const darkVibrant = getHexFromRGB(obj.DarkVibrant.rgb)
  const lightVibrant = getHexFromRGB(obj.LightVibrant.rgb)
  const muted = getHexFromRGB(obj.Muted.rgb)
  const darkMuted = getHexFromRGB(obj.DarkMuted.rgb)
  const lightMuted = getHexFromRGB(obj.LightMuted.rgb)

  return { vibrant, darkVibrant, lightVibrant, muted, darkMuted, lightMuted }
}

export const getAssetColorsRGBFromVibrantObj = (obj: any) => {
  const vibrant = rgbaStringFromRGBObj(obj.Vibrant.rgb)
  const darkVibrant = rgbaStringFromRGBObj(obj.DarkVibrant.rgb)
  const lightVibrant = rgbaStringFromRGBObj(obj.LightVibrant.rgb)
  const muted = rgbaStringFromRGBObj(obj.Muted.rgb)
  const darkMuted = rgbaStringFromRGBObj(obj.DarkMuted.rgb)
  const lightMuted = rgbaStringFromRGBObj(obj.LightMuted.rgb)

  return { vibrant, darkVibrant, lightVibrant, muted, darkMuted, lightMuted }
}

export function shouldBeWhiteText(backgroundColor: string, contrastThreshold = 2) {
  if (hex('#FFFFFF', backgroundColor) >= contrastThreshold) {
    return true
  }
  return false
}
