export type FileType = "png" | "jpeg";
// export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  ath: string;
  text: string;
  assetName: string;
  assetSymbol: string;
  image: string;
  r: string;
  g: string;
  b: string;
}
