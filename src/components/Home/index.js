import React from 'react';
import { withAuthorization } from '../Session';
 
const Home = () => (
  <div>
    <h1>Home</h1>
    <div> Accessed only if signed in</div>
  </div>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Home);