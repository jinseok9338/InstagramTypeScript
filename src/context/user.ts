import { createContext } from 'react';

interface UserContextType {
  user: firebase.default.User;
}

const UserContext = createContext<UserContextType>({} as UserContextType);
export default UserContext;
