import { Box, Button, HStack, Heading, Textarea } from "@chakra-ui/react";
import PostsList from "components/post/PostsList";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import React from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { setFile, addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  function handleImg(e) {
    setFile(e.target.files[0]);
  }

  function handleAddPost(data, e) {
    console.log(data);

    addPost({
      uid: user.id,
      text: data.text,
    });

    reset();
  }
  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading>New Post</Heading>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading..."
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          mt="5"
          placeholder="create new post"
          minRows={4}
          {...register("text", { required: true })}
        />
        <input type="file" accept="image/*" onChange={handleImg} />
      </form>
    </Box>
  );
}

const Dashboard = () => {
  const { posts, isLoading: postLoading } = usePosts();
  return (
    <>
      <NewPost />
      <PostsList posts={posts} />
    </>
  );
};

export default Dashboard;
