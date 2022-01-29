import { decodeUriFriendly } from "@/client/data/encoders"
import { PersonEditPage } from "@/components/data-entry/person-edit/page"
import { WithNavbar } from "@/components/navbar"
import { PermissionsFor, withAuthorizedUser } from "@/lib/permissions"
import { useOnePersonQuery } from "@/lib/__generated__/graphql"

type PersonEditPageWrapperProps = {
  id: number
}

const PersonEditPageWrapper = ({ id }: PersonEditPageWrapperProps) => {
  const { data } = useOnePersonQuery({ id })
  return (
    <WithNavbar noSpace>
      {data?.person && <PersonEditPage person={data.person} />}
    </WithNavbar>
  )
}

export const getServerSideProps = withAuthorizedUser<PersonEditPageWrapperProps>(
  PermissionsFor.editingIdol,
  async (context) => {
    const { params } = context
    if (params?.id === undefined) {
      throw Error("Invalid page")
    }

    const id = decodeUriFriendly(params.id as string)
    return {
      props: {
        id,
      },
    }
  }
)

export default PersonEditPageWrapper
