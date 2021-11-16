module.exports = {
  images: {
    domains: ["assets.coingecko.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // require("./scripts/generate-sitemap");
    }
    return config;
  },
};
