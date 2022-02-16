const { resolve } = require("path")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  // swcMinify: true,
  experimental: {
    scrollRestoration: true,
    externalDir: true,
  },
  images: {
    domains: ["localhost", "img.kiyomi.io", "cdn.discordapp.com"],
  },
  webpack: (config, { isServer }) => {
    config.resolve.extensions = [".mjs", ".js", ".jsx", ".tsx", ".ts", ".json"]

    // if (!isServer) {
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   lodash: "lodash-es",
    // }
    config.resolve.fallback = {
      fs: false,
      path: false,
      bufferutil: false,
      "utf-8-validate": false,
    }
    return config
  },
})
