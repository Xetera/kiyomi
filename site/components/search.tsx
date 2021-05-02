import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { capitalize, flatMap } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "react-use";

function intersperse<T>(arr: T[], inter: T) {
  return flatMap(arr, (a, i) => (i ? [inter, a] : [a]));
}

export type PersonSearchbarProps = {
  onSelect: (id: number) => void;
  onChange?: (value: string) => void;
};

type SearchResults = {
  hits: Array<{
    id: number;
    name: string;
    aliases: string[];
  }>;
};

export function PersonSearchbar(props: PersonSearchbarProps) {
  const [name, setName] = useState<string>("");
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef<HTMLDivElement>(null);
  // State for our modal
  const [isModalForceClosed, setModalForceClosed] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalForceClosed(true));
  const { data, refetch, isLoading } = useQuery<SearchResults>(
    "idols",
    (a) =>
      fetch(
        `${process.env.NEXT_PUBLIC_MEILISEARCH_URL}/indexes/idols/search?q=${name}&limit=6`
      ).then((r) => r.json()),
    { enabled: false }
  );
  console.log(data);
  useDebounce(
    () => {
      if (name !== "") {
        refetch();
      }
    },
    400,
    [name]
  );

  function onType(value: string) {
    setName(value);
    setModalForceClosed(false);
    props?.onChange?.(value);
  }

  function select(id: number) {
    props.onSelect(id);
    setName("");
  }

  return (
    <Grid gap={3} position="relative" ref={ref}>
      <InputGroup>
        <Input
          mb={3}
          placeholder="Search"
          onChange={(event) => onType(event.target.value)}
          value={name}
        />
        {isLoading && (
          <InputRightElement>
            <Spinner isIndeterminate />
          </InputRightElement>
        )}
      </InputGroup>
      <Grid
        borderRadius="md"
        position="absolute"
        zIndex="10"
        width="100%"
        gap={3}
        top="100%"
        background="black"
      >
        {name !== "" &&
          !isModalForceClosed &&
          data?.hits.map((person) => (
            <Button
              borderRadius="md"
              overflow="hidden"
              height="auto"
              padding="0"
              key={person.id}
              _hover={{
                background: "black",
              }}
              onClick={() => select(person.id)}
              justifyContent="start"
            >
              <Image
                src="https://placewaifu.com/image/40/50"
                height="100%"
                width="100%"
                maxWidth="90px"
                objectFit="cover"
              />
              <Grid
                flexFlow="column"
                justifyContent="space-between"
                textAlign="left"
                gap={2}
                p={3}
                width="100%"
              >
                <Box>
                  <Heading
                    fontWeight="bold"
                    size="sm"
                    mb={1}
                    color="trueGray.100"
                    cursor="pointer"
                  >
                    {person.name}
                  </Heading>
                  <Text
                    size="xs"
                    fontWeight="normal"
                    mb={2}
                    color="trueGray.400"
                  >
                    Placeholder description
                  </Text>
                </Box>
                <Flex flexFlow="row wrap" alignItems="center">
                  <Text
                    fontSize="xs"
                    fontWeight="400"
                    color="trueGray.200"
                    mr={1}
                  >
                    Also known as
                  </Text>
                  <Flex flexFlow="row wrap" alignItems="center">
                    {intersperse(
                      person.aliases.map((alias) => (
                        <Text color="gray.500" fontWeight="400" fontSize="sm">
                          {capitalize(alias)}
                        </Text>
                      )),
                      <Text color="gray.700" fontWeight="500" m="0 4px">
                        •
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Grid>
            </Button>
          ))}
      </Grid>
    </Grid>
  );
}
