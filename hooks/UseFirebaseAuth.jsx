/** @format */

import { useState, useEffect } from "react";
import { auth, getUser } from "configs/client/firebase.js";

const formatAuthUser = (user) => {
  //TODO:retrieve user from DB
  return {
    orders: user.orders,
    address: user.address,
    pushNotification: user.pushNotification,
    subsciption: user.subsciption,
    paymentMethods: user.paymentMethods,
    billingAddress: user.billingAddress,
    shipAddresses: user.shipAddresses,
    username: user.username,
    emailVerified: user.emailVerified,
    uid: user.id,
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
    try {
      setLoading(true);
      let user = await getUser(authState.uid);
      setAuthUser(user);
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
