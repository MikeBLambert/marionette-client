import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import UserContext from './UserContext';

const UserProvider = ({children}) => {
  const [user, setUser] = useState({token: '', _id: '', email: ''});

  useEffect(() => {
    getUser();
  }, []);

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

  // return context;
};

export default UserProvider;
