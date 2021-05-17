import React, {FunctionComponent} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Icon} from 'react-native-elements';
import CircularFab from '../molecules/CircularFab';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
}

const PlusFab: FunctionComponent<Props> = ({onPress}) => {
  return (
    <CircularFab onPress={onPress}>
      <Icon name="plus" color="white" type="antdesign" />
    </CircularFab>
  );
};

export default PlusFab;
