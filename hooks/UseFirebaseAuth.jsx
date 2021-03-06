/** @format */

import { useState, useEffect } from "react";
import { auth, createUser, getUser } from "configs/client/firebase.js";

import { logError } from "utils/logger";

const formatAuthUser = (user, userDB) => {
  if (userDB) {
    return userDB;
  }
  return {
    orders: {},
    address: {},
    pushNotification: true,
    subscription: false,
    paymentMethods: {},
    billingAddress: {},
    shipAddresses: {},
    username: user.displayName
      ? user.displayName
      : `user_${user.uid.slice(-5)}`,
    emailVerified: user.emailVerified,
    id: user.uid,
    phoneNumber: user.phoneNumber,
    email: user.email,
    name: "",
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
    let user = await getUser(authState.uid);

    let formattedUser = formatAuthUser(authState, user);

    try {
      if (user === undefined) {
        await createUser(authState.uid, formattedUser);
      }

      setAuthUser(formattedUser);
      setLoading(false);
    } catch (error) {
      logError(`Usuario no actualizado ${authState.uid}`, "authStateChanged", {
        error,
      });
    }
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    setAuthUser,
  };
}
