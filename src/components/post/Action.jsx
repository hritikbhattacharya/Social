import { Flex, IconButton } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import React from "react";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaTrash,
} from "react-icons/fa";
import { useToggleLike, useDeletePost } from "hooks/posts";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import { useComments } from "hooks/comments";

export default function Action({ post }) {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes.includes(user?.id);
  const { toggleLike, isLoading: LikeLoading } = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });

  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentLoading } = useComments(id);

  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          onClick={toggleLike}
          isLoading={LikeLoading || userLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          isRound
        />
        {likes.length}
      </Flex>
      <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          isLoading={commentLoading || userLoading}
          size="md"
          colorScheme="teal"
          variant="ghost"
          icon={comments?.length ? <FaComment /> : <FaRegComment />}
          isRound
        />
        {comments?.length}
      </Flex>
      {!userLoading && user?.id === uid && (
        <IconButton
          ml="auto"
          onClick={deletePost}
          isLoading={deleteLoading}
          size="md"
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />}
          isRound
        />
      )}
    </Flex>
  );
}
