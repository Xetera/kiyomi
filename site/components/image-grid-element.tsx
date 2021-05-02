import {
  Appearance,
  Image as ImageData,
  Person,
} from "@/__generated__/graphql";
import Link from "next/link";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import format from "date-fns/format";
import { AnimatePresence, motion } from "framer-motion";
import { AppearanceDataFragment } from "@/__generated__/request";

export type ImageGridElementProps = {
  image: Pick<ImageData, "createdAt" | "id" | "url" | "rawUrl"> & {
    appearances: Array<{
      person: Pick<Person, "name">;
    }>;
  };
};

const MotionBox = motion(Box);

export function ImageGridElement(props: ImageGridElementProps) {
  const [hovering, setHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { image } = props;

  return (
    <Link href={image.url} key={image.id} passHref>
      <Flex
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        height="100%"
        as="a"
        flexDirection="column"
        objectFit="cover"
        background="gray.900"
        borderRadius="md"
        position="relative"
        overflow="hidden"
      >
        <Skeleton isLoaded={loaded} height="100%">
          <Image
            objectPosition="center"
            objectFit="cover"
            width="100%"
            height="100%"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            src={image.rawUrl}
            // src={"a"}
          />
        </Skeleton>
        <AnimatePresence>
          {hovering && (
            <MotionBox
              initial={{ "--opacity": 0.1 }}
              exit={{ "--gradient": 0.1 }}
              animate={{ "--gradient": 0.8 }}
              transition="all"
              transitionDuration="0.04s"
              display="flex"
              background="linear-gradient(to bottom, transparent, rgba(0, 0, 0, var(--gradient)))"
              sx={{
                "--gradient": 0.1,
              }}
              justifyContent="space-between"
              p={2}
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              height="20%"
              flexDirection="row"
              alignItems="flex-end"
            >
              <Text
                fontSize="xs"
                color="white"
                zIndex="1000000"
                opacity="var(--gradient)"
              >
                {image.appearances[0]?.person.name ?? "Unknown"}
              </Text>
              <Text
                as="time"
                dateTime={image.createdAt}
                fontSize="xs"
                opacity="var(--gradient)"
              >
                {format(new Date(image.createdAt), "MMMM yyyy")}
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>
      </Flex>
    </Link> //
  );
}
