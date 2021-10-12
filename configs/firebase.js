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
} from "firebase/auth";

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
const auth = getAuth();
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
export const loginWith = async (provider, email, password) => {
  let session;
  if (provider === "google") {
    session = await signInWithPopup(auth, googleProvider);
  }
  if (provider === "facebook") {
    session = await signInWithPopup(auth, facebookProvider);
  }
  if (provider === "email") {
    try {
      session = await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      session = await signInWithEmailAndPassword(auth, email, password);
    }
  }
  //TODO:REMOVE
  console.log(session.user);
  if (
    session.user.metadata.creationTime === session.user.metadata.lastSignInTime
  ) {
    //TODO:REMOVE
    console.log("SAVE USER");
  }
};

export const signOutUser = async () => {
  auth.signOut();
};
