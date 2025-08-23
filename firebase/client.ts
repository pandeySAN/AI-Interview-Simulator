// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {  getAuth  } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmS4O_vhqj-DlZk4_rw1WJ3iN_a1S71-4",
  authDomain: "interviewai-e09cd.firebaseapp.com",
  projectId: "interviewai-e09cd",
  storageBucket: "interviewai-e09cd.firebasestorage.app",
  messagingSenderId: "813487540759",
  appId: "1:813487540759:web:2a86c7fb99e5b8a067aa52",
  measurementId: "G-RNDDV8YB3J"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);