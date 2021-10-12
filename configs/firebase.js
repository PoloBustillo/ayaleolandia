/** @format */
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
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
  if (user.providerData[0].providerId === "facebook.com") {
    photoURL = photoURL + "?access_token=" + user.accessToken;
  }
  console.log(photoURL);
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    console.log(user);
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;

    onChange(normalizedUser);
  });
};
export const loginWith = async (provider) => {
  if (provider === "google") {
    await signInWithPopup(auth, googleProvider);
  }
  if (provider === "facebook") {
    await signInWithPopup(auth, facebookProvider);
  }
};

export const signOutUser = async () => {
  auth.signOut();
};
