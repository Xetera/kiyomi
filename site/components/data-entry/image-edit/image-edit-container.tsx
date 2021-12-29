import { ImageContext } from "@/models/contexts"
import React, { memo, useCallback, useContext, useMemo, useState } from "react"
import {
  Box,
  Flex,
  HStack,
  Image,
  ModalCloseButton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Grid, Stack } from "@chakra-ui/layout"
import { Search } from "@/components/searchbar"
import { searchIdol } from "@/client/typesense"
import {
  idolsSearchToQuickSearchSection,
  QuickSearchPerson,
  QuickSearchSection,
} from "@/components/search/QuickSearchSection"
import { useBoolean, useMap } from "react-use"
import {
  FaceDataFragment,
  useAddAppearanceMutation,
  useLinkFaceMutation,
  useRemoveAppearanceMutation,
  useUnlinkFaceMutation,
} from "@/lib/__generated__/graphql"
import { DraggableFace } from "@/components/image-edit-modal"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd"
import flatMap from "lodash/flatMap"
import keyBy from "lodash/keyBy"
import mapValues from "lodash/mapValues"
import Hr from "@/components/hr"
import { RiCloseCircleFill } from "react-icons/ri"
import { EditableTag } from "../editable-tag"

const SearchBar = memo(
  ({ addPerson }: { addPerson: (num: number) => void }) => {
    const [search, setSearch] = useState("")
    // const [groups, setGroups] = useState<QuickSearchGroup[]>([])
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
      <VStack
        flexDirection="column"
        bg="bgSecondary"
        overflow="hidden"
        h="full"
        spacing={5}
      >
        <Box px={5} pt={5}>
          <Search
            search={search}
            searching={searching}
            setSearchString={setSearch}
            onSearch={performSearch}
            placeholder="Search people"
            debounce={50}
          />
        </Box>
        <VStack overflow="auto" w="full" px={5} spacing={3} pb={5}>
          {idols.length > 0 && (
            <QuickSearchSection type="person" data={idols} />
          )}
        </VStack>
      </VStack>
    )
  }
)

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
      <VStack h="full" w="full" as="section">
        <VStack spacing={3} p={5}>
          <Text textStyle="heading-sm">Image Tags</Text>
          <HStack spacing={2}>
            <EditableTag>Test</EditableTag>
            <EditableTag>Tag</EditableTag>
            <EditableTag opacity="0.5">+</EditableTag>
          </HStack>
        </VStack>
        <Hr w="full" />
        <Stack
          direction={["column", null, null, "row"]}
          alignItems="top"
          maxH="full"
          p={5}
          spacing={5}
          overflow="auto"
          as="section"
        >
          {appearances.map((val, i) => (
            <VStack spacing={4} maxW="200px" key={val.id} position="relative">
              <HStack spacing={4} justify="flex-start" align="center">
                {/*<Image*/}
                {/*  src="https://placewaifu.com/image/30"*/}
                {/*  w="40px"*/}
                {/*  borderRadius="full"*/}
                {/*/>*/}
                <Text textStyle="heading-sm">{val.person.name}</Text>
                <Box
                  onClick={() => removeAppearance(val.id)}
                  transition="all 0.2s"
                  cursor="pointer"
                  color="#eb6c6c80"
                  _hover={{ color: "#eb6c6c" }}
                >
                  <RiCloseCircleFill size={22} />
                </Box>
              </HStack>
              <Text textStyle="heading-sm">Faces</Text>
              <Flex
                borderColor="gray.900"
                borderWidth="1px"
                borderRadius="md"
                w="full"
                h="full"
                minH="60px"
                p={2}
                alignItems="flex-start"
              >
                <Droppable
                  droppableId={val.id.toString()}
                  direction="horizontal"
                >
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
                      {/*{val.faces.length === 0 && !i.isDraggingOver && (*/}
                      {/*  <Text*/}
                      {/*    w="full"*/}
                      {/*    textAlign="center"*/}
                      {/*    justifySelf="center"*/}
                      {/*    alignSelf="center"*/}
                      {/*  >*/}
                      {/*    Drop faces here*/}
                      {/*  </Text>*/}
                      {/*)}*/}
                      {val.faces.map((face, i) => (
                        <Draggable
                          draggableId={face.id.toString()}
                          index={i}
                          key={face.id.toString()}
                        >
                          {(provided, i) => (
                            <DraggableFace
                              src={image?.rawUrl}
                              maxPortraitHeight={80}
                              borderRadius="lg"
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
              <Flex whiteSpace="nowrap" flexFlow="row wrap">
                <EditableTag mb={2} mr={2}>
                  Test
                </EditableTag>
                <EditableTag mb={2} mr={2}>
                  Tag
                </EditableTag>
                <EditableTag mb={2} mr={2}>
                  Long Tag
                </EditableTag>
                <EditableTag mb={2} mr={2} opacity="0.5">
                  +
                </EditableTag>
              </Flex>
            </VStack>
          ))}
          {appearances.length === 0 && (
            <VStack w="full">
              <Text color="gray.300" fontWeight="medium">
                Nobody here! Search for someone you recognize on the sidebar
              </Text>
            </VStack>
          )}
        </Stack>
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
  faces: FaceDataFragment[]
}

type AppearanceMap = Record<number, AppearanceItem>

export const ImageEditEditor = () => {
  const image = useContext(ImageContext)
  if (!image) {
    throw Error("Cannot use an image editor without an Image context")
  }
  const { mutateAsync: removeAppearance } = useRemoveAppearanceMutation()
  const { mutateAsync: linkFace } = useLinkFaceMutation()
  const { mutateAsync: unlinkFace } = useUnlinkFaceMutation()
  const { mutateAsync: addAppearance } = useAddAppearanceMutation()
  const appearanceMap = mapValues(
    keyBy(image.appearances, (f) => f.id),
    (f) => ({
      id: f.id,
      person: { name: f.person.name },
      faces: f.faces,
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
    await removeAppearance({ appearanceId })
    appearanceAction.remove(appearanceId)
  }

  async function linkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId]
    const face = allFaces[faceId]
    if (!appearance || !face) return
    appearanceAction.set(appearance.id, {
      ...appearance,
      faces: appearance.faces.concat([face]),
    })
    await linkFace({ faceId, appearanceId })
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
    const { appearance } = await addAppearance({
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
    await unlinkFace({ faceId, appearanceId })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SearchBar addPerson={addAppearance_} />
      <VStack bg="#0d0f16">
        <ImageSelf
          appearances={Object.values(appearances)}
          removeAppearance={removeAppearance_}
          unknownFaces={Object.values(unknownFaces)}
        />
      </VStack>
    </DragDropContext>
  )
}

export const ImageEditContainer = () => {
  const image = useContext(ImageContext)

  return (
    <VStack spacing={8} alignItems="center" position="relative">
      <Grid
        gridTemplateColumns={["1fr", null, null, "2fr 6fr"]}
        h="full"
        overflow="hidden"
        borderRadius="md"
        flex="1"
        minH="85vh"
      >
        <ModalCloseButton position="absolute" top={3} right={3} />
        <ImageEditEditor />
      </Grid>
      <Image
        src={image?.rawUrl}
        borderRadius="md"
        overflow="hidden"
        maxH="70vh"
      />
    </VStack>
  )
}
