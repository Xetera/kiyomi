import { Box } from "@chakra-ui/react"
import { LoaderFunction, useLoaderData } from "remix"
import { decodeUriFriendly } from "~/client/data-mappers/encoding"
import { sdk } from "~/client/graphql"
import { GroupMembersQuery } from "~/__generated__/graphql"

type LoaderContext = GroupMembersQuery

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderContext> => {
  if (!params.id) {
    throw new Error("Invalid group")
  }
  return sdk.GroupMembers({ groupId: decodeUriFriendly(params.id) })
}

export default function MembersPage() {
  const data: LoaderContext = useLoaderData()
  return (
    <Box as="pre" maxH="50vh" w="full" overflowX="hidden">
      {JSON.stringify(data, null, 2)}
    </Box>
  )
}
