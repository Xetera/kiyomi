const { resolve } = require("path")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  experimental: {
    externalDir: true,
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["localhost", "my.simp.pics", "cdn.discordapp.com"],
  },
  webpack: (config) => {
    config.resolve.extensions = [".mjs", ".js", ".jsx", ".tsx", ".ts", ".json"]
    return config
  },
})
