/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { firebase } from '../../lib/firebase';
import SuggestedProfile from './suggested-profile';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import { profileType } from '../../services/types';

interface SuggestionPropTypes {
  userId: string;
  following: any[];
  loggedInUserDocId: string;
}

const Suggestions = ({
  userId,
  following,
  loggedInUserDocId,
}: SuggestionPropTypes) => {
  const [suggestedUsers, setSuggestedUsers] = useState([] as profileType[]);

  const { user: loggedInUser } = useContext(UserContext); // auth user

  const { user } = useUser(loggedInUser?.uid); // with user Profile

  console.log(suggestedUsers, 'suggestedUsers');

  useEffect(() => {
    if (Object.entries(user).length !== 0) {
      firebase
        .firestore()
        .collection('users')
        .where('userId', 'not-in', user.following)
        .limit(5)
        .get()
        .then((res) => {
          const usersProfile = res.docs
            .map((doc) => doc.data())
            .filter((doc) => doc.userId !== user.userId) as profileType[];
          setSuggestedUsers(usersProfile);
        });
    }
    // Do we need to retrigger this function when there was a following changed?
  }, []);

  return !suggestedUsers ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : suggestedUsers.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {suggestedUsers.map((profile) => (
          <SuggestedProfile
            key={profile.userId}
            profileDocId={profile.userId!}
            username={profile.username ? profile.username : 'unknown'} // Profile may contain username
            profileId={profile.userId ? profile.userId : 'unknown'}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
