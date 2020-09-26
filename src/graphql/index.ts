import {useContext} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {getMainDefinition} from '@apollo/client/utilities';
import UserContext from '../context/UserContext';

const useClient = () => {
  const {user} = useContext(UserContext);
  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: user ? `Bearer ${user.token}` : null,
      },
    };
  });

  const errorLink = onError(
    ({response, graphQLErrors, networkError, ...rest}) => {
      console.log({response, graphQLErrors, networkError, rest});
      // console.log({rest, graphQLErrors, networkError});
      // response.error = graphQLErrors;
    },
  );

  const httpLink = new HttpLink({
    uri: 'https://10.0.0.6:4000/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://10.0.0.6/graphql',
    options: {
      reconnect: true,
    },
  });

  const connectionLinks = split(
    // split based on operation type
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    // wsLink,
    httpLink,
  );

  const link = ApolloLink.from([errorLink, authLink, connectionLinks]);

  const cache = new InMemoryCache({});

  return new ApolloClient({
    // link: errorLink.concat(authLink.concat(httpLink)),
    link,
    cache,
  });
};

export default useClient;
