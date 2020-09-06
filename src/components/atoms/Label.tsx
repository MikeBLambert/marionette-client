import React, {FunctionComponent} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {LABEL_GREY} from '../../styles/colors';

const Label: FunctionComponent = ({children}) => {
  return <Text style={styles.label}>{children}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {color: LABEL_GREY, fontSize: 16, fontWeight: 'bold'},
});
