import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';

interface Props {
  isSignUpScreen: boolean;
  handleButtonPress: () => void;
}

const AuthSwitcher = ({isSignUpScreen, handleButtonPress}: Props) => {
  const questionText = isSignUpScreen
    ? 'Already have an account?'
    : "Don't have an account?";
  const buttonText = isSignUpScreen ? 'Sign In' : 'Sign Up';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{questionText}</Text>
      <Button
        style={styles.button}
        title={buttonText}
        type="clear"
        onPress={() => handleButtonPress()}
      />
    </View>
  );
};

export default AuthSwitcher;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
  },
  button: {
    flex: 0.5,
    width: 50,
  },
});
