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
  appearance?: Maybe<AppearanceDataFragment>;
};
const DraggablePerson = React.forwardRef(
  ({ src, face, appearance, ...rest }: DraggablePersonProps, ref) => {
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
        <h2 className="mt-2">{appearance?.person.name ?? "Unknown"}</h2>
      </div>
    );
  }
);

function Searchbar() {}

export function ImageEditModal(props: ImageEditModalProps) {
  function a(p) {
    console.log(p);
  }
  return (
    <DragDropContext onDragEnd={a}>
      <div className="p-2">
        <Droppable droppableId="unknown">
          {(provided) => (
            <div
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
                    <DraggablePerson
                      face={face}
                      src={props.image.rawUrl}
                      ref={provided.innerRef}
                      appearance={face.appearance}
                      style={{ background: i.isDragging ? "red" : "inherit" }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
