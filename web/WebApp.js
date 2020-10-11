import React from 'react';
import {Auth0Provider} from '@auth0/auth0-react';
import App from '../src/App';
import WebAuth from '../src/auth/WebAuth';

const WebApp = () => {
  return (
    <Auth0Provider
      domain={process.env.AUTH0_DOMAIN}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_REDIRECT_URI}
      scope="read:current_user update:current_user_metadata"
      audience={process.env.AUTH0_AUDIENCE}>
      <App isWeb /> <WebAuth />
    </Auth0Provider>
  );
};

export default WebApp;
