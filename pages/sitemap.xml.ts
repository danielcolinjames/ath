import React from "react";

const EXTERNAL_DATA_URL = "https://api.coingecko.com/api/v3/coins/list";

const createSitemap = (assets: any) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    <url>
                        <loc>https://ath.ooo</loc>
                    </url>
        ${assets
          .map(({ symbol }: { symbol: any }) => {
            if (
              !symbol.includes("+") &&
              !symbol.includes("/") &&
              symbol !== "404"
            )
              return `
                    <url>
                        <loc>${`https://ath.ooo/${symbol}`}</loc>
                    </url>
                `;
          })
          .join("")}
    </urlset>`;

class Sitemap extends React.Component {
  static async getInitialProps({ res }: { res: any }) {
    const marketRes = await fetch(EXTERNAL_DATA_URL);
    const market = await marketRes.json();

    res.setHeader("Content-Type", "text/xml");
    res.write(createSitemap(market));
    res.end();
  }
}

export default Sitemap;
