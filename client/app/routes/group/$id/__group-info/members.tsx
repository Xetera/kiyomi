import { Box } from "@chakra-ui/react"
import { LoaderFunction, useLoaderData } from "remix"
import { sdk } from "~/client/graphql"
import { GroupMembersQuery } from "~/__generated__/graphql"

type LoaderContext = GroupMembersQuery

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderContext> => {
  return sdk.GroupMembers({ groupId: Number(params.id) })
}

export default function MembersPage() {
  const data: LoaderContext = useLoaderData()
  return (
    <Box as="pre" maxH="50vh">
      {JSON.stringify(data, null, 2)}
    </Box>
  )
}
