import { GraphqlClientContext, ImageContext } from "~/models/contexts"
import React, { memo, useCallback, useContext, useMemo, useState } from "react"
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  ModalCloseButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Grid, Stack } from "@chakra-ui/layout"
import { Search } from "~/components/searchbar"
import { searchIdol } from "~/client/typesense"
import {
  idolsSearchToQuickSearchSection,
  QuickSearchPerson,
  QuickSearchSection,
} from "~/components/search/QuickSearchSection"
import { useBoolean, useMap } from "react-use"
import { FaceDataFragment, getSdk } from "~/__generated__/graphql"
import { DraggableFace } from "~/components/image-edit-modal"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd"
import flatMap from "lodash/flatMap"
import keyBy from "lodash/keyBy"
import mapValues from "lodash/mapValues"
import { RiCloseCircleFill, RiScan2Line } from "react-icons/ri"
import { TagSelect, useTagSelect } from "~/components/data-entry/tag-select"
import useQueue from "~/components/queue-button"
import Hr from "~/components/hr"
import { EditModal } from "~/components/data-entry/edit-modal"
import { ActionFunction } from "remix"
import { sdk } from "~/client/graphql"

export const action: ActionFunction = () => {}

const SearchBar = memo(
  ({ addPerson }: { addPerson: (num: number) => void }) => {
    const image = useContext(ImageContext)
    const [search, setSearch] = useState("")
    const scanImage = useQueue({ slug: image?.slug ?? "" })
    const [idols, setIdols] = useState<QuickSearchPerson[]>([])
    const [searching, toggleSearching] = useBoolean(false)

    async function performSearch(key: string) {
      toggleSearching(true)
      const idols = await searchIdol(key)
      const idolsProcessed = idolsSearchToQuickSearchSection(
        idols.hits ?? [],
        (hit) => {
          return {
            onClick() {
              addPerson(hit.document.personId)
              setIdols([])
              setSearch("")
            },
          }
        }
      )
      setIdols(idolsProcessed)
      toggleSearching(false)
    }

    return (
      <Flex
        justify="space-between"
        overflow="hidden"
        h="full"
        direction="column"
        bg="bgSecondary"
      >
        <VStack flexDirection="column" h="full" spacing={5}>
          <Box px={5} pt={5}>
            <Search
              search={search}
              searching={searching}
              setSearchString={setSearch}
              onSearch={performSearch}
              placeholder="Search people"
              debounceTime={50}
            />
          </Box>
          <VStack overflow="auto" w="full" px={5} spacing={3} pb={5}>
            {idols.length > 0 && (
              <QuickSearchSection type="person" data={idols} />
            )}
          </VStack>
        </VStack>
        <Hr w="full" h="2px" />
        <HStack p={5}>
          <Button
            appearance="none"
            bg="inherit"
            _hover={{ bg: "bg" }}
            onClick={scanImage}
          >
            <HStack align="center">
              <RiScan2Line />
              <Text textStyle="heading-sm">Scan Image</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>
    )
  }
)

