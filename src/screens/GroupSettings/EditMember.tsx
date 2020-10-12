import React, {FunctionComponent, useState, useEffect} from 'react';
import {StyleSheet, View, Switch} from 'react-native';
import {Overlay, Button, Input} from 'react-native-elements';
import {gql} from '@apollo/client';
import TypeAhead from '../../components/organisms/TypeAhead';
import Label from '../../components/atoms/Label';
import {MemberType} from '.';
import useRequest from '../../hooks/useRequest';

const USERS = gql`
  query FETCH_USERS($username: String) {
    users(input: {username: $username}) {
      username
      _id
    }
  }
`;

interface Props {
  saveMember: (params: MemberType) => void;
  setIsVisible: (isVisible: boolean) => void;
  member: MemberType;
}

const EditMember: FunctionComponent<Props> = ({
  setIsVisible,
  saveMember,
  member,
}) => {
  const {useLazyQuery} = useRequest();
  const [selectedUser, setSelectedUser] = useState({_id: '', username: ''});
  const [alias, setAlias] = useState('');
  const [isMasked, setIsMasked] = useState(false);

  const [fetchUsers, {data, loading}] = useLazyQuery(USERS, {});

  useEffect(() => {
    if (!member) {
      return;
    }
    setSelectedUser({_id: member._id, username: member.username});
    setAlias(member.alias);
    setIsMasked(member.isMasked);
  }, [member]);

  const doTypeAheadSearch = (value: string) => {
    fetchUsers({variables: {username: value}});
  };

  const handleSave = () => {
    saveMember({
      username: selectedUser.username,
      _id: selectedUser._id,
      alias,
      isMasked,
    });
  };

  const handleTypeAheadSelect = ({
    value,
  }: {
    value: {_id: string; username: string};
  }) => {
    setSelectedUser(value);
    setAlias('');
  };

  const searchResults = () =>
    data && data.users
      ? data.users
          // .filter(({_id}: {_id: string}) => _id !== user._id)
          .map(({username, _id}: {username: string; _id: string}) => ({
            label: username,
            value: {username, _id},
          }))
      : [];

  return (
    <Overlay isVisible onBackdropPress={() => setIsVisible(false)}>
      <View style={styles.viewContainer}>
        <TypeAhead
          initialValue={member && member.username}
          handleSelect={handleTypeAheadSelect}
          doSearch={doTypeAheadSearch}
          searchResults={searchResults()}
          placeholder="Search for User"
          label="User"
          loading={loading}
          searchDelay={500}
        />
        {!!selectedUser._id && (
          <View style={styles.aliasContainer}>
            <View style={styles.switchContainer}>
              <Label>Mask</Label>
              <Switch
                value={isMasked}
                onValueChange={setIsMasked}
                style={{marginTop: 12}}
              />
            </View>
            <View style={styles.aliasInput}>
              <Input
                label="Alias"
                value={alias}
                onChangeText={setAlias}
                placeholder="Enter Alias"
              />
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            type="clear"
            disabled={!selectedUser || !alias}
            onPress={handleSave}
            title="Save"
          />
        </View>
      </View>
    </Overlay>
  );
};

export default EditMember;

const styles = StyleSheet.create({
  viewContainer: {
    width: 350,
    height: 'auto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  aliasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 'auto',
  },
  aliasInput: {
    width: 275,
  },
  switchContainer: {
    alignItems: 'center',
  },
});
