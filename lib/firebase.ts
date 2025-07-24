
// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjUa8RvsTkyBoCyjYdDLsXdnO38IMlfUw",
  authDomain: "drishti2-5022b.firebaseapp.com",
  projectId: "drishti2-5022b",
  storageBucket: "drishti2-5022b.appspot.com",
  messagingSenderId: "434868659248",
  appId: "1:434868659248:web:be69fa19f8e4a96aad79f5",
  measurementId: "G-N8FB6HV8PZ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };