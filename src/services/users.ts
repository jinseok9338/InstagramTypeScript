import useUser from '../hooks/use-user';
import { firebase, FieldValue, Firestore } from '../lib/firebase';
import { FirestoreDataType, profileType } from './types';

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




export const followingUpdate = async(LoggedInUserId:string,followingUserId:string) => {
  // Update following array and return something When LoggedInUser follows followingUserId
const user = await getUserByUserId(LoggedInUserId)
  firebase.firestore().collection("users").doc(LoggedInUserId).update({ ...user, following: [followingUserId, ...user.following!] }).then(async() => {
    console.log("successfully Updated following")
    const followedUser = await getUserByUserId(followingUserId)
    firebase.firestore().collection("users").doc(followingUserId).update({ ...followedUser, followers: [LoggedInUserId, ...followedUser.followers!] }).then(() => {
      console.log("successfully Updated followers")
    }).catch((e) => {
      console.error(e.message)
    })
  }).catch(e => {
  console.error(e.message)
})

}

export const followersUpdate = async (LoggedInUserId: string, followersUserId: string) => {
  // Update following array and return something When LoggedInUser follows followingUserId
  const user = await getUserByUserId(LoggedInUserId)
  firebase.firestore().collection("users").doc(LoggedInUserId).update({ ...user, followers: [followersUserId, ...user.followers!] }).then(async() => {
    console.log("successfully Updated followers")
    const followingUser = await getUserByUserId(followersUserId)
    firebase.firestore().collection("users").doc(followersUserId).update({ ...followingUser, following: [LoggedInUserId, ...followingUser.following!] }).then(() => {
      console.log("successfully Updated following")
    }).catch(e => {
      console.error(e.message)
    })
  }).catch(e => {
    console.error(e.message)
  })
}
