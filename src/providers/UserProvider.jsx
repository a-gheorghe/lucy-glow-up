import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../firebase";

export const UserContext = createContext({user: null})
export const UserProvider = (props) => {
  const [user, setuser] = useState(null)
  useEffect(() => {
auth.onAuthStateChanged(async (user) => {
if (user) {
    const { displayName, email }  = user;
    setuser({
      displayName,
      email,
      admin: email === 'a.s.gheorghe3@gmail.com'
    })

}
})
  },[])

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}