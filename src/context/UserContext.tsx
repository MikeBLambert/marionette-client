import {createContext, SetStateAction} from 'react';

export type UserType = {
  accessToken: string;
  email: string;
  nickname: string;
  picture: string;
  isAuthenticated: boolean;
  isWeb: boolean;
};

interface ContextProps {
  setUser: React.Dispatch<SetStateAction<UserType>>;
  logOut: () => void;
  user: UserType;
}

const UserContext = createContext<ContextProps>({
  logOut: () => {},
  setUser: () => {},
  user: {
    accessToken: '',
    email: '',
    nickname: '',
    picture: '',
    isAuthenticated: false,
    isWeb: false,
  },
});

export default UserContext;
