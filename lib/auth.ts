// lib/auth.ts
import { auth, db, storage } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Register user and store extra info in Firestore
export async function registerUser({
  name,
  email,
  password,
  role,
  zone,
}: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "responder";
  zone?: string;
}) {
  const userCred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    role,
    zone: zone || null,
  });
  return userCred;
}

// Login user
export function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout user
export function logoutUser() {
  return signOut(auth);
}

// Fetch user info (role, etc.) from Firestore
export async function fetchUserInfo(uid: string) {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
}