import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

const firebase = Firebase.initializeApp(firebaseConfig);


const { FieldValue, Firestore } = Firebase.firestore;

export { firebase, FieldValue, Firestore };
