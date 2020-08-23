import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UserProvider from './context/UserProvider';
import UserContext from './context/UserContext';
import useClient from './graphql';
import RootNavigator from './navigations';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App: () => React.ReactElement = () => {
  const client = useClient();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <UserProvider>
          <ApolloProvider client={client}>
            <UserContext.Consumer>
              {(context) => <RootNavigator token={context.user.token} />}
            </UserContext.Consumer>
          </ApolloProvider>
        </UserProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
