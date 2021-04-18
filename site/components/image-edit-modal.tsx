import useImageSlice from "@/hooks/useImageSlice";
import {
  AppearanceWithFacesFragment,
  FaceDataFragment,
  OneImageQuery,
  useAddAppearanceMutation,
  useLinkFaceMutation,
  useRemoveAppearanceMutation,
  useUnlinkFaceMutation,
} from "@/__generated__/graphql";
import React, { useMemo, useState } from "react";
import { maxPortraitHeight, PersonPortrait } from "./person-preview";
import dynamic from "next/dynamic";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { PersonSearchbar } from "./search";
import _ from "lodash";
import { DropResult } from "react-beautiful-dnd";
import { RiDeleteBin2Fill } from "react-icons/ri";

const DragDropContext = dynamic(
  () => {
    const promise = import("react-beautiful-dnd").then(
      (r) => r.DragDropContext
    );
    return promise;
  },
  { ssr: false }
);
const Droppable = dynamic(
  () => {
    const a = import("react-beautiful-dnd").then((r) => r.Droppable);
    return a;
  },
  { ssr: false }
);
const Draggable = dynamic(
  () => {
    const a = import("react-beautiful-dnd").then((r) => r.Draggable);
    return a;
  },
  { ssr: false }
);

export type ImageEditModalProps = {
  image: NonNullable<OneImageQuery["image"]>;
};

type DraggablePersonProps = {
  src: string;
  face: FaceDataFragment;
};
const DraggableFace = React.forwardRef(
  ({ src, face, ...rest }: DraggablePersonProps, ref) => {
    const faceSlice = useImageSlice({
      src,
      height: maxPortraitHeight,
      face,
    });
    if (!faceSlice) return null;
    return (
      // @ts-ignore
      <div {...rest} ref={ref}>
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
      </div>
    );
  }
);

function ModalHeading({ children }) {
  return (
    <Heading mb={2} size="md" color="gray.300">
      {children}
    </Heading>
  );
}

export function ImageEditModal(props: ImageEditModalProps) {
  const appearanceMap = _.mapValues(
    _.keyBy(props.image.appearances, (f) => f.id),
    (f) => ({
      id: f.id,
      person: { name: f.person.name },
      faces: f.faces,
    })
  );
  console.log(props.image.appearances);
  console.log({ appearanceMap });
  const unknownFacesMap = _.keyBy(props.image.unknownFaces, (f) => f.id);
  // TODO: update this once users can create new faces on this screen
  const allFaces = useMemo(() => {
    const faces = _.flatMap(appearanceMap, (f) => f.faces).concat(
      props.image.unknownFaces
    );
    return _.keyBy(faces, (f) => f.id);
  }, []);
  const [appearances, setAppearances] = useState<{
    [id: number]: {
      id: number;
      person: { name: string };
      faces: FaceDataFragment[];
    };
  }>(appearanceMap);
  const [unknownFaces, setUnknownFaces] = useState<{
    [id: number]: FaceDataFragment;
  }>(unknownFacesMap);
  const { mutateAsync: addAppearance } = useAddAppearanceMutation();
  const { mutateAsync: removeAppearance } = useRemoveAppearanceMutation();
  const { mutateAsync: linkFace } = useLinkFaceMutation();
  const { mutateAsync: unlinkFace } = useUnlinkFaceMutation();
  async function addAppearance_(personId: number) {
    const { appearance } = await addAppearance({
      imageId: props.image.id,
      personId,
    });
    setAppearances((prev) => ({ ...prev, [appearance.id]: appearance }));
  }
  async function removeAppearance_(appearanceId: number) {
    await removeAppearance({ appearanceId });
    setAppearances((prev) => {
      delete prev[appearanceId];
      return prev;
    });
  }
  async function linkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId];
    const face = allFaces[faceId];
    setAppearances((prev) => ({
      ...prev,
      [appearance.id]: {
        ...appearance,
        faces: appearance.faces.concat([face]),
      },
    }));
    await linkFace({ faceId, appearanceId });
  }
  async function unlinkFace_(faceId: number, appearanceId: number) {
    const appearance = appearances[appearanceId];
    const faces = appearance.faces.filter((face) => face.id !== faceId);
    setAppearances((prev) => ({
      ...prev,
      [appearance.id]: {
        ...appearance,
        faces,
      },
    }));
    await unlinkFace({ faceId, appearanceId });
  }
  async function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;
    if (!destination || destination?.droppableId === source.droppableId) {
      return;
    }
    console.log({ result });
    const faceId = Number(draggableId);
    if (
      destination.droppableId === "unknown" &&
      source.droppableId !== "unknown"
    ) {
      console.log("unlinking known face");
      setUnknownFaces((prev) => ({ ...prev, [faceId]: allFaces[faceId] }));
      await unlinkFace_(faceId, Number(source.droppableId));
    } else if (
      source.droppableId === "unknown" &&
      destination.droppableId !== "unknown"
    ) {
      console.log("linking unknown face");
      setUnknownFaces((prev) => {
        delete prev[faceId];
        return prev;
      });
      await linkFace_(faceId, Number(destination.droppableId));
    } else {
      console.log("unlinking and linking");
      await unlinkFace_(faceId, Number(source.droppableId));
      await linkFace_(faceId, Number(destination.droppableId));
    }
    console.log(destination);
    console.log(source);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className="p-2" maxWidth="4xl" alignItems="center" mx="auto">
        <Heading mb={2} size="md" color="gray.300">
          Add a person
        </Heading>
        <PersonSearchbar onSelect={addAppearance_} />
        {Object.entries(appearances).map(([id, appearance]) => (
          <Box key={id}>
            <Flex justifyContent="space-between">
              <ModalHeading>{appearance.person.name}</ModalHeading>
              <RiDeleteBin2Fill onClick={() => removeAppearance_(Number(id))} />
            </Flex>
            <Droppable droppableId={id}>
              {(provided) => (
                <Flex
                  ref={provided.innerRef}
                  className="flex flex-row"
                  {...provided.droppableProps}
                >
                  <Box minHeight="150px" height="100%">
                    {appearance.faces.map((face, i) => (
                      <Draggable
                        draggableId={(console.log(face), face.id.toString())}
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
                  </Box>
                </Flex>
              )}
            </Droppable>
          </Box>
        ))}
        <Heading mb={2} size="md" color="gray.300">
          Unlabeled Faces
        </Heading>
        <Box>
          <Droppable droppableId="unknown">
            {(provided) => (
              <Flex
                ref={provided.innerRef}
                className="flex flex-row"
                {...provided.droppableProps}
              >
                <Box minHeight="150px" height="100%">
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
                </Box>
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </Box>
      </Box>
    </DragDropContext>
  );
}
