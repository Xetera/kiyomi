import { Flex } from "@chakra-ui/react"
import { LoaderFunction, Outlet, useLoaderData } from "remix"
import { sdk } from "~/client/graphql"
import {
  makePageBannerRoute,
  PageBanner,
  PageBannerSubtitle,
  PageBannerTitle,
  PageBannerTopic,
} from "~/components/banner"
import { LinkedTabs } from "~/components/linked-tabs"
import { get } from "~/data-fetching"
import { getSdk, OneGroupQuery } from "~/__generated__/graphql"

export const loader: LoaderFunction = ({ params }): Promise<OneGroupQuery> => {
  return sdk.OneGroup({ id: Number(params.id) })
}

export default function ProductInfo() {
  const data = useLoaderData<OneGroupQuery>()
  console.log(data)
  return (
    <Flex minH="100vh" flexDirection="column" h="100vh">
      <PageBanner
        topic={<PageBannerTopic>Girl Group</PageBannerTopic>}
        title={<PageBannerTitle>{data?.group?.name}</PageBannerTitle>}
        subtitle={<PageBannerSubtitle>1,000 Fans</PageBannerSubtitle>}
        router={
          <LinkedTabs
            spacing={10}
            tabs={[
              {
                path: `/group/1`,
                component: makePageBannerRoute("Overview"),
              },
              {
                path: `/group/1/members`,
                component: makePageBannerRoute("Members"),
              },
              {
                path: `/group/1/gallery`,
                component: makePageBannerRoute("Gallery"),
              },
            ]}
          />
        }
        backgroundUrl={data?.group?.banner?.rawUrl}
      />
      <Flex maxH="7xl" mx="auto">
        <Outlet />
      </Flex>
    </Flex>
  )
}
