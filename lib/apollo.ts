import { withApollo as nextApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

function makeApollo(ctx?: NextPageContext) {
  return new ApolloClient({
    ssrMode: true,
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
    headers: {
      cookie: (!process.browser && ctx?.req?.headers.cookie) || "",
    },
  });
}

const withApollo = nextApollo(makeApollo);

export default withApollo;
