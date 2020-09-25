import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import {SCREENS} from './contants';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.signIn}
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.signUp}
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
