import React from 'react';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';

interface Props {
  token: string;
}

const RootNavigator = ({token}: Props) => (
  <NavigationContainer>
    {token ? <DrawerNavigator /> : <AuthNavigator />}
  </NavigationContainer>
);

export default RootNavigator;
