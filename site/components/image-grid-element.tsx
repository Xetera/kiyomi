import { HomepageQuery } from "@/__generated__/graphql";
import Link from "next/link";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import format from "date-fns/format";

export type ImageGridElementProps = {
  image: HomepageQuery["images"][number];
};

export function ImageGridElement(props: ImageGridElementProps) {
  const { image } = props;
  console.log(image.createdAt);
  return (
    <Link href={image.url} key={image.id} passHref>
      <Flex
        height="100%"
        as="a"
        flexDirection="column"
        objectFit="cover"
        background="gray.900"
        borderRadius="sm"
        overflow="hidden"
      >
        <Image
          objectPosition="center"
          objectFit="cover"
          width="100%"
          height="100%"
          src={image.rawUrl}
        />
        <Box
          justifyContent="space-between"
          p={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
          color="gray.200"
        >
          <Text fontSize="xs">
            {image.appearances[0]?.person.name ?? "Unknown"}
          </Text>
          <Text as="time" dateTime={image.createdAt} fontSize="xs">
            {format(new Date(image.createdAt), "MMMM yyyy")}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
}
