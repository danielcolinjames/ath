"use client";

import { useEffect } from "react";

interface DynamicFaviconProps {
  symbol?: string;
  accent?: string;
  theme?: "dark" | "light";
}

export function DynamicFavicon({
  symbol,
  accent = "#00FFBA",
  theme = "dark",
}: DynamicFaviconProps) {
  useEffect(() => {
    if (!symbol) return;

    const barColor = theme === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)";

    const svg = `<svg width="100%" height="100%" viewBox="0 0 3200 3200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <g transform="matrix(2.4,0,0,2.4,211,-45518.5)">
        <g id="ath" transform="matrix(0.260417,0,0,0.462963,0,19050.6)">
          <g id="Logomark" transform="matrix(2.92328,0,0,2.92328,-3684.32,-2949.28)">
            <g transform="matrix(1.18054e-16,-1.08448,2.05793,7.08818e-17,226.624,4299.46)">
              <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${barColor}"/>
            </g>
            <g transform="matrix(8.78563e-17,-0.807076,2.05793,7.08818e-17,-298.812,3646.72)">
              <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${barColor}"/>
            </g>
            <g transform="matrix(5.75469e-17,-0.528644,2.05793,7.08818e-17,-824.249,2991.56)">
              <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${barColor}"/>
            </g>
            <g transform="matrix(-2.4111,-1.66092e-16,2.52024e-16,-1.15759,8247.31,2329.39)">
              <rect x="2353.03" y="1012.95" width="544.81" height="127.661" style="fill:${accent}"/>
            </g>
          </g>
        </g>
      </g>
    </svg>`;

    const favicon = document.querySelector(
      'link[rel="icon"]',
    ) as HTMLLinkElement;
    if (favicon) {
      favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    } else {
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      document.head.appendChild(newFavicon);
    }
  }, [symbol, accent, theme]);

  return null;
}
