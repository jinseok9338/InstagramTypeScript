import { useState, useEffect } from 'react';
import { FirestoreDataType } from '../services/types';
import {
  getPhotos,
  photosWithUserDetailsType,
} from '../services/photos';

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

        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId]);

  return { photos };
}
