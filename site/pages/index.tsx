import React from "react"
import { getSession } from "next-auth/client"
import { WithNavbar } from "@/components/navbar"
import {
  fetcher,
  HomepagePersonDocument,
  HomepagePersonQuery,
  useHomepageQuery,
} from "@/lib/__generated__/graphql"
import { prefetchQuery } from "@/lib/client-helpers"
import { Heading, VStack } from "@chakra-ui/layout"
import { Waypoint } from "react-waypoint"
import { Box, Flex, HStack, Image, Link, Text } from "@chakra-ui/react"
import { wrapRequest } from "@/lib/data-fetching"
import ImageGrid from "@/components/image-grid"
import { useInfiniteQuery } from "react-query"
import { RiLink } from "react-icons/ri"
import { focusToObjectPosition } from "@/components/image-grid-element"
import { AnimatePresence, motion } from "framer-motion"

const AnimatedImage = motion(Image)

type HomepageProps = {
  // trending: HomepageRaw[]
  // splash: Partial<FocusableImage> & { rawUrl: string; url: string }
}

const magicGradient =
  "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.908) 0%, rgba(0, 0, 0, 1) 19%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);"

export default function Home() {
  const pageRef = React.useRef(null)
  const { data: trending } = useHomepageQuery(
    {},
    { keepPreviousData: true, refetchOnMount: false }
  )
  if (!trending) {
    throw Error("Trending page was not server side rendered properly...")
  }

  // const splash = trending[0].banner
  console.log({ trending })
  const [selected, setSelected] = React.useState(0)
  const PER_PAGE = 100
  const {
    data,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<HomepagePersonQuery>(
    ["homepage", selected],
    ({ pageParam = 0 }) => {
      return fetcher<HomepagePersonQuery, unknown>(HomepagePersonDocument, {
        take: PER_PAGE,
        skip: pageParam,
        id: trending.homepage[selected]?.id ?? 1,
      })()
    },
    {
      getNextPageParam(last, all) {
        const skip = all.length * PER_PAGE
        return skip
      },
    }
  )
  const splash = trending.homepage[selected]?.banner
  console.log({ splash })

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
        height={["30vh", "40vh", "55vh", "65vh"]}
        display="flex"
      >
        <AnimatePresence exitBeforeEnter>
          <AnimatedImage
            maxHeight="90vh"
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
        maxW="7xl"
        mx="auto"
        p={4}
        alignItems="flex-start"
        overflow="hidden"
      >
        <Text>Trending</Text>
        <HStack spacing={3}>
          {trending.homepage.map((trend, i) => (
            <Flex flexDir="column">
              <Box
                width="200px"
                height="320px"
                mb={2}
                key={trend.id}
                zIndex={1}
                opacity={i === selected ? "100%" : "40%"}
                borderRadius={"lg"}
                overflow="hidden"
                cursor="pointer"
                background="black"
                onClick={() => setSelected(i)}
              >
                <Image
                  _hover={{
                    opacity: "100%",
                  }}
                  transition="all 0.4s ease-in-out"
                  objectFit="cover"
                  h="full"
                  src={
                    trend.avatar
                      ? trend.avatar.thumbnail.small
                      : "https://placewaifu.com/image/200/320"
                  }
                />
              </Box>
              <Text fontSize="md" color="white" fontWeight="semibold">
                {trend.name}
              </Text>
            </Flex>
          ))}
        </HStack>
      </VStack>
      <Box
        className="relative flex-1 flex-row flex justify-center"
        ref={pageRef}
      >
        <Flex
          flexDir="column"
          h="full"
          justify="flex-start"
          flex={1}
          px={5}
          maxWidth="7xl"
        >
          {data && (
            <ImageGrid images={data.pages.flatMap((data) => data.images)} />
          )}
        </Flex>
      </Box>
      <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box>
    </WithNavbar>
  )
}

export const getServerSideProps = wrapRequest(async (ctx) => {
  const dehydratedState = await prefetchQuery("Homepage", {})

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
      // splash: await getSplash(homepage[0]),
      dehydratedState,
    } as HomepageProps,
  }
})
