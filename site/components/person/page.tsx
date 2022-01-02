import { personPreferredName } from "@/client/data"
import { magicGradientDark } from "@/client/jsx-helpers"
import { Routing } from "@/client/routing"
import { useOnePersonQuery } from "@/lib/__generated__/graphql"
import {
  Link,
  Text,
  Flex,
  VStack,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react"
import ImageGrid from "../data-grids/image-grid"
import { LargeBanner } from "../large-banner"
import { LinkedTabs } from "../linked-tabs"
import NextLink from "next/link"
import { Portrait } from "../portrait"

export type PersonPageProps = {
  id: number
}

export const PersonPage = ({ id }: PersonPageProps) => {
  const { data } = useOnePersonQuery({
    id,
  })
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
    <>
      <LargeBanner
        height="80vh"
        src={data?.person?.banner?.rawUrl ?? "/"}
        gradient={magicGradientDark}
      />
      <Flex
        w="full"
        justify="center"
        bg="rgba(0, 0, 0, 0.2)"
        backdropFilter="blur(3px)"
        h="full"
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
              <NextLink
                href={Routing.toPersonEdit(
                  id,
                  data?.person ? personPreferredName(data?.person) : undefined
                )}
                passHref
              >
                <Link w="full" mt={4}>
                  <Button w="full">Edit</Button>
                </Link>
              </NextLink>
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
                    <NextLink
                      href={Routing.toGroup(
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
                    </NextLink>
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
                  id,
                  data?.person?.name
                    ? personPreferredName(data.person)
                    : undefined
                ),
                component: <Text textStyle="heading">Images</Text>,
              },
            ]}
          />
        </VStack>
      </Flex>
      <Flex w="full" justify="center" bg="rgba(0, 0, 0, 0.8)" h="full" p={6}>
        <VStack w="full" maxW="7xl" margin="0 auto" py={3} spacing={4}>
          <VStack h="full" bg="black"></VStack>
          {data?.person && (
            <ImageGrid
              w="full"
              images={data.person.appearances.map((app) => app.image)}
            />
          )}
        </VStack>
      </Flex>
    </>
  )
}
