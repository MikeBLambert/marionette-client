import React, {useContext} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import UserContext from '../context/UserContext';
import {LOGGED_OUT_USER} from '../context/UserProvider';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const context = useContext(UserContext);
  return (
    <Drawer.Navigator
      initialRouteName="Groups"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Log Out"
              onPress={() => context.setUser(LOGGED_OUT_USER)}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Groups" component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
