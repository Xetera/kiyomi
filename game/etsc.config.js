const { build } = require("esbuild")
const path = require("path")

build({
  entryPoints: ["./src/index.ts", path.resolve("../shared/game.ts")],
  tsconfig: path.resolve("./tsconfig.json"),
  outdir: path.resolve("./dist"),
  bundle: false,
  target: "node14",
}).catch((err) => console.error(err))
