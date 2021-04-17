import { useSearchPersonQuery } from "@/__generated__/graphql";
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
import debounce from "lodash/lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";

export type PersonSearchbarProps = {
  onSelect: (id: number) => void;
};

export function PersonSearchbar(props: PersonSearchbarProps) {
  const [name, setName] = useState<string>("");
  const { data, refetch, isLoading } = useSearchPersonQuery(
    { name },
    { enabled: false }
  );
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
  }

  function select(id: number) {
    props.onSelect(id);
    setName("");
  }

  return (
    <Box mb={3}>
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
      <Grid borderRadius="md">
        {name !== "" &&
          data?.searchPerson.map((person) => (
            <Button
              height="auto"
              borderRadius="none"
              key={person.id}
              p={2}
              _hover={{
                background: "black",
              }}
              onClick={() => select(person.id)}
              justifyContent="start"
            >
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
                <Text size="xs" fontWeight="normal">
                  Placeholder description
                </Text>
              </Flex>
            </Button>
          ))}
      </Grid>
    </Box>
  );
}
