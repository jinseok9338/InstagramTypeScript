import { useRef } from 'react';

import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { postType } from '../../services/types';
import {firebase} from "../../lib/firebase"


const Post = (posts: postType[]) => {
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
      {posts.length !== 0 && posts.map((post) => (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
          <Header username={post.userName!} />
          <Image
            src={post.picURL!}
            caption={post.post!}
          />
          <Actions
            docId={post.postId!}
            totalLikes={post.likes?.length!}
            likedPhoto={post.likes?.includes(firebase.auth().currentUser?.uid!)!}
            handleFocus={handleFocus}
          />
          <Footer caption={post.post!} username={post?.userName!} />
          <Comments
            docId={post.postId!}
            comments={post.comments!} // Array // Display Name... conumdrum...
            posted={post.posted!} // TimeStamp
            commentInput={commentInput}
          />
        </div>
      ))}
    </>
  );
};
export default Post;
