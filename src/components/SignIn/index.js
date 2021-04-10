import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { PasswordForgetLink } from "../PasswordForget";
import * as ROUTES from "../../constants/routes";
import * as firebaseui from "firebaseui";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_USER_STATE = {
  email: "",
  password: "",
};

const SignInFormBase = ({ firebase }) => {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth);
    ui.start("#firebaseui-auth-container", {
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  }, [firebase.auth, firebase.auth.GoogleAuthProvider.PROVIDER_ID]);

  const history = useHistory();
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const [error, setError] = useState(null);
  const { email, password } = user;

  const onSubmit = (event) => {
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setUser(INITIAL_USER_STATE);
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });

    event.preventDefault();
  };

  const onChange = (event) => {
    setUser({
      [event.target.name]: event.target.value,
    });
  };

  const isInvalid = user.password === "" || user.email === "";

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
      <div id="firebaseui-auth-container"></div>
    </>
  );
};

const SignInForm = withFirebase(SignInFormBase);
export default SignInPage;

export { SignInForm };
