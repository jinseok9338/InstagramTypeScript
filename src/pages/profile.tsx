import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FirestoreDataType, getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

//Who the fuck wrote this code... oh wait it's me... shit there are tons of works to do 
interface userType {
  docId: string;
  dateCreated: number;
  emailAddress: string;
  followers: any[];
  following: any[];
  fullName: string;
  userId: string;
  username: string;
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<userType>((null as unknown) as userType);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = (await getUserByUsername(username)) as userType[];
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
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};

export default Profile;
