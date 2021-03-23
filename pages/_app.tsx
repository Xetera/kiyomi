import React from "react";
import { Provider } from "next-auth/client";
// Import our CSS
import "../styles/tailwind.css";
import "../styles/globals.css";
import { Navbar } from "@/components/navbar";
import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { trpc } from "@/lib/trpc";
import { SkeletonTheme } from "react-loading-skeleton";
import ReactTooltip from "react-tooltip";
import { default as _default, alt, light } from "../colors";
import NextHead from "next/head";
import withApollo from "@/lib/apollo";

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={trpc.queryClient}>
        <Hydrate state={trpc.useDehydratedState(pageProps.dehydratedState)}>
          <NextHead>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </NextHead>
          <SkeletonTheme
            color="rgba(34, 50, 64, 0.5)"
            highlightColor="rgba(34, 50, 64, 0.7)"
          >
            <div className="min-h-screen flex flex-col">
              <Component {...pageProps} />
            </div>
          </SkeletonTheme>
          <ReactTooltip
            uuid="mytt"
            backgroundColor="#0c111f"
            effect="solid"
            border={true}
            borderColor={light}
            //border={true} borderColor="red"
          />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
