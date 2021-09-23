import { firebase } from '../lib/firebase';
import { FirestoreDataType, profileType } from './types';
import { getUserByUserId, getUserByUsername } from './users';

// This file handles photo related functions

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



