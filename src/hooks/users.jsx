import { collection, query, updateDoc } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db, storage } from "lib/firebase";
import { doc } from "firebase/firestore";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);

  return { user, isLoading };
}

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
}

export function useUpdateAvatar(uid) {
  const [isLoading, setLoading] = useState();
  const [file, setFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  async function updateAvatar() {
    if (!file) {
      toast({
        title: "Choose a file to upload",
        status: "error",
        isClosable: true,
        position: "bottom-right",
        duration: 5000,
      });

      return;
    }
    setLoading(true);
    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      avatar: downloadURL,
    });
    toast({
      title: "Profile updated successfully",
      status: "success",
      isClosable: true,
      position: "bottom-right",
      duration: 5000,
    });
    setLoading(false);

    navigate(0);
  }
  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}
