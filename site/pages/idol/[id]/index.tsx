import { WithNavbar } from "@/components/navbar"
import { GetServerSideProps } from "next"
import { personPreferredName } from "@/client/data/person-mappers"
import { prefetchQuery } from "@/lib/client-helpers"
import { PersonPage, PersonPageProps } from "@/components/person/page"
import { decodeUriFriendly } from "@/client/data/encoders"

const PersonPageWrapper = ({ id }: PersonPageProps) => {
  return (
    <WithNavbar noSpace>
      <PersonPage id={id} />
    </WithNavbar>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    throw Error("Invalid page")
  }
  const id = decodeUriFriendly(params.id as string)
  const dehydratedState = await prefetchQuery("OnePerson", { id })
  return {
    props: {
      id,
      dehydratedState,
    } as PersonPageProps,
  }
}

export default PersonPageWrapper
