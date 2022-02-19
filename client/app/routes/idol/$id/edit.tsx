import { LoaderFunction, useLoaderData } from "remix"
import { decodeUriFriendly } from "~/client/data-mappers/encoding"
import { sdk } from "~/client/graphql"
import { PersonEditPage } from "~/components/data-entry/person-edit/page"
import { WithNavbar } from "~/components/navbar/navbar-wrapper"
import { OnePersonQuery } from "~/__generated__/graphql"

type PersonEditPageWrapperProps = {
  id: number
}

export const loader: LoaderFunction = ({ params }) => {
  if (!params.id) {
    throw new Error("Invalid")
  }
  return sdk.OnePerson({ id: decodeUriFriendly(params.id) })
}

const PersonEditPageWrapper = ({ id }: PersonEditPageWrapperProps) => {
  const data = useLoaderData<OnePersonQuery>()
  console.log({ data })
  return (
    <WithNavbar noSpace>
      {data.person && <PersonEditPage person={data.person} />}
    </WithNavbar>
  )
}

export default PersonEditPageWrapper
