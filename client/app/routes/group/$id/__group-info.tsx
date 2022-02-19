import { Flex } from "@chakra-ui/react"
import { LoaderFunction, Outlet, useLoaderData, useParams } from "remix"
import {
  decodeUriFriendly,
  encodeUriFriendly,
} from "~/client/data-mappers/encoding"
import { sdk } from "~/client/graphql"
import {
  makePageBannerRoute,
  PageBanner,
  PageBannerSubtitle,
  PageBannerTitle,
  PageBannerTopic,
} from "~/components/banner"
import { LinkedTabs } from "~/components/linked-tabs"
import { WithNavbar } from "~/components/navbar/navbar-wrapper"
import { get } from "~/data-fetching"
import { getSdk, OneGroupQuery } from "~/__generated__/graphql"

export const loader: LoaderFunction = ({ params }): Promise<OneGroupQuery> => {
  if (typeof params.id !== "string") {
    throw Error("Invalid id")
  }
  return sdk.OneGroup({ id: decodeUriFriendly(params.id) })
}

export default function ProductInfo() {
  const data = useLoaderData<OneGroupQuery>()
  const params = useParams()
  const friendlyUri = params.id
  return (
    <WithNavbar noSpace>
      <Flex minHeight="100vh" flexFlow="column nowrap" w="full" h="full">
        <PageBanner
          topic={<PageBannerTopic>Girl Group</PageBannerTopic>}
          title={<PageBannerTitle>{data?.group?.name}</PageBannerTitle>}
          router={
            <LinkedTabs
              spacing={10}
              tabs={[
                {
                  path: `/group/${friendlyUri}`,
                  component: makePageBannerRoute("Overview"),
                },
                {
                  path: `/group/${friendlyUri}/members`,
                  component: makePageBannerRoute("Members"),
                },
                {
                  path: `/group/${friendlyUri}/gallery`,
                  component: makePageBannerRoute("Gallery"),
                },
              ]}
            />
          }
          backgroundUrl={data?.group?.banner?.rawUrl}
        />
        <Flex maxW="7xl" mx="auto" w="full">
          <Outlet />
        </Flex>
      </Flex>
    </WithNavbar>
  )
}
