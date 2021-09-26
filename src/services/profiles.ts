/* eslint-disable default-case */
import Firebase from 'firebase';
import { FirestoreDataType, profileType } from './types';
import { firebase } from '../lib/firebase';
import { isFileImage } from '../utils/utils';


// This file handles profile related functions

const storage = firebase.storage().ref()

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


export const uploadPictureTotheBucket = (imageAsFile: File)  => {
  // Need to check if the file is in jpeg, png format Either type is supported

  if (imageAsFile === '' || !isFileImage(imageAsFile)) {
    console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
  } 
    const uploadTask = storage.child(`/images/${imageAsFile.name}`).put(imageAsFile)
    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${  progress  }% done`); 
      switch (snapshot.state) {
        case Firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case Firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      // Handle unsuccessful uploads
      console.error(error)
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL:string) => {
        console.log('File available at', downloadURL);
      });
    });
  

};
