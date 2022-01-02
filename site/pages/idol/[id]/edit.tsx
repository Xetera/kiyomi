import { decodeUriFriendly } from "@/client/data"
import {
  PersonEditPage,
  PersonEditPageProps,
} from "@/components/data-entry/person-edit/page"
import { WithNavbar } from "@/components/navbar"
import { PermissionsFor, withAuthorizedUser } from "@/lib/permissions"

const PersonEditPageWrapper = ({ id }: PersonEditPageProps) => {
  return (
    <WithNavbar>
      <PersonEditPage id={id} />
    </WithNavbar>
  )
}

export const getServerSideProps = withAuthorizedUser<PersonEditPageProps>(
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
