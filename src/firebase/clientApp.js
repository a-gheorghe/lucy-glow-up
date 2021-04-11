import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it

const clientCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lucy-glow-up.firebaseapp.com",
  projectId: "lucy-glow-up",
  storageBucket: "lucy-glow-up.appspot.com",
  messagingSenderId: "1049081408842",
  appId: "1:1049081408842:web:b12b5d339c2685d264a5b3",
  measurementId: "G-XSDXT2D343",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;
