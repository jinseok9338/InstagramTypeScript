import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { firebase, FieldValue, Providers } from '../lib/firebase'



export const SignInWithGoogle = async () => {
  const history = useHistory()
  const { credential } = await firebase.auth().signInWithPopup(Providers.google);

  if (credential) {
    try {
      const requestParams = {
        provider: 'google',
        accessToken: credential.accessToken,
      };
      const { data } = await axios
        .post<{ accessToken: string }>(`${apiBaseURL}/token`, requestParams);

      sessionStorage.setItem('accessToken', data.accessToken);
      history.push('/url-to-redirect');
    } catch (e) {
      console.log(e.message)
      // Error hanlding logic
    }
  }
}

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

export interface FirestoreDataType
  extends firebase.default.firestore.DocumentData {
  docId: string;
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(
  userId: string
): Promise<FirestoreDataType[]> {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

type profileType = {
  docId: string;
  username?: string;
  userId?: string;
}[]

export async function getSuggestedProfiles(
  userId: string,
  following: string[]
): Promise<profileType> {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile: FirestoreDataType) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId: string, // currently logged in user document id (karl's profile)
  profileId: string, // the user that karl requests to follow
  isFollowingProfile: boolean // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  profileDocId: string, // currently logged in user document id (karl's profile)
  loggedInUserDocId: string, // the user that karl requests to follow
  isFollowingProfile: boolean // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export interface photosWithUserDetailsType extends FirestoreDataType {
  username: string;
  userLikedPhoto: boolean;
  docId: string;
}

export async function getPhotos(
  userId: string,
  following: string[]
): Promise<photosWithUserDetailsType[]> {
  // [5,4,2] => following
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos: FirestoreDataType[] = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // photo.userId = 2
      const user = await getUserByUserId(photo.userId);
      // raphael

      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username: string) {
  const user: FirestoreDataType[] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user[0].userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername: string,
  profileUserId: string
) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // karl (active logged in user)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {} as FirestoreDataType] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile: boolean,
  activeUserDocId: string,
  profileDocId: string,
  profileUserId: string,
  followingUserId: string
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
