import { fieldAuthorizePlugin, makeSchema, queryComplexityPlugin } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import * as types from "./resolvers";

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
    schema: path.join(process.cwd(), "lib", "__generated__", "schema.graphql"),
    typegen: path.join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
  },
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
  },
  contextType: {
    module: path.resolve(process.cwd(), "lib/context.ts"),
    export: "Context",
  },
  shouldExitAfterGenerateArtifacts:
    process.env.SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === "true",
  types,
});
