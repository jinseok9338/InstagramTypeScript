import { useRef } from 'react';

import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export interface PostcontentProp {
  content: {
    username: string;
    imageSrc: string;
    caption: string;
    docId: string;
    userLikedPhoto: boolean;
    likes: any[];
    comments: { comment: string; displayName: string }[];
    dateCreated: number | Date;
  };
}

const Post = ({ content }: PostcontentProp) => {
  const commentInput = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (commentInput && commentInput.current) {
      commentInput.current.focus();
    }
  };

  // components
  // -> header, image, actions (like & comment icons), footer, comments
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content?.username as string} />
      <Image
        src={content?.imageSrc as string}
        caption={content?.caption as string}
      />
      <Actions
        docId={content?.docId}
        totalLikes={content?.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content?.docId as string}
        comments={content?.comments} // Array
        posted={content.dateCreated} // TimeStamp
        commentInput={commentInput}
      />
    </div>
  );
};
export default Post;
