/** @format */

import { useState, useEffect } from "react";
import { auth, getUser } from "configs/client/firebase.js";

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
    username: `user_${user.uid.slice(-5)}`,
    emailVerified: user.emailVerified,
    id: user.uid,
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
    let user = await getUser(authState.uid);
    let formattedUser = formatAuthUser(authState, user);
    console.log(formattedUser);
    try {
      setAuthUser(formattedUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
      //TODO: log off sent error msg
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
  };
}
