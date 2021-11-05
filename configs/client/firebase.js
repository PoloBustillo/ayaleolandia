/** @format */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
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
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore/lite";

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
};

export const createUser = async (uid, data) => {
  console.log("CREATE");
  try {
    await setDoc(doc(usersRef, uid), data);
  } catch (error) {
    //TODO: log off sent error msg
    console.log(error);
    logtail.error(`User creation error: ${error}`);
  }
};
export const updateUser = async (uid, data) => {
  console.log("UPDATE");
  try {
    await updateDoc(doc(db, "users", uid), data);
  } catch (error) {
    //TODO: log off sent error msg
    console.log(error);
    logtail.error(`User creation error: ${error}`);
  }
};

export const refreshUser = () => {
  auth.currentUser.reload();
};
export const getUser = async (uid) => {
  console.log("GET_USER");
  let user = null;
  try {
    user = await getDoc(doc(usersRef, uid));
    console.log(user.data());
    return user?.data();
  } catch (error) {
    //TODO: log off sent error msg
    console.log(error);
    logtail.error(`User creation error: ${error}`);
  }
  return user;
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
