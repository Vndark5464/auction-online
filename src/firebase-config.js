// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"; // Import this

const firebaseConfig = {
  apiKey: "AIzaSyCLev0A5aMPf3lwqO1wgu_68mWTvTLquxA",
  authDomain: "auction-online-ff810.firebaseapp.com",
  projectId: "auction-online-ff810",
  storageBucket: "auction-online-ff810.appspot.com",
  messagingSenderId: "756757565656",
  appId: "1:756757565656:web:2484479644bac7d56e07ad",
  measurementId: "G-6YXDFG7WGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);