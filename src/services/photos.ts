/* eslint-disable default-case */
import Firebase from 'firebase';
import { isFileImage } from '../utils/utils';
import { firebase } from '../lib/firebase';
import { FirestoreDataType, profilestype, profileType } from './types';
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        reject(new Error("something bad happened"))
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL)
        })
      }
    );
  });

return promise
};
