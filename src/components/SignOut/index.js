import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase/clientApp";
import * as ROUTES from "../../constants/routes";

const SignOutButton = () => {
  const history = useHistory();
  const signOut = () => {
    firebase.auth().signOut().then(() => {
      history.push(ROUTES.LANDING)
    }).catch((error) => {
      // An error happened.
    })
  };
  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
