import { initializeApp } from "firebase/app";
//import the following services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCm-2YRATMQ6DeDGeGqYqoSGghVgQf9ePU",
  authDomain: "monique-49587.firebaseapp.com",
  projectId: "monique-49587",
  storageBucket: "monique-49587.firebasestorage.app",
  messagingSenderId: "1006067648471",
  appId: "1:1006067648471:web:3891feefc65098483f6d92",
  measurementId: "G-T4Z5W14E89",
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
//console.log(app)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

//We will be using the following firebase services for this project: authentication, firestore database, and storage
