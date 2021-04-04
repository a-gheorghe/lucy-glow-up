import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lucy-glow-up.firebaseapp.com",
  projectId: "lucy-glow-up",
  storageBucket: "lucy-glow-up.appspot.com",
  messagingSenderId: "1049081408842",
  appId: "1:1049081408842:web:b12b5d339c2685d264a5b3",
  measurementId: "G-XSDXT2D343",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  user = (uid) => {
    const userRef = this.firestore.collection("users").doc(`${uid}`);

    userRef
      .get()
      .then((user) => {
        if (user.exists) {
          return user.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting user:", error);
      });
  };
}

export default Firebase;
