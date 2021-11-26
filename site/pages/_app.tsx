import React from "react"
import { Provider } from "next-auth/client"
import { Provider as ReduxProvider } from "react-redux"
// Import our CSS
import "../styles/tailwind.css"
import "../styles/globals.css"
import NextHead from "next/head"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/client/theme"
import { store } from "@/models/store"

const CustomApp = ({ Component, pageProps, ...rest }: AppProps) => {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReduxProvider store={store}>
          <Provider session={pageProps.session}>
            <ChakraProvider theme={theme}>
              <NextHead>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />
                <link
                  rel="preconnect"
                  href={process.env.NEXT_PUBLIC_BASE_URL_CDN}
                />
                <link
                  rel="dns-prefetch"
                  href={process.env.NEXT_PUBLIC_BASE_URL_CDN}
                />
              </NextHead>
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  flexFlow: "column",
                }}
              >
                {/* <GameServerGateway> */}
                <Component {...pageProps} />
                {/* </GameServerGateway> */}
              </div>
            </ChakraProvider>
          </Provider>
        </ReduxProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
export default CustomApp
