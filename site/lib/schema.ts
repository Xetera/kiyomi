import { fieldAuthorizePlugin, makeSchema, queryComplexityPlugin } from "nexus"
import { nexusPrisma } from "nexus-plugin-prisma"
import path from "path"
import * as types from "./resolvers"

const publicTypes = Object.fromEntries(
  Object.entries(types).map(([key, value]) => {
    return [
      key,
      Object.fromEntries(
        Object.entries(value).filter(
          ([name]) => !name.toLowerCase().startsWith("private")
        )
      ),
    ]
  })
)

const sourceTypes = {
  modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
}
const outBase = path.join(process.cwd(), "..", "shared")

const contextType = {
  module: path.resolve(outBase, "context-type.ts"),
  export: "Context",
}

export const schema = makeSchema({
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      paginationStrategy: "prisma",
    }),
    fieldAuthorizePlugin(),
    queryComplexityPlugin(),
  ],
  outputs: {
    schema: path.join(outBase, "schema.graphql"),
    typegen: path.join(outBase, "index.d.ts"),
  },
  sourceTypes,
  contextType,
  shouldExitAfterGenerateArtifacts:
    process.env.SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  types: publicTypes,
})

export const privateSchema = makeSchema({
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      paginationStrategy: "prisma",
    }),
    fieldAuthorizePlugin(),
    queryComplexityPlugin(),
  ],
  outputs: {
    schema: path.join(outBase, "private.schema.graphql"),
    typegen: path.join(outBase, "private.index.d.ts"),
  },
  sourceTypes,
  contextType,
  shouldExitAfterGenerateArtifacts:
    process.env.SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  types,
})
