import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Groups from '../screens/groups';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={({navigation}) => ({
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
