import { useImageSliceCanvas } from "@/hooks/useImageSlice";
import { Face, Image, Person, FaceDataFragment } from "@/__generated__/graphql";
import { Flex, Text } from "@chakra-ui/layout";
import { Box, Grid, Spinner, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

export type FaceAppearance = {
  // image on the side
  face?: FaceDataFragment;
  person?: Pick<Person, "name">;
  image: Pick<Image, "rawUrl">;
};

export function FaceAppearance({ face, person, image }: FaceAppearance) {
  const height = useBreakpointValue([90, 90, 90, 120]);
  const canvas = useImageSliceCanvas({
    src: image.rawUrl,
    height: height ?? 90,
    face,
    style: {
      objectFit: "cover",
    },
  });
  console.log(person);
  return (
    <Grid
      gridAutoFlow="column"
      gridTemplateColumns={["70px auto", "70px auto", "70px auto", "70px auto"]}
      gap={2}
    >
      <Flex
        borderRadius="sm"
        overflow="hidden"
        objectPosition="center"
        objectFit="cover"
        alignItems="flex-start"
      >
        {canvas}
      </Flex>
      <Flex height="100%" justifyContent="center" flexDirection="column">
        <Text fontSize="sm" color={person ? "gray.100" : "gray.400"}>
          {person?.name ?? <i>Unknown Person</i>}
        </Text>
        <Text fontSize="xs" color="gray.500" display="flex" alignItems="center">
          Prediction
          <Spinner size="xs" ml={2} />
        </Text>
      </Flex>
    </Grid>
  );
}
