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
import { logInfo } from "utils/logger";

import {
  enableIndexedDbPersistence,
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  initializeFirestore,
} from "firebase/firestore";

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
let firebaseapp = getApps()[0];

if (!firebaseapp) {
  firebaseapp = initializeApp(firebaseConfig);
  let initDB = initializeFirestore(firebaseapp, {});
  enableIndexedDbPersistence(initDB).catch((err) => {
    if (err.code == "failed-precondition") {
      logtail.warn("Multiple tabs open, persistence can only be enabled");
    } else if (err.code == "unimplemented") {
      logtail.warn("The current browser does not support");
    }
  });
}

export const db = getFirestore();
export const auth = getAuth();

const usersRef = collection(db, "users");
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const createAccountWith = async (formState) => {
  let session;

  session = await createUserWithEmailAndPassword(
    auth,
    formState.email,
    formState.password
  );
  let data = {
    orders: {},
    address: {},
    pushNotification: true,
    subscription: false,
    paymentMethods: {},
    billingAddress: {},
    shipAddresses: {},
    username: session.user.displayName
      ? session.user.displayName
      : `user_${session.user.uid.slice(-5)}`,
    emailVerified: session.user.emailVerified,
    id: session.user.uid,
    phoneNumber: formState.phone,
    email: session.user.email,
    name: formState.name,
    avatar: session.user.photoURL,
  };
  await createUser(session.user.uid, data);
  logInfo(
    createUserWithEmailAndPassword.name,
    data,
    `user created ${session.user.uid}`,
    { uid: session.user.uid }
  );
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
  try {
    await setDoc(doc(usersRef, uid), data);
    logInfo(createUser.name, data, "User created", { uid: uid });
  } catch (error) {
    logtail.error(
      `Method: createUser / User: ${uid} - ${data} / Error: ${error}`
    );
  }
};
export const updateUser = async (uid, data) => {
  try {
    await updateDoc(doc(usersRef, uid), data);
  } catch (error) {
    console.log(error);
    logtail.error(
      `Method: updateUser / User: ${uid} - ${data} / Error: ${error}`
    );
  }
};

export const getUser = async (uid) => {
  let user = null;
  try {
    user = await getDoc(doc(usersRef, uid));
    return user?.data();
  } catch (error) {
    logtail.error(`Method: getUser / User: ${uid} / Error: ${error}`);
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
