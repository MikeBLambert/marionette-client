import React, {FunctionComponent, useCallback} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

import PlusFab from '../../components/organisms/PlusFab';
import {SCREENS} from '../../navigations/constants';
import {gql} from '@apollo/client';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';

interface Props {
  navigation: NavigationProp<any>;
}
const GROUPS = gql`
  query ChatsListQuery($userId: Int!) {
    chat(order_by: [{messages_aggregate: {max: {created_at: desc}}}]) {
      id
      name
      picture
      owner_id
      chat_users(where: {user_id: {_neq: $userId}, user: {}}) {
        alias
        user {
          id
          username
          picture
        }
      }
    }
  }
`;

const Groups: FunctionComponent<Props> = ({navigation}) => {
  const {useLazyQuery} = useRequest();

  const [fetchGroups, {data}] = useLazyQuery(GROUPS, {
    fetchPolicy: 'network-only',
  });

  const fetchGroupsCallback = useCallback(() => {
    fetchGroups({
      variables: {userId: '1'},
    });
  }, [fetchGroups]);

  useFocusEffect(fetchGroupsCallback);

  const renderGroups = () => {
    if (!data || !data.groups) {
      return;
    }
    return data.groups.map(({name}: {name: string}, i: number) => (
      <ListItem key={`${name}-${i}`} topDivider bottomDivider>
        {name}
      </ListItem>
    ));
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>{renderGroups()}</ScrollView>
      <PlusFab onPress={() => navigation.navigate(SCREENS.groupSettings)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    overflow: 'scroll',
  },
});
export default Groups;
