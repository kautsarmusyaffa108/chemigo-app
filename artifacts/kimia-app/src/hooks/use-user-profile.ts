import { useEffect, useState, useCallback } from "react";
import { doc, onSnapshot, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export interface UserProfile {
  name: string;
  email: string;
  photoURL: string;
  energy: number;
  streak: number;
  exp: number;
  completedLessons: string[];
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const ref = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setProfile(snap.data() as UserProfile);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore profile listen error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const updateEnergy = useCallback(
    async (newEnergy: number) => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { energy: Math.max(0, Math.min(5, newEnergy)) });
    },
    [user]
  );

  const addExp = useCallback(
    async (amount: number) => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { exp: increment(amount) });
    },
    [user]
  );

  const incrementStreak = useCallback(
    async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { streak: increment(1) });
    },
    [user]
  );

  const refillEnergy = useCallback(
    async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { energy: 5 });
    },
    [user]
  );

  const markLessonComplete = useCallback(
    async (lessonId: string) => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { completedLessons: arrayUnion(lessonId) });
    },
    [user]
  );

  return { profile, loading, updateEnergy, addExp, incrementStreak, refillEnergy, markLessonComplete };
}
