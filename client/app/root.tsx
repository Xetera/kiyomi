import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix"
import { ChakraProvider } from "@chakra-ui/react"
import type { MetaFunction } from "remix"
import { Provider as ReduxProvider } from "react-redux"
import theme from "./client/theme"
import { useRef } from "react"
import { GraphQLClient } from "graphql-request"
import { GraphqlClientContext } from "./models/contexts"
import { getSdk } from "./__generated__/graphql"
import { getEnv } from "./server/config"
import { AppWrapper } from "./components/layouts/app-wrapper"
import { store } from "./models/store"
import "focus-visible/dist/focus-visible"

export const meta: MetaFunction = () => {
  return { title: "New Remix App" }
}

export const loader: LoaderFunction = () => {
  return {
    ENV: getEnv(),
  }
}

export default function App() {
  const data = useLoaderData()
  const graphqlClient = useRef(new GraphQLClient(data.ENV.GRAPHQL_API))
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ReduxProvider store={store}>
          <ChakraProvider theme={theme}>
            <GraphqlClientContext.Provider
              value={getSdk(graphqlClient.current)}
            >
              <AppWrapper>
                <Outlet />
              </AppWrapper>
            </GraphqlClientContext.Provider>
          </ChakraProvider>
        </ReduxProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}