const AppearanceColumn = ({
  id,
  person,
  preferredAlias,
  faces,
  tags,
  removeAppearance,
}: AppearanceItem & { removeAppearance: (id: number) => void }) => {
  const sdk = useContext(GraphqlClientContext)
  const image = useContext(ImageContext)
  const select = useTagSelect(tags.map((tag) => tag.tag.name))

  async function onCreate(name: string) {
    const result = await sdk.AddAppearanceTag({ appearanceId: id, name })
    console.log(result)
  }

  async function onDelete(name: string) {
    const result = await sdk.DeleteAppearanceTag({ appearanceId: id, name })
    console.log(result)
  }

  return (
    <VStack spacing={4} w="200px" minW="200px" key={id} position="relative">
      <Flex justifyContent="space-between" align="center" w="full">
        {preferredAlias ? (
          <Text textStyle="heading-sm">{preferredAlias}</Text>
        ) : (
          <Text textStyle="heading-sm">{person.name}</Text>
        )}
        <Box
          onClick={() => removeAppearance(id)}
          transition="all 0.2s"
          cursor="pointer"
          color="#eb6c6c80"
          ml={2}
          _hover={{ color: "#eb6c6c" }}
        >
          <RiCloseCircleFill size={20} />
        </Box>
      </Flex>
      <Text textStyle="heading-sm">Faces</Text>
      <Flex
        borderColor="gray.900"
        borderWidth="1px"
        borderRadius="md"
        w="full"
        flex="0 1 auto"
        minH="60px"
        p={2}
        alignItems="flex-start"
      >
        <Droppable droppableId={id.toString()} direction="horizontal">
          {(provided, i) => (
            <Flex
              flexFlow="row wrap"
              mb={-2}
              mr={-2}
              w="full"
              h="full"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {faces.map((face, i) => (
                <Draggable
                  draggableId={face.id.toString()}
                  index={i}
                  key={face.id.toString()}
                >
                  {(provided, i) => (
                    <DraggableFace
                      src={image?.rawUrl ?? "/"}
                      maxPortraitHeight={80}
                      // borderRadius="lg"
                      overflow="hidden"
                      mb={2}
                      mr={2}
                      ref={provided.innerRef}
                      face={face}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </Flex>
      <Text textStyle="heading-sm">Tags</Text>
      <TagSelect
        {...select}
        onCreate={onCreate}
        onAdd={onCreate}
        onDelete={onDelete}
      />
    </VStack>
  )
}

type ImageSelfProps = {
  appearances: AppearanceItem[]
  unknownFaces: any[]
  removeAppearance(id: number): void
}

const ImageSelf = ({
  appearances,
  unknownFaces,
  removeAppearance,
}: ImageSelfProps) => {
  const image = useContext(ImageContext)
  if (!image) return null

  return (
    <VStack
      h="full"
      w="full"
      justifyContent="space-between"
      flexFlow="column"
      overflow="hidden"
    >
      <VStack h="full" w="full" as="section" overflow="auto">
        {/*<VStack spacing={3} p={5}>*/}
        {/*  <Text textStyle="heading-sm">Image Tags</Text>*/}
        {/*  <HStack spacing={2}>*/}
        {/*    <EditableTag>Test</EditableTag>*/}
        {/*    <EditableTag>Tag</EditableTag>*/}
        {/*    <EditableTag opacity="0.5">+</EditableTag>*/}
        {/*  </HStack>*/}
        {/*</VStack>*/}
        {/*<Hr w="full" />*/}
        <Flex w="full" h="full">
          <Stack
            direction={["column", null, null, "row"]}
            alignItems="top"
            h="full"
            p={5}
            flex="1"
            spacing={5}
            as="section"
          >
            {appearances.map((appearance, i) => (
              <AppearanceColumn
                {...appearance}
                key={appearance.id}
                removeAppearance={removeAppearance}
              />
            ))}
            {appearances.length === 0 && unknownFaces.length > 0 && (
              <VStack w="full">
                <Text color="gray.300" fontWeight="medium">
                  Nobody here! Search for someone you recognize on the sidebar
                </Text>
              </VStack>
            )}
          </Stack>
        </Flex>
      </VStack>
      <VStack
        justifySelf="flex-end"
        spacing={4}
        p={5}
        bg="#0b0c12"
        w="full"
        as="section"
      >
        <VStack spacing={3} w="full">
          <Text textStyle="heading-sm">Unlabeled Faces</Text>
          <Droppable droppableId="unknown" direction="horizontal">
            {(provided) => (
              <HStack
                ref={provided.innerRef}
                spacing={6}
                minHeight="80px"
                maxHeight="80px"
                w="full"
                h="full"
                {...provided.droppableProps}
              >
                {unknownFaces.map((face, i) => (
                  <Draggable
                    draggableId={face.id.toString()}
                    key={face.id}
                    index={i}
                  >
                    {(provided, i) => (
                      <Flex opacity={i.isDragging ? "0.5" : "1"}>
                        <DraggableFace
                          face={face}
                          src={image.rawUrl}
                          ref={provided.innerRef}
                          borderRadius="lg"
                          maxPortraitHeight={80}
                          overflow="hidden"
                          // smaller={i.isDragging}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        />
                      </Flex>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </HStack>
            )}
          </Droppable>
        </VStack>
      </VStack>
    </VStack>
  )
}

type AppearanceItem = {
  id: number
  person: { name: string }
  preferredAlias?: string
  faces: FaceDataFragment[]
  tags: Array<{
    tag: { name: string }
  }>
}

type AppearanceMap = Record<number, AppearanceItem>

export const ImageEditEditor = () => {
  const sdk = useContext(GraphqlClientContext)
  const image = useContext(ImageContext)
  if (!image) {
    throw Error("Cannot use an image editor without an Image context")
  }
  // const { mutateAsync: removeAppearance } = useRemoveAppearanceMutation()
  // const { mutateAsync: linkFace } = useLinkFaceMutation()
  // const { mutateAsync: unlinkFace } = useUnlinkFaceMutation()
  // const { mutateAsync: addAppearance } = useAddAppearanceMutation()
  const appearanceMap: Record<number, AppearanceItem> = mapValues(
    keyBy(image.appearances, (f) => f.id),
    (f) => ({
      id: f.id,
      person: { name: f.person.name },
      preferredAlias: f.person.preferredAlias?.name,
      faces: f.faces,
      tags: f.tags,
    })
  )

  const unknownFacesMap = keyBy(image.unknownFaces, (f) => f.id)
  const allFaces = useMemo(() => {
    const faces = flatMap(appearanceMap, (f) => f.faces).concat(
      image.unknownFaces
    )
    return keyBy(faces, (f) => f.id)
  }, [])
  const [appearances, appearanceAction] = useMap<AppearanceMap>(appearanceMap)
  const [unknownFaces, setUnknownFaces] = useState<{
    [id: number]: FaceDataFragment
  }>(unknownFacesMap)

  async function removeAppearance_(appearanceId: number) {
    await sdk.RemoveAppearance({ appearanceId })
    const appearance = appearanceAction.get(appearanceId)
    // TODO: check here?
    appearanceAction.remove(appearanceId)
    if (appearance.faces.length > 0) {
      setUnknownFaces((prev) => {
        const rest = Object.fromEntries(
          appearance.faces.map((face) => [face.id, face])
        )
        return {
          ...prev,
          ...rest,
        }
      })
    }
  }

  async function linkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId]
    const face = allFaces[faceId]
    if (!appearance || !face) return
    appearanceAction.set(appearance.id, {
      ...appearance,
      faces: appearance.faces.concat([face]),
    })
    await sdk.LinkFace({ faceId, appearanceId })
  }

  async function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result
    if (!destination || destination?.droppableId === source.droppableId) {
      return
    }

    const faceId = Number(draggableId)
    if (
      destination.droppableId === "unknown" &&
      source.droppableId !== "unknown"
    ) {
      console.log("unlinking known face")
      setUnknownFaces((prev) => {
        let face = allFaces[faceId]
        if (!face) {
          return prev
        }
        return { ...prev, [faceId]: face }
      })
      await unlinkFace_(faceId, Number(source.droppableId))
    } else if (
      source.droppableId === "unknown" &&
      destination.droppableId !== "unknown"
    ) {
      console.log("linking unknown face")
      setUnknownFaces((prev) => {
        delete prev[faceId]
        return prev
      })
      await linkFace_(faceId, Number(destination.droppableId))
    } else {
      console.log("unlinking and linking")
      await unlinkFace_(faceId, Number(source.droppableId))
      await linkFace_(faceId, Number(destination.droppableId))
    }
  }

  const addAppearance_ = useCallback(async (personId: number) => {
    if (!image) return
    const { appearance } = await sdk.AddAppearance({
      imageId: image.id,
      personId,
    })
    appearanceAction.set(appearance.id, appearance)
  }, [])

  async function unlinkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId]
    if (!appearance) {
      console.log("no appearance when unlinking")
      return
    }
    const faces = appearance.faces.filter((face) => face.id !== faceId)
    appearanceAction.set(appearanceId, {
      ...appearance,
      faces,
    })
    await sdk.UnlinkFace({ faceId, appearanceId })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <EditModal sidebar={<SearchBar addPerson={addAppearance_} />}>
        <ImageSelf
          appearances={Object.values(appearances)}
          removeAppearance={removeAppearance_}
          unknownFaces={Object.values(unknownFaces)}
        />
      </EditModal>
    </DragDropContext>
  )
}

export const ImageEditContainer = () => {
  const image = useContext(ImageContext)

  return (
    <VStack spacing={8} alignItems="center" position="relative">
      <ModalCloseButton position="absolute" top={0} right={0} />
      <ImageEditEditor />
      <Image
        src={image?.rawUrl}
        borderRadius="md"
        overflow="hidden"
        maxH="70vh"
      />
    </VStack>
  )
}
