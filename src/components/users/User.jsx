import { Button, Code, Link, VStack } from "@chakra-ui/react";
import Avatar from "components/profile/Avatar";
import { Link as link } from "react-router-dom";
import { PROTECTED } from "lib/routes";



export default function UserCard({ user }) {
  const { id, username } = user;
  return (
    <VStack
      bg="gray.100"
      shadow="sm"
      rounded="md"
      textAlign="center"
      p="4"
      spacing="3"
    >
    hello world
      <Avatar user={user} />
      <Code>@{username}</Code>
      <Link>
        <Button
          as={link}
          to={`${PROTECTED}/profile/${id}`}
          size={"sm"}
          variant={"link"}
          colorScheme="teal"
        >
          View Profile
        </Button>
      </Link>
    </VStack>
  );
}
