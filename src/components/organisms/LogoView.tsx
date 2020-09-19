import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const LogoView = () => {
  return (
    <View style={styles.container}>
      <Icon name="group" color="blue" size={50} />
      <Text>Company Name Here</Text>
    </View>
  );
};

export default LogoView;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
  },
});
