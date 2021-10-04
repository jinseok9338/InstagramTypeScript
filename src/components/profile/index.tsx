import { useReducer, useEffect } from 'react';

import Header from './header';
import Photos from './photos';
import { getUserPhotosByUsername } from '../../services/photos';
import { postType, profileType } from '../../services/types';

const Profile = ({
  emailAddress,
  followers,
  following,
  fullName,
  userId,
  userInfo,
  username,
}: profileType): JSX.Element => {
  const reducer = (state: any, newState: any) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };

  const user = {
    emailAddress,
    followers,
    following,
    fullName,
    userId,
    userInfo,
    username,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      if (username) {
        const photos = await getUserPhotosByUsername(username);
        dispatch({
          profile: user,
          photosCollection: photos as postType[],
          followerCount: followers?.length,
        });
      }
      // I don't understand dispatch
    }
    getProfileInfoAndPhotos();
  }, [username]);

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
