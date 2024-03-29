import React, {useEffect, useState, FunctionComponent} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import UserContext from './UserContext';

export const LOGGED_OUT_USER = {
  accessToken: '',
  nickname: '',
  email: '',
  picture: '',
  isAuthenticated: false,
  isWeb: false,
};

type UserType = {
  accessToken: string;
  nickname: string;
  email: string;
  picture: string;
  isAuthenticated: boolean;
  isWeb: boolean;
};

interface Props {
  isWeb: boolean;
}

const UserProvider: FunctionComponent<Props> = ({children}) => {
  const [user, setUser] = useState<UserType>(LOGGED_OUT_USER);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!user || user === LOGGED_OUT_USER) return;

    AsyncStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const getUser = async () => {
    const storedUser = (await AsyncStorage.getItem('user')) || '';
    if (!storedUser) return;

    setUser(JSON.parse(storedUser));
  };

  const logOut = () => {
    setUser(LOGGED_OUT_USER);
  };
  return (
    <UserContext.Provider value={{user, setUser, logOut}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
