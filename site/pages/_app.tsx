import React from "react"
import { SessionProvider } from "next-auth/react"
import { Provider as ReduxProvider } from "react-redux"
import "focus-visible/dist/focus-visible"
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

const CustomApp = ({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
  ...rest
}: AppProps) => {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={dehydratedState}>
        <ReduxProvider store={store}>
          <SessionProvider session={session}>
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
          </SessionProvider>
        </ReduxProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
export default CustomApp
