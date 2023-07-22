import { Box, Button, Flex,Text } from "@chakra-ui/react";
import Avatar from "components/profile/Avatar";
import UsernameButton from "components/profile/UsernameButton";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "hooks/users";
import React from "react";

export default function Header({ uid, date }) {
  const { user, isLoading } = useUser(uid);
  if (isLoading) return "Loading...";
  return (
    <Flex
      alignContent="center"
      borderBottom="2px solid"
      borderColor="teal.100"
      p="3"
      bg="gray.50"
    >
      <Avatar user={user} size="md" />
      <Box ml="4">
        <UsernameButton user={user}/>
        <Text fontSize="sm" color="gray.500">
          {formatDistanceToNow(date)} ago
        </Text>
      </Box>
    </Flex>
  );
}
