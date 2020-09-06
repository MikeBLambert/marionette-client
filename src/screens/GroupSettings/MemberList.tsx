import React, {FunctionComponent, Fragment} from 'react';
import {StyleSheet, View, Switch, ScrollView} from 'react-native';
import MemberListItem from './MemberListItem';
import Label from '../../components/atoms/Label';
import {MemberType} from '.';

interface Props {
  memberData: Array<MemberType>;
  setEditingMember: (id: string) => void;
  handleSwitchValueChange: (id: string) => void;
  showAll: boolean;
  handleRemoveMember: (id: string) => void;
  handleShowAll: (value: boolean) => void;
}

const MemberList: FunctionComponent<Props> = ({
  memberData,
  handleSwitchValueChange,
  handleRemoveMember,
  showAll,
  handleShowAll,
  setEditingMember,
}) => {
  if (!memberData.length) return <Fragment />;

  return (
    <Fragment>
      <View style={styles.maskAllOuterContainer}>
        <View style={styles.maskAllInnerContainer}>
          <Label>Mask</Label>
          <Switch value={showAll} onValueChange={handleShowAll} />
        </View>
      </View>
      <ScrollView>
        {memberData.map(({_id, username, alias, isMasked}) => (
          <MemberListItem
            onPress={() => setEditingMember(_id)}
            id={_id}
            key={_id}
            username={username}
            alias={alias}
            isMasked={isMasked}
            onSwitchValueChange={handleSwitchValueChange}
            onRemove={handleRemoveMember}
          />
        ))}
      </ScrollView>
    </Fragment>
  );
};

export default MemberList;

const styles = StyleSheet.create({
  maskAllOuterContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 'auto',
    width: 'auto',
  },
  maskAllInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginLeft: 11,
  },
});
