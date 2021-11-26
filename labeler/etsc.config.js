const { build } = require("esbuild")
const path = require("path")

build({
  entryPoints: ["./src/index.ts"],
  tsconfig: path.resolve("./tsconfig.json"),
  outdir: path.resolve("./dist"),
  bundle: false,
  format: "esm",
  platform: "node",
}).catch((err) => console.error(err))
