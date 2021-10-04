import { useRef } from 'react';

import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { postType } from '../../services/types';
import { firebase } from '../../lib/firebase';

const Post = ({
  userName,
  comments,
  posted,
  postId,
  post,
  picURL,
  likes,
}: postType) => {
  const commentInput = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (commentInput && commentInput.current) {
      commentInput.current.focus();
    }
  };

  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <>
      <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
        <Header username={userName!} />
        <Image src={picURL!} caption={post!} />
        <Actions
          docId={postId!}
          totalLikes={likes?.length!}
          likedPhoto={likes?.includes(firebase.auth().currentUser?.uid!)!}
          handleFocus={handleFocus}
        />
        <Footer caption={post!} username={userName!} />
        <div className="p-4 pt-1 pb-4 ">
          <Comments
            docId={postId!}
            comments={comments!} // Array // Display Name... conumdrum...
            posted={posted!} // TimeStamp
            commentInput={commentInput}
          />
        </div>
      </div>
    </>
  );
};
export default Post;
