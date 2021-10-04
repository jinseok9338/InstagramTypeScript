/* eslint-disable default-case */
import Firebase from 'firebase';
import { isFileImage } from '../utils/utils';
import { firebase } from '../lib/firebase';
import { FirestoreDataType, postType } from './types';
import { getUserByUserId, getUserByUsername } from './users';
// This file handles photo related functions

const storage = firebase.storage().ref();
const Firestore = firebase.firestore();

export interface photosWithUserDetailsType extends FirestoreDataType {
  username: string;
  userLikedPhoto: boolean;
  docId: string;
}

export async function getPhotos(
  userId: string,
  following: string[]
): Promise<postType[]> {
  // [5,4,2] => following
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', 'not-in', following)
    .get();

  const userFollowedPhotos = result.docs.map((post) => ({
    ...post.data(),
  }));

  return userFollowedPhotos;
}

export async function getUserPhotosByUsername(username: string) {
  console.log(username);
  const user = await getUserByUsername(username);
  console.log(user);
  const result = await firebase
    .firestore()
    .collection('posts')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
  }));
}

export const uploadPictureTotheBucket = (imageAsFile: File) => {
  // Need to check if the file is in jpeg, png format Either type is supported

  if (imageAsFile.toString() === '' || !isFileImage(imageAsFile)) {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  }
  const promise = new Promise<string>((resolve, reject) => {
    /* missing implementation */
    const uploadTask = storage
      .child(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case Firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case Firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
        reject(new Error('something bad happened'));
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });

  return promise;
};
