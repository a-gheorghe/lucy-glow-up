import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import "firebase/firestore"

export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lucy-glow-up.firebaseapp.com",
  projectId: "lucy-glow-up",
  storageBucket: "lucy-glow-up.appspot.com",
  messagingSenderId: "1049081408842",
  appId: "1:1049081408842:web:b12b5d339c2685d264a5b3",
  measurementId: "G-XSDXT2D343"
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = (successFunction) => {
  auth.signInWithPopup(googleProvider).then((res) => {
    successFunction()
  }).catch((error) => {
    console.log(error.message)
  })
}

export { firebase };