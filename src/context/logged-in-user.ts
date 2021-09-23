import { createContext } from 'react';
import { FirestoreDataType } from '../services/photos';

interface UserContextType {
  user: FirestoreDataType | null;
}

const LoggedInUserContext = createContext<UserContextType>(
  {} as UserContextType
);
export default LoggedInUserContext;
