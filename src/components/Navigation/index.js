import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthUserContext } from "../Session";

import * as ROUTES from "../../constants/routes";
import SimpleMenu from "./Menu";
import "./navigation.css";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

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
        color="primary"
        variant="outlined"
        component={Link}
        to={ROUTES.SIGN_IN}
      >
        Sign in
      </Button>
    </div>
  );
};

export default Navigation;
