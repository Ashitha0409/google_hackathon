// hooks/useFirebaseAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { fetchUserInfo } from "@/lib/auth";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const info = await fetchUserInfo(firebaseUser.uid);
        setUserInfo(info);
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, userInfo, loading };
}
