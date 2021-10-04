import { useState, useEffect } from 'react';
import { profileType, postType } from '../services/types';
import { getPhotos } from '../services/photos';

export default function usePhotos(user: profileType | null) {
  const [posts, setPosts] = useState([] as postType[]);

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
        setPosts(followedUserPhotos);
      } else {
        // Select Random photos with algorithm... but that's certainly not feasible, or maybe,,,
      }
    }

    getTimelinePhotos();
  }, [user?.userId]);

  return { posts };
}
