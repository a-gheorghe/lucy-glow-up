import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

import * as ROUTES from "../../constants/routes";
import SimpleMenu from "./Menu";
import "./navigation.css";
import { useUserContext } from "../../contexts/userContext";
import firebase from "../../firebase/clientApp";


const Navigation = () => {
  const user = useUserContext().user;
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
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={ROUTES.DOGS}>Dogs</Link>
          </li>
          <li>
            <Link to={ROUTES.TRAINING}>Training</Link>
          </li>
        </ul>
      </Drawer>
      <SimpleMenu />
    </div>
  );
};

const NavigationNonAuth = () => {
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then((googleUser) => {
        console.log('user after signin', googleUser);
        // history.push(ROUTES.DOGS)
      })
      .catch(() => {
        // history.push(ROUTES.LANDING)
      })
  }

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
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={ROUTES.DOGS}>Dogs</Link>
          </li>
        </ul>
      </Drawer>
      <Button
        onClick={onSignIn}
      >
        SIGN IN
        </Button>
    </div >
  );
};

export default Navigation;
