import { Navbar } from "@/components/navbar"
import { prefetchQuery } from "@/lib/client-helpers"
import { usePersonPageQuery } from "@/lib/__generated__/graphql"
import { Stack } from "@chakra-ui/layout"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

export default function Person() {
  const router = useRouter()
  const personId = Number(router.query.personId as string)
  const { data, isLoading } = usePersonPageQuery({ id: personId })

  return (
    <Stack>
      <Navbar />
      hi
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const personId = ctx.params?.personId
  if (!personId) {
    throw Error("No person")
  }
  const id = Number(personId)

  const dehydratedState = await prefetchQuery("PersonPageDocument", { id })
  return {
    props: { dehydratedState },
  }
}
