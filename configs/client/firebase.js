/** @format */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Logtail } from "@logtail/browser";
const logtail = new Logtail("46f2YDT9azLZ21YpgxK3uCJJ");
import { getFirestore, collection, doc, setDoc } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPZnbAyv_TYe4S5j6ZQNQTGHTJw2yn-sk",
  authDomain: "ayaleolandia-87c19.firebaseapp.com",
  projectId: "ayaleolandia-87c19",
  storageBucket: "ayaleolandia-87c19.appspot.com",
  messagingSenderId: "223986293547",
  appId: "1:223986293547:web:1c769e93dcf02077a5c36e",
  measurementId: "G-FCYZB8V1YC",
};

// Initialize Firebase
!getApps().length && initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
const usersRef = collection(db, "users");
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const mapUserFromFirebaseAuthToUser = (user) => {
  let { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};
export const createAccountWith = async (provider, email, password) => {
  let session;
  if (provider === "google") {
    session = await signInWithPopup(auth, googleProvider);
  }
  if (provider === "facebook") {
    session = await signInWithPopup(auth, facebookProvider);
  }
  if (provider === "email") {
    session = await createUserWithEmailAndPassword(auth, email, password);
  }

  if (
    session.user.metadata.creationTime === session.user.metadata.lastSignInTime
  ) {
    const data = {
      name: session.user.displayName,
      id: session.user.uid,
      phoneNumber: session.user.phoneNumber,
      email: session.user.email,
      emailVerified: session.user.emailVerified,
      photoUrl: session.user.photoURL,
      orders: [],
      address: {},
      paymentMethods: {},
      billingAddress: {},
      shipAddresses: {},
    };
    logtail.info("New user created");

    try {
      //TODO: SAVE USER
      await setDoc(doc(usersRef, session.user.uid), data);
    } catch (error) {
      logtail.error(`User creation error: ${error}`);
    }
  }
};
export const loginWith = async (provider, email, password) => {
  let session;
  if (provider === "google") {
    session = await signInWithPopup(auth, googleProvider);
  }
  if (provider === "facebook") {
    session = await signInWithPopup(auth, facebookProvider);
  }
  if (provider === "email") {
    session = await signInWithEmailAndPassword(auth, email, password);
  }
  if (
    session.user.metadata.creationTime === session.user.metadata.lastSignInTime
  ) {
    try {
      //TODO: SAVE USER
      await setDoc(doc(usersRef, session.user.uid), data);
    } catch (error) {
      logtail.error(`User creation error: ${error}`);
    }
  }
};

export const signOutUser = async () => {
  auth.signOut();
};
export const resetPasswordByEmail = async (email, successFunc, errorFunc) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      successFunc();
    })
    .catch((error) => {
      logtail.error(`Sent email error: ${error}`);
      const errorCode = error.code;
      errorFunc(errorCode);
    });
};
