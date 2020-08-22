import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../containers/Auth';

interface Props {}

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
