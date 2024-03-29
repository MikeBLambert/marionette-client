import React, {FunctionComponent} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import CicularButton from '../atoms/CircularButton';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const CircularFab: FunctionComponent<Props> = ({onPress, children}) => {
  return (
    <View style={styles.container}>
      <CicularButton onPress={onPress}>{children}</CicularButton>
    </View>
  );
};

export default CircularFab;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
