import {createContext, SetStateAction} from 'react';

interface UserObject {
  token: string;
}

interface ContextProps {
  setUser: React.Dispatch<
    SetStateAction<{token: string; _id: string; email: string}>
  >;
  user: {token: string; _id: string; email: string};
}

const UserContext = createContext<ContextProps>({
  setUser: () => {},
  user: {token: '', _id: '', email: ''},
});

export default UserContext;
