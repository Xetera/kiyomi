import { Provider } from "next-auth/client"
// Import our CSS
import "../styles/tailwind.css"
import "../styles/globals.css"
import ReactTooltip from "react-tooltip"
import { default as _default, alt, light } from "../colors"
import NextHead from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import React from "react"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import theme from "@/client/theme"

const CustomApp = ({ Component, pageProps, ...rest }: AppProps) => {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
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
              <CSSReset />
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
  )
}
export default CustomApp
