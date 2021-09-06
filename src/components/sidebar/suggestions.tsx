/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

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
  type profileType = {
    docId: string;
    username?: string;
    userId?: string;
  }[]
  const [profiles, setProfiles] = useState({} as profileType); // Need to provide default value or type

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);
  // hint: use the firebase service (call using userId)
  // getSuggestedProfiles
  // call the async function ^^^^ within useEffect
  // store it in state
  // go ahead and render (wait on the profiles as in 'skeleton')

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile?.docId}
            profileDocId={profile.docId}
            username={profile.username? profile.username : 'unknown' } // Profile may contain username
            profileId={profile.userId? profile.userId : 'unknown'}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Suggestions;
