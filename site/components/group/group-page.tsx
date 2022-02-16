import { WithNavbar } from "@/components/navbar"
import {
  makePageBannerRoute,
  PageBanner,
  PageBannerSubtitle,
  PageBannerTitle,
  PageBannerTopic,
} from "@/components/page-banner"
import { LinkedTabs } from "@/components/linked-tabs"
import { GroupPageProps } from "@/pages/group/[id]"
import { PropsWithChildren } from "react"
import { useOneGroupQuery } from "@/lib/__generated__/graphql"
import { encodeUriFriendly } from "@/client/data/encoders"
import { NextPage } from "next"
import { groupsPageInitialProps } from "@/lib/ssr/group-page"

export const GroupPage: NextPage<PropsWithChildren<GroupPageProps>> = ({
  id,
  children,
}) => {
  const { data } = useOneGroupQuery({ id })
  console.log({ data })
  const encodedUriFragment = encodeUriFriendly(id, data?.group?.name ?? "?")
  return (
    <WithNavbar noSpace>
      <PageBanner
        topic={<PageBannerTopic>Girl Group</PageBannerTopic>}
        title={<PageBannerTitle>{data?.group?.name}</PageBannerTitle>}
        subtitle={<PageBannerSubtitle>1,000 Fans</PageBannerSubtitle>}
        router={
          <LinkedTabs
            spacing={10}
            tabs={[
              {
                path: `/group/${encodedUriFragment}`,
                component: makePageBannerRoute("Overview"),
              },
              {
                path: `/group/${encodedUriFragment}/members`,
                component: makePageBannerRoute("Members"),
              },
              {
                path: `/group/${encodedUriFragment}/gallery`,
                component: makePageBannerRoute("Gallery"),
              },
            ]}
          />
        }
        backgroundUrl={data?.group?.banner?.rawUrl}
      />
      {children}
    </WithNavbar>
  )
}

GroupPage.getInitialProps = groupsPageInitialProps
