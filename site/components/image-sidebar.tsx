import { humanFileSize } from "@/lib/shared";
import React from "react";
import { Palette } from "./palette-color";
import { Tags } from "./tags";
import { CascadeChildren } from "./animations/cascade-children";
import {
  RiEmotionSadFill,
  RiHeart2Line,
  RiHeart3Line,
  RiHeartAddFill,
  RiQuestionLine,
  RiScan2Line,
  RiUser3Fill,
  RiUserHeartFill,
} from "react-icons/ri";
import { format } from "date-fns";
import { User } from "./user";
import { ImageContext } from "@/models/contexts";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Grid, Spinner, useToast, UseToastOptions } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useToggleLikeMutation } from "@/__generated__/graphql";
import QueueButton from "./queue-button";

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

export type ImageSidebarProps = {
  onEdit: () => void;
};

export default function ImageSidebar({ onEdit }: ImageSidebarProps) {
  const toast = useToast();
  const image = React.useContext(ImageContext);
  const { data, mutate, isLoading } = useToggleLikeMutation();
  const [session] = useSession();
  if (!image) {
    return null;
  }
  function toggleLike() {
    if (!image) {
      return;
    }
    const toastProps: UseToastOptions = {
      variant: "solid",
      position: "bottom-right",
    };
    if (liked) {
      toast({
        ...toastProps,
        status: "info",
        title: "You unliked this image",
      });
    } else {
      toast({
        ...toastProps,
        status: "success",
        title: "You liked this image",
      });
    }
    mutate({ id: image.id });
  }
  const liked = data?.toggleLike.liked ?? image.liked;
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
        <Box>
          <Button
            background={liked ? "rose.500" : "trueGray.400"}
            color="white"
            size="sm"
            _hover={{
              background: "rose.400",
            }}
            onClick={toggleLike}
          >
            {isLoading ? <Spinner size="sm" /> : <RiHeartAddFill />}
          </Button>
        </Box>
        <Heading as="h2" size="sm" color="trueGray.300">
          Admin Controls
        </Heading>
        <Grid gap={2}>
          <Button
            onClick={onEdit}
            size="sm"
            leftIcon={<RiUser3Fill />}
            width="100%"
          >
            Edit Faces
          </Button>
          <QueueButton slug={image.slug} scanDate={image.faceScanDate} />
        </Grid>
      </CascadeChildren>
    </aside>
  );
}
