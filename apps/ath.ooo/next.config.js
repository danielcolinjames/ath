/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  images: {
    domains: ["assets.coingecko.com", "coin-images.coingecko.com"],
  },
};
