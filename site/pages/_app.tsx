import { Provider } from "next-auth/client"
import { Provider as ReduxProvider } from "react-redux"
// Import our CSS
import "../styles/tailwind.css"
import "../styles/globals.css"
import ReactTooltip from "react-tooltip"
import { default as _default, alt, light } from "@/colors"
import NextHead from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import React from "react"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider, CSSReset } from "@chakra-ui/react"
import theme from "@/client/theme"
import { store } from "@/models/store"
import GameServerGateway from "@/components/game/game-server-gateway"
import { Flex } from "@chakra-ui/layout"

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
              </NextHead>
              <Flex minHeight="100vh" flexFlow="column">
                {/* <GameServerGateway> */}
                  <CSSReset />
                  <Component {...pageProps} />
                {/* </GameServerGateway> */}
              </Flex>
              <ReactTooltip
                uuid="mytt"
                backgroundColor="#0c111f"
                effect="solid"
                border={true}
                borderColor={light}
              />
            </ChakraProvider>
          </Provider>
        </ReduxProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
export default CustomApp
