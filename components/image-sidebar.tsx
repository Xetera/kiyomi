import { humanFileSize } from "@/lib/shared";
import React from "react";
import { Palette } from "./palette-color";
import { Tags } from "./tags";
import { motion } from "framer-motion";
import { CascadeChildren } from "./animations/cascade-children";
import { RiQuestionLine, RiToolsLine, RiHammerLine } from "react-icons/ri";
import { format } from "date-fns";
import Image from "next/image";
import { User } from "./user";
import type { ImageResponse } from "@/pages/api/image/[slug]";
import { ImageContext } from "@/models/contexts";

function SidebarSection({ title, children }) {
  return (
    <div className="flex flex-row">
      <h2 className="font-bold text-right mr-2">{title}</h2>
      <div className="flex items-center text-blueGray-500">{children}</div>
    </div>
  );
}

export default function ImageSidebar() {
  const image = React.useContext(ImageContext);
  const uploadDate = new Date(image.createdAt);
  return (
    <aside className="align-start text-sm rounded">
      <CascadeChildren className="grid gap-4 text-sm">
        <div className="flex flex-row align-top">
          <User
            user={image.user}
            bottom={
              <time
                className="text-blueGray-500"
                dateTime={image.createdAt.toString()}
              >
                {format(uploadDate, "MMMM dd, yyyy HH:mm")}
              </time>
            }
          />
        </div>
        <hr className="border-theme-light" />
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
        <Tags tags={["test", "kpop", "tagging"]} />
        <Palette colors={image.palette} />
        <div>
          {image.source && <p className="text-blueGray-500">{image.source}</p>}
        </div>
        <a
          href={image.url}
          rel="external"
          target="_blank"
          className="hover:underline"
        >
          View Original
        </a>
      </CascadeChildren>
    </aside>
  );
}
