import useImageSlice from "@/hooks/useImageSlice";
import {
  AppearanceDataFragment,
  FaceDataFragment,
  Maybe,
  OneImageQuery,
} from "@/__generated__/graphql";
import React from "react";
import { maxPortraitHeight, PersonPortrait } from "./person-preview";
import dynamic from "next/dynamic";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { PersonSearchbar } from "./search";

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

function Searchbar() {}

export function ImageEditModal(props: ImageEditModalProps) {
  function a(p) {
    console.log(p);
  }
  function addAppearance(personId: number) {}
  return (
    <DragDropContext onDragEnd={a}>
      <Box className="p-2" maxWidth="4xl" alignItems="center" mx="auto">
        <Heading mb={2} size="md" color="gray.300">
          Add a person
        </Heading>
        <PersonSearchbar onSelect={addAppearance} />
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
                {props.image.unknownFaces.map((face, i) => (
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
  );
}
