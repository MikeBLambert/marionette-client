import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Groups">
      <Drawer.Screen name="Groups" component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
