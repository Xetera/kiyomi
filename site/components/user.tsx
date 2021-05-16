import React from "react";
import { RiHammerLine, RiShieldStarLine } from "react-icons/ri";
import {
  Maybe,
  Role,
  UserDataFragment,
  User as UserData,
} from "@/__generated__/graphql";
import { Box, Text } from "@chakra-ui/layout";
import { Flex, Image, Tag } from "@chakra-ui/react";

export function User({
  user,
  bottom,
}: {
  user?: Maybe<
    Pick<UserData, "bot" | "name" | "roles" | "avatar"> & {
      roles: Array<Pick<Role, "name">>;
    }
  >;
  bottom: React.ReactElement;
}) {
  const imageDimensions = ["64px", "96px"];
  const isAdmin = user?.roles.find((role) => role.name === "ADMINISTRATOR");
  const isBot = Boolean(user?.bot);
  return (
    <div className="flex flex-row align-top">
      <Box borderRadius="md" overflow="hidden" mr={4}>
        {user?.avatar && (
          <Image
            src={user.avatar}
            width={imageDimensions}
            height={imageDimensions}
          />
        )}
      </Box>
      <Flex
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex mb={1} alignItems="center">
          <Text
            fontSize={["md", "md", "lg", "xl"]}
            mr={2}
            fontWeight="semibold"
          >
            {user?.name ?? <i>Unknown User</i>}
          </Text>
          {isAdmin && (
            <Box data-tip="Staff member" mr={2} display="flex">
              <RiShieldStarLine height="100%" size={16} />
            </Box>
          )}
          {isBot && (
            <Tag mr={2} fontSize="sm">
              Bot
            </Tag>
          )}
        </Flex>
        {bottom}
      </Flex>
    </div>
  );
}
