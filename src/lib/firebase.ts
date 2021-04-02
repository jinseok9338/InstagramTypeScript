import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

const firebase = Firebase.initializeApp(firebaseConfig);

const FieldValue = Firebase.firestore.FieldValue;

export { firebase, FieldValue };
