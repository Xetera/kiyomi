import useImageSlice from "@/hooks/useImageSlice"
import {
  AppearanceWithFacesFragment,
  FaceDataFragment,
  OneImageQuery,
  useAddAppearanceMutation,
  useLinkFaceMutation,
  useRemoveAppearanceMutation,
  useUnlinkFaceMutation,
} from "@/lib/__generated__/graphql"
import React, { useMemo, useRef, useState } from "react"
import { maxPortraitHeight, PersonPortrait } from "./person-preview"
import dynamic from "next/dynamic"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { Input } from "@chakra-ui/input"
import { PersonSearchbar } from "./search"
import keyBy from "lodash/keyBy"
import mapValues from "lodash/mapValues"
import flatMap from "lodash/flatMap"
import { DropResult } from "react-beautiful-dnd"
import { RiDeleteBin2Fill } from "react-icons/ri"
import useOnClickOutside from "@/hooks/useOnClickOutside"
import { forwardRef } from "@chakra-ui/react"

const DragDropContext = dynamic(
  () => {
    const promise = import("react-beautiful-dnd").then((r) => r.DragDropContext)
    return promise
  },
  { ssr: false }
)
const Droppable = dynamic(
  () => {
    const a = import("react-beautiful-dnd").then((r) => r.Droppable)
    return a
  },
  { ssr: false }
)
const Draggable = dynamic(
  () => {
    const a = import("react-beautiful-dnd").then((r) => r.Draggable)
    return a
  },
  { ssr: false }
)

export type ImageEditModalProps = {
  image: NonNullable<OneImageQuery["image"]>
}

type DraggablePersonProps = {
  src: string
  face: FaceDataFragment
  smaller?: boolean
  maxPortraitHeight?: number
}
export const DraggableFace = forwardRef<DraggablePersonProps, "div">(
  ({ src, maxPortraitHeight: maxPortraitHeightLocal, face, ...rest }, ref) => {
    const faceSlice = useImageSlice({
      src,
      height: maxPortraitHeightLocal ?? maxPortraitHeight,
      face,
    })
    if (!faceSlice) return null
    return (
      // @ts-ignore
      <Box {...rest} ref={ref} tabIndex={-1}>
        <canvas
          className="overflow-hidden"
          width={`${faceSlice.widthScale}px`}
          height={faceSlice.heightScale}
          style={{
            height: faceSlice.heightScale,
            width: faceSlice.widthScale,
          }}
          ref={(r) => (faceSlice.ref.current = r)}
        />
      </Box>
    )
  }
)

function ModalHeading({ children }) {
  return (
    <Heading mb={2} size="md" color="gray.300">
      {children}
    </Heading>
  )
}

export function ImageEditEditor(props: ImageEditModalProps) {}

export function ImageEditModal(props: ImageEditModalProps) {
  const appearanceMap = mapValues(
    keyBy(props.image.appearances, (f) => f.id),
    (f) => ({
      id: f.id,
      person: { name: f.person.name },
      faces: f.faces,
    })
  )

  const unknownFacesMap = keyBy(props.image.unknownFaces, (f) => f.id)
  // TODO: update this once users can create new faces on this screen
  const allFaces = useMemo(() => {
    const faces = flatMap(appearanceMap, (f) => f.faces).concat(
      props.image.unknownFaces
    )
    return keyBy(faces, (f) => f.id)
  }, [])
  const [appearances, setAppearances] = useState<{
    [id: number]: {
      id: number
      person: { name: string }
      faces: FaceDataFragment[]
    }
  }>(appearanceMap)
  const [unknownFaces, setUnknownFaces] = useState<{
    [id: number]: FaceDataFragment
  }>(unknownFacesMap)
  const { mutateAsync: addAppearance } = useAddAppearanceMutation()
  const { mutateAsync: removeAppearance } = useRemoveAppearanceMutation()
  const { mutateAsync: linkFace } = useLinkFaceMutation()
  const { mutateAsync: unlinkFace } = useUnlinkFaceMutation()
  async function addAppearance_(personId: number) {
    const { appearance } = await addAppearance({
      imageId: props.image.id,
      personId,
    })
    setAppearances((prev) => ({ ...prev, [appearance.id]: appearance }))
  }
  async function removeAppearance_(appearanceId: number) {
    await removeAppearance({ appearanceId })
    setAppearances((prev) => {
      delete prev[appearanceId]
      return prev
    })
  }
  async function linkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId]
    const face = allFaces[faceId]
    if (!appearance || !face) return
    setAppearances((prev) => ({
      ...prev,
      [appearance.id]: {
        ...appearance,
        faces: appearance.faces.concat([face]),
      },
    }))
    await linkFace({ faceId, appearanceId })
  }
  async function unlinkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId]
    if (!appearance) return
    const faces = appearance.faces.filter((face) => face.id !== faceId)
    setAppearances((prev) => ({
      ...prev,
      [appearance.id]: {
        ...appearance,
        faces,
      },
    }))
    await unlinkFace({ faceId, appearanceId })
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
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className="p-2" maxWidth="4xl" alignItems="center" mx="auto">
        <Heading mb={2} size="md" color="gray.300">
          Add a person
        </Heading>
        <PersonSearchbar onSelect={addAppearance_} />
        {Object.entries(appearances).map(([id, appearance]) => (
          <Flex key={id} flexFlow="column">
            <Flex justifyContent="space-between">
              <ModalHeading>{appearance.person.name}</ModalHeading>
              <RiDeleteBin2Fill onClick={() => removeAppearance_(Number(id))} />
            </Flex>
            <Droppable droppableId={id} direction="horizontal">
              {(provided) => (
                <Flex
                  ref={provided.innerRef}
                  flexFlow="column wrap"
                  minHeight="150px"
                  height="100%"
                  {...provided.droppableProps}
                >
                  {appearance.faces.map((face, i) => (
                    <Draggable
                      draggableId={face.id.toString()}
                      key={face.id}
                      index={i}
                    >
                      {(provided, i) => (
                        <DraggableFace
                          face={face}
                          src={props.image.rawUrl}
                          ref={provided.innerRef}
                          style={{
                            background: i.isDragging ? "red" : "inherit",
                          }}
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
        ))}
        <Heading mb={2} size="md" color="gray.300">
          Unlabeled Faces
        </Heading>
        <Box>
          <Droppable droppableId="unknown" direction="horizontal">
            {(provided) => (
              <Flex
                ref={provided.innerRef}
                className="flex flex-row"
                minHeight="150px"
                height="100%"
                {...provided.droppableProps}
              >
                {Object.values(unknownFaces).map((face, i) => (
                  <Draggable
                    draggableId={face.id.toString()}
                    key={face.id}
                    index={i}
                  >
                    {(provided, i) => (
                      <DraggableFace
                        face={face}
                        src={props.image.rawUrl}
                        ref={provided.innerRef}
                        style={{
                          background: i.isDragging ? "red" : "inherit",
                        }}
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
        </Box>
      </Box>
    </DragDropContext>
  )
}
