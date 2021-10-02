import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/users';
import { FirestoreDataType,profileType } from '../services/types';

export default function useUser(userId: string) {
  const [activeUser, setActiveUser] = useState({} as profileType);

  useEffect(() => {
    async function getUserObjByUserId(userId: string) {
      const user: profileType[] = await getUserByUserId(userId);
      setActiveUser(user[0] || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser };
}
