import React from "react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { Navbar } from "@/components/navbar"
import { useScroll } from "react-use"
import {
  fetcher,
  HomepageDocument,
  HomepageQuery,
  useHomepageQuery,
} from "@/lib/__generated__/graphql"
import { prefetchQuery } from "@/lib/client-helpers"
import { Grid, Heading } from "@chakra-ui/layout"
import { Waypoint } from "react-waypoint"
import {
  Box,
  Image,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { RiSearchLine } from "react-icons/ri"
import { wrapRequest } from "@/lib/data-fetching"
import ImageGrid from "@/components/image-grid"
import { useInfiniteQuery } from "react-query"

export default function Home() {
  const pageRef = React.useRef(null)
  const [activeTab, setActiveTab] = React.useState(0)
  const [skipCount, setSkipCount] = React.useState(0)
  const { y } = useScroll(pageRef)
  const { data, isFetching, fetchNextPage } = useInfiniteQuery<HomepageQuery>(
    "homepage",
    ({ pageParam = 0 }) => {
      return fetcher<HomepageQuery, unknown>(HomepageDocument, {
        take: 100,
        skip: pageParam,
      })()
    },
    {
      getNextPageParam(last, all) {
        const skip = all.length * 100
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
    <>
      <Navbar />
      <Box position="relative" mb={5} height="40vh" display="flex">
        <Image
          maxHeight="70vh"
          position="absolute"
          objectPosition="0% 35%"
          opacity="20%"
          mb="calc(-50vh / 1.2)"
          objectFit="cover"
          width="100%"
          src="https://my.simp.pics/_RnoDqOmNJVAZ4ix.webp"
          sx={{
            WebkitMaskImage:
              "linear-gradient(to top, transparent 2%, black 73%)",
          }}
        />
        <Flex
          position="relative"
          maxWidth="7xl"
          width="100%"
          mx="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Box flexDirection="column" width="100%" px={5}>
            <Box mb={8}>
              <Heading
                fontSize={["4xl", "6xl"]}
                as="h1"
                mb={2}
                fontWeight="black"
              >
                Kiyomi
              </Heading>
              <Heading
                fontSize={["2xl", "4xl"]}
                as="h2"
                color="gray.300"
                fontWeight="normal"
              >
                An image database for Kpop stuff
              </Heading>
            </Box>
            {/* <InputGroup size="lg" shadow="2xl">
              <InputLeftElement
                pointerEvents="none"
                children={<RiSearchLine />}
              />
              <Input
                placeholder="Search for an image"
                color="white"
                background="trueGray.900"
                borderColor="rgb(2, 3, 4)"
              />
            </InputGroup> */}
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
        <Waypoint onEnter={loadMore} topOffset="-1500px" debug />
      </Box>
    </>
  )
}

export const getServerSideProps = wrapRequest(async (ctx) => {
  const dehydratedState = await prefetchQuery("HomepageDocument", {
    take: 100,
    skip: 0,
  })
  return {
    props: {
      session: await getSession(ctx),
      dehydratedState,
    },
  }
})
