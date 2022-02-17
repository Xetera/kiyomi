import { Text, VStack, Box, Flex, Heading, Image } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import sample from "lodash/sample"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  LoaderFunction,
  MetaFunction,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix"
import { toClickableGridImage } from "~/client/data-mappers/image"
import { sdk } from "~/client/graphql"
import ImageGrid from "~/components/data-grids/image-grid"
import { WithNavbar } from "~/components/navbar/navbar-wrapper"
import { HomepageImagesQuery } from "~/__generated__/graphql"
import { motion } from "framer-motion"
import { useVirtual } from "react-virtual"
// @ts-ignore
import { InfiniteScroll } from "react-simple-infinite-scroll"

const AnimatedImage = motion(Image)

type LoaderContext = HomepageImagesQuery
const homepageSplash = ["https://img.kiyomi.io/K2BFZ4GQKM9-SP8f.webp"]

const LIMIT = 40
const DATA_OVERSCAN = 10
type HomepageProps = {}

const magicGradient =
  "linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.908) 0%, rgba(0, 0, 0, 1) 19%, rgba(0, 0, 0, 0.841) 34%, rgba(0, 0, 0, 0.782) 47%, rgba(0, 0, 0, 0.498) 56.5%, rgba(0, 0, 0, 0.324) 65%, rgba(0, 0, 0, 0.256) 73%, rgba(0, 0, 0, 0.135) 80.2%, rgba(0, 0, 0, 0.102) 86.1%, rgba(0, 0, 0, 0.051) 91%, rgba(0, 0, 0, 0.015) 95.2%, rgba(0, 0, 0, 0.010) 98.2%, transparent 100%);"

export const loader: LoaderFunction = ({ request }): Promise<LoaderContext> => {
  const params = new URL(request.url).searchParams
  console.log(params, params.get("skip"))
  return sdk.HomepageImages({
    skip: Number(params.get("start") ?? "0"),
    take: LIMIT,
  })
}

function IndexView() {
  const pageRef = useRef(null)
  const data = useLoaderData<LoaderContext>()
  const fetcher = useFetcher<LoaderContext>()
  const startRef = useRef(data.images.length)

  const parentRef = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState(data.images)

  const transition = useTransition()
  const isLoading = transition.state === "loading"
  const rowVirtualizer = useVirtual({
    size: 20,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 0, height: 800 },
  })

  useEffect(() => {
    if (fetcher.data) {
      console.log("updating total data")
      setImages((prevItems) => [...prevItems, ...(fetcher.data?.images ?? [])])
    }
  }, [fetcher.data])

  function loadMore() {
    if (fetcher.state === "loading") return
    const newStart = startRef.current

    const qs = new URLSearchParams([
      ["start", String(newStart)],
      ["limit", String(LIMIT)],
    ])
    console.log("getting new data", Object.fromEntries(qs.entries()))
    fetcher.load(`/?${qs}`)
    startRef.current += LIMIT
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
        <Flex
          px={5}
          flexDir="column"
          justify="flex-start"
          flex={1}
          position="relative"
        >
          {data && (
            <InfiniteScroll
              throttle={100}
              threshold={3000}
              isLoading={isLoading}
              hasMore={true}
              onLoadMore={loadMore}
            >
              <ImageGrid
                ref={parentRef}
                images={images.map((image) => {
                  return toClickableGridImage(image)
                })}
              />
            </InfiniteScroll>
          )}
        </Flex>
      </Flex>
      {/* <Box height="800px">
        <Waypoint onEnter={loadMore} topOffset="-1500px" />
      </Box> */}
    </VStack>
  )
}

export const meta: MetaFunction = ({ data }) => {
  const description = "A single place to find Kpop images"
  return {
    "twitter:card": "summary_large_image",
    description,
    "og:title": "Kiyomi.io (Alpha)",
    "og:description": description,
    "og:type": "website",
    // "og:image": `${process.env.NEXT_PUBLIC_BASE_URL}/kiyomi_splash.jpg`,
  }

  // <meta name="twitter:card" content="summary_large_image" />
  // <meta name="description" content={props.description} />
  // <meta name="og:title" content={props.title} />
  // <meta name="og:description" content={props.description} />
  // <meta name="og:type" content="website" />
  // <meta property="og:image" content={props.imageUrl} />
  // <meta property="og:image:secure" content={props.imageUrl} />
  // <meta property="og:image:width" content="1200" />
  // <meta property="og:image:height" content="630" />
  // <meta property="og:site_name" content="Kiyomi" />
  // <meta property="og:image:type" content="image/jpeg" />
  //   <meta name="description" content={props.description} />
}

export default function IndexPage() {
  return (
    <WithNavbar noSpace>
      <IndexView />
    </WithNavbar>
  )
}
