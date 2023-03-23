import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSjExG4XpH3S7CG6tRzJAGWhmHyL_oYNY",
    authDomain: "chat1-b013f.firebaseapp.com",
    projectId: "chat1-b013f",
    storageBucket: "chat1-b013f.appspot.com",
    messagingSenderId: "282658106935",
    appId: "1:282658106935:web:f8bef323f6dd9bd8acd9b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();