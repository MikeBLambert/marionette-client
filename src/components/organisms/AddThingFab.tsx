import React, {FunctionComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import OvalFab from '../molecules/OvalFab';
import {Icon} from 'react-native-elements';

interface Props {
  buttonText: string;
  onPress: () => any;
}

const AddThingFab: FunctionComponent<Props> = ({onPress, buttonText}) => {
  return (
    <OvalFab onPress={onPress}>
      <Icon name="add" type="material" color="white" size={23} />
      <Text style={styles.text}>{buttonText}</Text>
    </OvalFab>
  );
};

export default AddThingFab;

const styles = StyleSheet.create({
  text: {fontSize: 18, color: 'white'},
});
