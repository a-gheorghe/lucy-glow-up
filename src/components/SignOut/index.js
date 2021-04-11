import React from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import firebase from "../../firebase/clientApp";
import * as ROUTES from "../../constants/routes";

const SignOutButton = () => {
  const history = useHistory();
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push(ROUTES.SIGN_IN);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  console.log("user is", useUser());
  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
