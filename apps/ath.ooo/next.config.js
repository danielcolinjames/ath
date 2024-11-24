const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.alias["@repo"] = path.join(__dirname, "packages");
    return config;
  },
  images: {
    domains: ["assets.coingecko.com", "coin-images.coingecko.com"],
  },
};
