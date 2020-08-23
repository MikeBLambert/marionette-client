import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/sign-in';
import SignUp from '../screens/sign-up';

interface Props {}

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
