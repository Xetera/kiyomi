import { personPreferredName } from "~/client/data-mappers/person"
import { magicGradientDark } from "~/client/jsx-helpers"
import { Routing } from "~/client/routing"
// @ts-ignore
import { InfiniteScroll } from "react-simple-infinite-scroll"
// import { useOnePersonQuery } from "~/__generated__/graphql"
import { Link, useFetcher, useLoaderData, useParams } from "remix"
import {
  Text,
  Flex,
  VStack,
  Stack,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react"
import ImageGrid from "../data-grids/image-grid"
import { LargeBanner } from "../large-banner"
import { LinkedTabs, makeLinkedTabWrapper } from "../linked-tabs"
import { Portrait } from "../portrait"
import { toClickableGridImage } from "~/client/data-mappers/image"
import { OnePersonImagesQuery, OnePersonQuery } from "~/__generated__/graphql"
import { usePaginated } from "~/hooks/use-paginated"
import { useContext } from "react"
import { PersonContext } from "~/models/contexts"

export const personPortraitDimensions = {
  width: "250px",
  height: "320px",
}

export type PersonPageProps = {
  id: number
}

export const PersonPage = () => {
  const { id } = useParams()
  if (!id) {
    throw Error("$id parameter not found")
  }
  const data = useContext(PersonContext)
  console.log(data)
  const group = data?.person?.preferredMembership?.group
  const preferredAlias = data?.person?.preferredAlias
  const title = data?.person ? personPreferredName(data.person) : "Loading..."
  const validAliases =
    (preferredAlias
      ? data?.person?.aliases.filter(
          (alias) => alias.name !== preferredAlias?.name
        )
      : data?.person?.aliases) ?? []
  return (
    <VStack w="full">
      <LargeBanner
        height="80vh"
        focus={data?.person?.banner ?? undefined}
        src={data?.person?.banner?.rawUrl ?? "/"}
        gradient={magicGradientDark}
      />
      <Flex
        w="full"
        justify="center"
        bg="rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(3px)"
        zIndex={222}
        p={6}
        position="relative"
      >
        <Text
          display={{ base: "block", lg: "none" }}
          textStyle="heading-lg"
          fontSize="2xl"
          w="full"
          textAlign="center"
          position="absolute"
          mb={8}
          bottom="100%"
        >
          {title}
        </Text>
        <VStack w="full" maxW="7xl" margin="0 auto">
          <Stack
            alignItems={["center", null, "flex-start"]}
            direction={["column", null, "row"]}
            w="full"
            spacing={8}
          >
            <VStack mt={{ base: 0, lg: -20 }} spacing={4} align="center" mb={8}>
              <Portrait
                opacity={100}
                width="250px"
                height="320px"
                src={data?.person?.avatar?.thumbnail.small ?? undefined}
                focus={data?.person?.avatar ?? undefined}
              />
              {group && (
                <Text textStyle="heading" textAlign="center" color="gray.300">
                  {group.name}
                </Text>
              )}
              <Link
                to={Routing.toPersonEdit(
                  id,
                  data?.person ? personPreferredName(data?.person) : undefined
                )}
              >
                <Flex w="full" mt={4}>
                  <Button w="full">Edit</Button>
                </Flex>
              </Link>
            </VStack>
            <VStack spacing={4} w="full">
              <VStack>
                <Text
                  textStyle="heading-lg"
                  fontSize="3xl"
                  w="full"
                  display={{ base: "none", lg: "block" }}
                >
                  {data?.person ? personPreferredName(data.person) : "..."}
                </Text>
                {preferredAlias && (
                  <Text fontSize="16px" textAlign="center" color="gray.400">
                    {data?.person?.name}
                  </Text>
                )}
              </VStack>
              {validAliases.length > 0 && (
                <HStack spacing={3} flexFlow="row wrap" align="center">
                  <Text
                    textStyle="heading-sm"
                    bg="bgSecondary"
                    px={2}
                    py={1}
                    borderRadius="md"
                    color="gray.300"
                  >
                    AKA
                  </Text>
                  {validAliases.map((alias) => (
                    <Text textStyle="text-lg" color="gray.400">
                      {alias.name}
                    </Text>
                  ))}
                </HStack>
              )}
              <Flex flexFlow="row wrap">
                {data?.person?.memberOf.map((membership) => {
                  const avatar = membership.group.avatar
                  return (
                    <Link
                      to={Routing.toGroup(
                        membership.group.id,
                        membership.group.name
                      )}
                    >
                      <Portrait
                        opacity={0.6}
                        mr={2}
                        mb={2}
                        src={avatar?.thumbnail.small ?? ""}
                        key={membership.id}
                        height="240px"
                        width="240px"
                        name={membership.group.name}
                        focus={avatar}
                      />
                    </Link>
                  )
                })}
              </Flex>
            </VStack>
            {/*{data?.person?.banner && (*/}
            {/*  <ImageLoader*/}
            {/*    src={data.person.banner.rawUrl}*/}
            {/*    sx={{ WebkitMaskImage: magicGradient }}*/}
            {/*    focus={data.person.banner ?? undefined}*/}
            {/*  />*/}
            {/*)}*/}
          </Stack>
          <LinkedTabs
            tabs={[
              {
                path: Routing.toPerson(
                  Number(id),
                  data?.person?.name
                    ? personPreferredName(data.person)
                    : undefined
                ),
                component: makeLinkedTabWrapper("Images"), // <Text textStyle="heading">Images</Text>,
              },
            ]}
          />
        </VStack>
      </Flex>
      <Flex w="full" justify="center" bg="rgba(0, 0, 0, 0.8)" h="full" p={6}>
        <Box w="full" maxW="7xl" margin="0 auto" py={3}>
          <InfiniteScrollImages />
        </Box>
      </Flex>
    </VStack>
  )
}

const InfiniteScrollImages = () => {
  const fetcher = useFetcher<OnePersonImagesQuery>()
  const params = useParams()
  const pagination = usePaginated(fetcher, {
    href: `/idol/${params.id}`,
    transform: (data) => data.person?.appearances ?? [],
    perPage: 40,
  })
  console.log({ pagination })

  return (
    <InfiniteScroll
      throttle={100}
      threshold={3000}
      isLoading={pagination.fetcher.state === "loading"}
      hasMore={true}
      onLoadMore={pagination.loadMore}
    >
      <ImageGrid
        w="full"
        images={pagination.data.map((app) => toClickableGridImage(app.image))}
      />
    </InfiniteScroll>
  )
}
