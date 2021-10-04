import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';
import { getUserByUsername } from '../services/users';
import { profileType } from '../services/types';



const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<profileType>(null as unknown as profileType);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = (await getUserByUsername(username)) as profileType;
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile emailAddress={user.emailAddress} followers={user.followers} following={user.following} username={user.username} fullName={user.fullName} userInfo={user.userInfo} userId={user.userId} />
      </div>
    </div>
  ) : null;
};

export default Profile;
