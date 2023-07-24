import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useComment({ postID, uid }) {
  const [isLoading, setLoading] = useState();
  const toast = useToast();

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, {
      text,
      id,
      postID,
      date,
      uid,
    });

    toast({
      title: "comment added",
      status: "success",
      isClosable: true,
      position: "bottom-right",
      duration: 5000,
    });

    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(postID) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );
  const [comments, isLoading, error] = useCollectionData(q);

  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState();
  const toast = useToast();

  async function deleteComment() {
    const res = window.confirm("Are you sure to delete this comment");
    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);
      toast({
        title: "Comment deleted",
        status: "success",
        isClosable: true,
        position: "bottom-right",
        duration: 3000,
      });
      setLoading(false);
    }
  }
  return { deleteComment, isLoading };
}
