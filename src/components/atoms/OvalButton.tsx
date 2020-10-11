import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PRIMARY} from '../../styles/colors';

interface Props {
  onPress: (props: any) => any;
}

const OvalButton: FunctionComponent<Props> = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.fab}>
      {children}
    </TouchableOpacity>
  );
};

export default OvalButton;

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
    width: 'auto',
    height: 65,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    zIndex: 50,
  },
});
