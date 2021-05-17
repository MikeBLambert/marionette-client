import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import _ from 'lodash';
import {StyleSheet, View} from 'react-native';
import AddThingFab from '../../components/organisms/AddThingFab';
import EditMember from './EditMember';
import MemberList from './MemberList';
import {gql} from '@apollo/client';
import {Input, Icon} from 'react-native-elements';
import {SCREENS} from '../../navigations/constants';
import {NavigationProp} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';

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
  const {useMutation} = useRequest();
  const [isEditVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [memberData, setMemberData] = useState<{[key: string]: MemberType}>({});
  const [createGroup] = useMutation(CREATE_GROUP, {});

  useEffect(() => {
    setIsEditModalVisible(!!editingMember);
  }, [editingMember]);

  const handleSave = useCallback(() => {
    const members = Object.values(memberData).map((member) => ({
      ...member,
      isAdmin: false,
    }));

    createGroup({
      variables: {
        name,
        members: [
          ...members,
          {
            isAdmin: true,
            isMasked: false,
            alias: 'Admin',
          },
        ],
      },
    });
  }, [createGroup, name, memberData]);

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
  }, [memberData, navigation, name, handleSave]);

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
