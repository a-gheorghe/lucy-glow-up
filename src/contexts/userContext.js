import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      console.log("auth state changed", user);
      try {
        if (user) {
          console.log("auth user is in context", user);
          // User is signed in.
          const { uid } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          const userDoc = await firebase.firestore().doc(`users/${uid}`).get();
          if (userDoc.exists) {
            console.log("userDoc is", userDoc.data());
            setUser(userDoc.data());
          } else {
            const newUser = {
              id: uid,
              email: user.email,
              displayName: user.displayName,
            };
            console.log("new user is", newUser);
            firebase.firestore().collection("users").doc(user.uid).set(newUser);
            setUser(newUser);
          }
        } else {
          console.log("there is no user");
          setUser(null);
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);
