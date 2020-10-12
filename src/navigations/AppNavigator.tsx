import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Groups from '../screens/Groups/Groups';
import {SCREENS} from './constants';
import GroupSettings from '../screens/GroupSettings';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREENS.groups}
        component={Groups}
        options={({navigation}) => ({
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 34,
          },

          headerRight: () => {
            return (
              <Icon
                style={styles.gearIcon}
                name="gear"
                type="font-awesome"
                size={30}
                onPress={() => navigation.toggleDrawer()}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name={SCREENS.groupSettings}
        component={GroupSettings}
        options={() => ({
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  gearIcon: {
    opacity: 0.5,
    padding: 10,
  },
});

export default AppNavigator;
