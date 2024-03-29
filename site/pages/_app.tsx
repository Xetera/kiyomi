import React from "react"
import { Provider } from "next-auth/client"
import { Provider as ReduxProvider } from "react-redux"
import "focus-visible/dist/focus-visible"
// Import our CSS
import "../styles/tailwind.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import theme from "@/client/theme"
import { store } from "@/models/store"
import { AppWrapper } from "@/components/app-wrapper"
import { Head } from "@/components/head"
import { UserData } from "@/components/user-data/user-data"
import GameServerGateway from "@/components/game/game-server-gateway"

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
              <Flex minHeight="100vh" flexFlow="column">
                <GameServerGateway>
                  <AppWrapper>
                    <Head />
                    <Component {...pageProps} />
                    <UserData />
                  </AppWrapper>
                </GameServerGateway>
              </Flex>
            </ChakraProvider>
          </Provider>
        </ReduxProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
export default CustomApp
