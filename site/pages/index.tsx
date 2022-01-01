import React, { useEffect } from "react"
import { getSession } from "next-auth/client"
import { WithNavbar } from "@/components/navbar"
import {
  fetcher,
  HomepagePersonDocument,
  HomepagePersonQuery,
  useHomepageQuery,
} from "@/lib/__generated__/graphql"
import { Grid, Heading, VStack } from "@chakra-ui/layout"
import { Waypoint } from "react-waypoint"
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react"
import { wrapRequest } from "@/lib/data-fetching"
import ImageGrid from "@/components/data-grids/image-grid"
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query"
import { RiLink } from "react-icons/ri"
import { focusToObjectPosition } from "@/components/data-grids/generic-grid-element"
import { AnimatePresence, motion } from "framer-motion"
import { paginateBySkip } from "@/client/pagination"
import { OgImage } from "@/components/og-image"

const AnimatedImage = motion(Image)

type HomepageProps = {}

const magicGradient =
  "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.908) 0%, rgba(0, 0, 0, 1) 19%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);"

const PER_PAGE = 100
const fetchParams = (skip: number, id: number = 1) => ({
  take: PER_PAGE,
  skip,
  id,
})

const homepagePersonKey = (index: number, results: any[] = []) => [
  "HomepagePerson",
  index,
  results,
]

function HomeContent() {
  const pageRef = React.useRef(null)
  const { data: trending } = useHomepageQuery(
    {},
    { keepPreviousData: true, refetchOnMount: false }
  )

  const [selected, setSelected] = React.useState(0)
  const {
    data,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<HomepagePersonQuery>(
    homepagePersonKey(selected, trending?.homepage ?? []),
    ({ pageParam = 0 }) => {
      if (!trending) {
        // not ready to fetch
        throw Error("not ready to fetch")
      }
      return fetcher<HomepagePersonQuery, unknown>(
        HomepagePersonDocument,
        fetchParams(pageParam, trending.homepage[selected]?.id)
      )()
    },
    {
      enabled: Boolean(trending?.homepage),
      refetchOnMount: false,
      getNextPageParam: paginateBySkip(PER_PAGE),
    }
  )
  const splash = trending?.homepage[selected]?.banner

  async function loadMore() {
    if (isFetching) {
      return
    }
    fetchNextPage()
  }

  return (
    <>
      <Box
        position="relative"
        mb={3}
        height={["30vh", "40vh", "55vh", "65vh"]}
        display="flex"
      >
        <AnimatePresence exitBeforeEnter>
          <AnimatedImage
            maxHeight="90vh"
            zIndex={0}
            position="absolute"
            objectPosition={splash ? focusToObjectPosition(splash) : ""}
            objectFit="cover"
            width="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            key={splash ? splash.rawUrl : ""}
            src={splash ? splash.rawUrl : ""}
            transition={{ duration: 0.15 }}
            sx={{ WebkitMaskImage: magicGradient }}
          />
        </AnimatePresence>
        <Flex
          position="relative"
          maxWidth="7xl"
          width="100%"
          mx="auto"
          justifyContent="center"
          alignItems="flex-end"
          px={4}
        >
          <Box flexDirection="column" width="100%">
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
              {splash && (
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
      <VStack
        as="section"
        maxW="7xl"
        mx="auto"
        px={5}
        p={4}
        alignItems="flex-start"
        overflow="hidden"
      >
        <Text textStyle="heading" color="text.200">
          Latest Updated
        </Text>
        <Grid
          templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
          w="full"
          gap={6}
        >
          {trending?.homepage.map((trend, i) => {
            const opacity = i === selected ? "100%" : "40%"
            return (
              <Flex
                flexDir="column"
                transition="all 0.4s ease-in-out"
                opacity={opacity}
                _hover={{
                  opacity: "100%",
                }}
                key={trend.id}
              >
                <Box
                  mx="auto"
                  width="180px"
                  height="320px"
                  mb={3}
                  key={trend.id}
                  zIndex={1}
                  borderRadius={"lg"}
                  overflow="hidden"
                  cursor="pointer"
                  background="black"
                  onClick={() => setSelected(i)}
                >
                  <Image
                    objectFit="cover"
                    h="full"
                    src={
                      trend.avatar
                        ? trend.avatar.thumbnail.small
                        : "https://placewaifu.com/image/200/320"
                    }
                  />
                </Box>
                <Text
                  textStyle="heading-sm"
                  color="text.100"
                  textAlign="center"
                >
                  {trend.name}
                </Text>
              </Flex>
            )
          })}
        </Grid>
      </VStack>
      <Flex
        position="relative"
        flex={1}
        flexDir="row"
        justifyContent="center"
        className="relative flex-1 flex-row flex justify-center"
        ref={pageRef}
      >
        <Flex
          px={5}
          flexDir="column"
          h="full"
          justify="flex-start"
          flex={1}
          maxWidth="7xl"
        >
          {data && (
            <ImageGrid images={data.pages.flatMap((data) => data.images)} />
          )}
        </Flex>
      </Flex>
      <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box>
    </>
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
  // let result = await fetcher<HomepageQuery, unknown>(HomepageDocument)()
  // client.setQueryData(["Homepage", {}], result)
  // const personParams = fetchParams(0, result.homepage[0]?.id)
  // let person = await fetcher<HomepageQuery, unknown>(
  //   HomepagePersonDocument,
  //   personParams
  // )()
  // client.setQueryData(homepagePersonKey(0), { pages: [person] })

  const dehydratedState = dehydrate(client)

  return {
    props: {
      session: await getSession(ctx),
      dehydratedState,
    } as HomepageProps,
  }
})
