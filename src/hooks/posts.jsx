import { useToast } from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setLoading] = useState();
  const toast = useToast();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
    toast({
      title: "Post added successfully",
      status: "success",
      isClosable: true,
      duration: 5000,
      position: "top",
    });
    setLoading(false);
  }

  return { addPost, isLoading };
}

export function usePosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);

  if (error) throw error;
  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState();

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost( id ) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  async function deletePost() {
    const res = window.confirm("Are you want to delete this post?");

    if (res) {
      setLoading(true);

      await deleteDoc(doc(db, "posts", id));

      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
      console.log(querySnapshot);

      toast({
        title: "Post is deleted",
        status: "info",
        position: "top",
        isClosable: true,
        duration: 5000,
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

export function usePost(id) {
  // const [isLoading, setLoading] = useState();
  const q = doc(db, "posts", id);
  const [post, isLoading, error] = useDocumentData(q);

  if(error) throw error;

  return { post, isLoading };
}

export function useUserPost(uid) {
  const q = query(
    collection(db, "posts"),
    orderBy("date", "desc"),
    where("uid", "==", uid)
  );
  const [posts, isLoading, error] = useCollectionData(q);

  if (error) throw error;
  return { posts, isLoading };
}
