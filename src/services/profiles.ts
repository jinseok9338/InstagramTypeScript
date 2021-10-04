/* eslint-disable default-case */
import { firebase } from '../lib/firebase';



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
