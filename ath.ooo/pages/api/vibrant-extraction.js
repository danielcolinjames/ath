import * as Vibrant from "node-vibrant";

export async function getImg(url) {
  try {
    const img = new Vibrant(url);
    const colors = await img.getPalette();
    return colors;
  } catch (error) {
    console.error(error);
  }
}
