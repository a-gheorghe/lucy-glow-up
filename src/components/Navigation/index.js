import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import * as ROUTES from "../../constants/routes";
import SimpleMenu from "./Menu";
import "./navigation.css";
import { useUser } from "../../contexts/userContext";
import firebase from "../../firebase/clientApp";

const Navigation = () => {
  const user = useUser().user;
  console.log("user is", user);
  return <div>{user ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="nav-header">
      <Button onClick={() => setDrawerOpen(!drawerOpen)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ul onClick={() => setDrawerOpen(false)} className="unordered-list">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.DOGS}>Dogs</Link>
          </li>
        </ul>
      </Drawer>
      <SimpleMenu />
    </div>
  );
};

const NavigationNonAuth = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("login result is", result);
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  return (
    <div className="nav-header">
      <Button onClick={() => setDrawerOpen(!drawerOpen)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ul onClick={() => setDrawerOpen(false)} className="unordered-list">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.DOGS}>Dogs</Link>
          </li>
        </ul>
      </Drawer>
      <Button color="primary" variant="outlined" onClick={signIn}>
        Sign in
      </Button>
    </div>
  );
};

export default Navigation;
