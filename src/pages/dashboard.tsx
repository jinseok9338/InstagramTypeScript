import { useEffect, useState } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import PostPicModal from '../components/postPicModal';

interface UserContextType {
  user: firebase.default.User;
}

export default function Dashboard({ user: loggedInUser }: UserContextType) {
  const { user } = useUser(loggedInUser?.uid);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      <div className="bg-gray-background">
        <Header visible={visible} setVisible={setVisible} />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <PostPicModal visible={visible} setVisible={setVisible} />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}
