import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAASZT1RP9Q4p1UOGB1JDhHOfQTN4XO00k",
  authDomain: "facetagram-capstone.firebaseapp.com",
  projectId: "facetagram-capstone",
  storageBucket: "facetagram-capstone.appspot.com",
  messagingSenderId: "1062067154648",
  appId: "1:1062067154648:web:6c426f486ad9c5bffab1ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);