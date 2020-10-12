import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import UserProvider from './context/UserProvider';
import UserContext from './context/UserContext';
import useClient from './graphql';
import RootNavigator from './navigations';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: ({isWeb}: any) => React.ReactElement = ({isWeb}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <UserProvider isWeb={!!isWeb}>
          <ApolloProvider client={useClient()}>
            <UserContext.Consumer>
              {() => <RootNavigator isWeb={!!isWeb} />}
            </UserContext.Consumer>
          </ApolloProvider>
        </UserProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
