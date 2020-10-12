import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

import PlusFab from '../../components/organisms/PlusFab';
import {SCREENS} from '../../navigations/constants';
// import UserContext from '../../context/UserContext';
import {gql} from '@apollo/client';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import useRequest from '../../hooks/useRequest';

interface Props {
  navigation: NavigationProp<any>;
}

// const GROUPS = gql`
//   query FETCH_GROUPS($_id: ID!) {
//     groups(input: {_id: $_id}) {
//       _id
//       name
//     }
//   }
// `;

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

const USERS = gql`
  query {
    users {
      username
    }
  }
`;

const Groups: FunctionComponent<Props> = ({navigation}) => {
  // const {user} = useContext(UserContext);
  const {useLazyQuery, useQuery} = useRequest();
  const {data: data2, error} = useQuery(USERS, {fetchPolicy: 'network-only'});
  console.log({data2, error});
  const [fetchGroups, {data}] = useLazyQuery(GROUPS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {}, []);

  useFocusEffect(
    useCallback(() => {
      fetchGroups({
        variables: {userId: '1'},
      });
    }, []),
  );
  const renderGroups = () => {
    if (!data || !data.groups) {
      return;
    }
    return data.groups.map(({name}: {name: string}, i: number) => (
      <ListItem
        key={`${name}-${i}`}
        title={name}
        children={{}}
        topDivider
        bottomDivider
      />
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
