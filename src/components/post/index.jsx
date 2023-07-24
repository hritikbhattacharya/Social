import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Action from "./Action";

export default function Post({ post }) {
  const { uid, text, date, postImg } = post;

  return (
    <Box
      p="2"
      maxW={"400px"}
      width={"auto"}
      height={"auto"}
      alignItems={"center"}
    >
      <Box border="2px solid" borderColor="gray.100" borderRadius="md">
        <Header uid={uid} date={date} />
        <Box p="2" minH="50px">
          <Text
            wordBreaks="break-word"
            fontSize={["sm", "md"]}
            align={"left"}
            fontFamily={"monospace"}
          >
            {text}
          </Text>
        </Box>
        {postImg != null && (
          <Image
            src={postImg}
            m={"2"}
            maxH={"450px"}
            maxW={"350px"}
            borderRadius={"sm"}
          />
        )}

        <Action post={post} />
      </Box>
    </Box>
  );
}
