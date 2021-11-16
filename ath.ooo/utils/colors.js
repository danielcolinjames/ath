import rgbHex from "rgb-hex";

export const getHexFromRGB = (rgbObject) => {
  const [r, g, b] = rgbObject;
  const hex = rgbHex(r, g, b);
  return `#${hex}`;
};
export const rgbaStringFromRGBObj = (rgbObject, a) => {
  const [r, g, b] = rgbObject;
  return `rgba(${r},${g},${b},${a})`;
};

export const getAssetColorsFromVibrantObj = (obj) => {
  const vibrant = getHexFromRGB(obj.Vibrant.rgb);
  const darkVibrant = getHexFromRGB(obj.DarkVibrant.rgb);
  const lightVibrant = getHexFromRGB(obj.LightVibrant.rgb);
  const muted = getHexFromRGB(obj.Muted.rgb);
  const darkMuted = getHexFromRGB(obj.DarkMuted.rgb);
  const lightMuted = getHexFromRGB(obj.LightMuted.rgb);

  return { vibrant, darkVibrant, lightVibrant, muted, darkMuted, lightMuted };
};

export const getAssetColorsRGBFromVibrantObj = (obj) => {
  const vibrant = rgbaStringFromRGBObj(obj.Vibrant.rgb);
  const darkVibrant = rgbaStringFromRGBObj(obj.DarkVibrant.rgb);
  const lightVibrant = rgbaStringFromRGBObj(obj.LightVibrant.rgb);
  const muted = rgbaStringFromRGBObj(obj.Muted.rgb);
  const darkMuted = rgbaStringFromRGBObj(obj.DarkMuted.rgb);
  const lightMuted = rgbaStringFromRGBObj(obj.LightMuted.rgb);

  return { vibrant, darkVibrant, lightVibrant, muted, darkMuted, lightMuted };
};
