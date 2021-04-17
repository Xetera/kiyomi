import { humanFileSize } from "@/lib/shared";
import React from "react";
import { Palette } from "./palette-color";
import { Tags } from "./tags";
import { CascadeChildren } from "./animations/cascade-children";
import { RiEdit2Line, RiQuestionLine } from "react-icons/ri";
import { format } from "date-fns";
import { User } from "./user";
import { ImageContext } from "@/models/contexts";
import { Flex, Heading, Text } from "@chakra-ui/layout";

function SidebarSection({ title, children }) {
  return (
    <>
      <Heading
        fontSize="sm"
        whiteSpace="nowrap"
        display="flex"
        flexFlow="row nowrap"
        alignItems="center"
        mr="2"
      >
        {title}
      </Heading>
      <Text size="sm" color="InactiveCaption">
        {children}
      </Text>
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
          <SidebarSection
            title={
              <>
                Scan Date
                <div data-tip="Last date this image was scanned for faces">
                  <RiQuestionLine className="ml-2" />
                </div>
              </>
            }
          >
            <p className="font-semibold">
              {image.faceScanDate
                ? format(new Date(image.faceScanDate), "MMMM dd, yyyy")
                : "Never"}
            </p>
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
        <Flex
          width="100%"
          justifyContent="center"
          py={2}
          textAlign="center"
          _hover={{
            background: "black",
          }}
          className="inline-flex items-center border-theme-subtle border-1 p-1 px-2 rounded cursor-pointer"
          onClick={onEdit}
        >
          <Text fontWeight="bold">Edit image</Text>
        </Flex>
      </CascadeChildren>
    </aside>
  );
}
