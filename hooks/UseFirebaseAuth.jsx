/** @format */

import { useState, useEffect } from "react";
import { auth } from "configs/client/firebase.js";

const formatAuthUser = (user) => {
  //TODO:retrieve user from DB
  return {
    emailVerified: user.emailVerified,
    uid: user.uid,
    phoneNumber: user.phoneNumber,
    email: user.email,
    name: user.displayName,
    avatar: user.photoURL,
  };
};

export default function UseFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log(authState);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
}
