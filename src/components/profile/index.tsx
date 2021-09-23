import { useReducer, useEffect } from 'react';

import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/photos';

export interface ProfileProptypes {
  user: {
    dateCreated: number;
    emailAddress: string;
    followers: any[];
    following: any[];
    fullName: string;
    userId: string;
    username: string;
  };
}

const Profile = ({ user }: ProfileProptypes): JSX.Element => {
  const reducer = (state: any, newState: any) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

export default Profile;
