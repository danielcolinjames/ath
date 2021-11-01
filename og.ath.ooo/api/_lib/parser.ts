import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { image, assetSymbol, assetName, r, g, b, ath } = query || {};

  if (Array.isArray(r)) {
    throw new Error("Expected a single r value");
  }
  if (Array.isArray(g)) {
    throw new Error("Expected a single g value");
  }
  if (Array.isArray(b)) {
    throw new Error("Expected a single b value");
  }
  if (Array.isArray(assetSymbol)) {
    throw new Error("Expected a single asset symbol");
  }
  if (Array.isArray(assetName)) {
    throw new Error("Expected a single asset name");
  }
  if (Array.isArray(image)) {
    throw new Error("Expected a single image source");
  }
  if (Array.isArray(ath)) {
    throw new Error("Expected a single ath value");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
    assetSymbol: assetSymbol || "",
    assetName: assetName || "",
    image: image || "",
    r: r || "255",
    g: g || "255",
    b: b || "255",
    ath: ath || "",
  };
  return parsedRequest;
}
