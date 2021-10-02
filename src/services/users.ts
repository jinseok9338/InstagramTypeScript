import { firebase } from '../lib/firebase';
import { profileType } from './types';

export const PostAPost = async (
  collectionPath: string,
  data: any,
  userId: string
) => {
  await firebase.firestore().collection(collectionPath).doc(userId).set(data);
};

export async function doesUsernameExist(username: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username: string) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(
  userId: string
): Promise<profileType> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
  }));

  return user[0];
}





