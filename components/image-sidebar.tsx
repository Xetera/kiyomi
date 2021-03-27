import { humanFileSize } from "@/lib/shared";
import React from "react";
import { Palette } from "./palette-color";
import { Tags } from "./tags";
import { CascadeChildren } from "./animations/cascade-children";
import { RiEdit2Line } from "react-icons/ri";
import { format } from "date-fns";
import Image from "next/image";
import { User } from "./user";
import { ImageContext } from "@/models/contexts";

function SidebarSection({ title, children }) {
  return (
    <>
      <h2 className="font-bold text-left mr-2">{title}</h2>
      <div className="flex items-center text-gray-400">{children}</div>
    </>
  );
}

export default function ImageSidebar({ onEdit }: { onEdit: () => void }) {
  const image = React.useContext(ImageContext);
  if (!image) {
    return null;
  }
  const uploadDate = new Date(image.createdAt);
  return (
    <aside className="align-start text-sm rounded">
      <CascadeChildren className="grid gap-4 text-sm">
        <div className="flex flex-row align-top">
          <User
            user={image.uploadedBy}
            bottom={
              <time
                className="text-gray-500"
                dateTime={image.createdAt.toString()}
              >
                {format(uploadDate, "MMMM dd, yyyy HH:mm")}
              </time>
            }
          />
        </div>
        <hr className="border-theme-subtle" />
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "min-content 1fr" }}
        >
          <SidebarSection title={"Dimensions"}>
            <p className="font-semibold">
              {image.width}x{image.height}
            </p>
          </SidebarSection>
          <SidebarSection title={"Size"}>
            <p className="font-semibold">{humanFileSize(image.bytes)}</p>
          </SidebarSection>
          <SidebarSection title={"Type"}>
            <p className="font-semibold">{image.mimetype.toUpperCase()}</p>
          </SidebarSection>
          <SidebarSection title={"NSFW?"}>
            <p className="font-semibold">{image.isNsfw ? "Yes" : "No"}</p>
          </SidebarSection>
        </div>
        {image.tags?.length > 0 ? (
          <Tags tags={image.tags.map((tag) => tag.name)} />
        ) : (
          <div />
        )}
        <Palette colors={image.palette} />
        <div>
          {image.source && <p className="text-gray-500">{image.source}</p>}
        </div>
        <div
          className="inline-flex items-center border-theme-subtle border-1 p-1 px-2 rounded cursor-pointer"
          onClick={onEdit}
        >
          <RiEdit2Line className=" text-gray-400 mr-2" />
          <p className="text-gray-400">Edit image</p>
        </div>
      </CascadeChildren>
    </aside>
  );
}
