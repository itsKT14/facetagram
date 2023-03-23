import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAASZT1RP9Q4p1UOGB1JDhHOfQTN4XO00k",
  authDomain: "facetagram-capstone.firebaseapp.com",
  projectId: "facetagram-capstone",
  storageBucket: "facetagram-capstone.appspot.com",
  messagingSenderId: "1062067154648",
  appId: "1:1062067154648:web:6c426f486ad9c5bffab1ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();