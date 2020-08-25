import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';

import PlusFab from '../../components/organisms/PlusFab';

interface Props {}

const Groups = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="First Group" children={{}} topDivider bottomDivider />
        <ListItem title="Last Group" children={{}} topDivider bottomDivider />
      </ScrollView>
      <PlusFab onPress={() => console.log('HI!!!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Groups;
