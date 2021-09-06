import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

const firebase = Firebase.initializeApp(firebaseConfig);

export const Providers = {
    google: new Firebase.auth.GoogleAuthProvider(),
    facebook: new Firebase.auth.FacebookAuthProvider(),
};

const { FieldValue, Firestore } = Firebase.firestore;

export { firebase, FieldValue, Firestore };
