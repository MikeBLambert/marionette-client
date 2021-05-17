import React, {FunctionComponent} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import OvalButton from '../atoms/OvalButton';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const OvalFab: FunctionComponent<Props> = ({onPress, children}) => {
  return (
    <View style={styles.container}>
      <OvalButton onPress={onPress}>{children}</OvalButton>
    </View>
  );
};

export default OvalFab;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  text: {fontSize: 18, color: 'white'},
});
