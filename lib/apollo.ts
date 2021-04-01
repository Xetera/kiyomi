import { withApollo as nextApollo } from "next-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

function makeApollo(ctx?: NextPageContext) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
      credentials: "include",
    }),
    cache: new InMemoryCache(),
    headers: {
      cookie: (!process.browser && ctx?.req?.headers.cookie) || "",
    },
  });
}

// const withApollo = ;

export default nextApollo(makeApollo);
