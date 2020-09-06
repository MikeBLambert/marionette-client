import React, {FunctionComponent} from 'react';
import {Switch} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

interface Props {
  id: string;
  username: string;
  alias: string;
  isMasked: boolean;
  onSwitchValueChange: (id: string) => void;
  onRemove: (id: string) => void;
  onPress: () => void;
}

const MemberListItem: FunctionComponent<Props> = ({
  id,
  username,
  alias,
  isMasked,
  onSwitchValueChange,
  onRemove,
  onPress,
}) => {
  return (
    <ListItem
      onPress={onPress}
      key={id}
      children={{}}
      bottomDivider
      title={`${username} (${alias})`}
      leftElement={
        <Switch
          value={isMasked}
          onValueChange={() => onSwitchValueChange(id)}
        />
      }
      rightElement={
        <Icon onPress={() => onRemove(id)} name="remove-circle" color="red" />
      }
    />
  );
};

export default MemberListItem;
