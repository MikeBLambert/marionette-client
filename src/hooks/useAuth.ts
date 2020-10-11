import {
  LazyQueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import {useContext} from 'react';
import UserContext from '../context/UserContext';

const useAuth = (role = 'user') => {
  const {user} = useContext(UserContext);
  console.log({user});
  const headers = {
    Authorization: 'Bearer ' + user.accessToken,
    'X-Hasura-Role': role,
  };
  console.log({headers});

  const withAuth = (fn: any) => {
    return (TAG: object, options: LazyQueryHookOptions) =>
      fn(TAG, {...options, context: {...options.context, headers}});
  };
  return {
    useQuery: withAuth(useQuery),
    useLazyQuery: withAuth(useLazyQuery),
    useMutation: withAuth(useMutation),
  };
};

export default useAuth;
