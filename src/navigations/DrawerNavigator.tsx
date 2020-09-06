import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import UserContext from '../context/UserContext';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {SCREENS} from './contants';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const context = useContext(UserContext);
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.groups}
      drawerPosition="right"
      overlayColor="none"
      drawerStyle={{height: 100, flex: 0}}
      drawerContent={() => {
        return (
          <View>
            <ListItem title="Settings" bottomDivider>
              Settings
            </ListItem>
            <ListItem title="Log Out" onPress={() => context.logOut()}>
              Log Out
            </ListItem>
          </View>
        );
      }}>
      <Drawer.Screen name="Groups" component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
