/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.coingecko.com"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // require("./scripts/generate-sitemap");
    }
    return config;
  },
}

module.exports = nextConfig
