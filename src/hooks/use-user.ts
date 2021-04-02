import { useState, useEffect } from 'react';
import { getUserByUserId, FirestoreDataType } from '../services/firebase';

export default function useUser(userId: string) {
  const [activeUser, setActiveUser] = useState({} as FirestoreDataType);

  useEffect(() => {
    async function getUserObjByUserId(userId: string) {
      const user: FirestoreDataType[] = await getUserByUserId(userId);
      setActiveUser(user[0] || {});
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser };
}
