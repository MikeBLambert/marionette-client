import React, {FunctionComponent} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {PRIMARY} from '../../styles/colors';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const CicularButton: FunctionComponent<Props> = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fab}>
      {children}
    </TouchableOpacity>
  );
};

export default CicularButton;

const styles = StyleSheet.create({
  fab: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 100,
    backgroundColor: PRIMARY,
    width: 65,
    height: 65,
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    zIndex: 50,
  },
});
