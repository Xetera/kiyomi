import { getSession, Provider } from "next-auth/client";
// Import our CSS
import "../styles/tailwind.css";
import "../styles/globals.css";
import "modern-normalize";
import ReactTooltip from "react-tooltip";
import { default as _default, alt, light } from "../colors";
import NextHead from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
  layerStyles: {
    base: {
      bg: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
    selected: {
      bg: "teal.500",
      color: "teal.700",
      borderColor: "orange.500",
    },
  },
});

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
          <div className="min-h-screen flex flex-col">
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </div>
          <ReactTooltip
            uuid="mytt"
            backgroundColor="#0c111f"
            effect="solid"
            border={true}
            borderColor={light}
          />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};
export default CustomApp;
