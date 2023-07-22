import { Box } from "@chakra-ui/react";
import Post from ".";

export default function PostsList({ posts }) {
  return (
    <Box px="4" align="center">
      {posts?.length === 0
        ? "no posts"
        : posts?.map((post) => <Post key={post.id} post={post} />)}
    </Box>
  );
}
