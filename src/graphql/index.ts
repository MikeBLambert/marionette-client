import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {onError} from '@apollo/client/link/error';
import {getMainDefinition} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-community/async-storage';

const useClient = () => {
  const errorLink = onError(
    ({response, graphQLErrors, networkError, ...rest}) => {
      // TO_DO: implement global error handling.
      console.log({response, graphQLErrors, networkError, rest});
      // response.error = graphQLErrors;
    },
  );

  const httpLink = new HttpLink({
    uri: 'https://saved-reindeer-68.hasura.app/v1/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: 'wss://saved-reindeer-68.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: async () => {
        const user = (await AsyncStorage.getItem('user')) || '';
        if (!user) return;
        return {authToken: JSON.parse(user).authToken};
      },
    },
  });

  const connectionLinks = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const link = ApolloLink.from([errorLink, connectionLinks]);

  const cache = new InMemoryCache({});

  return new ApolloClient({
    link,
    cache,
  });
};

export default useClient;
