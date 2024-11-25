export async function loadLocalFont() {
  const FONT_URL = "https://ath.ooo/Satoshi-Black.otf";

  try {
    const response = await fetch(FONT_URL);
    if (response.ok) {
      return await response.arrayBuffer();
    }
    throw new Error(`Failed to load font: ${response.statusText}`);
  } catch (error) {
    console.error("Error loading font:", error);
    return null;
  }
}
