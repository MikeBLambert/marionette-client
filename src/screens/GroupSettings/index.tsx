/* eslint-disable curly */
import React, {FunctionComponent, useState, useEffect, useContext} from 'react';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import AddThingFab from '../../components/organisms/AddThingFab';
import EditMember from './EditMember';
import MemberList from './MemberList';
import {useMutation, gql} from '@apollo/client';
import UserContext from '../../context/UserContext';
import {Input, Icon} from 'react-native-elements';
import {SCREENS} from '../../navigations/contants';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const CREATE_GROUP = gql`
  mutation CREATE_GROUP($name: String!, $members: [GroupMemberInput]) {
    createGroup(input: {name: $name, members: $members}) {
      _id
      createdAt
    }
  }
`;

export type MemberType = {
  _id: string;
  username: string;
  isMasked: boolean;
  alias: string;
};

const GroupSettings: FunctionComponent<Props> = ({navigation}) => {
  const {user} = useContext(UserContext);
  const [isEditVisible, setIsEditModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState('');
  const [name, setName] = useState('');
  const [memberData, setMemberData] = useState<{[key: string]: MemberType}>({});
  const [createGroup] = useMutation(CREATE_GROUP);

  useEffect(() => {
    setIsEditModalVisible(!!editingMember);
  }, [editingMember]);

  const handleSave = () => {
    const members = Object.values(memberData).map(({username, ...member}) => ({
      ...member,
      isAdmin: false,
    }));

    createGroup({
      variables: {
        name,
        members: [
          ...members,
          {
            _id: user._id,
            isAdmin: true,
            isMasked: false,
            alias: 'Admin',
          },
        ],
      },
    });
  };

  useEffect(() => {
    const isSaveDisabled = !name || _.isEmpty(memberData);
    navigation.setOptions({
      title: name,
      headerRight: () => {
        return (
          <Icon
            disabled={isSaveDisabled}
            name="done"
            color={!isSaveDisabled ? 'blue' : 'grey'}
            size={35}
            onPress={() => {
              handleSave();
              navigation.navigate(SCREENS.groups);
            }}
          />
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberData, navigation, name]);

  const [showAll, setShowAll] = useState(false);
  const handleShowAll = (value: boolean) => {
    setMemberData(
      (prevState) =>
        prevState &&
        _.mapValues(prevState, (member) => ({...member, isMasked: value})),
    );
    setShowAll(value);
  };

  const handleSwitchValueChange = (id: string) => {
    setMemberData((prevState) => {
      return {
        ...prevState,
        [id]: {...prevState[id], isMasked: !prevState[id].isMasked},
      };
    });
  };

  const handleSaveMember = (member: MemberType) => {
    const {_id} = member;
    setMemberData((prevState) => {
      return {
        ...prevState,
        [_id]: {...prevState[_id], ...member},
      };
    });
    setEditingMember('');
    setIsEditModalVisible(false);
  };

  const handleRemoveMember = (id: string) => {
    setMemberData((prevState) => _.omit(prevState, id));
  };

  return (
    <View style={styles.container}>
      <Input
        label="Group Name"
        placeholder="Input group name"
        value={name}
        onChangeText={setName}
      />
      <MemberList
        setEditingMember={setEditingMember}
        memberData={Object.values(memberData)}
        handleSwitchValueChange={handleSwitchValueChange}
        handleRemoveMember={handleRemoveMember}
        showAll={showAll}
        handleShowAll={handleShowAll}
      />

      {isEditVisible ? (
        <EditMember
          member={memberData[editingMember]}
          saveMember={handleSaveMember}
          setIsVisible={setIsEditModalVisible}
        />
      ) : (
        <AddThingFab
          onPress={() => setIsEditModalVisible(true)}
          buttonText="Add Member"
        />
      )}
    </View>
  );
};

export default GroupSettings;

const styles = StyleSheet.create({
  container: {flex: 1},
});
