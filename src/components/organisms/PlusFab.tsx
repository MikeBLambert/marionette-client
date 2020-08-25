import React, {FunctionComponent} from 'react';
import CircularFab from '../molecules/CircularFab';
import {Icon} from 'react-native-elements';

interface Props {
  onPress: (props: any) => any;
}

const PlusFab: FunctionComponent<Props> = ({onPress}) => {
  return (
    <CircularFab onPress={onPress}>
      <Icon name="plus" type="antdesign" color="white" />
    </CircularFab>
  );
};

export default PlusFab;
