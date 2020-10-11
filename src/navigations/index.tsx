import React, {useContext} from 'react';
import DrawerNavigator from './DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
// import MobileAuth from '../auth/MobileAuth';
import UserContext from '../context/UserContext';

const RootNavigator = ({isWeb}: {isWeb: boolean}) => {
  const {user} = useContext(UserContext);
  console.log({user, isWeb});
  // if (!isWeb) return <MobileAuth />;
  if (!user.accessToken) return null;
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
