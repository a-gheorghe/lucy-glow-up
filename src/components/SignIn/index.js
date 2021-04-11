import React, { useEffect } from "react";
import * as firebaseui from "firebaseui";
import * as ROUTES from "../../constants/routes";
import firebase from "../../firebase/clientApp";
import { useUser } from "../../contexts/userContext";

const SignInPage = () => {
  const user = useUser();
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: ROUTES.LANDING,
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    });
  }, []);

  return (
    <>
      {user.isLoading ? <div> Loading </div> : <div> Sign in </div>}
      <div id="firebaseui-auth-container"></div>
    </>
  );
};

export default SignInPage;
