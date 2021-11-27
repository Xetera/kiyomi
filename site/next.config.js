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
    domains: ["localhost", "my.simp.pics", "cdn.discordapp.com"],
  },
  webpack: (config, { isServer }) => {
    config.resolve.extensions = [".mjs", ".js", ".jsx", ".tsx", ".ts", ".json"]

    // if (!isServer) {
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   lodash: "lodash-es",
    // }
    config.resolve.fallback = {
      bufferutil: false,
      "utf-8-validate": false,
    }
    return config
  },
})
