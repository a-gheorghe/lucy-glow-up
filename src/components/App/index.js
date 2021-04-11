import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignInPage from "../SignIn";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import Unauthorized from "../Unauthorized";
import { Dogs } from "../Dogs";
import { GrowthPictures } from "../Dogs/GrowthPictures";
import GrowthWeight from "../Dogs/GrowthWeight";

import * as ROUTES from "../../constants/routes";
import UserProvider from "../../contexts/userContext";

const App = () => (
  <UserProvider>
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.DOGS} component={Dogs} />
        <Route path={ROUTES.LUCY_GROWTH_WEIGHT} component={GrowthWeight} />
        <Route path={ROUTES.LUCY_GROWTH_PICTURES} component={GrowthPictures} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.UNAUTHORIZED} component={Unauthorized} />
      </div>
    </Router>
  </UserProvider>
);

export default App;
