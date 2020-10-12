import React, {useContext} from 'react';
import DrawerNavigator from './DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import MobileAuth from '../auth/MobileAuth';
import UserContext from '../context/UserContext';
import {LINKING} from './constants';

const RootNavigator = ({isWeb}: {isWeb: boolean}) => {
  const {user} = useContext(UserContext);
  if (!isWeb) return <MobileAuth />;
  if (!user.isAuthenticated) return null;
  return (
    <NavigationContainer linking={LINKING}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
