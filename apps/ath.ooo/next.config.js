const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.alias["@repo"] = path.join(__dirname, "packages");
    return config;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "assets.coingecko.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "coin-images.coingecko.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24, // Cache for 24 hours
  },
};
