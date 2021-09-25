import { FirestoreDataType, profileType } from './types';
import { firebase } from '../lib/firebase';

// This file handles profile related functions

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

export interface updatedProfileType {
  residence: string;
  hobby: string;
  phoneNumber: string;
  aboutYou: string;
}

export const updateProfile = (
  updatedUserInfo: updatedProfileType,
  userId: string
) => {
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .update({ userInfo: updatedUserInfo })
    .then(() => {
      console.log('update Successful');
    })
    .catch((e: Error) => {
      console.log(e.message);
    });
};

export const updateProfilePicture = async () => {};
