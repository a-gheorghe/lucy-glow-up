import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { Training } from "../Training";
import Unauthorized from "../Unauthorized";
import { Dogs } from "../Dogs";
import { GrowthPictures } from "../Dogs/GrowthPictures";
import GrowthWeight from "../Dogs/GrowthWeight";

import * as ROUTES from "../../constants/routes";
import { UserProvider, useUserContext } from "../../contexts/userContext";

const App = () => {
  const userContext = useUserContext();
  console.log('userContext in app', userContext);

  return (
    <UserProvider>
      <Router>
        <div>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.DOGS} component={Dogs} />
          <ProtectedRoute exact path={ROUTES.TRAINING} component={Training} roles={['admin']} />
          <Route path={ROUTES.LUCY_GROWTH_WEIGHT} component={GrowthWeight} />
          <Route path={ROUTES.LUCY_GROWTH_PICTURES} component={GrowthPictures} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.UNAUTHORIZED} component={Unauthorized} />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App;
