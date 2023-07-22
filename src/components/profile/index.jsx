import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuth } from "hooks/auth";
import { formatDistanceToNow } from "date-fns";
import { useUserPost } from "hooks/posts";
import PostsList from "components/post/PostsList";
import EditProfile from "./EditProfile";
import { useUser } from "hooks/users";

export default function Profile() {
  const { id } = useParams();
  const { user, isLoading: userLoading } = useUser(id);
  const { posts, isLoading: PostsLoading } = useUserPost(id);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (userLoading) return "Loading...";
  return (
    <Stack spacing={"5"}>
      <Flex p={["4", "6"]} pos={"relative"} align={"center"}>
        <Avatar user={user} />

        {!authLoading && authUser.id === user.id && (
          <Button
            pos={"absolute"}
            mb={"2"}
            top={"6"}
            right={"6"}
            colorScheme={"teal"}
            onClick={onOpen}
          >
            change avatar
          </Button>
        )}
        <Stack ml="10">
          <Text fontSize={"md"}>{user.username}</Text>
          <HStack spacing={"10"}>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              post: {posts?.length}
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              Likes:{user.likes?.count}
            </Text>
            <Text color={"gray.700"} fontSize={["sm", "lg"]}>
              joined : {formatDistanceToNow(user.date)}
            </Text>
          </HStack>
        </Stack>
        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />
      {PostsLoading ? (
        <Text>Posts are Loading</Text>
      ) : (
        <PostsList posts={posts} />
      )}
    </Stack>
  );
}
