import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {useContext} from 'react';
import UserContext from '../context/UserContext';

const useAuth = () => {
  const {user} = useContext(UserContext);
  const headers = {authorization: 'Bearer ' + user.token};
  return {
    useQuery: (TAG: any, options: any) =>
      useQuery(TAG, {
        ...options,
        context: {
          headers,
        },
      }),
    useLazyQuery: (TAG: any, options: any) =>
      useLazyQuery(TAG, {
        ...options,
        context: {
          headers,
        },
      }),
    useMutation: (TAG: any, options: any) =>
      useMutation(TAG, {
        ...options,
        context: {
          headers,
        },
      }),
  };
};

export default useAuth;
