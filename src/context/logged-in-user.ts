import { createContext } from 'react';
import { profileType } from '../services/types';

interface UserContextType {
  user: profileType | null;
}

const LoggedInUserContext = createContext<UserContextType>(
  {} as UserContextType
);
export default LoggedInUserContext;
