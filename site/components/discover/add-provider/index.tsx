import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Spinner,
  Table,
  Text,
  VStack,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
} from "@chakra-ui/react"
import { z } from "zod"
import {
  AddProviderInput,
  useAddProviderMutation,
  useDiscoveryProvidersQuery,
} from "@/lib/__generated__/graphql"
import { zodResolver } from "@hookform/resolvers/zod"
import { Grid } from "@chakra-ui/layout"
import { RiLink } from "react-icons/ri"
import { useForm } from "react-hook-form"
import { useList } from "react-use"
import {
  GroupSearchResult,
  SidebarSearch,
} from "@/components/discover/sidebar-search"
import { SearchTag } from "@/components/discover/search-tags"
import { searchGroup } from "@/client/typesense"
import { useState } from "react"
import { ProviderTag } from "@/components/discover/provider-tag"
import groupBy from "lodash/groupBy"
import { decideProvider } from "@/components/discover/discovered-post"
import Hr from "@/components/hr"
import { useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import { RootState } from "@/models/store"
import { HiBadgeCheck } from "react-icons/hi"
import format from "date-fns/format"
import cls from "classnames"

const resolver = z.object({
  name: z.string(),
  url: z.string().url(),
  official: z.boolean().default(false),
  people: z.array(z.number()).default([]),
  groups: z.array(z.number()).default([]),
})

const getFormattedJson = (input: any) => {
  try {
    return JSON.stringify(JSON.parse(input), null, 2)
  } catch (err) {
    return input
  }
}

const ProviderList = () => {
  const { data: providers } = useDiscoveryProvidersQuery()
  console.log({ providers })
  if (!providers) {
    return <Spinner />
  }
  const sections = groupBy(providers.discoveryProviders, (prov) => prov.name)
  return (
    <VStack spacing={6} w="full">
      {Object.entries(sections).map(([section, providers]) => {
        const { label, component } = decideProvider(section)
        return (
          <VStack spacing={3} w="full">
            <HStack spacing={2} align="center" justify="center">
              <Flex w={8} h={8} align="center" justify="center">
                {component}
              </Flex>
              <Text textStyle="heading">{label}</Text>
            </HStack>
            <Table w="full" size="md">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Created</Th>
                  <Th>Media Found</Th>
                  <Th>Last Check</Th>
                  <Th>Check Count</Th>
                  <Th>Last Post</Th>
                </Tr>
              </Thead>
              <Tbody w="full">
                {providers.map((pr) => {
                  const formatStr = (str?: string) =>
                    str ? format(new Date(str), "MMM dd, yyyy") : undefined
                  const addDate = formatStr(pr.createdAt) ?? "Unknown"
                  const lastScrape = formatStr(pr.lastScrape) ?? "Never"
                  const lastPost = formatStr(pr.lastPost) ?? "Unknown"
                  return (
                    <Tr
                      key={`${pr.name}-${pr.destination}`}
                      w="full"
                      color={pr.enabled ? "inherit" : "#353b48"}
                    >
                      <Td w="25%">
                        <Link href={pr.url} target="_blank">
                          <HStack align="center" spacing={2}>
                            <Text>{pr.defaultName}</Text>
                            {pr.official && (
                              <HiBadgeCheck title="Official source" />
                            )}
                            <RiLink size={12} color="gray" />
                          </HStack>
                        </Link>
                      </Td>
                      <Td w="16%">{addDate}</Td>
                      <Td w="16%">{pr.discoveredImages}</Td>
                      <Td w="16%">{lastScrape}</Td>
                      <Td>{pr.scrapeCount}</Td>
                      <Td>{lastPost}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
            <Flex flexFlow="row wrap"></Flex>
          </VStack>
        )
      })}
    </VStack>
  )
}

export const AddProvider = () => {
  const roles = useSelector((root: RootState) => root.user?.cache?.roles ?? [])
  const isEditor = roles.some((role) => role.name === "EDITOR")
  const { handleSubmit, register, formState, watch } = useForm({
    resolver: zodResolver(resolver),
  })
  const { mutateAsync } = useAddProviderMutation()
  const client = useQueryClient()
  const [groups, setGroups] = useState<GroupSearchResult[]>([])
  const [idols, setIdols] = useState<GroupSearchResult[]>([])
  const [response, setResponse] = useState("")
  const [data, { push, removeAt }] = useList<SearchTag>([])
  const { errors } = formState

  async function onSubmit(form: AddProviderInput) {
    console.log({ form })
    const result = await mutateAsync({ provider: form })
    console.log({ result })
    setResponse(result.addProvider)
    client.invalidateQueries(["DiscoveryProviders"])
  }

  return (
    <VStack spacing={8} w="full">
      {isEditor && (
        <>
          <Grid templateColumns={["1fr", null, null, "2fr 1fr"]} gap={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name} maxW="800px">
                <VStack spacing={6}>
                  <Text textStyle="heading">Add Provider</Text>
                  <Grid
                    templateColumns={["1fr", null, null, "1fr 2fr"]}
                    columnGap={4}
                    rowGap={6}
                    w="full"
                    alignItems="center"
                  >
                    <VStack spacing={2}>
                      <FormLabel htmlFor="amount">Name</FormLabel>
                      <Text textStyle="text" color="gray.300">
                        Name given to the resource. Check the Discord server for
                        the naming conventions of each website
                      </Text>
                    </VStack>
                    <VStack spacing={3} align="flex-start" h="full">
                      <Input
                        id="name"
                        borderColor="rgba(0, 0,0, 0.2)"
                        placeholder="Red Velvet"
                        type="text"
                        {...register("name", {
                          required: "This is required",
                          minLength: {
                            value: 4,
                            message: "Minimum length should be 4",
                          },
                        })}
                      />
                    </VStack>
                    <VStack>
                      <FormLabel htmlFor="amount">URL</FormLabel>
                      <Text textStyle="text" color="gray.300">
                        The link to the page where posts can be found
                      </Text>
                    </VStack>
                    <VStack align="flex-start" h="full">
                      <InputGroup>
                        <InputLeftAddon bg="rgba(0,0,0,0.1)">
                          <RiLink />
                        </InputLeftAddon>
                        <Input
                          id="url"
                          borderColor="rgba(0, 0,0, 0.2)"
                          placeholder="https://twitter.com/RVsmtown"
                          type="url"
                          {...register("url", {
                            required: "This is required",
                            minLength: {
                              value: 4,
                              message: "Minimum length should be 4",
                            },
                          })}
                        />
                      </InputGroup>
                    </VStack>
                    <VStack spacing={2}>
                      <FormLabel htmlFor="official">Official?</FormLabel>
                      <Text textStyle="text" color="gray.300">
                        Official providers are social media accounts managed by
                        idols or the group's company like{" "}
                        <Link
                          href="https://twitter.com/RVsmtown"
                          color="cyan"
                          fontWeight="medium"
                        >
                          https://twitter.com/RVsmtown
                        </Link>
                      </Text>
                    </VStack>
                    <HStack spacing={3} h="full" align="flex-start">
                      <Checkbox
                        id="official"
                        type="checkbox"
                        {...register("official")}
                      />
                      <FormLabel htmlFor="official" lineHeight="1">
                        This is an official source
                      </FormLabel>
                    </HStack>
                    <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
                  </Grid>
                  {/*<SidebarSearch*/}
                  {/*  searchType="group"*/}
                  {/*  hits={groups}*/}
                  {/*  setHits={setGroups}*/}
                  {/*  filters={data}*/}
                  {/*  runSearch={(text) =>*/}
                  {/*    searchGroup(text).then((r) => r.hits ?? [])*/}
                  {/*  }*/}
                  {/*  addFilter={(data) => push(data)}*/}
                  {/*  removeFilter={(item) => {*/}
                  {/*    const index = data.findIndex(*/}
                  {/*      (tag) => tag.name === item.name && tag.id === item.id*/}
                  {/*    )*/}
                  {/*    if (index > -1) {*/}
                  {/*      removeAt(index)*/}
                  {/*    }*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <Button type="submit">Submit</Button>
                </VStack>
              </FormControl>
            </form>
            <Box as="pre" bg="rgba(0, 0, 0, 0.4)" p={4} overflow="auto">
              {getFormattedJson(response)}
            </Box>
          </Grid>
          <Hr borderColor="borderSubtle" h={1} w="full" />
        </>
      )}
      <VStack spacing={8} w="full">
        <VStack spacing={3}>
          <Text textStyle="heading">All Social Media Pages</Text>
          <Text textStyle="text-lg">
            Kiyomi automatically goes through different social media based on
            how frequently each page is updated
          </Text>
        </VStack>
        <ProviderList />
      </VStack>
    </VStack>
  )
}
