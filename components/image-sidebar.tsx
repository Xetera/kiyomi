import { humanFileSize } from "@/lib/utils/shared";
import React from "react";
import { Palette } from "./palette-color";
import { Tags } from "./tags";
import { motion } from "framer-motion";
import { CascadeChildren } from "./animations/cascade-children";
import { RiQuestionLine, RiToolsLine, RiHammerLine } from "react-icons/ri";
import { format } from "date-fns";
import Image from "next/image";

function SidebarSection({ title, children }) {
  return (
    <div className="flex flex-row">
      <h2 className="font-bold text-right mr-2">{title}</h2>
      <div className="flex items-center text-blueGray-500">{children}</div>
    </div>
  );
}

export default function ImageSidebar({ image }: any) {
  const uploadDate = new Date(image.createdAt);
  console.log(image);
  return (
    <aside className="align-start text-sm rounded">
      <CascadeChildren className="grid gap-4 text-sm">
        <div className="flex flex-row align-top">
          <div style={{ maxHeight: "48px" }}>
            <Image
              src={image.user.image}
              width="48px"
              height="48px"
              className="rounded-full"
            />
          </div>
          <div className="ml-4">
            <p className="font-semibold mr-2 flex items-center">
              {image.user.name}
              <span data-tip="Staff member">
                <RiHammerLine className="ml-2" />
              </span>
            </p>
            <time className="text-blueGray-500" dateTime={image.createdAt}>
              {format(uploadDate, "MMMM dd, yyyy HH:mm")}
            </time>
          </div>
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
