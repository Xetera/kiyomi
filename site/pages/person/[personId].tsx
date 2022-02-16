import { Navbar } from "@/components/navbar"
import { prefetchQuery } from "@/lib/client-helpers"
import { wrapRequest } from "@/lib/data-fetching"
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

export const getServerSideProps: GetServerSideProps = wrapRequest(
  async (ctx) => {
    const personId = ctx.params?.personId
    if (!personId) {
      throw Error("No person")
    }
    const id = Number(personId)

    const dehydratedState = await ctx.prefetch("PersonPage", { id })
    return {
      props: { dehydratedState },
    }
  }
)
