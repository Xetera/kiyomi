import { humanFileSize } from "@/lib/utils/shared";
import React from "react";
import { Palette } from "./palette-color";
import { Tags } from "./tags";
import { motion } from "framer-motion";
import { CascadeChildren } from "./animations/cascade-children";

function SidebarSection({ title, children }) {
  return (
    <div className="flex flex-col">
      <h2 className="mb-1 font-bold">{title}</h2>
      <div className="flex items-center text-blueGray-500">{children}</div>
    </div>
  );
}

export default function ImageSidebar({ image }: any) {
  return (
    <aside className="align-start text-sm rounded">
      <CascadeChildren className="grid gap-4">
        <SidebarSection title={"Uploaded By"}>
          <img src={image.user.image} className="rounded-full w-7 h-7 mr-2" />
          <p className="font-semibold mr-2">{image.user.name}</p>
          <span className="px-2 py-1 bg-blueGray-800 font-semibold text-blueGray-400 text-xs rounded">
            BOT
          </span>
        </SidebarSection>
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
        <SidebarSection title={"Tags"}>
          <Tags tags={["test", "kpop", "tagging"]} />
        </SidebarSection>
        <SidebarSection title={"Views"}>
          <p className="font-semibold">{image.views}</p>
        </SidebarSection>
        <Palette colors={image.palette} />
        <a href={image.url}>View Original</a>
      </CascadeChildren>
    </aside>
  );
}
