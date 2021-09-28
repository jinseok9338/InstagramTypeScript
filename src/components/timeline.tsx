/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';
import PostPicModal from './postPicModal';

interface contentProp {
  username: string;
  imageSrc: string;
  caption: string;
  docId: string;
  userLikedPhoto: boolean;
  likes: any[];
  comments: { comment: string; displayName: string }[];
  dateCreated: number | Date;
}

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        photos.map((content) => (
          <Post key={content.docId} content={content as contentProp} />
        ))
      )}
      <PostPicModal visible={true} />
    </div>
  );
}
