import firebase from 'firebase';
import { useState, useEffect } from 'react';
import { getPhotos, FirestoreDataType, photosWithUserDetailsType } from '../services/firebase';

export default function usePhotos(user: FirestoreDataType | null) {
  const [photos, setPhotos] = useState([{}] as photosWithUserDetailsType[]);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(
          user!.userId,
          user!.following
        );
        // re-arrange array to be newest photos first by dateCreated
        //@ts-ignore
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId]);

  return { photos };
}
