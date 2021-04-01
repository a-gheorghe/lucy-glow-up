import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebase, signInWithGoogle } from "../firebase";
import { UserContext } from '../providers/UserProvider';




export const Login = () => {
    const history = useHistory();



    const onLoginSuccess = () => {
        history.push('/dogs')
    }
    console.log('signInWithGoogle', signInWithGoogle);
    const user = useContext(UserContext)
    console.log('user is', user);

    useEffect(() => {
        if (user) {
            firebase.auth().signOut().then(() => {
                console.log('signed out')
              }).catch((error) => {
                console.log('some error in sign out')
              });
        }
    }, [user])

    return (
        <div className="login-buttons">
            {user ? <div> there is a user </div> :
        <button className="login-provider-button" onClick={() => signInWithGoogle(onLoginSuccess)}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>}
      </div>
    )
}