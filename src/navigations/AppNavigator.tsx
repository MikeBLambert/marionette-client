import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Groups from '../screens/Groups/index';
import {SCREENS} from './contants';
import GroupSettings from '../screens/GroupSettings';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.groups}
        component={Groups}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <Icon
                name="more-vert"
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name={SCREENS.groupSettings}
        component={GroupSettings}
        options={() => ({
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
