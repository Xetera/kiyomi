import { LoaderFunction, Outlet, useLoaderData } from "remix"
import { decodeUriFriendly } from "~/client/data-mappers/encoding"
import { sdk } from "~/client/graphql"
import { WithNavbar } from "~/components/navbar/navbar-wrapper"
import { PersonPageProps, PersonPage } from "~/components/person/page"
import { PersonContext } from "~/models/contexts"
import { OnePersonQuery } from "~/__generated__/graphql"

export type PersonWrapperLoaderContext = OnePersonQuery

export const loader: LoaderFunction = ({ params }): Promise<OnePersonQuery> => {
  if (!params.id) {
    throw new Error("Invalid")
  }
  return sdk.OnePerson({ id: decodeUriFriendly(params.id) })
}

const PersonPageWrapper = () => {
  const data = useLoaderData<PersonWrapperLoaderContext>()
  return (
    <WithNavbar noSpace>
      <PersonContext.Provider value={data}>
        <Outlet />
      </PersonContext.Provider>
    </WithNavbar>
  )
}

export default PersonPageWrapper
