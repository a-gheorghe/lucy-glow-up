import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import Unauthorized from "../Unauthorized";
import { Dogs } from "../Dogs";
import { GrowthPictures } from "../Dogs/GrowthPictures";
import GrowthWeight from "../Dogs/GrowthWeight";
import { GrowthWeightForm } from "../Dogs/GrowthWeight/GrowthWeightForm";
import { GrowthPicturesForm } from "../Dogs/GrowthPictures/GrowthPicturesForm";
import Training from "../Training";
import * as ROUTES from "../../constants/routes";
import UserProvider from "../../contexts/userContext";

const App = () => (
  <UserProvider>
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.DOGS} component={Dogs} />
        <Route
          exact
          path={ROUTES.LUCY_GROWTH_WEIGHT}
          component={GrowthWeight}
        />
        <Route
          exact
          path={ROUTES.LUCY_GROWTH_PICTURES}
          component={GrowthPictures}
        />
        <Route
          path={ROUTES.LUCY_GROWTH_WEIGHT_ADD}
          component={GrowthWeightForm}
        />
        <Route
          path={ROUTES.LUCY_GROWTH_PICTURES_ADD}
          component={GrowthPicturesForm}
        />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.UNAUTHORIZED} component={Unauthorized} />
        <Route path={ROUTES.TRAINING} component={Training} />
      </div>
    </Router>
  </UserProvider>
);

export default App;
