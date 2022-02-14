import React from "react"
import { getSession } from "next-auth/client"
import { WithNavbar } from "@/components/navbar"
import {
  fetcher,
  HomepagePersonDocument,
  HomepagePersonQuery,
} from "@/lib/__generated__/graphql"
import { Heading, VStack } from "@chakra-ui/layout"
import { Waypoint } from "react-waypoint"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { wrapRequest } from "@/lib/data-fetching"
import ImageGrid from "@/components/data-grids/image-grid"
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query"
import { AnimatePresence, motion } from "framer-motion"
import { paginateBySkip } from "@/client/pagination"
import { OgImage } from "@/components/og-image"
import { toClickableGridImage } from "@/client/data/image-mappers"
import sample from "lodash/sample"

const AnimatedImage = motion(Image)

const homepageSplash = ["https://img.kiyomi.io/K2BFZ4GQKM9-SP8f.webp"]

type HomepageProps = {}

const magicGradient =
  "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.908) 0%, rgba(0, 0, 0, 1) 19%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);"

const PER_PAGE = 100
const fetchParams = (skip: number) => ({
  take: PER_PAGE,
  skip,
})

const homepagePersonKey = (index: number, results: any[] = []) => [
  "HomepagePerson",
  index,
  results,
]

function HomeContent() {
  const pageRef = React.useRef(null)
  const [selected, setSelected] = React.useState(0)
  const {
    data,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<HomepagePersonQuery>(
    homepagePersonKey(selected, []),
    ({ pageParam = 0 }) => {
      return fetcher<HomepagePersonQuery, unknown>(
        HomepagePersonDocument,
        fetchParams(pageParam)
      )()
    },
    {
      refetchOnMount: false,
      getNextPageParam: paginateBySkip(PER_PAGE),
    }
  )
  // const splash = trending?.homepage[selected]?.banner
  console.log({ data })

  async function loadMore() {
    if (isFetching) {
      return
    }
    fetchNextPage()
  }

  return (
    <VStack w="full" alignItems="center">
      <Box
        position="relative"
        w="full"
        mb={3}
        height={["30vh", "40vh", "55vh", "65vh"]}
        display="flex"
      >
        <AnimatePresence exitBeforeEnter>
          <AnimatedImage
            maxHeight="90vh"
            zIndex={0}
            position="absolute"
            // objectPosition={splash ? focusToObjectPosition(splash) : ""}
            objectFit="cover"
            width="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            // key={splash ? splash.rawUrl : ""}
            src={sample(homepageSplash)}
            transition={{ duration: 0.15 }}
            sx={{ WebkitMaskImage: magicGradient }}
          />
        </AnimatePresence>
        <Flex
          position="relative"
          maxWidth="7xl"
          mx="auto"
          justifyContent="center"
          alignItems="flex-end"
          px={4}
          w="full"
        >
          <Box flexDirection="column" width="100%">
            <Flex
              justifyContent="center"
              align="center"
              flexDirection={["column", null, "row"]}
              mb={2}
            >
              <Box textAlign="center">
                <Heading
                  fontSize={["lg", "2xl", "4xl"]}
                  as="h1"
                  color="white"
                  opacity={0.8}
                  letterSpacing={"-0.5px"}
                  mb={3}
                  fontWeight={700}
                >
                  Kiyomi
                </Heading>
                <Text
                  textStyle="heading-lg"
                  as="h2"
                  opacity={0.5}
                  color="text.200"
                  fontWeight="semibold"
                >
                  An image database for Kpop
                </Text>
              </Box>
              {/*{splash && (*/}
              {/*  <Link href={splash.url}>*/}
              {/*    <Flex fontSize="xs" align="center" mt={2}>*/}
              {/*      <Box mr={1}>*/}
              {/*        <RiLink />*/}
              {/*      </Box>*/}
              {/*      View Cover Photo*/}
              {/*    </Flex>*/}
              {/*  </Link>*/}
              {/*)}*/}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex
        position="relative"
        flex={1}
        w="full"
        flexDir="row"
        justifyContent="center"
        ref={pageRef}
      >
        <Flex px={5} flexDir="column" h="full" justify="flex-start" flex={1}>
          {data && (
            <ImageGrid
              images={data.pages.flatMap((data) =>
                data.images.map(toClickableGridImage)
              )}
            />
          )}
        </Flex>
      </Flex>
      <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box>
    </VStack>
  )
}

export default function Home() {
  return (
    <WithNavbar noSpace>
      <OgImage
        imageUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/kiyomi_splash.jpg`}
        title="Kiyomi.io (Alpha)"
        description="A single place to find Kpop images"
      />
      <HomeContent />
    </WithNavbar>
  )
}

export const getServerSideProps = wrapRequest(async (ctx) => {
  const client = new QueryClient()
  let person = await fetcher<HomepagePersonQuery, unknown>(
    HomepagePersonDocument,
    fetchParams(0)
  )()
  client.setQueryData(homepagePersonKey(0), { pages: [person] })

  const dehydratedState = dehydrate(client)

  return {
    props: {
      session: await getSession(ctx),
      dehydratedState,
    } as HomepageProps,
  }
})
