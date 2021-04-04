import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { Dogs } from '../Dogs';
import { GrowthPictures } from '../Dogs/GrowthPictures';
import GrowthWeight from '../Dogs/GrowthWeight'; 
 
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
 
const App = () => (
  <Router>
    <div>
      <Navigation />
 
      <hr />
 
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.DOGS} component={Dogs} />
      <Route path={ROUTES.LUCY_GROWTH_WEIGHT} component={GrowthWeight} />
      <Route path={ROUTES.LUCY_GROWTH_PICTURES} component={GrowthPictures} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);
 
export default withAuthentication(App);