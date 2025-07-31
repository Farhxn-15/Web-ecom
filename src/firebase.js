// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore for products, orders, users, reviews
import { getAuth } from "firebase/auth"; // For login/signup
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDhffHLT6Iq5vi6H4NUEO90EYT57zvz-lo",
  authDomain: "mehndi-web.firebaseapp.com",
  projectId: "mehndi-web",
  storageBucket: "mehndi-web.appspot.com",
  messagingSenderId: "Y112418735331",
  appId: "1:112418735331:web:b870023a6f3281b07b31d6"
  // Remove databaseURL if not actually using Realtime DB
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firestore database and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
