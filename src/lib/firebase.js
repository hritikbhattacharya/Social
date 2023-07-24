
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAzzddPma5a8QQiyw94Sfo0p6A2Oof3o1E",
  authDomain: "social-1a176.firebaseapp.com",
  projectId: "social-1a176",
  storageBucket: "social-1a176.appspot.com",
  messagingSenderId: "785024583132",
  appId: "1:785024583132:web:7ffaa458c3a6f1c007fb19",
  measurementId: "G-95H075LP0Y"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

