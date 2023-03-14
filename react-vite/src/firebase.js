import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"; //don't remove

const firebaseConfig = {
  apiKey: "AIzaSyDSDnqVBxq7nR-TJKpB-NxpYgid-SxAjeg",
  authDomain: "uploadingfile-e9bff.firebaseapp.com",
  projectId: "uploadingfile-e9bff",
  storageBucket: "uploadingfile-e9bff.appspot.com",
  messagingSenderId: "875864430875",
  appId: "1:875864430875:web:57a2bff6019247559a1bbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); //don't remove