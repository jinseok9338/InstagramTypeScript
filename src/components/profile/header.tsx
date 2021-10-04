/* eslint-disable jsx-a11y/img-redundant-alt */

import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';

import UserContext from '../../context/user';

interface HeaderPropTypes {
  photosCount: number;
  followerCount: number;
  setFollowerCount: ({ followerCount }: { followerCount: number }) => void;
  profile: {
    docId: string;
    userId: string;
    fullName: string;
    username: string;
    followers: string[];
    following: string[];
  };
}

const Header = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile
}: HeaderPropTypes) => {
  const { user: loggedInUser } = useContext(UserContext); // auth user
  const { user } = useUser(loggedInUser?.uid); // with user Profile 
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
console.log(profile)
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profile.username ? (
          <img
            className="rounded-full h-40 w-40 flex"
            src="/images/unknown.png"
            alt={`${profile.fullName} profile picture`}
          />
        ) : (
          <img
            className="rounded-full h-40 w-40 flex"
            src="/images/unknown.png"
            alt={`${profile.fullName}'s profile picture`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {true && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!profile.followers || !profile.following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profile.fullName ? <Skeleton count={1} height={24} /> : profile.fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
