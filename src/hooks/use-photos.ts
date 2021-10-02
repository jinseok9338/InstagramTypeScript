import { useState, useEffect } from 'react';
import { profileType, postType } from '../services/types';
import { getPhotos } from '../services/photos';

export default function usePhotos(user: profileType | null) {
  const [photos, setPhotos] = useState([{}] as postType[]);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      if (user?.following?.length! > 0) {
        const followedUserPhotos = await getPhotos(
          user?.userId!,
          user?.following!
        );

        followedUserPhotos.sort(
          (a, b) =>
            Number(b.posted?.toISOString) - Number(a.posted?.toISOString)
        );
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId]);

  return { photos };
}
