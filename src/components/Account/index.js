import React from "react";

import { useUserContext } from "../../contexts/userContext";

const AccountPage = () => {
  const user = useUserContext().user;
  return (
    <>
      <div> This is the account page </div>
      <div>{user && <h1>Account: {user.email}</h1>}</div>
    </>
  );
};

export default AccountPage;
