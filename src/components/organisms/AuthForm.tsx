import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import LogoView from './LogoView';

interface Props {
  submitButtonTitle: string;
  onSubmit: () => void;
  onSwitchButtonPress: () => void;
  switchText: string;
  switchButtonText: string;
}

const AuthForm: FunctionComponent<Props> = ({
  children,
  submitButtonTitle,
  onSubmit,
  switchText,
  switchButtonText,
  onSwitchButtonPress,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LogoView />
      {children}
      <Button title={submitButtonTitle} onPress={onSubmit} />
      <View style={styles.switchAuthView}>
        <Text style={styles.switchText}>{switchText}</Text>
        <Button
          type="clear"
          style={styles.switchAuthButton}
          title={switchButtonText}
          onPress={onSwitchButtonPress}
        />
      </View>
    </ScrollView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  switchAuthView: {
    flex: 0.5,
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  switchText: {
    textAlign: 'center',
  },
  switchAuthButton: {
    flex: 0.5,
    width: 50,
  },
});
