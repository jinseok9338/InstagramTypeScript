import { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
  const { user } = useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={user?.username!} fullName={user?.fullName!} />
      <Suggestions
        userId={user?.userId!}
        following={user?.following!}
        loggedInUserDocId={user?.userId!}
      />
    </div>
  );///
}
