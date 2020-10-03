import React, {useContext, FunctionComponent, useCallback} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

import PlusFab from '../../components/organisms/PlusFab';
import {SCREENS} from '../../navigations/contants';
import UserContext from '../../context/UserContext';
import {gql} from '@apollo/client';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

interface Props {
  navigation: NavigationProp<any>;
}

const GROUPS = gql`
  query FETCH_GROUPS($_id: ID!) {
    groups(input: {_id: $_id}) {
      _id
      name
    }
  }
`;

const Groups: FunctionComponent<Props> = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {useLazyQuery} = useAuth();
  const [fetchGroups, {data}] = useLazyQuery(GROUPS, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: 'slkdfjs',
      },
    },
  });

  useFocusEffect(
    useCallback(() => {
      fetchGroups({
        variables: {_id: user._id},
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
