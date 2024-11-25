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
      },
      {
        hostname: "coin-images.coingecko.com",
      },
    ],
  },
};
