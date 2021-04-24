import { fieldAuthorizePlugin, makeSchema, queryComplexityPlugin } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import * as types from "./resolvers";

const publicTypes = Object.fromEntries(
  Object.entries(types).map(([key, value]) => {
    return [key, Object.fromEntries(
      Object.entries(value).filter(([name]) => !name.toLowerCase().startsWith("private"))
    )]
  })
)
console.log(types)
console.log(publicTypes)

const sourceTypes = {
  modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
}
const contextType = {
  module: path.resolve(process.cwd(), "lib/context-type.ts"),
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
    schema: path.join(process.cwd(), "__generated__", "schema.graphql"),
    typegen: path.join(process.cwd(), "__generated__", "index.d.ts"),
  },
  sourceTypes,
  contextType,
  shouldExitAfterGenerateArtifacts:
    process.env.SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  types: publicTypes,
});

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
    schema: path.join(process.cwd(), "__generated__", "private.schema.graphql"),
    typegen: path.join(process.cwd(), "__generated__", "private.index.d.ts"),
  },
  sourceTypes,
  contextType,
  shouldExitAfterGenerateArtifacts:
    process.env.SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  types,
});

if (process.env.SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS) {
  process.exit(0)
}