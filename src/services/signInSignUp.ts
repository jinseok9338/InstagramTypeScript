import { useHistory } from 'react-router-dom';
import { firebase, Providers } from '../lib/firebase';
import { doesUsernameExist } from './users';

export const SignInWithGoogle = async () => {
  const history = useHistory();
  const { user } = await firebase.auth().signInWithPopup(Providers.google);
  const credential = await user?.getIdToken();

  if (credential) {
    try {
      history.push('/');
    } catch (e) {
      let errorMessage = 'Failed to log in';
      if (e instanceof Error) {
        errorMessage = e.message;
        alert(errorMessage);
      }
    }
  }
};

export const AddUserToFirestore = async (
  emailAddress: string,
  password: string,
  username: string,
  fullName: string
) => {
  const usernameExists = await doesUsernameExist(username);

  if (!usernameExists.length) {
    try {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

      if (createdUserResult.user != null) {
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        await firebase
          .firestore()
          .collection('users')
          .doc(createdUserResult.user.uid)
          .set({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now(),
          });
        return createdUserResult.user.uid;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
};
