import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPageContext,
} from "next"
import { decodeUriFriendly } from "@/client/data/encoders"
import { GroupPageProps } from "@/pages/group/[id]"
import { prefetchQuery } from "@/lib/client-helpers"
import { prisma } from "@/lib/db"
import { wrapInitialProps } from "@/lib/data-fetchers.client"

// export const getStaticPathsGroupPage: GetStaticPaths = async ({}) => {
//   const groups = await prisma.group.findMany({ select: { id: true } })
//   console.log(groups)
//   return {
//     paths: groups.map((props) => ({ params: { id: String(props.id) } })),
//     fallback: "blocking",
//   }
//
// }

export const groupsPageInitialProps = wrapInitialProps<GroupPageProps>(
  async (ctx) => {
    if (!ctx.query?.id) {
      throw new Error("getStaticPaths did not return group id")
    }
    const dehydratedState = await ctx.prefetch("OneGroup", {
      id: ctx.params.id,
    })
    return {
      id: ctx.params.id,
      dehydratedState,
    }
  },
  (ctx) => {
    const id = decodeUriFriendly(String(ctx.query.id))
    return { id }
  }
)

// export const getServerSidePropsGroupsPage: GetServerSideProps = wrapRequest(
//   async ({ params, prefetch }) => {
//     if (!params?.id) {
//       throw new Error("getStaticPaths did not return group id")
//     }
//     const id = decodeUriFriendly(String(params.id))
//     const dehydratedState = await prefetch("OneGroup", { id })
//     return {
//       props: { id, dehydratedState } as GroupPageProps,
//     }
//   },
//   ({ params }) => {
//     if (!params?.id) {
//       throw new Error("getStaticPaths did not return group id")
//     }
//     const id = decodeUriFriendly(String(params.id))
//     return { props: { id } }
//   }
// )
