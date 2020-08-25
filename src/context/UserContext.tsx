import {createContext, SetStateAction} from 'react';

interface ContextProps {
  setUser: React.Dispatch<
    SetStateAction<{token: string; _id: string; email: string}>
  >;
  logOut: () => void;
  user: {token: string; _id: string; email: string};
}

const UserContext = createContext<ContextProps>({
  logOut: () => {},
  setUser: () => {},
  user: {token: '', _id: '', email: ''},
});

export default UserContext;
