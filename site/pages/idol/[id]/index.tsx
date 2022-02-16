import { WithNavbar } from "@/components/navbar"
import { GetServerSideProps } from "next"
import { personPreferredName } from "@/client/data/person-mappers"
import { prefetchQuery } from "@/lib/client-helpers"
import { PersonPage, PersonPageProps } from "@/components/person/page"
import { decodeUriFriendly } from "@/client/data/encoders"
import { wrapRequest } from "@/lib/data-fetching"

const PersonPageWrapper = ({ id }: PersonPageProps) => {
  return (
    <WithNavbar noSpace>
      <PersonPage id={id} />
    </WithNavbar>
  )
}

export const getServerSideProps: GetServerSideProps = wrapRequest(
  async ({ prefetch, params }) => {
    if (!params?.id) {
      throw Error("Invalid page")
    }
    const id = decodeUriFriendly(params.id as string)
    const dehydratedState = await prefetch("OnePerson", { id })
    return {
      props: {
        id,
        dehydratedState,
      } as PersonPageProps,
    }
  }
)

export default PersonPageWrapper
