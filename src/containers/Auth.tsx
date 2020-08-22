import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';

import SignUp from '../components/organisms/SignUp';
import AuthSwitcher from '../components/organisms/AuthSwitcher';
import SignIn from '../components/organisms/SignIn';
import LogoView from '../components/organisms/LogoView';

const Auth = () => {
  const [isSignUpScreen, setIsSignUpScreen] = useState(false);

  const switchAuth = () => {
    setIsSignUpScreen((prevState) => !prevState);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LogoView />
      {isSignUpScreen ? <SignUp /> : <SignIn />}
      <AuthSwitcher
        isSignUpScreen={isSignUpScreen}
        handleButtonPress={switchAuth}
      />
    </ScrollView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
