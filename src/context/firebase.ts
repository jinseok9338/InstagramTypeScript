import { createContext } from 'react';
import { FieldValue } from '../lib/firebase';

interface FirebaseContextType {
  firebase: firebase.default.app.App;
  FieldValue: firebase.default.firestore.FieldValue;
}

const FirebaseContext = createContext<FirebaseContextType>(
  {} as FirebaseContextType
);
export default FirebaseContext;
