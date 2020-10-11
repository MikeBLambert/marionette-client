import React from 'react';
import Auth0 from 'react-native-auth0';
import {Button} from 'react-native';
import {AUTH0_DOMAIN, AUTH0_CLIENT_ID} from '@env';
// import UserContext from '../context/UserContext';

const MobileAuth = () => {
  const auth0 = new Auth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
  });
  const logIn = () => {
    console.log({auth0});
    // auth0.webAuth
    //   .userInfo({token: 'the user access_token'})
    //   .then((result) => console.log({result}));
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then((credentials) => {
        console.log({credentials});
        // Successfully authenticated
        // Store the accessToken
      })
      .catch((error) => console.log({error}));
  };
  // useEffect(() => {}, []);
  return <Button title="Sign In" onPress={logIn} />;
};

export default MobileAuth;
