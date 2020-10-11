import React, {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {ActivityIndicator, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const WebAuth = () => {
  const {
    loginWithRedirect,
    user,
    isLoading,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const getUserMetadata = async () => {
    if (!user) return;
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        scope: 'read:current_user',
        redirect_uri: process.env.AUTH0_REDIRECT_URI,
      });
      AsyncStorage.setItem(
        'user',
        JSON.stringify({...user, accessToken, isAuthenticated}),
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUserMetadata();
  }, [user]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <Button
      onPress={() => logout({redirect_uri: process.env.AUTH0_REDIRECT_URI})}
      title="Log Out"
    />
  );
};

export default WebAuth;
