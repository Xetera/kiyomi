import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { capitalize, flatMap } from "lodash";
import debounce from "lodash/lodash";
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
        gap={2}
        top="100%"
        background="black"
      >
        {name !== "" &&
          !isModalForceClosed &&
          data?.hits.map((person) => (
            <Button
              borderRadius="sm"
              height="auto"
              key={person.id}
              p={2}
              _hover={{
                background: "black",
              }}
              onClick={() => select(person.id)}
              justifyContent="start"
            >
              <img src="https://placewaifu.com/image/40/50" />
              <Flex flexFlow="column" textAlign="left">
                <Heading
                  fontWeight="bold"
                  size="sm"
                  mb={1}
                  color="gray.500"
                  cursor="pointer"
                  _hover={{
                    color: "gray.100",
                  }}
                >
                  {person.name}
                </Heading>
                <Text size="xs" fontWeight="normal" mb={2}>
                  Placeholder description
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="400"
                  color="trueGray.200"
                  mb={1}
                >
                  Also known as
                </Text>
                <Flex flexFlow="row wrap">
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
            </Button>
          ))}
      </Grid>
    </Grid>
  );
}
