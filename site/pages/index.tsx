import React from "react"
import type { Image as ImageType } from "@prisma/client"
import { getSession } from "next-auth/client"
import { WithNavbar } from "@/components/navbar"
import {
  fetcher,
  HomepageDocument,
  HomepageQuery,
} from "@/lib/__generated__/graphql"
import { prefetchQuery } from "@/lib/client-helpers"
import { Heading } from "@chakra-ui/layout"
import { Waypoint } from "react-waypoint"
import { Box, Flex, Image, Link } from "@chakra-ui/react"
import { wrapRequest } from "@/lib/data-fetching"
import ImageGrid from "@/components/image-grid"
import { useInfiniteQuery } from "react-query"
import { prisma } from "@/lib/db"
import { backend } from "../../shared/sdk"
import {
  FocusableImage,
  focusToObjectPosition,
} from "@/components/image-grid-element"
import { RiLink } from "react-icons/ri"
import { homepageQuery, HomepageRaw } from "@/lib/db-queries"

type HomepageProps = {
  trending: HomepageRaw[]
  // splash: Partial<FocusableImage> & { rawUrl: string; url: string }
}

export default function Home({ trending }) {
  const pageRef = React.useRef(null)
  // console.log("splash", splash)
  const PER_PAGE = 100
  const { data, isFetching, fetchNextPage } = useInfiniteQuery<HomepageQuery>(
    "homepage",
    ({ pageParam = 0 }) => {
      return fetcher<HomepageQuery, unknown>(HomepageDocument, {
        take: PER_PAGE,
        skip: pageParam,
      })()
    },
    {
      getNextPageParam(last, all) {
        const skip = all.length * PER_PAGE
        return skip
      },
    }
  )
  console.log({ data })
  // const { data: a, isFetching } = useHomepageQuery({
  //   take: 100,
  //   skip: skipCount,
  // })
  async function loadMore() {
    if (isFetching) {
      return
    }
    fetchNextPage()
  }

  return (
    <WithNavbar noSpace>
      <Box
        position="relative"
        mb={3}
        height={["30vh", "40vh", "50vh", "65vh", "70px", "80vh"]}
        display="flex"
      >
        <Image
          maxHeight="90vh"
          position="absolute"
          objectPosition={splash.focus ? focusToObjectPosition(splash) : ""}
          opacity="45%"
          objectFit="cover"
          width="100%"
          src={splash.rawUrl}
          sx={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.908) 0%, rgba(0, 0, 0, 1) 19%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);",
            // "linear-gradient(to top, transparent 0%, #0d0f17 10%)",
          }}
        />
        <Flex
          position="relative"
          maxWidth="7xl"
          width="100%"
          mx="auto"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Box flexDirection="column" width="100%" px={5}>
            <Flex
              justifyContent="space-between"
              align={["flex-start", null, "flex-end"]}
              flexDirection={["column", null, "row"]}
              mb={2}
            >
              <Box>
                <Heading
                  fontSize={["lg", "2xl", "4xl"]}
                  as="h1"
                  color="white"
                  letterSpacing={"-0.5px"}
                  mb={3}
                  fontWeight={700}
                >
                  Kiyomi
                </Heading>
                <Heading
                  fontSize={["md", "lg", "xl"]}
                  as="h2"
                  color="white"
                  fontWeight="semibold"
                >
                  An image database for Kpop
                </Heading>
              </Box>
              {splash.url && (
                <Link href={splash.url}>
                  <Flex fontSize="xs" align="center" mt={2}>
                    <Box mr={1}>
                      <RiLink />
                    </Box>
                    View Cover Photo
                  </Flex>
                </Link>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box
        className="relative flex-1 flex-row flex justify-center"
        ref={pageRef}
      >
        <Box
          className="flex flex-col h-full justify-start flex-1"
          px={5}
          maxWidth="7xl"
        >
          {data && (
            <ImageGrid images={data.pages.flatMap((data) => data.images)} />
          )}
        </Box>
      </Box>
      <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box>
    </WithNavbar>
  )
}

export const getServerSideProps = wrapRequest(async (ctx) => {
  const dehydratedState = await prefetchQuery("HomepageDocument", {
    take: 100,
    skip: 0,
  })
  const homepage: ImageType[] = await prisma.$queryRaw`
    SELECT slug from images WHERE public = True
    AND bytes < 3500000
    AND width >= 1800 AND width < 2400
    AND EXISTS(SELECT * from appearances where image_id = images.id)
    ORDER BY RANDOM() LIMIT 1
  `
  const trending = await homepageQuery()

  // async function getSplash(image?: ImageType) {
  //   const defaultValue = {
  //     rawUrl: "https://my.simp.pics/Tpi0yMEym4qFCfEe.webp",
  //     url: "",
  //   }
  //   if (!image) {
  //     return defaultValue
  //   }
  //   const out = await backend.query({
  //     image: [
  //       {
  //         slug: image.slug,
  //       },
  //       {
  //         url: true,
  //         rawUrl: true,
  //         width: true,
  //         height: true,
  //         focus: {
  //           x: true,
  //           y: true,
  //         },
  //       },
  //     ],
  //   })
  //   return out.image ?? defaultValue
  // }

  return {
    props: {
      session: await getSession(ctx),
      trending,
      // splash: await getSplash(homepage[0]),
      dehydratedState,
    } as HomepageProps,
  }
})
