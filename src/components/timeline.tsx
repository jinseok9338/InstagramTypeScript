/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';


export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <>
      <div className="container col-span-2">
        {!photos ? (
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        ) : (
          photos.map((post) => (
            <Post
              key={post?.postId!}
              comments={post.comments}
              likes={post.likes}
              picURL={post.picURL}
              post={post.post}
              postId={post.postId}
              posted={post.posted}
              userId={post.userId}
              userLikedPhoto={post.userLikedPhoto}
              userName={post.userName}
            />
          ))
        )}
      </div>
    </>
  );
}
