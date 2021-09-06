import { createContext } from 'react';
import { FieldValue, firebase } from '../lib/firebase';

interface FirebaseContextType {
  firebase: typeof firebase;
  FieldValue: typeof FieldValue;
}

const FirebaseContext = createContext<FirebaseContextType>(
  {} as FirebaseContextType
);
export default FirebaseContext;
