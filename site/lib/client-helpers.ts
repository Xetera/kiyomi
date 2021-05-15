import * as g from "@/__generated__/graphql";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

export async function prefetchQuery(key: string, variables: any) {
  const document = g[key + "Document"];
  const client = new QueryClient();

  await client.prefetchQuery(
    [key, variables],
    g.fetcher(document, variables),
    {}
  );
  return dehydrate(client);
}
