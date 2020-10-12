import {useContext} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Auth0 from 'react-native-auth0';
import {AUTH0_REDIRECT_URI, AUTH0_DOMAIN, AUTH0_CLIENT_ID} from '@env';
import UserContext from '../context/UserContext';

const useAuth = () => {
  const {
    user: {isWeb},
  } = useContext(UserContext);
  const {logout} = useAuth0();
  if (isWeb)
    return {
      logout: () =>
        logout({
          returnTo: AUTH0_REDIRECT_URI,
        }),
    };

  const auth0 = new Auth0({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
  });
  return {
    logout: () => {
      auth0.webAuth.clearSession();
    },
  };
};

export default useAuth;
