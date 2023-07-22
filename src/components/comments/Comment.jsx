import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import Avatar from "components/profile/Avatar";
import UsernameButton from "components/profile/UsernameButton";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "hooks/auth";
import { useDeleteComment } from "hooks/comments";
import { useUser } from "hooks/users";
import { FaTrash } from "react-icons/fa";

export default function Comment({ comment }) {
  const { text, uid, date, id } = comment;
  const { user: authUser, isLoading: userLoading } = useAuth(uid);
  const { user, isLoading } = useUser(uid);
  const { deleteComment, isLoading: deleteCommentLoading } =
    useDeleteComment(id);

  if (isLoading) return "Loading..";
  return (
    <Box px="4" py="2" maxW="600px" mx="auto" textAlign="left">
      <Flex pb={"2"}>
        <Avatar user={user} size="sm" />
        <Box flex={"1"} ml={"4"}>
          <Flex borderBottom={"1px solid"} borderColor={"teal.100"} pb={"2"}>
            <Box>
              <UsernameButton user={user} />
              <Text fontSize={"xs"} color={"gray.500"}>
                {formatDistanceToNow(date)}
              </Text>
            </Box>
            {!userLoading && authUser.id === uid && (
              <IconButton
                ml="auto"
                onClick={deleteComment}
                isLoading={deleteCommentLoading}
                size="md"
                colorScheme="red"
                variant="ghost"
                icon={<FaTrash />}
                isRound
              />
            )}
          </Flex>
          <Box pt={"2"} fontSize={"sm"}>
            <Text>{text}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
