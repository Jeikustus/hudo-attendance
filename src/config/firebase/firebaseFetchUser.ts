"use client"

import { useEffect, useState } from "react";
import { conAuth, conDatabase } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const useFetchUserData = () => {

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = conAuth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        console.error("No user authenticated");
        setUserData(null);
      }
    });
    return () => unsubscribe();
  });

  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(conDatabase, `users/${uid}`);
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (userDocSnapshot.exists()) {
        setUserData(userDocSnapshot.data());
      } else {
        console.error("User document does not exist");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null); 
    }
  };

  return userData;
};
