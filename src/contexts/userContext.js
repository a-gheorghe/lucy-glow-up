import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    console.log('firebase.auth', firebase.auth());
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      console.log('auth state changed', user)
      try {
        if (user) {
          const contextUser = {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }
          const usersRef = firebase.firestore().collection('users').doc(user.uid)
          await usersRef.get()
            .then((docSnapshot) => {
              if (docSnapshot.exists) {
                usersRef.onSnapshot((doc) => {
                  setUser(doc.data())
                });
              } else {
                usersRef.set(contextUser) // create the document
                setUser(contextUser)
              }
            })
        } else {
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
export const useUserContext = () => useContext(UserContext);
