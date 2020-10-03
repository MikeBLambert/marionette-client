import {
  LazyQueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import {useContext} from 'react';
import UserContext from '../context/UserContext';

const useAuth = () => {
  const {user} = useContext(UserContext);
  const headers = {authorization: 'Bearer ' + user.token};

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
