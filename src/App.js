import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AppBar, Toolbar, List, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import { Dogs, Home, GrowthWeight, GrowthPictures, Login } from './pages';
import { UserProvider, UserContext } from "./providers/UserProvider";

function App() {

  const user = useContext(UserContext);

  const useStyles = makeStyles({
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
  });

  const navLinks = [
    { title: 'Home', path: '/'},
    { title: 'Dogs', path: '/dogs'},
    { title: user ? 'Log out' : 'Log in', path: '/login'}
  ]
  const classes = useStyles();
  return (
    <UserProvider>
    <Router>
      <AppBar position="static">
        <Toolbar>
          <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
            {navLinks.map(({ title, path }) => (
              <Link to={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
             ))}
          </List>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/dogs" exact>
          <Dogs />
        </Route>
          <Route path="/dogs/lucy/growth-pictures">
            <GrowthPictures />
          </Route>
          <Route path="/dogs/lucy/growth-weight">
            <GrowthWeight />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
  </Router>
  </UserProvider>
  );
}

export default App;
