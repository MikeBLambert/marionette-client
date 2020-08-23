import React, {useEffect, useState, FunctionComponent} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import UserContext from './UserContext';

export const LOGGED_OUT_USER = {token: '', _id: '', email: ''};

const UserProvider: FunctionComponent = ({children}) => {
  const [user, setUser] = useState(LOGGED_OUT_USER);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    AsyncStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const getUser = async () => {
    const storedUser = (await AsyncStorage.getItem('user')) || '';
    console.log({storedUser});
    if (!storedUser) return;
    setUser(JSON.parse(storedUser));
  };
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
