import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUser from "../../contexts/userContext";

export const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const user = useUser().user;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: "/unauthorized" }} />;
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};
