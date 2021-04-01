import { getSession, Provider } from "next-auth/client";
// Import our CSS
import "../styles/tailwind.css";
import "../styles/globals.css";
// import { SkeletonTheme } from "react-loading-skeleton";
// import ReactTooltip from "react-tooltip";
import { default as _default, alt, light } from "../colors";
import NextHead from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider session={pageProps.session}>
          <NextHead>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </NextHead>
          {/* <SkeletonTheme
        color="rgba(34, 50, 64, 0.5)"
        highlightColor="rgba(34, 50, 64, 0.7)"
      > */}
          <div className="min-h-screen flex flex-col">
            <Component {...pageProps} />
          </div>
          {/* </SkeletonTheme> */}
          {/* <ReactTooltip
        uuid="mytt"
        backgroundColor="#0c111f"
        effect="solid"
        border={true}
        borderColor={light}
        //border={true} borderColor="red"
      /> */}
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};
export default CustomApp;
