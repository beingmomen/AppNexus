import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7AEfVGbRgXcGr1Xt8J5qu5yfy46st8Nk",
  authDomain: "appnexus-4136f.firebaseapp.com",
  databaseURL: "https://appnexus-4136f-default-rtdb.firebaseio.com",
  projectId: "appnexus-4136f",
  storageBucket: "appnexus-4136f.appspot.com",
  messagingSenderId: "242516469236",
  appId: "1:242516469236:web:e4b4a70f8bde24138005a1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const storageRef = ref;

export { db, storage, uploadBytesResumable, getDownloadURL, storageRef };
