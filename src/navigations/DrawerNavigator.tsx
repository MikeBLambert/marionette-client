import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import AppNavigator from './AppNavigator';
import UserContext from '../context/UserContext';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {SCREENS} from './contants';

const Drawer = createDrawerNavigator();

const DrawerContent = ({setIsDrawerOpen}: {setIsDrawerOpen: any}) => {
  const isOpen = useIsDrawerOpen();
  const context = useContext(UserContext);
  useEffect(() => {
    setIsDrawerOpen(isOpen);
  }, [isOpen]);
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
};

const DrawerNavigator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Drawer.Navigator
      initialRouteName={SCREENS.groups}
      drawerPosition="right"
      overlayColor="none"
      drawerType="slide"
      drawerStyle={{
        display: isDrawerOpen ? 'flex' : 'none',
      }}
      // drawerStyle={{height: 100, flex: 0}}
      drawerContent={() => {
        return <DrawerContent setIsDrawerOpen={setIsDrawerOpen} />;
      }}>
      <Drawer.Screen name="Groups" component={AppNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
